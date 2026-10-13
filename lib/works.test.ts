import { describe, expect, it } from 'vitest';
import { works } from './works';

describe('works', () => {
	it('id уникальны: по ним строятся /work/[slug]', () => {
		const ids = works.map((w) => w.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it.each(works)('$id: годный slug, ссылка и теги', (work) => {
		expect(work.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
		expect(work.title.trim()).not.toBe('');
		expect(() => new URL(work.link)).not.toThrow();
		expect(work.tags.length).toBeGreaterThan(0);
	});
});
