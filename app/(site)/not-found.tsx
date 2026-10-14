import Link from 'next/link';
import { Text } from '@/components/ui/Text';
import { ViewTransition } from 'react';

export default function NotFound() {
	return (
		<ViewTransition enter='page' exit='page' default='none'>
			<div className='wrapper-xl flex flex-1 flex-col items-center justify-center gap-6 '>
				<Text variant='display' color='accent'>
					404
				</Text>
				<Text variant='lead' color='muted'>
					Такой страницы нет
				</Text>
				<Text
					as={Link}
					href='/'
					variant='caps'
					color='ink'
					className='hover:text-accent hover:underline'>
					На главную
				</Text>
			</div>
		</ViewTransition>
	);
}
