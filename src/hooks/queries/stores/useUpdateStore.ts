import { IStoreUpdate } from "@/app/shared/types/store.interface";
import { storeService } from "@/services/store.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export function useUpdateStore() {
  // TODO: Create interface for params
  const params = useParams<{storeId: string}>();

  const queryClient = useQueryClient();
  
  const { data: store } = useQuery({
    queryKey: ['store', params.storeId],
    queryFn: () => storeService.getById(params.storeId),
  });

  const { mutate: updateStore, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update store'],
    mutationFn: (data: IStoreUpdate) => storeService.update(params.storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Store updated successfully');
    },
    onError: () => {
      toast.error('Error updating store');
    }
  });

  return useMemo(() => ({ store, updateStore, isLoadingUpdate }), [store, updateStore, isLoadingUpdate]);
}