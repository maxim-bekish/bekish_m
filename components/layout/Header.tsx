import BurgerMenu from './BurgerMenu';
import DesignPopover from './DesignPopover';
import { Logo } from '../ui/Logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const row = 'pointer-events-none fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-40';
const inner = 'wrapper-xl flex min-h-17 items-center gap-2.5';

export default function Header() {
	return (
		<header>
			<div
				className={`${row} text-night-ink mix-blend-difference [view-transition-name:site-header]`}>
				<div className={inner}>
					<Link
						href='/'
						className='logo-link pointer-events-auto mr-auto inline-flex min-h-11 items-center'>
						<Logo part='face' title='Максим Бекиш' />
					</Link>
					<BurgerMenu />
				</div>
			</div>
			<div className={cn(row, '[view-transition-name:site-header-plain]')}>
				<div className={inner}>
					<span aria-hidden className='mr-auto inline-flex min-h-11 items-center'>
						<Logo part='edge' className='pointer-events-none' />
					</span>
					<DesignPopover />
					<span aria-hidden className='size-11' />
				</div>
			</div>
		</header>
	);
}
