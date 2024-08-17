import { STORE_URL } from "@/config/url.config";
import { productService } from "@/services/product.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
  const params = useParams<{ storeId: string }>();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
    mutationKey: ["delete product"],
    mutationFn: (productId: string) => productService.delete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get products for store dashboard"] });
      toast.success("Product deleted successfully");
      push(STORE_URL.products(params.storeId));
    },
    onError: () => {
      toast.error("Error deleting product");
    }
  });
  return useMemo(() => ({
    deleteProduct,
    isLoadingDelete
  }), [deleteProduct, isLoadingDelete]);
}