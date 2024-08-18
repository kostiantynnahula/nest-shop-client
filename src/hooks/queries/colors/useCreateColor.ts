import { IColorInput } from "@/app/shared/types/color.interface";
import { STORE_URL } from "@/config/url.config";
import { colorsService } from "@/services/color.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useCreateColor = () => {
  const params = useParams<{ storeId: string }>();
  const { push } = useRouter();

  const queryClient = useQueryClient();

  const { mutate: createColor, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create color"],
    mutationFn: (data: IColorInput) => colorsService.create(data, params.storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get colors for store dashboard"] });
      toast.success("Color created successfully");
      push(STORE_URL.colors(params.storeId));
    },
    onError: () => {
      toast.error("Error creating color");
    }
  });

  return useMemo(() => ({
    createColor,
    isLoadingCreate
  }), [createColor, isLoadingCreate]);
};