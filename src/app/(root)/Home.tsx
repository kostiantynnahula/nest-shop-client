import { Catalog } from '@/components/ui/data-table/catalog/Catalog';

import { PUBLIC_URL } from '@/config/url.config';

import { IProduct } from '../shared/types/product.interface';

import { Hero } from './hero/Hero';

interface HomeProps {
	products: IProduct[];
}

export function Home({ products }: HomeProps) {
	return (
		<>
			<Hero />
			<Catalog
				title='Best Sellers'
				description='Check out our best selling products'
				linkTitle='View all'
				link={PUBLIC_URL.explorer()}
				products={products}
			/>
		</>
	);
}
