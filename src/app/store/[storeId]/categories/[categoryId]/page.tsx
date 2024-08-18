import { Metadata } from 'next';

import { ProductEdit } from './CategoryEdit';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Edit a category',
	...NO_INDEX_PAGE
};

export default function CategoryEditPage() {
	return <ProductEdit />;
}
