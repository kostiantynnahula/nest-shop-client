import { categoryService } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useGetCategories = () => {
  const params = useParams<{
    storeId: string;
  }>();
  const {
    data: categories,
    isLoading
  } = useQuery({
    queryKey: ["get categories"],
    queryFn: () => categoryService.getByStoreId(params.storeId)
  });
  return useMemo(() => ({
    categories,
    isLoading
  }), [categories, isLoading]);
}