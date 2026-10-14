import About from '@/components/main/About';
import Contacts from '@/components/main/Contacts';
import PhysicsHero from '@/components/sections/PhysicsHero';
import Skills from '@/components/main/Skills';
import Works from '@/components/main/Works';

import { Marquee } from '@/components/ui/Marquee';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

const lineTextOne = [
	'Frontend Developer',
	'Vue / React',
	'UTC+3',
	'EdTech',
	'E-commerce',
	'Open to work',
	'Full-time',
	'Freelance',
	'Remote',
	'Minsk',
	'Maksim Bekish',
];

const lineTextThree = [
	'Vue 3',
	'React',
	'Nuxt 4',
	'Next.js',
	'JavaScript',
	'TypeScript',
	'Pinia',
	'Vuex',
	'Redux',
	'Zustand',
	'MobX',
	'REST API',
	'GraphQL / Apollo',
	'WebSocket',
	'HTML',
	'CSS',
	'SCSS',
	'Tailwind',
	'GitHub',
	'GitLab',
	'Vite',
	'Vercel',
	'Figma',
	'CI/CD',
	'Docker',
	'Claude',
	'Supabase',
];

// разметка для поисковиков: кто владелец сайта и где ещё его найти
const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: SITE_NAME,
	alternateName: 'Maksim Bekish',
	jobTitle: 'Фронтенд-разработчик',
	description: SITE_DESCRIPTION,
	url: SITE_URL,
	address: { '@type': 'PostalAddress', addressLocality: 'Минск', addressCountry: 'BY' },
	knowsAbout: ['Vue', 'Nuxt', 'React', 'Next.js', 'TypeScript', 'Figma'],
	sameAs: ['https://github.com/maxim-bekish', 'https://t.me/maxa_max'],
};

export default function Home() {
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
			/>
			<PhysicsHero  />
			<Marquee variant='accent' arr={lineTextOne} />
			<About />
			<Marquee variant='monochrome' arr={lineTextThree} />
			<Works />
			<Skills />
			{/* <Feedback />
			<Faq /> */}
			<Contacts />
		</>
	);
}
