"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { organizationMediaSchema } from "@/components/schema/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import { useGetUserProfileQuery, useUpdateAvatarMutation } from "@/redux/services/user-profile";
import { useParams } from "next/navigation";
import AvartarPlaceHolder from '@/public/images/placeholder.png';
import { toast } from "react-hot-toast";
import { UpdateProfileImageType } from "@/lib/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadSingleMediaMutation } from "@/redux/services/media";

export function DonorMediaForm({
  onPercentageUpdate,
}: {
  onPercentageUpdate: (percentage: number) => void;
}) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof organizationMediaSchema>>({
    resolver: zodResolver(organizationMediaSchema),
    defaultValues: {
      image: "",
    },
  });

  const { uuid } = useParams();
  const [updateAvatar, { isLoading: isUpdating }] = useUpdateAvatarMutation();
  const [uploadMedia] = useUploadSingleMediaMutation();
  const { data: userProfile } = useGetUserProfileQuery({});

  const { watch, handleSubmit, reset, control, formState } = form;
  const mediaValue = watch("image");

  useEffect(() => {
    onPercentageUpdate(mediaValue ? 20 : 0);
  }, [mediaValue, onPercentageUpdate]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
      toast.error("Only JPG or PNG files are allowed.");
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
    setSelectedFile(file);
    onChange(previewURL);
  };

  const handleCancel = () => {
    reset();
    setPreviewImage(null);
    setSelectedFile(null);
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
  };

  const onSubmit = async (data: z.infer<typeof organizationMediaSchema>) => {
    if (!selectedFile || !uuid) return;

    try {
      if(selectedFile instanceof File){
        console.log("file")
      // Upload the file using RTK Query
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Form Data value : ", formData);

      const uploadResponse = await uploadMedia(formData).unwrap();

      // Update the user's avatar
      const imageUri: UpdateProfileImageType = {
        file: uploadResponse?.name,
      };

      await updateAvatar({
        uuid: uuid as string,
        file: formData
      }).unwrap();

      toast.success("Avatar updated successfully");
      handleCancel();
    }
    } catch (error) {
      console.error("Error while uploading avatar:", error);
      toast.error("Error while uploading avatar");
    }
  };

  const profileImageUrl = userProfile?.avatar
    ? `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/media/${userProfile?.avatar}`
    : AvartarPlaceHolder;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          className={`flex flex-col border-0 shadow-none px-4 sm:px-10 md:px-16 lg:px-20 py-8 sm:py-10 md:py-12 rounded-t-lg rounded-b-none items-start gap-4 sm:gap-6 ${
            previewImage ? "bg-iDonate-light-gray" : ""
          }`}
        >
          {previewImage && (
            <CardHeader className="w-full flex flex-col sm:flex-row items-start justify-between p-0 m-0">
              <CardTitle className="text-lg lg:text-2xl font-medium text-iDonate-navy-secondary whitespace-nowrap">
                Image Preview
              </CardTitle>

              <div className="flex w-full justify-end gap-3">
                {formState.isDirty ? (
                  <AlertComfirmDialog
                    trigger={
                      <Button
                        type="button"
                        className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error"
                      >
                        Cancel
                      </Button>
                    }
                    title="Are you sure you want to cancel?"
                    description="All unsaved changes will be lost. Do you want to proceed?"
                    actionText="Yes, Cancel"
                    cancelText="No, Stay"
                    onAction={handleCancel}
                  />
                ) : (
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="bg-iDonate-white-space border-2 text-xs lg:text-sm hover:bg-red-50 border-iDonate-error text-iDonate-error"
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  type="submit"
                  className="bg-iDonate-white-space border-2 text-xs lg:text-sm hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardHeader>
          )}

          <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-9">
            <CardContent className="relative w-full sm:min-w-[300px] min-h-[300px] flex p-0 m-0">
              <Image
                src={previewImage || profileImageUrl}
                alt="Profile"
                fill
                className="rounded-md object-cover"
              />
            </CardContent>

            <CardContent className="flex flex-col p-0 m-0 gap-4">
              <FormField
                control={control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input
                          id="file-input"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileChange(e, field.onChange)}
                          ref={field.ref}
                        />
                        <Button
                          type="button"
                          className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                        >
                          <Upload />
                          New Media
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <div>
                      <FormDescription className="text-iDonate-gray text-sm">
                        JPG or PNG is allowed.
                      </FormDescription>
                      <FormDescription className="text-iDonate-gray text-sm">
                        At least 800x800 px recommended.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </div>
        </Card>
      </form>
    </Form>
  );
}