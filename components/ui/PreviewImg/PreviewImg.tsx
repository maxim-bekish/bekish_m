'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
	src: StaticImageData;
	alt: string;
	sizes: string;
};

// длинный скрин страницы в окне карточки: пока карточка на экране, скрин едет снизу вверх
export function PreviewImg({ src, alt, sizes }: Props) {
	const box = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const img = box.current!.querySelector('img')!;
			gsap.to(img, {
				// функция, а не число: пересчитается при ресайзе
				y: () => -(img.offsetHeight - box.current!.offsetHeight),
				ease: 'none',
				scrollTrigger: {
					trigger: box.current,
					start: 'top 80%', // верх карточки дошёл до 80% экрана
					end: 'bottom 20%', // низ карточки дошёл до 20% экрана
					scrub: 0.5, // привязка к скроллу с лёгким сглаживанием
					invalidateOnRefresh: true,
				},
			});
		},
		{ scope: box },
	);

	return (
		<div ref={box} className='aspect-4/3 overflow-hidden bg-night-raised md:aspect-21/9'>
			{/* масштаб при наведении — на обёртке размером с окно: так увеличивается видимая часть,
			    а не весь высокий скрин от его центра, и transform картинки остаётся за GSAP */}
			<div className='size-full transition-[scale] duration-800 group-hover:scale-104'>
				<Image placeholder='blur' sizes={sizes} className='w-full h-auto' src={src} alt={alt} />
			</div>
		</div>
	);
}
