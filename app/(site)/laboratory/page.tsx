/**
 * Лаборатория: всё дерево демо одним массивом.
 * Источник: макет v30 (https://claude.ai/artifact/Sc8YNAGxtqJZHmrkGpZ2bq#lab).
 * Из этого массива строятся и рабочий стол (>=768px), и бенто (<768px).
 *
 * Иконки: имена из Lucide (lucide-react). glyph — символ, который сейчас стоит в макете.
 * hue — оттенок градиента плитки/иконки демо (hsl), как в макете.
 */

// export type LabStatus = 'live' | 'soon';

// export type LabDemo = {
// 	type: 'demo';
// 	id: string;
// 	title: string;
// 	/** подпись категории на плитке и в заголовке окна */
// 	tag: string;
// 	description: string;
// 	/** стек одной строкой, мелко под описанием */
// 	stack: string;
// 	href: string;
// 	icon: string;
// 	glyph: string;
// 	hue: number;
// 	/** размер плитки в бенто: w2 — на 2 колонки, h2 — на 2 ряда */
// 	size?: 'w2' | 'h2' | 'w2 h2';
// 	status: LabStatus;
// };

// export type LabSoon = {
// 	type: 'soon';
// 	id: string;
// 	title: string;
// 	status: 'soon';
// };

// export type LabFolder = {
// 	type: 'folder';
// 	id: string;
// 	title: string;
// 	icon: 'Folder';
// 	children: LabNode[];
// };

// export type LabNode = LabFolder | LabDemo | LabSoon;

// export const LAB: LabNode[] = [
// 	{
// 		type: 'folder',
// 		id: 'games',
// 		title: 'Игры',
// 		icon: 'Folder',
// 		children: [
// 			{
// 				type: 'folder',
// 				id: 'casino',
// 				title: 'Казино',
// 				icon: 'Folder',
// 				children: [
// 					{
// 						type: 'demo',
// 						id: 'slot',
// 						title: 'Слот 5×3',
// 						tag: 'Казино',
// 						description: 'Барабаны 5×3, взвешенные символы, размытие при вращении.',
// 						stack: 'Canvas · crypto RNG',
// 						href: '/games#slot',
// 						icon: 'Cherry',
// 						glyph: '7',
// 						hue: 18,
// 						size: 'w2 h2',
// 						status: 'live',
// 					},
// 					{
// 						type: 'demo',
// 						id: 'crash',
// 						title: 'Crash',
// 						tag: 'Казино',
// 						description: 'Растущий множитель и проверяемая честность раунда.',
// 						stack: 'Provably fair',
// 						href: '/games#crash',
// 						icon: 'TrendingUp',
// 						glyph: '↗',
// 						hue: 350,
// 						size: 'h2',
// 						status: 'live',
// 					},
// 					{
// 						type: 'demo',
// 						id: 'plinko',
// 						title: 'Plinko',
// 						tag: 'Казино',
// 						description: 'Шарик летит через 12 рядов пинов на настоящей физике.',
// 						stack: 'matter-js',
// 						href: '/games#plinko',
// 						icon: 'CircleDot',
// 						glyph: '◉',
// 						hue: 45,
// 						status: 'live',
// 					},
// 				],
// 			},
// 			{
// 				type: 'demo',
// 				id: 'bugs',
// 				title: 'Bug Smash',
// 				tag: 'Игры',
// 				description: 'Ловите баги, пока они не ушли в прод. Рекорды сохраняются.',
// 				stack: 'Canvas · рекорды',
// 				href: '/games#bugs',
// 				icon: 'Bug',
// 				glyph: '🐞',
// 				hue: 130,
// 				status: 'live',
// 			},
// 			{
// 				type: 'demo',
// 				id: 'runner',
// 				title: 'Deploy Runner',
// 				tag: 'Игры',
// 				description: 'Раннер: перепрыгивайте упавшие тесты.',
// 				stack: 'Canvas · рекорды',
// 				href: '/games#runner',
// 				icon: 'Rocket',
// 				glyph: '▶',
// 				hue: 200,
// 				size: 'w2',
// 				status: 'live',
// 			},
// 		],
// 	},
// 	{
// 		type: 'folder',
// 		id: 'tests',
// 		title: 'Тесты',
// 		icon: 'Folder',
// 		children: [
// 			{
// 				type: 'demo',
// 				id: 'quiz-cat',
// 				title: 'Какой ты кот?',
// 				tag: 'Тесты',
// 				description:
// 					'Шуточный тест на 7 вопросов: четыре типа вопросов, итог с процентами.',
// 				stack: 'Движок тестов',
// 				href: '/lab/quiz/cat',
// 				icon: 'Cat',
// 				glyph: '🐈',
// 				hue: 300,
// 				size: 'w2',
// 				status: 'live',
// 			},
// 			{ type: 'soon', id: 'quiz-meme', title: 'Какой ты мем?', status: 'soon' },
// 			{ type: 'soon', id: 'quiz-bug', title: 'Какой ты баг?', status: 'soon' },
// 			{ type: 'soon', id: 'quiz-framework', title: 'Какой ты фреймворк?', status: 'soon' },
// 		],
// 	},
// 	{
// 		type: 'folder',
// 		id: 'ui',
// 		title: 'UI',
// 		icon: 'Folder',
// 		children: [
// 			{
// 				type: 'demo',
// 				id: 'btn',
// 				title: 'Кнопка',
// 				tag: 'UI',
// 				description: 'Варианты, размеры, состояния и пресеты акцента этого сайта.',
// 				stack: 'cva · CSS-переменные',
// 				href: '/ui/btn',
// 				icon: 'RectangleHorizontal',
// 				glyph: '◧',
// 				hue: 30,
// 				status: 'live',
// 			},
// 			{ type: 'soon', id: 'input', title: 'Инпуты', status: 'soon' },
// 			{ type: 'soon', id: 'select', title: 'Селекты', status: 'soon' },
// 			{ type: 'soon', id: 'modal', title: 'Модалки', status: 'soon' },
// 		],
// 	},

// 	{
// 		type: 'demo',
// 		id: 'dash',
// 		title: 'Дашборд',
// 		tag: 'Интерфейсы',
// 		description: 'Панель оператора: KPI, график GGR, лента ставок в реальном времени.',
// 		stack: 'SVG · live-данные',
// 		href: '/lab/dashboard',
// 		icon: 'LayoutDashboard',
// 		glyph: '▤',
// 		hue: 220,
// 		size: 'w2',
// 		status: 'live',
// 	},
// 	{
// 		type: 'demo',
// 		id: 'ai',
// 		title: 'AI-чат',
// 		tag: 'Интерфейсы',
// 		description: 'Спросите о моём опыте, ответ печатается потоком.',
// 		stack: 'Стриминг',
// 		href: '/lab/ai',
// 		icon: 'Sparkles',
// 		glyph: '✦',
// 		hue: 265,
// 		status: 'live',
// 	},
// 	{
// 		type: 'demo',
// 		id: 'i18n',
// 		title: 'Языки и валюты',
// 		tag: 'Интерфейсы',
// 		description: 'Окно выигрыша на четырёх языках, с RTL для арабского.',
// 		stack: 'Intl · RTL',
// 		href: '/lab/i18n',
// 		icon: 'Languages',
// 		glyph: '文',
// 		hue: 170,
// 		status: 'live',
// 	},
// ];

// /* ---------- помощники ---------- */

// /** все демо плоским списком (для бенто, sitemap, поиска) */
// export function flatDemos(nodes: LabNode[] = LAB): LabDemo[] {
// 	return nodes.flatMap((n) =>
// 		n.type === 'folder' ? flatDemos(n.children) : n.type === 'demo' ? [n] : [],
// 	);
// }

// /** сколько живых демо и планов в папке, с вложенными (бейдж на иконке, подвал окна) */
// export function countFolder(folder: LabFolder): { live: number; soon: number } {
// 	return folder.children.reduce(
// 		(acc, n) => {
// 			if (n.type === 'folder') {
// 				const c = countFolder(n);
// 				return { live: acc.live + c.live, soon: acc.soon + c.soon };
// 			}
// 			return n.type === 'soon'
// 				? { ...acc, soon: acc.soon + 1 }
// 				: { ...acc, live: acc.live + 1 };
// 		},
// 		{ live: 0, soon: 0 },
// 	);
// }

// /** путь до папки по id, для хлебных крошек «Игры / Казино» */
// export function folderPath(
// 	id: string,
// 	nodes: LabNode[] = LAB,
// 	trail: LabFolder[] = [],
// ): LabFolder[] | null {
// 	for (const n of nodes) {
// 		if (n.type !== 'folder') continue;
// 		const next = [...trail, n];
// 		if (n.id === id) return next;
// 		const found = folderPath(id, n.children, next);
// 		if (found) return found;
// 	}
// 	return null;
// }

export default function Laboratory() {
	return <div className='py-(--section-y) wrapper-xl h-screen'>laboratory</div>;
}
