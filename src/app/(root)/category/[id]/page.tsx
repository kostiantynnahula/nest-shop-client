import { Metadata } from 'next';

import { Catalog } from '@/components/ui/data-table/catalog/Catalog';

import { categoryService } from '@/services/category.service';
import { productService } from '@/services/product.service';

export const revalidate = 60;

async function getProducts(id: string) {
	const products = await productService.getByCategory(id);

	const category = await categoryService.getById(id);

	return {
		category,
		products
	};
}

export async function generateMetadata({
	params
}: {
	params: { id: string };
}): Promise<Metadata> {
	const { category, products } = await getProducts(params.id);
	return {
		title: category.title,
		description: category.description,
		openGraph: {
			images: [
				{
					url: products[0]?.images[0],
					width: 1000,
					height: 1000,
					alt: category.title
				}
			]
		}
	};
}

export default async function CategoryPage({
	params
}: {
	params: { id: string };
}) {
	const { category, products } = await getProducts(params.id);

	return (
		<div className='my-6'>
			<Catalog
				title={category.title}
				description={category.description}
				products={products}
			/>
		</div>
	);
}
