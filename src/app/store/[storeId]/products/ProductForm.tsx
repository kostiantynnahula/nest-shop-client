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
import { ImageUpload } from '@/components/ui/image-upload/ImageUpload';
import { Input } from '@/components/ui/input';
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct';
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct';
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct';

import styles from './../Store.module.scss';
import { ICategory } from '@/app/shared/types/category.interface';
import { IColor } from '@/app/shared/types/color.interface';
import { IProduct, IProductInput } from '@/app/shared/types/product.interface';

interface ProductFormProps {
	product?: IProduct;
	categories: ICategory[];
	colors: IColor[];
}

export function ProductForm({ product, categories, colors }: ProductFormProps) {
	const { createProduct, isLoadingCreate } = useCreateProduct();
	const { updateProduct, isLoadingUpdate } = useUpdateProduct();
	const { deleteProduct, isLoadingDelete } = useDeleteProduct();

	const title = product ? 'Change data' : 'Create a product';
	const description = product
		? 'Change the data of the product'
		: 'Create a new product';

	const action = product ? 'Update' : 'Create';

	// TODO: Fix problem with mapping category and color of existed product
	const form = useForm<IProductInput>({
		mode: 'onChange',
		values: {
			title: product?.title || '',
			description: product?.description || '',
			images: product?.images || [],
			price: product?.price || 0,
			categoryId: product?.category.id || '',
			colorId: product?.color.id || ''
		} || {
			title: '',
			description: '',
			images: [],
			price: 0,
			categoryId: '',
			colorId: ''
		}
	});

	const onSubmit: SubmitHandler<IProductInput> = data => {
		data.price = Number(data.price);
		if (product) {
			updateProduct(data);
		} else {
			createProduct(data);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{product && (
					<ConfirmModal handleClick={() => deleteProduct()}>
						<Button size='icon' variant='primary' disabled={isLoadingDelete}>
							<Trash className='size-4' />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='images'
						rules={{
							required: 'Please choose an image'
						}}
						render={({ field }) => (
							<FormItem className='mt-4'>
								<FormLabel>Pictures</FormLabel>
								<FormControl>
									<ImageUpload
										isDisabled={isLoadingCreate || isLoadingUpdate}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
						<FormField
							control={form.control}
							name='price'
							rules={{
								required: 'price is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Price'
											disabled={isLoadingCreate || isLoadingUpdate}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='categoryId'
							rules={{
								required: 'category is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										disabled={isLoadingCreate || isLoadingUpdate}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Product category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{categories.length &&
													categories.map(category => (
														<SelectItem key={category.id} value={category.id}>
															{category.title}
														</SelectItem>
													))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='colorId'
							rules={{
								required: 'color is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color</FormLabel>
									<Select
										disabled={isLoadingCreate || isLoadingUpdate}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Product color' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{colors.map(colors => (
													<SelectItem key={colors.id} value={colors.id}>
														{colors.name}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
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
