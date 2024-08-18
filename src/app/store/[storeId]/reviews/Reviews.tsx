'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/DataTable';
import DataTableLoading from '@/components/ui/data-table/DataTableLoading';
import { Heading } from '@/components/ui/heading';

import { useGetReviews } from '@/hooks/queries/reviews/useGetReviews';

import { formatDate } from '@/utils/date/format-date';

import { STORE_URL } from '@/config/url.config';

import styles from './../Store.module.scss';
import { IReviewColumn, reviewColumns } from './ReviewColumns';

export function Reviews() {
	const params = useParams<{ storeId: string }>();

	const { reviews, isLoading } = useGetReviews();

	const formattedReviews: IReviewColumn[] = reviews
		? reviews.map(review => ({
				id: review.id,
				username: review.user.name,
				rating: Array.from({ length: review.rating })
					.map(() => '⭐')
					.join(''),
				createdAt: formatDate(review.createAt)
			}))
		: [];

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading
							title={`Reviews (${reviews?.length})`}
							description="All store's reviews"
						/>
						<div className={styles.buttons}>
							<Link href={STORE_URL.colorCreate(params.storeId)}>
								<Button variant='primary'>
									<Plus />
									Create
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable columns={reviewColumns} data={formattedReviews} />
					</div>
				</>
			)}
		</div>
	);
}
