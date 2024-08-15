import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { authService } from '@/services/auth/auth.services';

import { DASHBOARD_URL } from '@/config/url.config';

import { IAuthForm } from '../shared/types/auth.interface';

export function useAuthForm(isReg: boolean) {
	const router = useRouter();
	const form = useForm<IAuthForm>({
		mode: 'onChange'
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth user'],
		mutationFn: (data: IAuthForm) => {
			return authService.main(isReg ? 'register' : 'login', data);
		},
		onSuccess: () => {
			form.reset();
			toast.success(
				isReg ? 'User registered successfully' : 'User logged in successfully'
			);
			router.replace(DASHBOARD_URL.home());
		},
		onError: error => {
			if (error.message) {
				toast.error(error.message);
			} else {
				toast.error('Something went wrong');
			}
		}
	});

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data);
	};

	return { form, onSubmit, isPending };
}
