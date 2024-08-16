import { IMonthlySales } from '@/app/shared/types/statistics.interface';

interface OverviewProps {
	data: IMonthlySales[];
}

export function Overview({}: OverviewProps) {
	return <div>Overview Props</div>;
}
