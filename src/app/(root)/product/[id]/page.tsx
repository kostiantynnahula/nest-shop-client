import { notFound } from 'next/navigation';

import { categoryService } from '@/services/category.service';
import { productService } from '@/services/product.service';

import { Product } from './Product';

export const revalidate = 60;

export async function generateStaticParams() {
	const products = await productService.getAll();

	return products.map(product => {
		return {
			params: { id: product.id }
		};
	});
}

async function getProduct(params: { id: string }) {
	try {
		const product = await productService.getById(params.id);
		const similarProducts = await productService.getSimilar(params.id);

		return {
			similarProducts,
			product
		};
	} catch {
		return notFound();
	}
}

export async function generateMetadata({ params }: { params: { id: string } }) {
	const { product } = await getProduct(params);

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [
				{
					url: product.images[0],
					width: 1000,
					height: 1000,
					alt: product.title
				}
			]
		}
	};
}

export default async function ProductPage({
	params
}: {
	params: { id: string };
}) {
	const { product, similarProducts } = await getProduct(params);

	return (
		<div className='my-6'>
			<Product
				initialProduct={product}
				similarProducts={similarProducts}
				id={params.id}
			/>
		</div>
	);
}
