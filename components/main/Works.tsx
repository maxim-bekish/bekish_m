import { cn } from '@/lib/utils';
import { works } from '@/lib/works';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Badge from '../ui/Badge';
import { Text } from '@/components/ui/Text';
import { PreviewImg } from '../ui/PreviewImg';
import { Reveal } from '../ui/Reveal';
import { ViewTransition } from 'react';

export default function Works() {
	return (
		<section id='cases' className='py-(--section-y) wrapper-xl'>
			<Reveal className='mb-[clamp(36px,5vw,64px)] flex items-end justify-between gap-6'>
				<Text variant='section' className='whitespace-nowrap'>
					Работы
				</Text>
				<Text variant='caps' className='max-w-65' color='muted'>
					Коммерческие проекты и то, что делаю для себя
				</Text>
			</Reveal>
			<div className='grid grid-cols-1 gap-7 tab:grid-cols-2'>
				{works.map((el, i) => {
					return (
						<Reveal
							className={cn('group relative ', i === 0 && 'md:col-span-2')}
							key={el.id}>
							<Link href={`/work/${el.id}`} className='flex flex-col gap-4'>
								<ViewTransition
									name={`work-cover-${el.id}`}
									share='morph'
									default='none'>
									<PreviewImg
										src={el.preview.src}
										alt={el.preview.description}
										sizes={i === 0 ? '70vw' : '(min-width: 861px) 50vw, 100vw'}
									/>
								</ViewTransition>
								<div className='flex flex-col gap-2'>
									<div className='flex justify-between'>
										<ViewTransition
											name={`work-title-${el.id}`}
											share='morph'
											default='none'>
											<Text variant='title' className='whitespace-nowrap'>
												{el.title}
											</Text>
										</ViewTransition>

										<div className='flex flex-wrap justify-end gap-1.5'>
											{el.tags.map((item) => {
												return (
													<Badge key={el.id + item} size='sm'>
														{item}
													</Badge>
												);
											})}
										</div>
									</div>
									<Text color='muted' variant='body' className=' max-w-[36em]'>
										{el.description}
									</Text>
								</div>
								<span className='absolute top-4.5 right-4.5 flex items-center justify-center size-12 scale-0 rounded-full bg-accent text-on-accent group-hover:scale-100 transition-transform duration-400'>
									<ArrowUpRight strokeWidth={1.5} size={18} />
								</span>
							</Link>
						</Reveal>
					);
				})}
			</div>
		</section>
	);
}
