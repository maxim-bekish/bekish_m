import type { TextSize } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import type { ElementType } from 'react';

// satisfies: TS упадёт, если варианты разойдутся с textSizes из lib/utils
const variants = {
	'hero-letter': 'font-display text-hero-letter',
	display: 'font-display text-display',
	section: 'font-display text-section',
	hero: 'font-display text-hero',
	stat: 'font-display text-stat',
	lead: 'font-display text-lead',
	title: 'font-display text-title',
	caps: 'font-display text-caps uppercase',
	body: 'font-sans text-body',
	'body-sm': 'font-sans text-body-sm',
	terminal: 'font-mono text-terminal',
} satisfies Record<TextSize, string>;

export const text = cva('', {
	variants: {
		variant: variants,
		color: {
			inherit: '',
			ink: 'text-ink',
			muted: 'text-ink-muted',
			accent: 'text-accent',
			'on-accent': 'text-on-accent',
			'night-ink': 'text-night-ink',
			'night-soft': 'text-night-soft',
			'night-muted': 'text-night-muted',
		},
	},
	defaultVariants: {
		variant: 'body',
		color: 'inherit',
	},
});

export const defaultTag: Record<TextSize, ElementType> = {
	'hero-letter': 'span',
	display: 'h1',
	section: 'h2',
	hero: 'p',
	stat: 'span',
	lead: 'p',
	title: 'h3',
	caps: 'p',
	body: 'p',
	'body-sm': 'p',
	terminal: 'span',
};
