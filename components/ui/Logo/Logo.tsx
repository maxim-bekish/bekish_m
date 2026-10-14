import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

// знак «mb»: мягкая лигатура, последняя ножка «m» вырастает в «b»; грань — как у Card3D
// буквы красятся currentColor, грань — акцентом, поэтому знак следует за темой и кнопкой «Дизайн»
const FACE =
	'M4 56V37A13 13 0 0 1 30 37V56H20V37A3 3 0 0 0 14 37V56ZM20 56V37A13 13 0 0 1 46 37V56H36V37A3 3 0 0 0 30 37V56ZM36 8H46V56H36ZM46 24H52A16 16 0 0 1 52 56H46V46H52A6 6 0 0 0 52 34H46ZM72 46h10v10h-10Z';

// шаги грани от дальнего к ближнему, по 1 единице viewBox вправо-вниз
// ховер — нажатие клавиши, как у Keycap: грань 6 → 3 шага при наведении и 0 при клике, буквы съезжают в неё
const DEPTH = 6;
const steps = Array.from({ length: DEPTH }, (_, i) => DEPTH - i);
const press =
	'transition-[translate,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-active/logo:duration-75 motion-reduce:transition-none';
// в шапке буквы и грань лежат в разных слоях, поэтому грань слушает ховер ссылки .logo-link через header:has()
const faceMove =
	'group-hover/logo:translate-[3px] in-focus-visible:translate-[3px] group-active/logo:translate-[6px] in-[header:has(.logo-link:hover:not(:active))]:translate-[3px] in-[header:has(.logo-link:active)]:translate-[6px]';

type LogoProps = SVGProps<SVGSVGElement> & {
	/**
	 * full — знак целиком;
	 * face — только буквы;
	 * edge — только грань без букв (для шапки: буквы в слое с mix-blend-difference, грань — вне его)
	 */
	size?: 'sm' | 'md' | 'lg';
	part?: 'full' | 'face' | 'edge';
	/** подпись для скринридеров; без неё знак декоративный */
	title?: string;
};

export function Logo({ size = 'md', part = 'full', title, className, ...rest }: LogoProps) {
	const edge = (
		<g className='fill-accent'>
			{steps.map((k) => (
				<path
					key={k}
					d={FACE}
					transform={`translate(${k} ${k})`}
					className={cn(
						press,
						'group-active/logo:opacity-0 in-[header:has(.logo-link:active)]:opacity-0',
						k <= DEPTH / 2 &&
							'group-hover/logo:opacity-0 in-focus-visible:opacity-0 in-[header:has(.logo-link:hover:not(:active))]:opacity-0',
					)}
				/>
			))}
		</g>
	);

	const SIZES = {
		sm: 'h-5 md:h-7',
		md: 'h-9 md:h-12',
		lg: 'h-11 md:h-15',
	};

	return (
		<svg
			viewBox='4 8 84 54'
			className={cn('group/logo w-auto shrink-0 pointer-events-auto', SIZES[size], className)}
			role={title ? 'img' : undefined}
			aria-hidden={title ? undefined : true}
			{...rest}>
			{title && <title>{title}</title>}
			{part === 'full' && edge}
			{part === 'edge' && (
				<>
					{/* вырезаем буквы из грани, чтобы слой с difference не смешивался с акцентом */}
					<mask id='logo-cut' maskUnits='userSpaceOnUse' x='0' y='0' width='96' height='70'>
						<rect width='96' height='70' fill='white' />
						<path d={FACE} fill='black' className={cn(press, faceMove)} />
					</mask>
					<g mask='url(#logo-cut)'>{edge}</g>
				</>
			)}
			{part !== 'edge' && <path d={FACE} fill='currentColor' className={cn(press, faceMove)} />}
		</svg>
	);
}
