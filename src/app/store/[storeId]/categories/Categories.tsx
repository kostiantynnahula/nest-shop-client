'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/DataTable';
import DataTableLoading from '@/components/ui/data-table/DataTableLoading';
import { Heading } from '@/components/ui/heading';

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories';

import { formatDate } from '@/utils/date/format-date';

import { STORE_URL } from '@/config/url.config';

import styles from './../Store.module.scss';
import { categoriesColumns } from './CategoriesColumns';
import { ICategory } from '@/app/shared/types/category.interface';

export function Categories() {
	const params = useParams<{ storeId: string }>();

	const { categories, isLoading } = useGetCategories();

	const formattedCategories: ICategory[] = categories
		? categories.map(category => ({
				id: category.id,
				title: category.title,
				description: category.description,
				storeId: category.storeId,
				createdAt: formatDate(category.createdAt)
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
							title={`Categories (${categories?.length})`}
							description="All store's categories"
						/>
						<div className={styles.buttons}>
							<Link href={STORE_URL.categoryCreate(params.storeId)}>
								<Button variant='primary'>
									<Plus />
									Create
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={categoriesColumns}
							data={formattedCategories}
							filterKey='title'
						/>
					</div>
				</>
			)}
		</div>
	);
}
