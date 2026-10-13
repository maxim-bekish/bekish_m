import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
	it('склеивает и отбрасывает пустые значения', () => {
		expect(cn('a', false, undefined, 'b')).toBe('a b');
	});

	it('свой размер текста не съедает цвет текста', () => {
		// без extendTailwindMerge twMerge принял бы text-body за цвет и выкинул text-ink
		expect(cn('text-ink', 'text-body')).toBe('text-ink text-body');
	});

	it('последний размер текста побеждает', () => {
		expect(cn('text-body', 'text-title')).toBe('text-title');
	});
});
