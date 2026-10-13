import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type Transition = {
	ready: Promise<void>;
	finished: Promise<void>;
	skipTransition: ReturnType<typeof vi.fn>;
	finish: () => void;
};

const html = document.documentElement;

function mockMatchMedia(reduced: boolean) {
	vi.stubGlobal('matchMedia', (query: string) => ({ matches: reduced, media: query }));
}

// startViewTransition, который сразу зовёт update и отдаёт управляемый переход
function mockViewTransition() {
	const transitions: Transition[] = [];
	const start = vi.fn((update: () => void) => {
		update();
		let finish!: () => void;
		const finished = new Promise<void>((resolve) => (finish = resolve));
		const t: Transition = { ready: Promise.resolve(), finished, skipTransition: vi.fn(), finish };
		transitions.push(t);
		return t;
	});
	Object.defineProperty(document, 'startViewTransition', { value: start, configurable: true });
	html.animate = vi.fn();
	return { start, transitions };
}

// модуль помнит текущий переход — каждому тесту свежий экземпляр
async function load() {
	vi.resetModules();
	return (await import('./circularReveal')).circularReveal;
}

const animateCall = () => {
	const [keyframes, options] = vi.mocked(html.animate).mock.calls[0];
	return { clipPath: (keyframes as { clipPath: string[] }).clipPath, options };
};

beforeEach(() => mockMatchMedia(false));

afterEach(() => {
	vi.unstubAllGlobals();
	delete (document as Partial<Document>).startViewTransition;
	html.className = '';
});

describe('circularReveal', () => {
	it('без View Transitions просто применяет изменение', async () => {
		const circularReveal = await load();
		const update = vi.fn();
		circularReveal(update);
		expect(update).toHaveBeenCalledOnce();
	});

	it('при prefers-reduced-motion обходится без анимации', async () => {
		mockMatchMedia(true);
		const { start } = mockViewTransition();
		const circularReveal = await load();
		const update = vi.fn();

		circularReveal(update);

		expect(update).toHaveBeenCalledOnce();
		expect(start).not.toHaveBeenCalled();
	});

	it('раскрывает круг из центра origin и снимает классы в конце', async () => {
		const { transitions } = mockViewTransition();
		const circularReveal = await load();
		const origin = document.createElement('button');
		origin.getBoundingClientRect = () =>
			({ left: 10, top: 20, width: 20, height: 20 }) as DOMRect;

		circularReveal(vi.fn(), origin);
		expect(html).toHaveClass('vt-reveal');
		expect(html).not.toHaveClass('vt-reverse');

		await vi.waitFor(() => expect(html.animate).toHaveBeenCalled());
		const { clipPath, options } = animateCall();
		expect(clipPath[0]).toBe('circle(0px at 20px 30px)');
		expect(options).toMatchObject({ pseudoElement: '::view-transition-new(root)' });

		transitions[0].finish();
		await vi.waitFor(() => expect(html).not.toHaveClass('vt-reveal'));
	});

	it('reverse сворачивает старое состояние', async () => {
		mockViewTransition();
		const circularReveal = await load();

		circularReveal(vi.fn(), null, { reverse: true });
		expect(html).toHaveClass('vt-reverse');

		await vi.waitFor(() => expect(html.animate).toHaveBeenCalled());
		const { clipPath, options } = animateCall();
		expect(clipPath[1]).toMatch(/^circle\(0px/);
		expect(options).toMatchObject({ pseudoElement: '::view-transition-old(root)' });
	});

	it('новый клик обрывает прошлый переход, и тот не снимает чужие классы', async () => {
		const { transitions } = mockViewTransition();
		const circularReveal = await load();

		circularReveal(vi.fn());
		circularReveal(vi.fn());
		expect(transitions[0].skipTransition).toHaveBeenCalledOnce();

		transitions[0].finish();
		await new Promise((r) => setTimeout(r));
		expect(html).toHaveClass('vt-reveal');

		transitions[1].finish();
		await vi.waitFor(() => expect(html).not.toHaveClass('vt-reveal'));
	});
});
