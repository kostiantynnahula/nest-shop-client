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

import { useCreateColor } from '@/hooks/queries/colors/useCreateColor';
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor';
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor';

import styles from './../Store.module.scss';
import { IColor, IColorInput } from '@/app/shared/types/color.interface';

interface ColorFormProps {
	color?: IColor;
}

export function ColorForm({ color }: ColorFormProps) {
	const { createColor, isLoadingCreate } = useCreateColor();
	const { updateColor, isLoadingUpdate } = useUpdateColor();
	const { deleteColor, isLoadingDelete } = useDeleteColor();

	const title = color ? 'Change data' : 'Create a color';
	const description = color ? 'Change the color data' : 'Create a new color';

	const action = color ? 'Update' : 'Create';

	// TODO: Fix problem with mapping category and color of existed product
	const form = useForm<IColorInput>({
		mode: 'onChange',
		values: {
			name: color?.name || '',
			value: color?.value || ''
		} || {
			name: '',
			value: ''
		}
	});

	const onSubmit: SubmitHandler<IColorInput> = data => {
		if (color) {
			updateColor(data);
		} else {
			createColor(data);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{color && (
					<ConfirmModal handleClick={() => deleteColor()}>
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
							name='name'
							rules={{
								required: 'name is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Color name'
											disabled={isLoadingCreate || isLoadingUpdate}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							rules={{
								required: 'value is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
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
					</div>
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
