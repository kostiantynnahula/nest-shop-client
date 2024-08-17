'use client';

import { Trash } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal';
import { Textarea } from '@/components/ui/textarea';

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore';
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore';

import styles from '../Store.module.scss';

import { IStoreUpdate } from '@/app/shared/types/store.interface';

export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore();
	const { deleteStore, isLoadingDelete } = useDeleteStore();

	const form = useForm<IStoreUpdate>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || ''
		}
	});

	const onSubmit: SubmitHandler<IStoreUpdate> = data => {
		updateStore(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title='Settings' description='Manage store settings' />
				<ConfirmModal handleClick={deleteStore}>
					<Button size='icon' variant='primary' disabled={isLoadingDelete}>
						<Trash className='size-4' />
					</Button>
				</ConfirmModal>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: 'title is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Store name'
											disabled={isLoadingUpdate}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Store description'
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant='primary' disabled={isLoadingUpdate}>
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
}
