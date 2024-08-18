import { Metadata } from 'next';

import { ProductEdit } from './ProductEdit';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Edit a product',
	...NO_INDEX_PAGE
};

export default function ProductEditPage() {
	return <ProductEdit />;
}
