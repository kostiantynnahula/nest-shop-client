import { Button } from '@/components/ui/button';

import { IProduct } from '@/app/shared/types/product.interface';

interface AddToCartButtonProps {
	product: IProduct;
}

export function AddToCartButton(props: AddToCartButtonProps) {
	return (
		<Button variant='primary' size='lg' className='w-full'>
			Add to cart
		</Button>
	);
}
