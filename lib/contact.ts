'use server';

import { headers } from 'next/headers';
import { z } from 'zod';

// Server Action доступен прямым POST-запросом, а не только из формы,
// поэтому всё, что пришло с клиента, проверяем здесь заново

const schema = z.object({
	message: z.string().trim().min(2, 'Напишите пару слов о задаче').max(1000, 'Слишком длинно'),
	contact: z.string().trim().min(3, 'Оставьте контакт для ответа').max(100, 'Слишком длинно'),
	// ловушка для ботов: поле скрыто от людей, бот его заполнит
	website: z.string().max(0),
});

export type ContactInput = z.input<typeof schema>;
export type ContactResult = { ok: true } | { ok: false; error: string };

// лимит по IP: не больше LIMIT доставленных сообщений за WINDOW_MS. Неудачные попытки не считаются,
// в dev лимита нет. Живёт в памяти одного процесса — от случайного флуда хватит, от целенаправленного нет
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function recentHits(ip: string) {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
	hits.set(ip, recent);
	return recent;
}

function tooMany(ip: string) {
	return process.env.NODE_ENV !== 'development' && recentHits(ip).length >= LIMIT;
}

// флаг из двухбуквенного кода страны: RU → 🇷🇺
const flag = (code: string) =>
	String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));

const place = (code: string, country: string, city?: string | null) =>
	`${flag(code)} ${country}${city ? `, ${city}` : ''}`;

// локальные и частные адреса геолокацией не определить
const PRIVATE_IP = /^(unknown$|::1$|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::ffff:127\.)/;

// откуда пришло сообщение. Сначала заголовки хостинга (Vercel, Cloudflare) — бесплатно и мгновенно,
// иначе спрашиваем ipwho.is. Ошибка или локальный IP — пишем «не определено», отправку не ломаем
async function locate(h: Headers, ip: string): Promise<string | null> {
	const code = h.get('x-vercel-ip-country') ?? h.get('cf-ipcountry');
	if (code && /^[A-Z]{2}$/.test(code)) {
		const country = new Intl.DisplayNames(['ru'], { type: 'region' }).of(code) ?? code;
		const city = h.get('x-vercel-ip-city');
		return place(code, country, city && decodeURIComponent(city));
	}

	if (PRIVATE_IP.test(ip)) return null;
	try {
		const res = await fetch(
			`https://ipwho.is/${encodeURIComponent(ip)}?lang=ru&fields=success,country,country_code,city`,
			{ signal: AbortSignal.timeout(2000) },
		);
		const geo: { success: boolean; country?: string; country_code?: string; city?: string } =
			await res.json();
		if (!geo.success || !geo.country || !geo.country_code) return null;
		return place(geo.country_code, geo.country, geo.city);
	} catch {
		return null;
	}
}

export async function sendContact(input: ContactInput): Promise<ContactResult> {
	const parsed = schema.safeParse(input);
	if (!parsed.success) {
		// бот попался в ловушку — делаем вид, что всё ушло
		if (parsed.error.issues.some((i) => i.path[0] === 'website')) return { ok: true };
		return { ok: false, error: parsed.error.issues[0].message };
	}

	const h = await headers();
	const ip = h.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
	if (tooMany(ip)) return { ok: false, error: 'Слишком много сообщений, попробуйте позже' };

	const token = process.env.TELEGRAM_BOT_TOKEN;
	const chatId = process.env.TELEGRAM_CHAT_ID;
	if (!token || !chatId) {
		console.error('sendContact: не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID');
		return { ok: false, error: 'Не получилось отправить, напишите на почту' };
	}

	const { message, contact } = parsed.data;
	const from = await locate(h, ip);
	try {
		const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			// без parse_mode: текст посетителя уходит как есть, экранировать разметку не нужно
			body: JSON.stringify({
				chat_id: chatId,
				text: `✉️ Сообщение с сайта\n\n${message}\n\nКонтакт: ${contact}\n\nОткуда: ${from ?? 'не определено'}`,
			}),
			signal: AbortSignal.timeout(8000),
		});
		if (!res.ok) {
			console.error('sendContact: Telegram ответил', res.status, await res.text());
			return { ok: false, error: 'Не получилось отправить, напишите на почту' };
		}
	} catch (e) {
		console.error('sendContact:', e);
		return { ok: false, error: 'Не получилось отправить, напишите на почту' };
	}

	recentHits(ip).push(Date.now());
	return { ok: true };
}
