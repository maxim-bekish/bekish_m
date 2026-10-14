'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
	children: ReactNode;
	className?: string;
	/** пауза между соседними детьми, сек */
	stagger?: number;
	/** когда стартовать: верх обёртки дошёл до top% высоты экрана (100 — едва показался снизу) */
	top?: number;
};

// прямые дети выезжают снизу и проявляются по очереди, когда обёртка попадает на экран.
// Сама обёртка — обычный div, поэтому className (grid, flex) работает как раньше
export function Reveal({ children, className, stagger = 0.3, top = 80 }: Props) {
	const box = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

			gsap.from(box.current!.children, {
				y: 120,
				autoAlpha: 0,
				duration: 1.6,
				ease: 'power3.out',
				stagger,
				scrollTrigger: {
					trigger: box.current,
					start: `top ${top}%`,
					once: true,
				},
			});
		},
		{ dependencies: [top, stagger] },
	);

	return (
		<div ref={box} className={className}>
			{children}
		</div>
	);
}
