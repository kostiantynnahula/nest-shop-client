import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import styles from './HeaderCart.module.scss';

export function HeaderCart() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Cart</Button>
			</SheetTrigger>
			<SheetContent>
				<Heading title='Cart of products' className='text-xl' />
			</SheetContent>
		</Sheet>
	);
}
