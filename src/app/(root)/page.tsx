import type { Metadata } from 'next'

import { Home } from './Home'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Your shopping',
	...NO_INDEX_PAGE
}

export default function HomePage() {
	return <Home />
}
