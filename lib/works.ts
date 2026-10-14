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
import soberizaborPreview from '@/assets/works/soberizabor/preview.avif';
import soberizabor1 from '@/assets/works/soberizabor/1.avif';
import soberizabor2 from '@/assets/works/soberizabor/2.avif';
import photographerPreview from '@/assets/works/photographer/preview.avif';
import photographer1 from '@/assets/works/photographer/1.avif';
import photographer2 from '@/assets/works/photographer/2.avif';
import photographer3 from '@/assets/works/photographer/3.avif';
import photographer4 from '@/assets/works/photographer/4.avif';
import ranepaСampusPreview from '@/assets/works/ranepa-campus/preview.avif';
import ranepaСampus1 from '@/assets/works/ranepa-campus/1.avif';
import ranepaСampus2 from '@/assets/works/ranepa-campus/2.avif';
import ranepaСampus3 from '@/assets/works/ranepa-campus/3.avif';
import siburPreview from '@/assets/works/sibur/preview.avif';
import sibur1 from '@/assets/works/sibur/1.avif';
import sibur2 from '@/assets/works/sibur/2.avif';
import sibur3 from '@/assets/works/sibur/3.avif';
import sibur4 from '@/assets/works/sibur/4.avif';

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
			'Образовательная ИИ-платформа:\nучителю — проверка работ, планы уроков и контрольные за минуты, ученику — курсы и ИИ-наставник.',
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
	{
		id: 'soberizabor',
		title: 'Собери забор',
		role: ['Frontend'],
		stack: ['Astro', 'HTML', 'CSS', 'JavaScript'],
		task: '«Собери забор» продаёт алюминиевые ограждения для частных домов: забор приходит в коробке и собирается без сварки. Нужен был лендинг премиального уровня, который объясняет продукт через схему и преимущества, показывает комплектующие с ценами и позволяет сразу посчитать стоимость своего забора.',
		myTasks: [
			'Сверстал адаптивный лендинг на Astro по макету: тёмная тема, градиенты, «граффити»-акценты в типографике.',
			'Собрал онлайн-калькулятор: длина ограждения, тип столбов, калитки и ворота пересчитываются в комплект и предварительную стоимость.',
			'Сделал интерактивную схему забора с подписями элементов: секции, стойки, ворота, калитка, арка.',
			'Сверстал карусель комплектующих с ценами и характеристиками.',
			'Сверстал форму заявки с валидацией обязательных полей и согласием на обработку данных.',
			'Отдельная мобильная версия шапки и блоков.',
		],
		description: 'Лендинг алюминиевых ограждений с онлайн-калькулятором стоимости комплекта.',
		link: 'https://soberizabor.ru/',
		preview: {
			src: soberizaborPreview,
			description: 'Лендинг «Собери забор»',
		},
		images: [
			{
				src: soberizabor1,
				description: 'Схема забора с подписями элементов',
			},
			{
				src: soberizabor2,
				description: 'Форма заявки',
			},
		],
		tags: ['Astro', 'HTML', 'CSS', 'JavaScript'],
	},
	{
		id: 'photographer',
		title: 'Сайт фотографа',
		role: ['Frontend', 'Designer'],
		stack: ['React', 'Next.js', 'TypeScript', 'GSAP'],
		task: 'Шаблон сайта-портфолио для фотографа: показать работы крупно и атмосферно, рассказать об услугах и ценах и довести посетителя до заявки на съёмку. Делал как собственный продукт для продажи фотографам. [Уточните, что было самым сложным]',
		myTasks: [
			'Спроектировал и сверстал сайт на Next.js и TypeScript: главная, «Обо мне», работы, отзывы, блог, контакты.',
			'Анимации на GSAP: крупная типографика на первом экране, плавное появление блоков при скролле, бегущая строка в футере.',
			'Счётчики достижений, карточки альбомов по жанрам и блок направлений съёмки.',
			'Бесконечная лента отзывов и FAQ-аккордеон с ценами и условиями.',
			'Полноэкранное меню и адаптивная вёрстка под мобильные устройства.',
			'Деплой на Vercel.',
		],
		description:
			'Портфолио фотографа с анимациями на GSAP, альбомами работ, отзывами и блогом.',
		link: 'https://photo-two-eta.vercel.app/',
		preview: {
			src: photographerPreview,
			description: 'Главная страница сайта фотографа',
		},
		images: [
			{ src: photographer1, description: 'Карусель альбомов с тегами жанров' },
			{ src: photographer2, description: 'Страница альбома с крупным заголовком' },
			{ src: photographer3, description: 'Блог: сетка статей с курсором «Читать»' },
			{
				src: photographer4,
				description: 'Контакты: анимированная диафрагма и бегущая строка',
			},
		],
		tags: ['React', 'Next.js', 'TypeScript', 'GSAP'],
	},
	{
		id: 'ranepa-campus',
		title: 'РАНХиГС',
		role: ['Frontend'],
		stack: ['Nuxt', 'Vue', 'TypeScript', 'SCSS', 'PixiJS'],
		task: 'Деловая игра-симулятор для обучения управленцев в Высшей школе государственного управления РАНХиГС. Участник управляет университетским кампусом: распределяет бюджет, запускает проекты и улучшает объекты, чтобы за игровую сессию достичь целевых социально-экономических показателей. Нужно было сделать интерактивную карту кампуса и игровой интерфейс, в котором легко разобраться в экономике решений. [Уточните, что было самым сложным]',
		myTasks: [
			'Сделал интерактивную карту кампуса на PixiJS: здания-объекты кликабельны и ведут в своё управление.',
			'Реализовал игровой цикл по годам: таймлайн 2024–2025, таймер хода, бюджет в шапке.',
			'Сверстал экраны управления: сферы, сегменты, объекты, улучшения с ценами и выбором.',
			'Сделал модальное окно статистики: задачи региона, прогресс по социально-экономическим эффектам, статус тестирования.',
			'Сверстал карточки статистики объекта и пересчёт расходов на содержание и улучшения.',
		],
		description: 'Деловая игра-симулятор управления кампусом с интерактивной картой на PixiJS.',
		link: 'https://demo.campus.ranepa.ru/sign-in/secret-link',
		preview: {
			src: ranepaСampusPreview,
			description: 'Интерактивная карта кампуса',
		},
		images: [
			{
				src: ranepaСampus1,
				description: 'Статистика: задачи региона и прогресс по эффектам',
			},
			{ src: ranepaСampus2, description: 'Социальная сфера: проекты и сегменты' },
			{ src: ranepaСampus3, description: 'Учебный комплекс: улучшения и статистика объекта' },
		],
		tags: ['Nuxt', 'TypeScript', 'SCSS', 'PixiJS'],
	},
	{
		id: 'sibur-annual-report',
		title: 'СИБУР',
		role: ['Frontend'],
		stack: ['Astro', 'HTML', 'CSS', 'JavaScript', 'GSAP'],
		task: 'Интерактивная веб-версия интегрированного годового отчёта ПАО «СИБУР Холдинг» за 2024 год. Нужно было превратить большой корпоративный отчёт с цифрами, схемами и картами в удобный сайт: с навигацией по разделам, анимированной инфографикой, русской и английской версией и скачиванием PDF. [Уточните, что было самым сложным]',
		myTasks: [
			'Сверстал разделы отчёта на Astro: портрет группы, бизнес-модель, финансовые результаты, стратегия.',
			'Сделал интерактивную карту присутствия: раскрывающиеся кластеры, всплывающие описания, легенда объектов.',
			'Анимации на GSAP: появление блоков при скролле, анимированные счётчики и диаграммы.',
			'Видеообложка с управлением воспроизведением и полноэкранное меню по трём главам отчёта.',
			'Карусель реализованных проектов по дивизионам.',
			'Переключение языка RU/EN и скачивание отчёта в PDF.',
		],
		description:
			'Интерактивный интегрированный годовой отчёт СИБУРа за 2024 год с картой присутствия и анимированной инфографикой.',
		link: 'https://ar24.sibur.ru/',
		preview: {
			src: siburPreview,
			description: 'Раздел «О СИБУРе» целиком',
		},
		images: [
			{ src: sibur1, description: 'Интерактивная карта присутствия по кластерам' },
			{ src: sibur2, description: 'Карусель реализованных проектов' },
			{ src: sibur3, description: 'Полноэкранное меню по главам отчёта' },
			{ src: sibur4, description: 'Обложка годового отчёта СИБУРа' },
		],
		tags: ['Astro', 'JavaScript', 'GSAP'],
	},
];
