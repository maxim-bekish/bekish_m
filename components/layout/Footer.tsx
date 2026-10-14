import { nav } from '@/domain/nav';
import NowTime from '../ui/NowTime';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';
import { Reveal } from '../ui/Reveal';
import { Logo } from '../ui/Logo';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className='overflow-hidden bg-night-raised pt-[clamp(24px,6vw,48px)] text-night-ink'>
			<Reveal className='wrapper-xl' top={95}>
				<ul className='flex flex-wrap justify-center gap-x-7 gap-y-1'>
					{nav.map((item) => {
						return (
							<li key={item.label}>
								<a
									className={cn(
										'inline-flex  items-center font-display text-caps uppercase text-night-ink hover:text-accent',
										!item.ready && 'opacity-30 pointer-events-none',
									)}
									href={item.href}>
									{item.label}
								</a>
							</li>
						);
					})}
				</ul>
				<div className='flex gap-4 mt-6 items-end'>
					<Text as='p' variant='caps' color='night-muted'>
						© 2026
					</Text>
					<Text as='p' variant='caps' color='night-muted'>
						ui kit
					</Text>
					<div className='flex-1 flex justify-center'>
						<Link href='/'>
							<Logo title='Максим Бекиш' />
						</Link>
					</div>
					<NowTime />
				</div>
			</Reveal>

			<Text
				as='p'
				variant='hero-letter'
				color='night-ink'
				aria-hidden='true'
				className='text-center mt-[clamp(20px,4vw,28px)] whitespace-nowrap translate-y-0.5 pointer-events-none'>
				Максим Бекиш
			</Text>
		</footer>
	);
}
