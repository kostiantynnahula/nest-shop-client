import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

export interface IOrderColumn {
	createdAt: string;
	status: string;
	total: string;
}

export const orderColumns: ColumnDef<IOrderColumn>[] = [
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Payment Date
					<ArrowUpDown className='ml-2' size={16} />
				</Button>
			);
		}
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Status
					<ArrowUpDown className='ml-2' size={16} />
				</Button>
			);
		}
	},
	{
		accessorKey: 'total',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Total
					<ArrowUpDown className='ml-2' size={16} />
				</Button>
			);
		}
	}
];
