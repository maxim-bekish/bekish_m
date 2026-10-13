import type { StaticImageData } from 'next/image';
import mentorAiPreview from '@/assets/works/mentor-ai/preview.avif';
import mentorAi1 from '@/assets/works/mentor-ai/1.avif';
import mentorAi2 from '@/assets/works/mentor-ai/2.avif';
import mentorAi3 from '@/assets/works/mentor-ai/3.avif';
import mentorAi4 from '@/assets/works/mentor-ai/4.avif';
import mentorAi5 from '@/assets/works/mentor-ai/5.avif';
import a5LeasingPreview from '@/assets/works/a5-leasing/preview.avif';
import a5Leasing1 from '@/assets/works/a5-leasing/1.avif';
import a5Leasing2 from '@/assets/works/a5-leasing/2.avif';
import a5Leasing3 from '@/assets/works/a5-leasing/3.avif';
import zelectronicPreview from '@/assets/works/zelectronic/preview.avif';
import zelectronic1 from '@/assets/works/zelectronic/1.avif';
import zelectronic2 from '@/assets/works/zelectronic/2.avif';
import zelectronic3 from '@/assets/works/zelectronic/3.avif';

type Image = { src: StaticImageData; description: string };

export interface Work {
	id: string;
	title: string;
	role: string[];
	stack: string[];
	task: string;
	myTasks: string[];
	description: string;
	link: string;
	preview: Image;
	images: Image[];
	tags: string[];
}

export const works: Work[] = [
	{
		id: 'mentor-ai',
		title: 'MentorAI',
		role: ['Frontend', 'Designer'],
		stack: [
			'Vue',
			'Nuxt',
			'TypeScript',
			'Tailwind CSS',
			'Pinia',
			'TanStack Query',
			'Zod',
			'VueUse',
			'Vue Flow',
			'KaTeX',
			'shadcn-vue',
			'Lucide',
			'PWA',
			'REST API',
			'Docker',
		],
		task: 'MentorAI — образовательная платформа с ИИ для учителей и учеников. Учителю она помогает проверять письменные работы, готовить планы уроков, рабочие листы, контрольные и презентации, экономя до 15 часов в неделю на рутине. Ученику даёт интерактивные курсы с видеоуроками, конспектами и тестами и ИИ-наставника, которому можно задать вопрос по теме. Нужен был лендинг, объясняющий продукт, и веб-приложение с двумя кабинетами, в котором и учитель, и школьник разберутся без подготовки.',
		myTasks: [
			'Спроектировал интерфейс в Figma: лендинг, чат, кабинеты учителя и ученика.',
			'Собрал лендинг и приложение на Nuxt 4, Vue 3 и TypeScript в одной кодовой базе.',
			'Сделал два режима в одном приложении: переключатель «Ученик / Учитель» с отдельными сценариями и набором инструментов для каждой роли.',
			'Для учителя: инструменты проверки работ, создания планов уроков, рабочих листов, контрольных, а также редактор презентаций с ИИ-ассистентом.',
			'Для ученика: карта курса на Vue Flow с поэтапным открытием модулей и страница урока с видео, лекцией, конспектом, тестом и чатом с ИИ по теме.',
			'Чат с тремя режимами модели («Обучающая», «Размышляющая», «Проверка») и историей диалогов.',
			'Рендер ответов модели: заголовки, списки, таблицы и формулы через KaTeX.',
			'Голосовой ввод и режим подготовки к ОГЭ/ЕГЭ в поле запроса.',
		],
		description:
			"Образовательная ИИ-платформа:\nучителю — проверка работ, планы уроков и контрольные за минуты, ученику — курсы и ИИ-наставник.",
		link: 'https://mentor-ai.ru',
		preview: {
			src: mentorAiPreview,
			description: 'Лендинг MentorAI',
		},
		images: [
			{
				src: mentorAi1,
				description: 'Кабинет учителя: главный экран с инструментами',
			},
			{
				src: mentorAi2,
				description: 'Чат с ИИ: ответ с таблицами',
			},
			{
				src: mentorAi3,
				description: 'Редактор презентаций с ИИ-ассистентом',
			},
			{
				src: mentorAi4,
				description: 'Кабинет ученика: карта курса',
			},
			{
				src: mentorAi5,
				description: 'Кабинет ученика: урок с видео и чатом с ИИ',
			},
		],
		tags: ['Vue', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
	},
	{
		id: 'a5-leasing',
		title: 'А5 Лизинг',
		role: ['Frontend'],
		stack: ['HTML', 'SCSS', 'JavaScript', 'jQuery', 'Swiper', 'Адаптивная вёрстка'],
		task: 'А5 — лизинговая компания из Тюмени и Нижнего Новгорода: лизинг транспорта, спецтехники, оборудования, медицинской техники, IT и недвижимости для бизнеса. Агентство «Негодяев маркетинг» привлекло меня на фронтенд корпоративного сайта. Сайт должен был понятно объяснять, как устроен лизинг, давать предварительный расчёт сделки прямо на странице и вести клиента к заявке. Интеграцию в 1С-Битрикс выполнял бэкенд-разработчик агентства.',
		myTasks: [
			'Сверстал адаптивный фронтенд с нуля: главную, страницы программ лизинга, каталог техники и клиентские разделы.',
			'Сделал лизинговый калькулятор на jQuery: слайдеры стоимости, аванса и срока с пересчётом ежемесячного платежа, возврата НДС и суммы договора в реальном времени.',
			'Собрал слайдеры и карусели на Swiper: главный баннер с программами, блоки программ лизинга.',
			'Реализовал табы программ лизинга, таймлайн этапов сделки и FAQ-аккордеон с разбивкой по категориям.',
			'Сделал модальные формы заявок с выбором темы обращения («Консультация», «Бухгалтерия», «Коммерческое предложение», «Стать партнёром») и экраном успешной отправки.',
			'Сверстал cookie-баннер с настройками: включение и отключение аналитики Яндекс.Метрики.',
			'Выстроил модульную SCSS-архитектуру, мега-меню и мобильную навигацию.',
			'Подготовил вёрстку к натяжке на 1С-Битрикс в связке с бэкенд-разработчиком.',
		],
		description:
			'Корпоративный сайт лизинговой компании: программы лизинга, интерактивный калькулятор сделки и формы заявок.',
		link: 'https://a5-leasing.ru',
		preview: {
			src: a5LeasingPreview,
			description: 'Главная страница А5 Лизинг',
		},
		images: [
			{
				src: a5Leasing1,
				description: 'Страница программы «Грузовой транспорт»',
			},
			{
				src: a5Leasing2,
				description: 'Лизинговый калькулятор',
			},
			{
				src: a5Leasing3,
				description: 'Каталог изъятой техники с фильтрами',
			},
		],
		tags: ['jQuery', 'SCSS', 'Swiper'],
	},
	{
		id: 'zelectronic',
		title: 'ZELECTRONIC',
		role: ['Frontend'],
		stack: ['HTML', 'CSS', 'JavaScript', 'БЭМ', 'Swiper', '1C-Bitrix'],
		task: 'ZELECTRONIC — сеть комиссионных магазинов электроники на Дальнем Востоке: продажа новой, б/у и уценённой техники, скупка и trade-in. Проект пришёл в работу уже запущенным, с накопившимися проблемами вёрстки. Нужно было привести фронтенд в порядок, не останавливая работу магазина, и параллельно развивать сайт новыми страницами. [Уточните, что было самым сложным]',
		myTasks: [
			'Взял на себя фронтенд работающего интернет-магазина: аудит и исправление сломанной вёрстки и адаптива.',
			'Сверстал новые страницы и блоки под задачи бизнеса по БЭМ.',
			'Передавал готовую вёрстку Bitrix-разработчику для интеграции в шаблоны и сопровождал её до продакшена.',
			'Отвечал за качество фронтенда: кроссбраузерность, адаптив, единообразие интерфейса.',
		],
		description:
			'Интернет-магазин сети комиссионных магазинов электроники: поддержка, исправление вёрстки и новые страницы на 1C-Bitrix.',
		link: 'https://zelectronic.ru',
		preview: {
			src: zelectronicPreview,
			description: 'Главная: каталог, лента поступлений и баннеры скупки',
		},
		images: [
			{
				src: zelectronic1,
				description: 'Корзина с разделением заказа по точкам самовывоза',
			},
			{
				src: zelectronic2,
				description: 'Карточка товара с выбором гарантии и результатами диагностики',
			},
			{
				src: zelectronic3,
				description: 'Магазины сети на Яндекс Картах',
			},
		],
		tags: ['JavaScript', 'БЭМ', 'Swiper', '1C-Bitrix'],
	},
	// {
	// 	id: 'soberizabor',
	// 	title: 'Собери забор',
	// 	description: 'Лендинг алюминиевых ограждений с онлайн-калькулятором стоимости',
	// 	link: 'https://soberizabor.ru/',
	// 	image: 'https://picsum.photos/id/10/400/200',
	// 	tags: ['Astro', 'HTML', 'CSS', 'JavaScript'],
	// },
	// {
	// 	id: 'photographer-portfolio',
	// 	title: 'Сайт фотографа',
	// 	description: 'Портфолио фотографа с галереями работ',
	// 	link: 'https://photo-two-eta.vercel.app/',
	// 	image: 'https://picsum.photos/id/10/400/200',
	// 	tags: ['React', 'Next.js', 'TypeScript', 'GSAP'],
	// },
	// {
	// 	id: 'ranepa-campus',
	// 	title: 'РАНХиГС',
	// 	description: 'Система управления кампусом',
	// 	link: 'https://demo.campus.ranepa.ru/sign-in/secret-link',
	// 	image: 'https://picsum.photos/id/10/400/200',
	// 	tags: ['Nuxt', 'TypeScript', 'SCSS', 'PixiJS'],
	// },
	// {
	// 	id: 'sibur-annual-report',
	// 	title: 'Сибур',
	// 	description: 'Интерактивный интегрированный годовой отчёт за 2024 год',
	// 	link: 'https://ar24.sibur.ru/',
	// 	image: 'https://picsum.photos/id/10/400/200',
	// 	tags: ['Astro', 'HTML', 'CSS', 'JavaScript', 'GSAP'],
	// },
];
