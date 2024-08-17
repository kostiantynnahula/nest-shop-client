import { PUBLIC_URL } from "@/config/url.config";
import { storeService } from "@/services/store.service";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export function useDeleteStore() {
  // TODO: Refactor this, investigate how to pass store id as an argument
  const params = useParams<{storeId: string}>();
  const router = useRouter();
  const { mutate: deleteStore, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete store'],
    mutationFn: () => storeService.delete(params.storeId),
    onSuccess: () => {
      toast.success('Store deleted successfully');
      router.push(PUBLIC_URL.home())
    },
    onError: () => {
      toast.error('Failed to delete store');
    }
  });

  return useMemo(() => ({
    deleteStore,
    isLoadingDelete
  }), [deleteStore, isLoadingDelete]);
}