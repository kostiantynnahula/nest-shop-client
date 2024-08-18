import { IColorInput } from "@/app/shared/types/color.interface";
import { colorsService } from "@/services/color.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useUpdateColor = () => {
  const params = useParams<{ storeId: string }>();

  const queryClient = useQueryClient();

  const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ["update color"],
    mutationFn: (data: IColorInput) => colorsService.update(params.storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get colors for store dashboard"] });
      toast.success("Color updated successfully");
    },
    onError: () => {
      toast.error("Error updating color");
    }
  });

  return useMemo(() => ({
    updateColor,
    isLoadingUpdate
  }), [updateColor, isLoadingUpdate]);
};