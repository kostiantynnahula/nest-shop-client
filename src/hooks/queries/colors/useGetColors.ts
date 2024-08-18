import { colorsService } from "@/services/color.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useGetColors = () => {
  const params = useParams<{ storeId: string }>();

  const { data: colors, isLoading } = useQuery({
    queryKey: ["get color"],
    queryFn: () => colorsService.getByStoreId(params.storeId),
  });

  return useMemo(() => ({ colors, isLoading }), [colors, isLoading]);
}