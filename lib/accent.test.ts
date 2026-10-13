import { describe, expect, it } from 'vitest';
import {
	ACCENT_KEY,
	accentInitScript,
	applyAccent,
	onAccentFor,
	presetHex,
	readAccent,
	resetAccent,
} from './accent';

const DARK_TEXT = '#0b0b0b';
const LIGHT_TEXT = '#f2eee6';
const style = () => document.documentElement.style;

describe('onAccentFor', () => {
	it('на светлом акценте — тёмный текст', () => {
		expect(onAccentFor('#ffffff')).toBe(DARK_TEXT);
		expect(onAccentFor('#ffe14d')).toBe(DARK_TEXT);
	});

	it('на тёмном акценте — светлый текст', () => {
		expect(onAccentFor('#000000')).toBe(LIGHT_TEXT);
		expect(onAccentFor('#1a237e')).toBe(LIGHT_TEXT);
	});

	it('короткий hex считается так же, как полный', () => {
		expect(onAccentFor('#f43')).toBe(onAccentFor('#ff4433'));
		expect(onAccentFor('#fff')).toBe(DARK_TEXT);
	});
});

describe('applyAccent', () => {
	it('ставит переменные на <html> и сохраняет выбор', () => {
		applyAccent('#000000', 'red');

		expect(style().getPropertyValue('--accent')).toBe('#000000');
		expect(style().getPropertyValue('--on-accent')).toBe(LIGHT_TEXT);
		expect(readAccent()).toEqual({ code: 'red', accent: '#000000', onAccent: LIGHT_TEXT });
	});

	it('без кода сохраняет как custom', () => {
		applyAccent('#ffffff');
		expect(readAccent()?.code).toBe('custom');
	});
});

describe('resetAccent', () => {
	it('убирает переменные и сохранённый цвет', () => {
		applyAccent('#ffffff', 'lime');
		resetAccent();

		expect(style().getPropertyValue('--accent')).toBe('');
		expect(style().getPropertyValue('--on-accent')).toBe('');
		expect(localStorage.getItem(ACCENT_KEY)).toBeNull();
	});
});

describe('readAccent', () => {
	it('null, если ничего не сохранено', () => {
		expect(readAccent()).toBeNull();
	});

	it('null, если в хранилище мусор', () => {
		localStorage.setItem(ACCENT_KEY, '{oops');
		expect(readAccent()).toBeNull();
	});
});

describe('presetHex', () => {
	it('читает пресет из CSS и разворачивает короткий hex', () => {
		style().setProperty('--preset-red', ' #f43 ');
		expect(presetHex('red')).toBe('#ff4433');
	});
});

describe('accentInitScript', () => {
	const run = () => new Function(accentInitScript)();

	it('восстанавливает сохранённый цвет до гидрации', () => {
		localStorage.setItem(
			ACCENT_KEY,
			JSON.stringify({ code: 'sky', accent: '#00aaff', onAccent: DARK_TEXT }),
		);
		run();

		expect(style().getPropertyValue('--accent')).toBe('#00aaff');
		expect(style().getPropertyValue('--on-accent')).toBe(DARK_TEXT);
	});

	it('не падает и ничего не ставит при битом значении', () => {
		localStorage.setItem(ACCENT_KEY, '{oops');
		expect(run).not.toThrow();
		expect(style().getPropertyValue('--accent')).toBe('');
	});
});
