import { fileService } from "@/services/file.service";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useRef } from "react";
import toast from "react-hot-toast";

interface UseUploadProps {
  onChange: (value: string[]) => void;
}

export function useUpload({
  onChange
}: UseUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFiles, isPending: isUploading } = useMutation({
    mutationKey: ["upload files"],
    mutationFn: (files: FormData) => fileService.upload(files),
    onSuccess: (data) => {
      onChange(data.map((file) => file.url));
    },
    onError: () => {
      toast.error("Error uploading files");
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      uploadFiles(formData);
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  }

  return useMemo(() => ({
    handleButtonClick,
    handleFileChange,
    fileInputRef,
    isUploading
  }), [
    handleButtonClick,
    handleFileChange,
    fileInputRef,
    isUploading
  ]);
}