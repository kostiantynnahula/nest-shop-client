import type { Metadata } from 'next';

import { productService } from '@/services/product.service';

import { Home } from './Home';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Your shopping',
	...NO_INDEX_PAGE
};

export const revalidate = 60;

async function getProducts() {
	// TODO: make it possible to pass a limit as an argument (parameter)
	const data = (await productService.getByMostPopular()).slice(0, 6);

	return data;
}

export default async function HomePage() {
	const products = await getProducts();

	return <Home products={products} />;
}
