'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { colorsService } from '@/services/color.service';

import { ColorForm } from '../ColorForm';

export function ColorEdit() {
	const params = useParams<{ colorId: string }>();

	// TODO: Implement useGetProduct query as a hook
	const { data } = useQuery({
		queryKey: ['get color'],
		queryFn: () => colorsService.getById(params.colorId)
	});

	return <ColorForm color={data} />;
}
