import { STORE_URL } from "@/config/url.config";
import { colorsService } from "@/services/color.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useDeleteCategory = () => {
  const params = useParams<{ storeId: string }>();
  const { push } = useRouter();

  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending: isLoadingDelete } = useMutation({
    mutationKey: ["delete category"],
    mutationFn: () => colorsService.delete(params.storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get categories for store dashboard"] });
      toast.success("Category deleted successfully");
      push(STORE_URL.categories(params.storeId));
    },
    onError: () => {
      toast.error("Error deleting category");
    }
  });

  return useMemo(() => ({
    deleteCategory,
    isLoadingDelete
  }), [deleteCategory, isLoadingDelete]);
};