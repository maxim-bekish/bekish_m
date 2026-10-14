import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
	it('по умолчанию рендерит <p>', () => {
		render(<Text>Привет</Text>);
		const el = screen.getByText('Привет');
		expect(el.tagName).toBe('P');
	});

	it('variant="section" рендерит <h2>', () => {
		render(<Text variant='section'>Привет</Text>);
		const el = screen.getByText('Привет');
		expect(el.tagName).toBe('H2');
	});
	it('as="span" переопределяет тег', () => {
		render(
			<Text as='span' variant='section'>
				Привет
			</Text>,
		);
		const el = screen.getByText('Привет');
		expect(el.tagName).toBe('SPAN');
	});
	it('className из пропсов добавляется к классам варианта', () => {
		render(
			<Text className='my-class' variant='section'>
				Привет
			</Text>,
		);
		const el = screen.getByText('Привет');
		expect(el).toHaveClass('my-class', 'text-section');
	});
});
