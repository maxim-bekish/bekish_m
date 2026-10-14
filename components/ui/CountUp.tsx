'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
	value: number;
	/** длительность в секундах */
	duration?: number;
};

// число растёт от 0 до value, когда попадает на экран. В HTML с сервера сразу итоговое значение —
// его видят поисковики и пользователи без JS, а 0 ставим уже на клиенте
export function CountUp({ value, duration = 1 }: Props) {
	const el = useRef<HTMLSpanElement>(null);

	useGSAP(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const counter = { n: 0 };
		el.current!.textContent = '0';
		gsap.to(counter, {
			n: value,
			duration,
			ease: 'power1.out',
			onUpdate: () => {
				el.current!.textContent = String(Math.round(counter.n));
			},
			scrollTrigger: {
				trigger: el.current,
				start: 'top 90%', // число поднялось на 10% от низа экрана
				once: true,
			},
		});
	});

	// tabular-nums — цифры одной ширины, чтобы при счёте не дёргалась вёрстка
	return (
		<span ref={el} className='tabular-nums'>
			{value}
		</span>
	);
}
