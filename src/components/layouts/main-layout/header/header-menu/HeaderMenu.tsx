'use client';

import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal';

import { useProfile } from '@/hooks/useProfile';

import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config';

import styles from './HeaderMenu.module.scss';
import { HeaderCart } from './header-cart/HeaderCart';

export function HeaderMenu() {
	const { user, isLoading } = useProfile();

	// TODO: Refactor this
	return (
		<div className={styles.header_menu}>
			<HeaderCart />
			<Link href={PUBLIC_URL.explorer()}>
				<Button variant='ghost'>Catalog</Button>
			</Link>
			{isLoading ? (
				<Loader />
			) : user ? (
				<>
					<Link href={DASHBOARD_URL.favorites()}>
						<Button variant='ghost'>Favorites</Button>
					</Link>
					{user.stores.length ? (
						<Link href={STORE_URL.home(user.stores[0].id)}>
							<Button variant='ghost'>My stores</Button>
						</Link>
					) : (
						<CreateStoreModal>
							<Button variant='ghost'>Create a store</Button>
						</CreateStoreModal>
					)}
					<Link href={DASHBOARD_URL.home()}>
						<Image
							src={user.picture}
							alt={user.name}
							className={styles.avatar}
							width={42}
							height={42}
						/>
					</Link>
				</>
			) : (
				<Link href={PUBLIC_URL.auth()}>
					<Button variant='primary'>
						<LogOut className={styles.icon} />
						Login
					</Button>
				</Link>
			)}
		</div>
	);
}
