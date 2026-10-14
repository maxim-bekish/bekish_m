import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { text } from './Text.variants';

export type TextProps<T extends ElementType> = VariantProps<typeof text> & {
	as?: T;
	className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'color' | 'className'>;
