import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';
import { Text } from '@/components/ui/Text';
import { Download } from 'lucide-react';

const lineTextTwo = [
	{ value: 3, text: 'года в разработке' },
	{ value: 6, text: 'проектов в резюме' },
	{ value: 5, text: 'инструментов: Vue, Nuxt, React, Next.js, Astro' },
	{ value: 2, text: 'роли: дизайнер интерфейса и фронтенд' },
];

export default function About() {
	return (
		<section id='about' className='pt-(--section-y)'>
			<div className='border-y border-line '>
				<Reveal className='wrapper-xl grid grid-cols-2 tab:grid-cols-4 '>
					{lineTextTwo.map((item, i) => {
						return (
							<div
								key={item.text}
								className='py-12 px-7 border-r border-line last:border-r-0 flex flex-col w-full items-center'>
								<div>
									<Text variant='stat'>
										<CountUp value={item.value} />
									</Text>
									{i === 0 && (
										<Text
											as='span'
											color='accent'
											className='ml-2'
											variant='stat'>
											+
										</Text>
									)}
								</div>
								<Text variant='body' color='muted'>
									{item.text}
								</Text>
							</div>
						);
					})}
				</Reveal>
			</div>

			<Reveal className='grid grid-cols-1 flex-col py-(--section-y) md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] wrapper-xl items-start gap-x-16 gap-y-8 '>
				<div className='flex flex-col gap-4.5 w-fit'>
					<Text variant='section' className='whitespace-nowrap'>
						Обо мне
					</Text>

					<Text variant='caps' color='muted'>
						Фронтенд · Минск
					</Text>
				</div>
				<div className='flex flex-col gap-8 max-w-270'>
					<Text variant='lead'>
						Я фронтенд-разработчик и довожу интерфейс{' '}
						<em className='underline decoration-accent decoration-3 underline-offset-[.16em]'>
							от макета в Figma до продакшена
						</em>
						. На MentorAI был единственным фронтендом: сам спроектировал дизайн и сам
						собрал его на Nuxt. До этого писал на React и Next.js — в Neatsoft и на
						фрилансе.
					</Text>

					<Button icon={<Download />}>Резюме PDF</Button>
				</div>
			</Reveal>
		</section>
	);
}
