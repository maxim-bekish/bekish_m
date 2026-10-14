import type { Metadata } from 'next';
import { Text } from '@/components/ui/Text';
import { works } from '@/lib/works';
import { SITE_NAME, SITE_TITLE } from '@/lib/site';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Paperclip } from 'lucide-react';
import { ReactNode, ViewTransition } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
// только slug из списка работ, остальные — 404
export const dynamicParams = false;

export function generateStaticParams() {
	return works.map((work) => ({ slug: work.id }));
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
	const { slug } = await params;
	const work = works.find((w) => w.id === slug);
	if (!work) return {};

	const title = `Кейс ${work.title}`;
	const description = work.description.replace(/\s*\n\s*/g, ' ');
	return {
		title,
		description,
		alternates: { canonical: `/work/${work.id}` },
		// openGraph страницы заменяет родительский целиком — общую картинку превью указываем заново
		openGraph: {
			type: 'article',
			locale: 'ru_RU',
			siteName: SITE_NAME,
			title,
			description,
			url: `/work/${work.id}`,
			images: { url: '/opengraph-image', width: 1200, height: 630, alt: SITE_TITLE },
		},
	};
}

function CaseSection({
	title,
	children,
	className,
}: {
	title: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				'grid grid-cols-1 gap-x-16 gap-y-6 border-b border-night-line py-[clamp(56px,8vw,110px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)]',
				className,
			)}>
			<Text variant='section' color='accent'>
				{title}
			</Text>
			{children}
		</div>
	);
}

export default async function Work({ params }: PageProps<'/work/[slug]'>) {
	const { slug } = await params;
	const work = works.find((w) => w.id === slug);
	if (!work) notFound();

	return (
		<ViewTransition enter='page' exit='page' default='none'>
			<section className='wrapper-xl py-(--section-y)'>
				<div className='flex flex-col mb-[clamp(36px,5vw,64px)]'>
					<Text variant='display'>{work.title} </Text>
					<Text
						variant='lead'
						color='night-soft'
						className='ml-auto max-w-[26em] whitespace-break-spaces'>
						{work.description}
					</Text>
				</div>
				<div>
					<div className='relative overflow-hidden rounded-t-[12px] border  border-night-line bg-night-raised shadow-browser max-h-[60svh]'>
						<div
							className='flex h-10 items-center gap-2 border-b border-night-ink/15 px-4'
							aria-hidden='true'>
							<i className='size-2.5 rounded-full bg-night-line'></i>
							<i className='size-2.5 rounded-full bg-night-line'></i>
							<i className='size-2.5 rounded-full bg-night-line'></i>

							<Text
								as='a'
								href={work.link}
								target='_blank'
								rel='noopener'
								className='ml-3 rounded-md bg-night-bg px-3 py-1 hover:text-accent'
								variant='caps'
								color='muted'>
								{new URL(work.link).hostname}
							</Text>
						</div>
						<Image
							sizes={'100vw'}
							className='w-full  object-contain '
							src={work.preview.src}
							alt={work.preview.description}
						/>
					</div>
					<dl className='grid grid-cols-2 border-b border-night-line md:grid-cols-[minmax(25%,1fr)_minmax(33%,max-content)_minmax(25%,1fr)]'>
						<div className='py-6 pr-5'>
							<Text as='dt' variant='caps' color='muted' className='mb-1.5  '>
								Роль
							</Text>
							<Text as='dd' variant='body' color='night-ink' className='mb-1.5  '>
								{work.role.join(', ')}
							</Text>
						</div>

						<div className='order-first col-span-2 border-b border-night-line py-6 pr-5 md:order-0 md:col-span-1 md:border-b-0 md:border-l md:pl-5'>
							<Text as='dt' variant='caps' color='muted' className='mb-1.5  '>
								Стек
							</Text>
							<Text as='dd' variant='body' color='night-ink' className='mb-1.5  '>
								{work.stack.join(', ')}
							</Text>
						</div>
						<a
							href={work.link}
							target='_blank'
							rel='noopener'
							className='border-l border-night-line py-6 pr-5 pl-5 group hover:bg-accent'>
							<Text
								as='dt'
								variant='caps'
								color='muted'
								className='mb-1.5 flex justify-between  group-hover:text-on-accent'>
								Сайт
								<Paperclip
									strokeWidth={1.5}
									size={18}
									className='text-accent group-hover:text-on-accent'
								/>
							</Text>
							<Text as='dd' variant='body' className='mb-1.5   '>
								Перейти на сайт
							</Text>
						</a>
					</dl>
				</div>
				<CaseSection title='Задача'>
					<Text variant='body' color='night-soft' className='mb-4 max-w-[36em]  '>
						{work.task}
					</Text>
				</CaseSection>
				<CaseSection title='Что сделал' className='border-b-0'>
					<ul>
						{work.myTasks.map((item, i) => {
							return (
								<Text
									key={i}
									as='li'
									variant='body'
									color='night-soft'
									className='grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-t border-night-ink/12 py-4 font-sans text-body text-night-soft [counter-increment:d] before:pt-[3px] before:font-display before:text-caps before:text-accent before:content-[counter(d,decimal-leading-zero)]'>
									{item}
								</Text>
							);
						})}
					</ul>
				</CaseSection>
				<div className='grid gap-[clamp(16px,2vw,28px)] md:grid-cols-2'>
					{work.images.map((item, i) => {
						return (
							<figure key={i} className=''>
								<div className='rounded-[12px] border border-night-line bg-night-raised p-2.5'>
									<Image
										sizes='70vw'
										className='w-full  object-contain '
										src={item.src}
										alt={item.description}
									/>
								</div>
								<figcaption className='mt-3 flex justify-between gap-3'>
									<span className='font-display text-caps uppercase text-night-muted'>
										{item.description}
									</span>
									<span className='font-display text-caps uppercase text-night-muted'>
										0{i + 1}
									</span>
								</figcaption>
							</figure>
						);
					})}
				</div>
				<Link href='/#cases' className='flex w-fit ml-auto gap-2 group md:mt-20 mt-10 '>
					<Text variant='section' className='group-hover:text-accent'>
						Назад
					</Text>
					<Text variant='section' color='accent'>
						.
					</Text>
				</Link>
			</section>
		</ViewTransition>
	);
}
