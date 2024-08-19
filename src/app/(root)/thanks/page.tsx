import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { PUBLIC_URL } from '@/config/url.config';

import styles from './../hero/Hero.module.scss';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Thanks for your purchase!',
	...NO_INDEX_PAGE
};

export default function ThanksPage() {
	return (
		<div className={styles.section}>
			<h1 className={styles.heading}>Thanks for your purchase!</h1>
			<p className={styles.description}>We hope you enjoy your new products.</p>
			<Link href={PUBLIC_URL.home()}>
				<Button variant='primary'>
					To the shop
					<ArrowRight />
				</Button>
			</Link>
		</div>
	);
}
