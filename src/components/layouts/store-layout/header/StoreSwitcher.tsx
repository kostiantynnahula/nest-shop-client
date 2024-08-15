'use client';

import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { ChevronsUpDown, Plus, StoreIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command';
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal';
import { Popover } from '@/components/ui/popover';

import { STORE_URL } from '@/config/url.config';

import { IStore } from '@/app/shared/types/store.interface';

interface StoreSwitcherProps {
	items: IStore[];
}

export function StoreSwitcher({ items }: StoreSwitcherProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const router = useRouter();

	const onStoreSelect = (storeId: string) => {
		setIsOpen(false);
		router.push(STORE_URL.home(storeId));
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					role='combobox'
					aria-expanded={isOpen}
					aria-label='Choose a store'
					className='w-52'
				>
					<StoreIcon className='mr-2 size-4' />
					Current store
					<ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-52 p-0'>
				<Command className='rounded-lg border shadow-md'>
					<CommandList>
						<CommandInput placeholder='Find a store' />
						<CommandEmpty>No stores found</CommandEmpty>
						<CommandGroup heading='Stores'>
							{items.map(store => (
								<CommandItem
									key={store.id}
									className='text-sm'
									onSelect={() => onStoreSelect(store.id)}
								>
									<StoreIcon className='mr-2 size-4' />
									<div className='line-clamp-1'>{store.title}</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CreateStoreModal>
								<CommandItem>
									<Plus className='mr-2 size-4' />
									Create store
								</CommandItem>
							</CreateStoreModal>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
