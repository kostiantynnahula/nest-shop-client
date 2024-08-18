import { Trash } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal';
import { Textarea } from '@/components/ui/textarea';

import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory';
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory';
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory';

import styles from './../Store.module.scss';
import {
	ICategory,
	ICategoryInput
} from '@/app/shared/types/category.interface';

interface ProductFormProps {
	category?: ICategory;
}

export function CategoryForm({ category }: ProductFormProps) {
	const { createCategory, isLoadingCreate } = useCreateCategory();
	const { updateCategory, isLoadingUpdate } = useUpdateCategory();
	const { deleteCategory, isLoadingDelete } = useDeleteCategory();

	const title = category ? 'Change data' : 'Create a category';
	const description = category
		? 'Change the data of the category'
		: 'Create a new category';

	const action = category ? 'Update' : 'Create';

	// TODO: Fix problem with mapping category and color of existed product
	const form = useForm<ICategoryInput>({
		mode: 'onChange',
		values: {
			title: category?.title || '',
			description: category?.description || ''
		} || {
			title: '',
			description: ''
		}
	});

	const onSubmit: SubmitHandler<ICategoryInput> = data => {
		if (category) {
			updateCategory(data);
		} else {
			createCategory(data);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{category && (
					<ConfirmModal handleClick={() => deleteCategory()}>
						<Button size='icon' variant='primary' disabled={isLoadingDelete}>
							<Trash className='size-4' />
						</Button>
					</ConfirmModal>
				)}
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
									<FormLabel>Product name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Product name'
											disabled={isLoadingCreate || isLoadingUpdate}
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
						rules={{
							required: 'description is required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Store description'
										disabled={isLoadingUpdate || isLoadingCreate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						variant='primary'
						disabled={isLoadingCreate || isLoadingUpdate}
					>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	);
}
