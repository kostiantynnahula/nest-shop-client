import { Metadata } from 'next';

import { ColorEdit } from './ColorEdit';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Edit a color',
	...NO_INDEX_PAGE
};

export default function ColorEditPage() {
	return <ColorEdit />;
}
