import { PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

import { useCreateReview } from '@/hooks/queries/reviews/useCreateReview';

import { Button } from '../button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../form';
import { Textarea } from '../textarea';

import { IReviewInput } from '@/app/shared/types/review.interface';

interface ReviewModalProps {
	storeId: string;
}

export function ReviewModal({
	children,
	storeId
}: PropsWithChildren<ReviewModalProps>) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const form = useForm<IReviewInput>({
		mode: 'onChange'
	});

	const { createReview, isLoadingCreate } = useCreateReview(storeId);

	const onSubmit: SubmitHandler<IReviewInput> = data => {
		form.reset();
		createReview(data);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create review</DialogTitle>
					<DialogDescription>
						Set rating and comment to set a review
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='rating'
							rules={{ required: 'Rating is required' }}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Rating
											onClick={field.onChange}
											initialValue={field.value}
											SVGstyle={{
												display: 'inline-block'
											}}
											size={20}
											transition
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='text'
							rules={{ required: 'Text is required' }}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Write your review'
											disabled={isLoadingCreate}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-end'>
							<Button
								variant='primary'
								disabled={!form.formState.isValid || isLoadingCreate}
							>
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
