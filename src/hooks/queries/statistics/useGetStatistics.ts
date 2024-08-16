import { statisticsService } from "@/services/statistics.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import { useMemo } from "react";

export const useGetStatistics = () => {
  //TODO: create an interface to describe storeId param
  const { storeId } = useParams<{storeId: string}>();

  const { data:main } = useQuery({
    queryKey: ['get main statistics'],
    queryFn: () => statisticsService.getMain(storeId),
  });

  const { data: middle } = useQuery({
    queryKey: ['get middle statistics'],
    queryFn: () => statisticsService.getMiddle(storeId),
  });

  return useMemo(() => ({ main, middle }), [main, middle]);
}