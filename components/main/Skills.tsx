'use client';

import { useTilt } from '@/hooks/useTilt';
import { cn } from '@/lib/utils';
import { Paperclip } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Reveal } from '../ui/Reveal';
import Badge from '../ui/Badge';

interface Skill {
	id: string;
	label: string;
	big: string;
	title: string;
	text: string;
}

interface Extra {
	title: string;
	text: string;
	href?: string;
}

const skills: Skill[] = [
	{
		id: 'vue',
		label: 'Vue 3 и Nuxt',
		big: 'Vue',
		title: 'Vue 3 и Nuxt',
		text: 'Один из двух основных стеков: Vue 3, Nuxt и TypeScript. Собираю интерфейс с нуля до продакшена: архитектура, компоненты, состояние на Pinia и Vuex, работа с API.',
	},
	{
		id: 'react',
		label: 'React и Next.js',
		big: 'React',
		title: 'React и Next.js',
		text: 'Второй основной стек: React, Next.js и TypeScript. SSR и SSG, роутинг, состояние на Redux Toolkit и Zustand, данные через TanStack Query.',
	},
	{
		id: 'motion',
		label: 'Анимации и графика',
		big: 'GSAP',
		title: 'GSAP и PixiJS',
		text: 'Делаю живые интерфейсы: анимации на скролле и сложные таймлайны на GSAP, интерактивная 2D-графика и карты на PixiJS.',
	},
	{
		id: 'perf',
		label: 'Производительность',
		big: '60fps',
		title: 'Скорость',
		text: 'Ленивая загрузка, разбиение бандла, оптимизация изображений и аккуратная работа с данными. Думаю о производительности с первого коммита, а не перед релизом.',
	},
	{
		id: 'layout',
		label: 'Вёрстка',
		big: '</>',
		title: 'Вёрстка',
		text: 'Адаптивная и кроссбраузерная вёрстка по БЭМ: от лендингов до интернет-магазинов, в том числе под интеграцию в 1С-Битрикс.',
	},
	{
		id: 'figma',
		label: 'Дизайн в Figma',
		big: 'Figma',
		title: 'Дизайн в Figma',
		text: 'Могу сам спроектировать интерфейс, если дизайнера нет, а потом без потерь перенести его в код.',
	},
	{
		id: 'testing',
		label: 'Тестирование',
		big: 'Tests',
		title: 'Тестирование',
		text: 'Пишу unit- и компонентные тесты на Vitest и Testing Library: проверяю рендер, пропсы и варианты компонентов, чтобы изменения не ломали то, что уже работает.',
	},
];

const extras: Extra[] = [
	{ title: 'ИИ в работе', text: 'Cursor и Claude забирают рутину, решения остаются за мной.' },

	{ title: 'Astro', text: 'Быстрые лендинги и контентные сайты без лишнего JS.' },
	{
		title: 'Стейт-менеджеры',
		text: 'Pinia, Vuex, Redux Toolkit, Zustand: выбираю под задачу, а не по привычке.',
	},
	{
		title: 'Лаборатория',
		text: 'Эксперименты с интерфейсами: лучше один раз увидеть',
		href: '/laboratory',
	},
];

export default function Skills() {
	const [activeId, setActiveId] = useState(skills[0].id);
	const active = skills.find((s) => s.id === activeId) ?? skills[0];
	const { ref: cardRef, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>();

	return (
		<section
			id='skills'
			className='bg-night-bg pb-(--section-y) xs:py-(--section-y) text-night-ink'>
			<Reveal className='wrapper-xl'>
				<Text variant='section' color='accent'>
					Что умею
				</Text>
				<Text variant='lead' color='night-soft' className='mt-2.5'>
					Наведите на пункт — карточка расскажет подробнее
				</Text>
			</Reveal>
			<Reveal className='mt-[clamp(40px,5vw,72px)] grid grid-cols-1 items-center gap-12 md:grid-cols-2 wrapper-xl'>
				{/* список навыков */}
				<ul className='border-t border-night-line '>
					{skills.map((skill) => {
						const isActive = skill.id === activeId;
						return (
							<li key={skill.id} className='border-b border-night-line'>
								<Text
									as='button'
									type='button'
									variant='title'
									aria-pressed={isActive}
									onMouseEnter={() => setActiveId(skill.id)}
									onFocus={() => setActiveId(skill.id)}
									onClick={() => setActiveId(skill.id)}
									className={cn(
										'flex min-h-18 w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-left transition-[color,padding] duration-350',
										'after:size-2.5 after:shrink-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300',
										isActive
											? 'pl-3.5 text-night-ink after:scale-100'
											: 'text-night-muted after:scale-0 hover:text-night-ink',
									)}>
									{skill.label}
								</Text>
							</li>
						);
					})}
				</ul>

				{/* объёмная карточка */}
				<div
					className='perspective-[1900px]'
					onPointerMove={onPointerMove}
					onPointerLeave={onPointerLeave}>
					<div
						ref={cardRef}
						aria-live='polite'
						className='relative flex min-h-70 flex-col bg-night-deep p-[clamp(24px,3vw,40px)] outline outline-accent shadow-extrude transform-3d transform-[rotateX(8deg)_rotateY(-14deg)] md:min-h-85'>
						<div
							key={active.id}
							className='flex flex-1 flex-col justify-between gap-6 transition-opacity duration-300 starting:opacity-0'>
							<Text
								as='p'
								variant='display'
								color='accent'
								aria-hidden
								className='translate-z-10'>
								{active.big}
							</Text>
							<div>
								<Text
									variant='title'
									color='night-ink'
									className='mb-2.5 translate-z-7.5'>
									{active.title}
								</Text>
								<Text variant='body' color='night-soft' className='translate-z-5'>
									{active.text}
								</Text>
							</div>
						</div>
					</div>
				</div>
			</Reveal>

			{/* «Это ещё не всё!» */}
			<Reveal className='mt-[clamp(72px,9vw,120px)] wrapper-xl'>
				<Text as='h3' variant='title' color='night-ink' className='mb-7'>
					Это ещё не всё!
				</Text>
				<ul className='grid grid-cols-1 gap-0.5 p-0.5 bg-night-line xs:grid-cols-2 md:grid-cols-4'>
					{extras.map((item) => {
						const content = (
							<>
								<Text
									as='h4'
									variant='title'
									color='night-ink'
									className={cn('mb-2 flex items-center gap-2')}>
									{item.title}
								</Text>
								<Text
									variant='body-sm'
									color='night-muted'
									className='transition-colors duration-300 group-hover:text-on-accent max-w-[95%]'>
									{item.text}
								</Text>
							</>
						);
						const cell =
							'block h-full bg-night-bg p-6 transition-colors duration-300 hover:bg-night-raised';

						return (
							<li key={item.title}>
								{item.href ? (
									<Link
										href={item.href}
										className={cn(
											cell,
											'group relative hover:bg-accent',
											item.href && 'opacity-50 pointer-events-none!',
										)}>
										{content}
										<Paperclip
											strokeWidth={2}
											size={20}
											className='absolute top-2 right-3 text-accent group-hover:text-on-accent'
										/>

										<Badge
											variant='default'
											size='sm'
											className='absolute bottom-2 right-2'>
											Скоро
										</Badge>
									</Link>
								) : (
									<div className={cn(cell)}>{content}</div>
								)}
							</li>
						);
					})}
				</ul>
			</Reveal>
		</section>
	);
}
