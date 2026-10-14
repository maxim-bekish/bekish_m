/* eslint-disable no-restricted-syntax -- ImageResponse рисует PNG без CSS: токены и классы ему недоступны */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

// картинка превью, когда ссылку на сайт отправляют в Telegram, VK, LinkedIn.
// Цвета — из :root в globals.css: ImageResponse не видит CSS-переменные
export const alt = 'Максим Бекиш — фронтенд-разработчик';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const font = (subset: string) =>
	readFile(join(process.cwd(), `assets/fonts/unbounded-${subset}-400-normal.woff`));

export default async function OpengraphImage() {
	const [latin, cyrillic] = await Promise.all([font('latin'), font('cyrillic')]);

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: 80,
				background: '#0b0b0b',
				color: '#f2eee6',
				// fontsource делит шрифт по алфавитам: латиница и кириллица — отдельные файлы
				fontFamily: 'Unbounded, Unbounded Cyrillic',
			}}>
			<div style={{ fontSize: 28, color: '#ff7a35' }}>Frontend · Vue · React · Next.js</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
				<div style={{ fontSize: 96, lineHeight: 1 }}>Максим Бекиш</div>
				<div style={{ fontSize: 40, color: '#9c978f' }}>фронтенд-разработчик · Минск</div>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{ name: 'Unbounded', data: latin, weight: 400 },
				{ name: 'Unbounded Cyrillic', data: cyrillic, weight: 400 },
			],
		},
	);
}
