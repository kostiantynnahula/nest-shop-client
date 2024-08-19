import styles from './Footer.module.scss';

export function Footer() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.footer}>
				nest-shop.com &copy; {new Date().getFullYear()} All right is protected.
			</div>
		</div>
	);
}
