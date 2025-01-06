"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { UploadedFile } from "@/difinitions/types/fileupload";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadedFilesCard } from "@/components/fileupload/uploaded-files-card";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import { FileUploader } from "@/components/fileupload/file-uploader";
import { organizationReferenceSchema } from "@/components/schema/schema";

type FormValues = z.infer<typeof organizationReferenceSchema>;

export function OrganizationReferenceForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [progresses, setProgresses] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(organizationReferenceSchema),
    defaultValues: { images: [] },
  });

  async function simulateFileUpload(files: File[]) {
    setIsUploading(true);

    // Simulating file upload progress
    const newUploadedFiles: UploadedFile[] = [];

    for (const file of files) {
      const fileKey = file.name;
      const uploadProgress = { loaded: 0, total: file.size };

      // Simulate upload progress
      const interval = setInterval(() => {
        uploadProgress.loaded += file.size * 0.1;
        const progressPercent = Math.min(
          Math.round((uploadProgress.loaded / uploadProgress.total) * 100),
          100,
        );

        setProgresses((prev) => ({
          ...prev,
          [fileKey]: progressPercent,
        }));

        if (progressPercent === 100) clearInterval(interval);
      }, 500);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

      // Map each file to match the UploadedFile interface
      const uploadedFile: UploadedFile = {
        key: file.name,
        url: URL.createObjectURL(file),
        appUrl: "https://your-app-url.com/files/" + file.name,
        fileHash: "dummy-hash-" + file.name,
        customId: null,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        file: { ...file, preview: URL.createObjectURL(file) },
      };

      newUploadedFiles.push(uploadedFile);
    }

    setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
    setIsUploading(false);
  }

  function onSubmit(data: FormValues) {
    toast.promise(simulateFileUpload(data.images), {
      loading: "Uploading files...",
      success: "Files uploaded successfully",
      error: "File upload failed",
    });
    form.reset();
    setIsEditing(false);
  }

  function handleCancel() {
    form.reset();
    setIsEditing(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="flex flex-col border-0 shadow-none rounded-none gap-6">
          {/* View Mode */}
          {!isEditing && (
            <Card className="flex flex-col gap-6 p-9 border-2 rounded-lg border-iDonate-navy-accent">
              <CardHeader className="flex flex-row justify-between p-0">
                <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                  Reference Information
                </CardTitle>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-iDonate-white-space border-2 text-iDonate-navy-primary hover:bg-iDonate-light-gray border-iDonate-navy-accent dark:text-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:hover:bg-black"
                >
                  <SquarePen className="mr-2" />
                  Edit
                </Button>
              </CardHeader>

              <CardContent className="p-0 m-0">
                <UploadedFilesCard uploadedFiles={uploadedFiles} />
              </CardContent>
            </Card>
          )}

          {/* Edit Mode */}
          {isEditing && (
            <Card className="flex flex-col gap-6 p-9 bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
              <CardHeader className="flex flex-row justify-between p-0">
                <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                  Reference Information
                </CardTitle>

                <div className="flex gap-3">
                  {/* Cancel Button */}
                  {form.formState.isDirty ? (
                    <AlertComfirmDialog
                      trigger={
                        <Button
                          type="button"
                          className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error  "
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
                      className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error dark:bg-iDonate-dark-mode dark:hover:bg-black"
                    >
                      Cancel
                    </Button>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary dark:text-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:hover:bg-black"
                  >
                    Submit
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          onUpload={simulateFileUpload}
                          maxFileCount={4}
                          maxSize={4 * 1024 * 1024}
                          progresses={progresses}
                          disabled={isUploading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}
        </Card>
      </form>
    </Form>
  );
}
