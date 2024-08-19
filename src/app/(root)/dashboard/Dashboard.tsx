'use client';

import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/DataTable';

import { useProfile } from '@/hooks/useProfile';

import { saveTokenStorage } from '@/services/auth/auth-token.service';
import { authService } from '@/services/auth/auth.services';

import { formatDate } from '@/utils/date/format-date';
import { formatPrice } from '@/utils/string/format-price';

import styles from './Dashboard.module.scss';
import { IOrderColumn, orderColumns } from './OrderColumns';
import { EnumOrderStatus } from '@/app/shared/types/order.interface';

export function Dashboard() {
	const searchParams = useSearchParams();

	const { push } = useRouter();

	useEffect(() => {
		const accessToken = searchParams.get('accessToken');
		if (accessToken) {
			saveTokenStorage(accessToken);
		}
	}, [searchParams]);

	const { user } = useProfile();

	// TODO: move to hooks
	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: async () => authService.logout(),
		onSuccess: () => push('/auth')
	});

	if (!user) {
		return null;
	}

	const formattedOrders: IOrderColumn[] = user.orders.map(order => ({
		createdAt: formatDate(order.createdAt),
		status: order.status === EnumOrderStatus.PENDING ? 'Pending' : 'Completed',
		total: formatPrice(order.total)
	}));

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h1>Your orders</h1>
				<Button variant='ghost' onClick={() => logout()}>
					<LogOut />
					Logout
				</Button>
			</div>
			<DataTable columns={orderColumns} data={formattedOrders} />
		</div>
	);
}
