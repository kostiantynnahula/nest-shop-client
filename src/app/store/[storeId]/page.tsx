import type { Metadata } from 'next';

import { Store } from './store';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Manage Store',
	...NO_INDEX_PAGE
};

export default function StorePage() {
	return <Store />;
}
