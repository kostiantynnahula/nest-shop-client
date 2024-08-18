'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/DataTable';
import DataTableLoading from '@/components/ui/data-table/DataTableLoading';
import { Heading } from '@/components/ui/heading';

import { useGetColors } from '@/hooks/queries/colors/useGetColors';

import { formatDate } from '@/utils/date/format-date';

import { STORE_URL } from '@/config/url.config';

import styles from './../Store.module.scss';
import { colorColumns } from './ColorColumns';
import { IColor } from '@/app/shared/types/color.interface';

export function Colors() {
	const params = useParams<{ storeId: string }>();

	const { colors, isLoading } = useGetColors();

	const formattedColors: IColor[] = colors
		? colors.map(color => ({
				id: color.id,
				name: color.name,
				value: color.value,
				storeId: color.storeId,
				createdAt: formatDate(color.createdAt)
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
							title={`Colors (${colors?.length})`}
							description="All store's colors"
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
						<DataTable
							columns={colorColumns}
							data={formattedColors}
							filterKey='name'
						/>
					</div>
				</>
			)}
		</div>
	);
}
