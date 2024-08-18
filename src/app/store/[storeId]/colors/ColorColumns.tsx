import { ColumnDef } from '@tanstack/react-table';
import {
	ArrowUpDown,
	ExternalLink,
	MoreHorizontal,
	Pencil
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { PUBLIC_URL, STORE_URL } from '@/config/url.config';

import { IColor } from '@/app/shared/types/color.interface';

export const colorColumns: ColumnDef<IColor>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Name
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			);
		}
	},
	{
		accessorKey: 'value',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Value
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='flex items-center gap-x-3'>
				{row.original.value}
				<div
					className='w-8 h-8 rounded-full'
					style={{ backgroundColor: row.original.value }}
				/>
			</div>
		)
	},
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
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Action</DropdownMenuLabel>
					<Link
						href={STORE_URL.colorEdit(row.original.storeId, row.original.id)}
						target='_blank'
					>
						<DropdownMenuItem>
							<Pencil className='size-4 mr-2' />
							Edit
						</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
];
