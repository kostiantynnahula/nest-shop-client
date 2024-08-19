import { Metadata } from 'next';

import { productService } from '@/services/product.service';

import { Explorer } from './Explorer';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Explorer',
	...NO_INDEX_PAGE
};

export const revalidate = 60;

async function getProducts() {
	return await productService.getAll();
}

export default async function ExplorerPage() {
	const data = await getProducts();
	return <Explorer products={data} />;
}
