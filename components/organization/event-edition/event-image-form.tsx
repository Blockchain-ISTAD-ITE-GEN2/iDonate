  "use client";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Button } from "@/components/ui/button";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { useForm } from "react-hook-form";
  import { useState, useEffect } from "react";
  import { SquarePen } from "lucide-react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { eventSchemaEdition } from "@/components/schema/schema";
  import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
  import { FileUploader } from "@/components/fileupload/file-uploader";
  import {
    useAddEventMediaMutation,
    useDeleteEventMediaMutation,
    useUploadSingleMediaMutation,
  } from "@/redux/services/media";
  import { useGetEventByUuidQuery } from "@/redux/services/event-service";
  import { EventType } from "@/difinitions/types/event/EventType";
  import { useToast } from "@/hooks/use-toast";
  import { ScrollArea } from "@radix-ui/react-scroll-area";
  import { FileCard } from "@/components/fileupload/file-card";
  import Image from "next/image";

  const placeholderImage =
    "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg";

  export function EventImagesFormEdition({ uuid }: { uuid: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const { data: event } = useGetEventByUuidQuery(uuid);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [eventImages, setEventImages] = useState<string[]>(event?.images || []);

    const [createSingleFile] = useUploadSingleMediaMutation();
    const [addMoreEventImage] = useAddEventMediaMutation();
    const [deleteEventImage] = useDeleteEventMediaMutation();

    const { toast } = useToast();
    const typedEvent: EventType = event || {};

    useEffect(() => {
      if (event?.images) {
        setEventImages(event.images);
      }
    }, [event]);

    const handleFilesSelection = async (files: File[]) => {
      if (!typedEvent?.uuid) return;
      if (files.length === 0) {
        toast({
          title: "No Files Selected",
          description: "Please select at least one file to upload.",
          variant: "destructive",
        });
        return;
      }

      setUploading(true);

      try {
        let uploadedUris: string[] = [];

        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);

          const response = await createSingleFile(formData).unwrap();
          uploadedUris.push(response.uri);
        }

        // Add uploaded images immediately to the event
        await addMoreEventImage({
          uuid: typedEvent.uuid,
          mediaName: uploadedUris,
        }).unwrap();

        setEventImages([...eventImages, ...uploadedUris]); // Update UI
        toast({ title: "Success", description: "Images uploaded successfully." });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "An error occurred while uploading images.",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    };

    const handleDeleteImage = async (imageUrl: string) => {
      if (!typedEvent?.uuid) return;

      try {
        await deleteEventImage({
          uuid: typedEvent.uuid,
          mediaName: [imageUrl],
        }).unwrap();

        setEventImages(eventImages.filter((img) => img !== imageUrl)); // Update UI
        toast({ title: "Success", description: "Image deleted successfully." });
      } catch (error) {
        toast({
          title: "Deletion Failed",
          description: "Could not delete the image. Try again later.",
          variant: "destructive",
        });
      }
    };

    const form = useForm({
      resolver: zodResolver(eventSchemaEdition),
      defaultValues: { images: eventImages },
    });

    function handleCancel() {
      setIsEditing(false);
    }

    const { formState } = form;

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          {!isEditing && (
            <Card className="flex flex-col border-2 border-iDonate-navy-accent gap-6 p-9">
              <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
                <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                  Event Images
                </CardTitle>

                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                >
                  <SquarePen />
                  Edit
                </Button>
              </CardHeader>

              <CardContent>
                {eventImages.length > 0 ? (
                  <ScrollArea>
                    <div className="grid grid-cols-4 gap-6">
                      {eventImages.map((file, index) => (
                        <Image
                          key={index}
                          src={file || placeholderImage}
                          width={240} 
                          height={240}
                          alt={`Event ${index}`}
                          className="object-cover rounded-md w-full h-full"
                        />
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-gray-500">No images available.</p>
                )}
              </CardContent>
            </Card>
          )}

          {isEditing && (
            <Card className="border-2 border-iDonate-navy-accent gap-9 p-9">
              <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
                <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                  Event Images
                </CardTitle>
                <div className="flex gap-3">
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
                      className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                  >
                    { formState.isSubmitting ? "Submitting..." : "Submit" }
                  </Button>
                </div>
              </CardHeader>
              

              <CardContent>
                <FileUploader
                  value={uploadedFiles}
                  onValueChange={handleFilesSelection}
                  maxFileCount={5}
                  maxSize={5 * 1024 * 1024}
                  accept={{ "image/*": [] }}
                  disabled={uploading} // Disable button while uploading
                />

                {eventImages.length > 0 && (
                  <ScrollArea className="mt-4">
                    <div className="grid grid-cols-4 gap-6">
                      {eventImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={file}
                            width={240}
                            height={240}
                            alt={`Event ${index}`}
                            className="object-cover rounded-md w-full h-full"
                          />
                          <button
                            onClick={() => handleDeleteImage(file)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    );
  }
