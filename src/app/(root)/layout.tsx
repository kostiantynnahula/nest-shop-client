import { PropsWithChildren } from 'react';

import { MainLayout } from '@/components/layouts/main-layout/MayinLayout';

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <MainLayout>{children}</MainLayout>;
}
