import { UseFormReturn } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { validEmail } from '../shared/regex';
import { IAuthForm } from '../shared/types/auth.interface';

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, undefined>;
	isPending: boolean;
	isReg?: boolean;
}

export function AuthFields({ form, isPending, isReg }: AuthFieldsProps) {
	return (
		<>
			{isReg && (
				<FormField
					control={form.control}
					name='name'
					rules={{
						required: 'Name is required'
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} placeholder='Pedro' disabled={isPending} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name='email'
				rules={{
					required: 'email is required',
					pattern: {
						value: validEmail,
						message: 'Invalid email'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								{...field}
								type='email'
								placeholder='pedro@gmail.com'
								disabled={isPending}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='password'
				rules={{
					required: 'password is required',
					minLength: {
						value: 6,
						message: 'Password must be at least 6 characters long'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								{...field}
								type='password'
								placeholder='******'
								disabled={isPending}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
