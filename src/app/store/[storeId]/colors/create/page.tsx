import { Metadata } from 'next';

import { CreateColor } from './CreateColor';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Create a color',
	...NO_INDEX_PAGE
};

export default function CreateProductPage() {
	return <CreateColor />;
}
