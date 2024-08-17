import { IProductInput } from "@/app/shared/types/product.interface";
import { productService } from "@/services/product.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useUpdateProduct = () => {
  const params = useParams<{ storeId: string }>();
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ["update product"],
    mutationFn: (data: IProductInput) => productService.update(params.storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get products for store dashboard"] });
      toast.success("Product updated successfully");
    },
    onError: () => {
      toast.error("Error updating product");
    }
  });
  return useMemo(() => ({
    updateProduct,
    isLoadingUpdate
  }), [updateProduct, isLoadingUpdate]);
}