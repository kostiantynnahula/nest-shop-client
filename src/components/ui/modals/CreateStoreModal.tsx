import {
	Dialog,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@radix-ui/react-dialog';
import { PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useCreateStore } from '@/hooks/queries/stores/useCreateStore';

import { Button } from '../button';
import { DialogContent, DialogHeader } from '../dialog';

import { IStoreCreate } from '@/app/shared/types/store.interface';

export function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { createStore, isLoadingCreate } = useCreateStore();

	const form = useForm<IStoreCreate>({
		mode: 'onChange'
	});

	const onSubmit: SubmitHandler<IStoreCreate> = async data => {
		createStore(data);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className='w-full'>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a store</DialogTitle>
					<DialogDescription>Set the name to create a store</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: 'title is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Store name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Store name'
											disabled={isLoadingCreate}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-end'>
							<Button variant='primary' disabled={isLoadingCreate}>
								Create
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
