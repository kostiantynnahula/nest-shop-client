import { productService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useGetProducts = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const { data: products, isLoading } = useQuery({
    queryKey: ["get products for store dashboard", storeId],
    queryFn: () => productService.getByStoreId(storeId),
  });
  return useMemo(() => ({
    products,
    isLoading,
  }), [products, isLoading]);
}