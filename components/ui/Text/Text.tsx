import { cn } from '@/lib/utils';
import type { ElementType } from 'react';
import type { TextProps } from './Text.types';
import { defaultTag, text } from './Text.variants';

export function Text<T extends ElementType = 'p'>({
	as,
	variant,
	color,
	className,
	...props
}: TextProps<T>) {
	const Tag = as ?? defaultTag[variant ?? 'body'];
	return <Tag className={cn(text({ variant, color }), className)} {...props} />;
}
