import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

export interface IReviewColumn {
	id: string;
	rating: string;
	username: string;
	createdAt: string;
}

export const reviewColumns: ColumnDef<IReviewColumn>[] = [
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Created At
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			);
		}
	},
	{
		accessorKey: 'rating',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Rating
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			);
		}
	},
	{
		accessorKey: 'username',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Username
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			);
		}
	}
];
