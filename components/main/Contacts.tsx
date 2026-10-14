'use client';

import { cn } from '@/lib/utils';
import { ArrowUpRight, Check, Copy, CornerDownLeft } from 'lucide-react';
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent, type SubmitEvent } from 'react';
import { Text } from '@/components/ui/Text';
import { sendContact } from '@/lib/contact';
import { Reveal } from '../ui/Reveal';

const EMAIL = 'maxamax997@gmail.com';

const LINKS = [
	{ label: 'Telegram', href: 'https://t.me/maxa_max' },
	{ label: 'GitHub', href: 'https://github.com/maxim-bekish' },
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/%D0%BC%D0%B0%D0%BA%D1%81%D0%B8%D0%BC-%D0%B1%D0%B5%D0%BA%D0%B8%D1%88-819b8920a',
	},
];

const STEPS = [
	'type Offer = { role: "Frontend"; stack: "Vue/React" }',
	'const offer: Offer = { role: "Frontend", stack: "Vue/React" }',
	'maksim.sayHello(offer)',
];

const MESSAGE_ID = 'contact-message';
const REPLY_ID = 'contact-reply';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
	'min-h-11 w-full border-b border-on-accent bg-transparent py-2 text-left outline-none placeholder:text-on-accent focus:border-b-2 read-only:opacity-60';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Contact() {
	const sectionRef = useRef<HTMLElement>(null);
	const keyRef = useRef<HTMLButtonElement>(null);

	const [seen, setSeen] = useState(false); // блок хотя бы раз появился на экране
	const [inView, setInView] = useState(false); // блок на экране сейчас
	const [typed, setTyped] = useState<string[]>([]);
	const [pressed, setPressed] = useState(false);
	const [status, setStatus] = useState<Status>('idle');
	const [error, setError] = useState('');
	const [copied, setCopied] = useState(false);
	const [message, setMessage] = useState('');
	const [reply, setReply] = useState(''); // как ответить посетителю
	const [website, setWebsite] = useState(''); // ловушка для ботов
	const sending = status === 'sending';

	// следим за видимостью блока
	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				setInView(entry.isIntersecting);
				if (entry.isIntersecting) setSeen(true);
			},
			{ threshold: 0.35 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	// печатаем строки терминала один раз, когда блок появился
	useEffect(() => {
		if (!seen) return;
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let cancelled = false;
		(async () => {
			if (reduceMotion) {
				setTyped(STEPS);
				return;
			}
			for (let i = 0; i < STEPS.length; i++) {
				await wait(250);
				for (let j = 1; j <= STEPS[i].length; j++) {
					if (cancelled) return;
					setTyped((prev) => {
						const next = [...prev];
						next[i] = STEPS[i].slice(0, j);
						return next;
					});
					await wait(38 + Math.random() * 55);
				}
				if (i < STEPS.length - 1) await wait(450);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [seen]);

	// клавиша на сайте проседает, потом срабатывает — как настоящая
	const pressKey = () => {
		setPressed(true);
		setTimeout(() => {
			setPressed(false);
			keyRef.current?.click();
		}, 160);
	};

	// Enter в полях формы отправляет сообщение, где бы ни был блок на экране
	const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
		e.preventDefault(); // вместо мгновенной отправки формы — анимация клавиши
		pressKey();
	};

	// Enter без фокуса (блок на экране) тоже нажимает клавишу на сайте
	useEffect(() => {
		if (!inView) return;
		const onKey = (e: globalThis.KeyboardEvent) => {
			if (e.key !== 'Enter') return;
			const active = document.activeElement;
			if (active && active !== document.body) return; // поля и кнопки обрабатывают Enter сами
			e.preventDefault();
			pressKey();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [inView]);

	const send = async (e: SubmitEvent) => {
		e.preventDefault();
		if (sending) return;
		setStatus('sending');
		const res = await sendContact({ message, contact: reply, website }).catch(() => ({
			ok: false as const,
			error: 'Не получилось отправить, напишите на почту',
		}));
		if (res.ok) {
			setStatus('sent');
			setMessage(''); // контакт оставляем: следующее сообщение можно отправить сразу
		} else {
			setError(res.error);
			setStatus('error');
		}
	};

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			/* браузер запретил доступ к буферу — ничего не делаем */
		}
	};

	const caretLine = Math.max(typed.length - 1, 0);
	return (
		<section ref={sectionRef} id='contacts' className='bg-accent'>
			<div className='relative wrapper-xl flex min-h-[min(78vh,640px)]   flex-col items-center justify-center gap-7   py-18 text-center text-on-accent'>
				<Text
					as='span'
					variant='terminal'
					color='on-accent'
					aria-hidden
					className='absolute top-5.5 left-6 opacity-75'>
					{'<contact>'}
				</Text>
				<Text
					as='span'
					variant='terminal'
					color='on-accent'
					aria-hidden
					className='absolute right-6 bottom-5.5 opacity-75'>
					{'</contact>'}
				</Text>
				<Reveal>
					<Text as='h2' variant='display' color='on-accent' className='mb-1'>
						Say hello 👋
					</Text>
				</Reveal>

				{/* терминал */}
				<Text
					as='div'
					variant='terminal'
					color='on-accent'
					className='min-h-[calc(4*1.7em)] w-[min(640px,100%)] text-left'>
					<div aria-hidden>
						{typed.map((line, i) => (
							<div key={i} className='whitespace-pre-wrap wrap-anywhere'>
								<span className='opacity-60'>ts&gt; </span>
								{line}
								{i === caretLine && status !== 'sent' && (
									<span className='ml-0.5 inline-block h-[1.1em] w-[.6em] bg-current align-[-.18em]' />
								)}
							</div>
						))}
					</div>
					{/* результат отправки читают и скринридеры */}
					<div role='status' className='pl-[2.2em] font-medium'>
						{status === 'sending' && 'Отправляю…'}
						{status === 'sent' && '✓ Доставлено, скоро отвечу'}
						{status === 'error' && `✗ ${error}`}
					</div>
				</Text>

				<form onSubmit={send} className='contents'>
					{/* сообщение и контакт уходят мне в Telegram */}
					<div className='flex w-[min(640px,100%)] flex-col gap-2'>
						<label>
							<span className='sr-only'>Сообщение</span>
							<Text
								as='input'
								id={MESSAGE_ID}
								type='text'
								variant='body'
								color='on-accent'
								value={message}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
								placeholder='Пара слов о задаче…'
								onKeyDown={onInputKey}
								maxLength={1000}
								readOnly={sending}
								className={inputClass}
							/>
						</label>
						<label>
							<span className='sr-only'>Как с вами связаться</span>
							<Text
								as='input'
								id={REPLY_ID}
								type='text'
								variant='body'
								color='on-accent'
								value={reply}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setReply(e.target.value)}
								placeholder='Telegram или почта для ответа'
								onKeyDown={onInputKey}
								maxLength={100}
								autoComplete='email'
								readOnly={sending}
								className={inputClass}
							/>
						</label>
						{/* ловушка для ботов: людям не видна и не доступна с клавиатуры */}
						<input
							type='text'
							name='website'
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
							tabIndex={-1}
							autoComplete='off'
							aria-hidden
							className='sr-only'
						/>
					</div>

					{/* клавиша Enter */}
					<button
						ref={keyRef}
						type='submit'
						disabled={sending}
						aria-label='Say hello — отправить сообщение'
						className='group/key inline-block cursor-pointer disabled:cursor-default [-webkit-tap-highlight-color:transparent]'>
						<span
							className={cn(
								'relative flex h-[clamp(140px,14vw,170px)] w-[clamp(230px,24vw,300px)] flex-col justify-between bg-linear-to-b from-key-top to-key-bottom px-5 py-4.5 text-left text-night-ink transition-[translate,box-shadow] duration-120 rounded-2xl shadow-xl',
								'group-enabled/key:group-hover/key:translate-y-0.75',
								'group-enabled/key:group-active/key:translate-y-2.5',
								(pressed || sending) && 'translate-y-2.5',
							)}>
							<CornerDownLeft strokeWidth={1.5} size={32} className='text-accent' />
							<Text as='b' variant='title' color='night-ink'>
								Отправить
							</Text>
							<Text
								as='span'
								variant='caps'
								color='night-muted'
								aria-hidden
								className='absolute top-4.5 right-5'>
								Enter
							</Text>
						</span>
					</button>
				</form>

				<Text
					as='a'
					href={`mailto:${EMAIL}`}
					variant='title'
					color='on-accent'
					className='hover:underline hover:underline-offset-6'>
					{EMAIL}
				</Text>

				<ul className='flex flex-wrap justify-center gap-x-6 gap-y-3'>
						{LINKS.map((link) => (
						<li key={link.label}>
							<a
								href={link.href}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex  items-center gap-1.5 font-display text-caps text-on-accent uppercase hover:underline hover:underline-offset-4'>
								{link.label}
								<ArrowUpRight strokeWidth={1.5} size={14} />
							</a>
						</li>
					))}
					<li>
						<button
							type='button'
							onClick={copyEmail}
							className='inline-flex cursor-pointer items-center gap-1.5 font-display text-caps text-on-accent uppercase hover:underline hover:underline-offset-4'>
							{copied ? (
								<Check strokeWidth={1.5} size={14} />
							) : (
								<Copy strokeWidth={1.5} size={14} />
							)}
							<span aria-live='polite'>
								{copied ? 'Скопировано' : 'Скопировать email'}
							</span>
						</button>
					</li>
				
				</ul>
			</div>
		</section>
	);
}
