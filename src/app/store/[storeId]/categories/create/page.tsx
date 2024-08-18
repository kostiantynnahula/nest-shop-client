import { Metadata } from 'next';

import { CreateCategory } from './CreateCategory';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Create a category',
	...NO_INDEX_PAGE
};

export default function CreateProductPage() {
	return <CreateCategory />;
}
