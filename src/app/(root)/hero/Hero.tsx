import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { PUBLIC_URL } from '@/config/url.config';

import styles from './Hero.module.scss';
import { SITE_DESCRIPTION } from '@/constants/seo.constants';

export function Hero() {
	return (
		<div className={styles.section}>
			<h1 className={styles.heading}>
				Your shoping, your pleasure - <span>all products in one place.</span>
			</h1>
			<p className={styles.description}>{SITE_DESCRIPTION}</p>
			<Link href={PUBLIC_URL.explorer()}>
				<Button variant='primary'>
					Shopping
					<ArrowRight />
				</Button>
			</Link>
		</div>
	);
}
