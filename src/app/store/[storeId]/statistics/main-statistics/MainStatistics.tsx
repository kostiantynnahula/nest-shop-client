import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics';

import styles from './MainStatistics.module.scss';
import { MainStatisticsItem } from './MainStatisticsItem';

export function MainStatistics() {
	// TODO: Implement skeleton while loading
	const { main } = useGetStatistics();
	return (
		<div className={styles.main}>
			{main?.length ? (
				main.map(item => <MainStatisticsItem key={item.id} item={item} />)
			) : (
				<div>There is not data for statistics</div>
			)}
		</div>
	);
}
