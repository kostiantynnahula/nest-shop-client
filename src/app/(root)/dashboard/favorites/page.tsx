import type { Metadata } from 'next';

import { Favorites } from './Favorites';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Your shopping',
	...NO_INDEX_PAGE
};

export default function FavoritePage() {
	return <Favorites />;
}
