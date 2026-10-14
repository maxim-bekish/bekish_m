import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { works } from '@/lib/works';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
		...works.map((work) => ({
			url: `${SITE_URL}/work/${work.id}`,
			changeFrequency: 'yearly' as const,
			priority: 0.7,
		})),
	];
}
