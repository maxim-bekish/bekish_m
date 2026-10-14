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

// скрины бывают от 1:1.4 до 1:8.6 — без ограничения длинные пролетают в разы быстрее коротких.
// Обрезаем «ленту» до одной высоты (в ширинах карточки): у всех превью одинаковый путь и скорость
const MAX_RATIO = 3;

// длинный скрин страницы в окне карточки: прогресс прокрутки скрина = положение карточки
// в видимой части экрана. Карточка только показалась снизу — виден верх скрина,
// ушла за верхний край — низ. У каждой карточки свой триггер, поэтому скроллятся независимо
export function PreviewImg({ src, alt, sizes }: Props) {
	const box = useRef<HTMLDivElement>(null);
	const screen = useRef<HTMLDivElement>(null);
	const ratio = Math.min(src.height / src.width, MAX_RATIO);

	useGSAP(
		() => {
			gsap.to(screen.current, {
				// функция, а не число: пересчитается при ресайзе. Короткий скрин (ниже окна) не двигается
				y: () => -Math.max(0, screen.current!.offsetHeight - box.current!.offsetHeight),
				ease: 'none',
				scrollTrigger: {
					trigger: box.current,
					start: 'top bottom', // верх карточки показался снизу экрана
					end: 'bottom top', // низ карточки ушёл за верх экрана
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
			    а не вся лента от её центра, и transform ленты остаётся за GSAP */}
			<div className='size-full transition-[scale] duration-800 group-hover:scale-104'>
				{/* лента высотой ratio × ширина, но не ниже окна: широкий скрин заполнит окно по cover */}
				<div ref={screen} className='relative w-full min-h-full' style={{ aspectRatio: 1 / ratio }}>
					<Image
						placeholder='blur'
						fill
						sizes={sizes}
						className='object-cover object-top'
						src={src}
						alt={alt}
					/>
				</div>
			</div>
		</div>
	);
}
