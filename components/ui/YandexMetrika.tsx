'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

type Ym = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

declare global {
	interface Window {
		ym?: Ym;
	}
}

// заглушка из официального сниппета: вызовы копятся в очереди, tag.js разберёт их после загрузки
function ym(...args: unknown[]) {
	window.ym ??= Object.assign((...a: unknown[]) => void (window.ym!.a ??= []).push(a), { l: Date.now() });
	window.ym(...args);
}

// Яндекс Метрика. Переходы между страницами в Next идут без перезагрузки, поэтому
// автоматический просмотр отключён (defer) и каждый просмотр отправляем сами при смене пути
export default function YandexMetrika({ id }: { id: number }) {
	const pathname = usePathname();
	const prevUrl = useRef<string | null>(null);

	useEffect(() => {
		ym(id, 'init', {
			defer: true,
			webvisor: true,
			clickmap: true,
			trackLinks: true,
			accurateTrackBounce: true,
		});
	}, [id]);

	useEffect(() => {
		const url = location.href;
		ym(id, 'hit', url, { referer: prevUrl.current ?? document.referrer });
		prevUrl.current = url;
	}, [id, pathname]);

	return <Script src='https://mc.yandex.ru/metrika/tag.js' strategy='afterInteractive' />;
}
