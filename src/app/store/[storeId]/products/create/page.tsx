import { Metadata } from 'next';

import { CreateProduct } from './CreateProduct';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Create a product',
	...NO_INDEX_PAGE
};

export default function CreateProductPage() {
	return <CreateProduct />;
}
