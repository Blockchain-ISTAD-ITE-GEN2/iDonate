"use client";
import { type ChangeEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { z } from "zod";
import { organizationRegistrationSchema } from "../schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrganizationMutation } from "@/redux/services/organization-service";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "../fileupload/file-uploader";

type RegistrationFormValues = z.infer<typeof organizationRegistrationSchema>;

export default function OrganizationRegistration() {
  const { data: userProfile } = useGetUserProfileQuery({});
  const { toast } = useToast();
  const router = useRouter();

  // 1. State to toggle between view and edit mode
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgresses, setUploadProgresses] = useState<
    Record<string, number>
  >({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  //  console.log("The value of Token: ",userProfile);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(organizationRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      phone: "",
      address: "",
      image: undefined,
      bio: "",
      purpose: "",
      referenceInformation: [],
    },
  });

  const [createOrganization, { isLoading, error }] =
    useCreateOrganizationMutation();

  const { watch, handleSubmit, reset, control, formState } = form;

  function handleErrorWithToast(error: any, toast: any, context: string) {
    console.error(`Error during ${context}:`, error);

    if (error?.status === 409 && error?.data?.error?.description) {
      if (error.data.error.description.includes("already exists")) {
        toast({
          title: "Error",
          description: `An organization with the name "${error}" already exists.`,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: `Failed to ${context}. Please try again.`,
        variant: "destructive",
      });
    }
  }

  async function onSubmit(
    values: z.infer<typeof organizationRegistrationSchema>,
  ) {
    console.log("Form submitted with values:", values); // Debug log

    try {
      const newOrganization = {
        name: values.name,
        description: values.description,
        email: values.email,
        phone: values.phone,
        address: values.address,
        image: values.image,
        bio: values.bio,
        purpose: values.purpose,
      };

      await createOrganization({
        newOrganization: newOrganization,
        uuid: userProfile?.uuid,
      }).unwrap();

      toast({
        title: "Success",
        description: "Organization created successfully!",
        variant: "default",
      });

      // Route to the organization dashboard after successful submission
      router.push("/waiting-verification");
    } catch (error: any) {
      handleErrorWithToast(
        error,
        toast,
        `create organization "${values.name}"`,
      );
    }
  }

  const handleFilesUpload = async (files: File[]): Promise<void> => {
    // Simulate a file upload process
    const simulateUpload = (file: File) =>
      new Promise((resolve, reject) => {
        const progressInterval = setInterval(() => {
          setUploadProgresses((prev) => {
            const newProgress = Math.min((prev[file.name] || 0) + 10, 100);
            return { ...prev, [file.name]: newProgress };
          });

          if (uploadProgresses[file.name] >= 100) {
            clearInterval(progressInterval);
            resolve(file);
          }
        }, 200);
      });

    await Promise.all(files.map(simulateUpload));
    // toast.success(`${files.length} file(s) uploaded successfully!`);
  };

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) {
    const file = event.target.files?.[0];
    if (file) {
      // if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
      //   alert("Only JPG or PNG files are allowed.");
      //   return;
      // }
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
      onChange(previewURL); // Notify form of the new value
    }
  }

  const name = watch("name");
  const email = watch("email");
  const phone = watch("phone");
  const address = watch("address");
  const description = watch("description");
  // const image = watch("image");
  const bio = watch("bio");
  const purpose = watch("purpose");

  // Track if the form is filled
  const isFormFilled =
    !!email?.trim() ||
    !!phone?.trim() ||
    !!address?.trim() ||
    !!description?.trim() ||
    !!name?.trim();
  // !!image?.trim() || !!bio?.trim() || !!purpose?.trim();

  // Add beforeunload event listener
  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     if (isFormFilled) {
  //       event.preventDefault();
  //       event.returnValue =
  //         "You have unsaved changes. Are you sure you want to leave?";
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [isFormFilled]);

  return (
    <section className="flex flex-col gap-6 p-4 sm:p-6 md:p-8 lg:p-12 w-full mx-auto">
      <div className="flex gap-6">
        <div className="w-4 bg-iDonate-green-primary rounded-sm"></div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-4xl font-semibold text-iDonate-green-primary">
            ការចុះឈ្មោះអង្គការ
          </h1>
          <p className="text-base md:text-lg text-iDonate-gray">
            សូមបំពេញព័ត៌មានរបស់អ្នកដើម្បីចុះឈ្មោះអង្គការ
          </p>
        </div>
      </div>

      <div className="w-full border-2 border-iDonate-navy-accent rounded-lg flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 gap-6">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-iDonate-navy-primary">
            Connecting Many Hearts of Kindness Together
          </h2>
          <p className="text-iDonate-navy-secondary">
            Rise Together, Share Together
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full" lang="km">
            <Card className="w-full flex flex-col gap-6 border-0 shadow-none">
              <CardHeader className="flex p-0 py-4 items-start justify-between border-b-2 border-dashed border-iDonate-navy-secondary">
                <CardTitle className="text-base md:text-lg lg:text-2xl font-medium text-iDonate-navy-secondary whitespace-nowrap">
                  ព័ត៌មានទូទៅ
                </CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
                {/* Organization Name */}
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm lg:text-lg text-iDonate-navy-secondary">
                        ឈ្មោះអង្គការ
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="kanpheakbopha hospital"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs lg:text-sm text-iDonate-gray">
                        នេះគឺជាឈ្មោះអង្គការ
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm lg:text-lg text-iDonate-navy-secondary">
                        អ៊ីម៉ែល
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="kanpheakbopha.hospital@gmail.com"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs lg:text-sm text-iDonate-gray">
                        នេះគឺជាអ៊ីម៉ែលរបស់អង្គការ
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Contact */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm lg:text-lg text-iDonate-navy-secondary">
                        លេខទំនាក់ទំនង
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="070 ********"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs lg:text-sm text-iDonate-gray">
                        នេះគឺជាលេខទំនាក់ទំនងរបស់អង្គការ
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm lg:text-lg text-iDonate-navy-secondary">
                        អាសយដ្ឋាន
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phnom Penh, Cambodia"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs lg:text-sm text-iDonate-gray">
                        នេះគឺជាអាសយដ្ឋានរបស់អង្គការ
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="row-span-2 h-full flex flex-col justify-between">
                      <FormLabel className="text-sm lg:text-lg text-iDonate-navy-secondary">
                        ការពិពណ៌នា
                      </FormLabel>
                      <FormControl className=" flex-grow min-h-[100px]">
                        <Textarea
                          placeholder="Brief description"
                          className="w-full"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs lg:text-sm text-iDonate-gray">
                        ផ្តល់ការពិពណ៌នារបស់អង្គការ
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="row-span-2 h-full flex flex-col justify-between">
                      <FormLabel className="text-sm lg:text-lg text-iDonate-navy-secondary">
                        Bio
                      </FormLabel>
                      <FormControl className=" flex-grow min-h-[100px]">
                        <Textarea
                          placeholder="Brief bio of the organization"
                          className="w-full"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs lg:text-sm text-iDonate-gray">
                        នេះគឺជា Bio អង្គការ
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Purpose */}
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem className="row-span-2 h-full flex flex-col justify-between">
                      <FormLabel className="text-sm lg:text-lg text-iDonate-navy-secondary">
                        គោលបំណង
                      </FormLabel>
                      <FormControl className=" flex-grow min-h-[100px]">
                        <Textarea
                          placeholder="Purpose of the organization "
                          className="w-full"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs lg:text-sm text-iDonate-gray">
                        នេះគឺជាគោលបំណងរបស់អង្គការ
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Organization Image */}
                <FormField
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="row-span-2 h-full flex flex-col justify-between">
                      <FormLabel className="text-sm lg:text-lg text-iDonate-navy-secondary">
                        រូបភាពអង្គការ
                      </FormLabel>
                      <FormControl className="relative flex-grow min-h-[100px]">
                        {previewImage ? (
                          <div className="h-full  w-full group  cursor-pointer flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 text-center transition ">
                            <Image
                              src={previewImage || "/placeholder.svg"}
                              alt="Preview"
                              fill
                              className="rounded-md object-contain h-full w-full"
                            />
                          </div>
                        ) : (
                          <div className="group hover:bg-accent relative h-full w-full cursor-pointer flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 text-center transition ">
                            <input
                              id="file-input"
                              type="file"
                              accept=".jpg, .jpeg, .png"
                              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) =>
                                handleFileChange(e, field.onChange)
                              }
                              ref={field.ref}
                            />
                            <div className="flex flex-col items-center justify-center gap-1">
                              <div className="rounded-full border border-dashed p-3">
                                <Upload
                                  className="size-5 text-muted-foreground"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="font-medium text-muted-foreground">
                                Upload an organization image
                              </p>
                            </div>
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs lg:text-sm text-iDonate-gray">
                        នេះគឺជារូបភាពអង្គការ
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="w-full flex flex-col gap-6 border-0 shadow-none">
              <CardHeader className="flex p-0 py-4 items-start justify-between border-b-2 border-dashed border-iDonate-navy-secondary">
                <CardTitle className="text-base md:text-lg lg:text-2xl font-medium text-iDonate-navy-secondary whitespace-nowrap">
                  ព័ត៌មានលំអិត
                </CardTitle>
              </CardHeader>

              <CardContent className="flex relative flex-1 p-0 m-0">
                <FormField
                  control={control}
                  name="referenceInformation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-iDonate-navy-secondary">
                        ព័ត៌មានលំអិតរបស់អង្គភាព
                      </FormLabel>
                      <FormControl>
                        <FileUploader
                          className=" border-iDonate-gray"
                          value={uploadedFiles}
                          onValueChange={setUploadedFiles}
                          onUpload={handleFilesUpload}
                          progresses={uploadProgresses}
                          maxFileCount={5}
                          maxSize={1024 * 1024 * 5} // 5MB
                          accept={{
                            "image/*": [],
                            "application/pdf": [],
                            "application/msword": [],
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="w-full flex items-center justify-end">
              <Button
                type="submit"
                className="mt-4 bg-iDonate-green-primary hover:bg-iDonate-green-primary text-white py-2 px-4 rounded"
              >
                {isLoading ? "កំពុងចុះឈ្មោះ​ ..." : "ចុះឈ្មោះ"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
