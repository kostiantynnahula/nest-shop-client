import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { useCart } from '@/hooks/useCart';
import { useProfile } from '@/hooks/useProfile';

import { formatPrice } from '@/utils/string/format-price';

import { PUBLIC_URL } from '@/config/url.config';

import styles from './HeaderCart.module.scss';
import { CartItem } from './cart-item/CartItem';
import { useCheckout } from './useCheckout';

export function HeaderCart() {
	const { push } = useRouter();

	const { createPayment, IsLoadingCreate } = useCheckout();
	const { items, total } = useCart();

	const { user } = useProfile();

	const handleClick = () => {
		user ? createPayment() : push(PUBLIC_URL.auth());
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Cart</Button>
			</SheetTrigger>
			<SheetContent className={styles.cart}>
				<Heading title='Cart of products' className='text-xl' />
				<div className={styles.items}>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className={styles.not_found}>Cart is empty</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className={styles.total}>
							Total amount: {formatPrice(total)}
						</div>
						<Button
							onClick={handleClick}
							variant='primary'
							disabled={IsLoadingCreate}
						>
							Checkout
						</Button>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	);
}
