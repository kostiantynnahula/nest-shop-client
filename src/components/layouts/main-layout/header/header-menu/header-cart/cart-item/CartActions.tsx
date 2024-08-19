import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useActions } from '@/hooks/useActions';
import { useCart } from '@/hooks/useCart';

import styles from './../HeaderCart.module.scss';
import { ICartItem } from '@/app/shared/types/cart.interface';

interface CartActionsProps {
	item: ICartItem;
}

export function CartActions({ item }: CartActionsProps) {
	const { changeQuantity } = useActions();

	const { items } = useCart();
	const quantity =
		items.find(cartItem => cartItem.id === item.id)?.quantity || 0;

	return (
		<div className={styles.actions}>
			<Button
				onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
				variant='ghost'
				size='icon'
				disabled={quantity === 1}
			>
				<Minus />
			</Button>
			<input disabled readOnly value={quantity} />
			<Button
				onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
				variant='ghost'
				size='icon'
			>
				<Plus />
			</Button>
		</div>
	);
}
