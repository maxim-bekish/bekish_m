import type { Metadata } from 'next';
import { Unbounded, Onest } from 'next/font/google';
import Scrollbar from '@/components/ui/Scrollbar';
import AccentInitScript from '@/components/ui/AccentInitScript';
import YandexMetrika from '@/components/ui/YandexMetrika';
import './globals.css';

const unbounded = Unbounded({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600'],
	variable: '--font-unbounded',
});

const onest = Onest({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500'],
	variable: '--font-onest',
});

// номер счётчика Метрики; в dev не считаем, чтобы не засорять статистику
const ymId = process.env.NODE_ENV === 'production' ? Number(process.env.YANDEX_METRIKA_ID) : 0;

export const metadata: Metadata = {
	title: 'Максим Бекиш — фронтенд-разработчик',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		// suppressHydrationWarning: скрипт ниже ставит style на <html> до гидрации
		// scroll-smooth — плавный переход по якорям (#about, #contacts); data-scroll-behavior —
		// при смене страницы Next на время отключает плавность, чтобы не ехать к верху через весь сайт
		<html
			lang='ru'
			data-scroll-behavior='smooth'
			className={`scrollbar scroll-smooth motion-reduce:scroll-auto ${unbounded.variable} ${onest.variable}`}
			suppressHydrationWarning>
			<head>
				<AccentInitScript />
			</head>
			{/* relative — для фонов диалогов в iOS 26+ Safari (см. Base UI: Set up) */}
			<body className='relative font-sans text-body '>
				{/* isolate — отдельный контекст наложения: попапы Base UI в порталах всегда поверх страницы */}
				{/* id='app' — сюда портируется бургер-меню, чтобы шапка (z-40) была над ним */}
				<div id='app' className='isolate flex flex-col min-h-svh '>
					{children}
					<Scrollbar />
				</div>
				{ymId > 0 && <YandexMetrika id={ymId} />}
			</body>
		</html>
	);
}
