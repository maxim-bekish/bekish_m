// адрес сайта для canonical, sitemap и превью ссылок. SITE_URL — если подключён свой домен,
// иначе production-домен, который Vercel сам передаёт при сборке
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
	process.env.SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000');

export const SITE_NAME = 'Максим Бекиш';
export const SITE_TITLE = 'Максим Бекиш — фронтенд-разработчик';
export const SITE_DESCRIPTION =
	'Фронтенд-разработчик из Минска: Vue, Nuxt, React, Next.js, TypeScript. Проектирую интерфейсы в Figma и собираю их в код. Открыт к работе: full-time, фриланс, удалённо.';
