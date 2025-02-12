"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ChangeEvent, useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { organizationMediaSchema } from "@/components/schema/schema";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import { OrganizationType } from "@/difinitions/types/organization/OrganizationType";
import {
  useGetOrganizationByuuidQuery,
  useUseUploadOrganizationImageMutation,
} from "@/redux/services/organization-service";
import { toast } from "@/hooks/use-toast";

export function OrganizationMediaForm({ uuid }: { uuid: string }) {
  const { data: organization } = useGetOrganizationByuuidQuery(uuid);
  const typeOrganization: OrganizationType = organization || {};

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploadOrgImage] = useUseUploadOrganizationImageMutation();

  const form = useForm<z.infer<typeof organizationMediaSchema>>({
    resolver: zodResolver(organizationMediaSchema),
    defaultValues: {
      image: typeOrganization?.image,
    },
  });

  async function onSubmit(values: z.infer<typeof organizationMediaSchema>) {
    if (!selectedFile) {
      toast({
        title: "Upload Error",
        description: "Please select an image before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Uploading file:", selectedFile.name);

      // Upload file using RTK Query mutation
      const uploadResponse = await uploadOrgImage({
        orgUuid: uuid,
        fileData: formData,
      }).unwrap();

      console.log("Upload Response:", uploadResponse);

      toast({
        title: "Upload Success",
        description: "Image uploaded successfully!",
        variant: "default",
      });

      // Force a refresh of the organization data
      setPreviewImage(uploadResponse.imageUrl); // Assuming response contains the new image URL

      // Reset form
      form.reset();
      setSelectedFile(null);
    } catch (error: any) {
      console.error("Upload Error:", error);

      toast({
        title: "Upload Failed",
        description:
          error?.data?.error ||
          "Internal Server Error. Please try again later.",
        variant: "destructive",
      });
    }
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
      toast({
        title: "Upload Failed",
        description: "Only JPG or PNG files are allowed.",
        variant: "destructive",
      });
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
    setSelectedFile(file);
    onChange(previewURL);
  };

  function handleCancel() {
    form.reset();
    setPreviewImage(null);
    setSelectedFile(null);
  }

  // Cleanup Blob URL on unmount
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card
          className={`flex flex-col border-0 shadow-none px-20 py-12 rounded-none items-start gap-6 ${
            previewImage
              ? "bg-iDonate-light-gray dark:bg-iDonate-dark-mode"
              : ""
          }`}
        >
          {/* Card Header: Conditionally rendered when previewImage exists */}
          {previewImage && (
            <CardHeader className="w-full flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                Image Preview
              </CardTitle>

              <div className="flex gap-3">
                {/* Cancel Button */}
                {form.formState.isDirty ? (
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
                    className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error"
                  >
                    Cancel
                  </Button>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardHeader>
          )}

          <div className="flex items-center gap-9">
            {/* Card Content for Image */}
            <CardContent className="flex p-0 m-0">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              ) : typeOrganization.image ? (
                <Image
                  src={
                    typeof typeOrganization.image === "string"
                      ? typeOrganization.image
                      : ""
                  }
                  alt="Organization"
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              ) : (
                <div className="w-[150px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">
                  No Image
                </div>
              )}
            </CardContent>

            {/* Card Content for Upload Button */}
            <CardContent className="flex flex-col p-0 m-0 gap-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input
                          id="file-input"
                          type="file"
                          accept="image/*"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileChange(e, field.onChange)}
                          ref={field.ref}
                        />
                        <Button
                          type="button"
                          className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                          onClick={() => {
                            document.getElementById("file-input")?.click();
                          }}
                        >
                          <Upload />
                          New Media
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <div>
                      <FormDescription className="text-iDonate-gray text-sm">
                        All image formats are allowed.
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
