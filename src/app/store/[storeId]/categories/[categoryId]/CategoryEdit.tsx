'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { categoryService } from '@/services/category.service';

import { CategoryForm } from '../CategoryForm';

export function ProductEdit() {
	const params = useParams<{ categoryId: string }>();

	// TODO: Implement useGetProduct query as a hook
	const { data } = useQuery({
		queryKey: ['get category'],
		queryFn: () => categoryService.getById(params.categoryId)
	});

	return <CategoryForm category={data} />;
}
