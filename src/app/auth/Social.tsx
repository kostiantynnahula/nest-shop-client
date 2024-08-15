'use client';

import { useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';

import { SERVER_URL } from '@/config/api.config';

import styles from './Auth.module.scss';

export function Social() {
	const router = useRouter();
	return (
		<div className={styles.social}>
			<Button
				variant='outline'
				onClick={() => router.push(`${SERVER_URL}/auth/google`)}
			>
				<FcGoogle />
				Continue with Google
			</Button>
			<Button
				variant='outline'
				onClick={() => router.push(`${SERVER_URL}/auth/github`)}
			>
				<FaGithub />
				Continue with Github
			</Button>
		</div>
	);
}
