import { Button } from '@/components/ui/button';

import { useActions } from '@/hooks/useActions';
import { useCart } from '@/hooks/useCart';

import { IProduct } from '@/app/shared/types/product.interface';

interface AddToCartButtonProps {
	product: IProduct;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addToCart, removeFromCart } = useActions();
	const { items } = useCart();

	const currentElement = items.find(item => item.product.id === product.id);

	return (
		<Button
			variant='primary'
			size='lg'
			className='w-full'
			onClick={() =>
				currentElement
					? removeFromCart(currentElement.id)
					: addToCart({ product, quantity: 1, price: product.price })
			}
		>
			{currentElement ? 'Remove from cart' : 'Add to cart'}
		</Button>
	);
}
