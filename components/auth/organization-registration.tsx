"use client";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
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

type RegistrationFormValues = z.infer<typeof organizationRegistrationSchema>;

export default function OrganizationRegistration() {
  const { data: userProfile } = useGetUserProfileQuery({});

  const { toast } = useToast();

  //  console.log("The value of Token: ",userProfile);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(organizationRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      phone: "",
      address: "",
      image: "",
      bio: "",
      purpose: "",
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
    } catch (error: any) {
      handleErrorWithToast(
        error,
        toast,
        `create organization "${values.name}"`,
      );
    }
  }

  const name = watch("name");
  const email = watch("email");
  const phone = watch("phone");
  const address = watch("address");
  const description = watch("description");
  const image = watch("image");
  const bio = watch("bio");
  const purpose = watch("purpose");

  // Track if the form is filled
  const isFormFilled =
    !!email?.trim() ||
    !!phone?.trim() ||
    !!address?.trim() ||
    !!description?.trim() ||
    !!name?.trim();
  !!image?.trim() || !!bio?.trim() || !!purpose?.trim();

  // Add beforeunload event listener
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormFilled) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormFilled]);

  return (
    <section className="flex flex-col gap-6 p-9 w-full mx-auto 2xl:px-24 ">
      <div className="flex gap-6">
        <div className="w-4 bg-iDonate-green-primary rounded-sm"></div>

        <div className="flex flex-col gap-4 ">
          <h1 className="text-4xl font-semibold text-iDonate-green-primary">
            ការចុះឈ្មោះអង្គការ
          </h1>

          <p className="text-lg text-iDonate-gray">
            សូមបំពេញព័ត៌មានរបស់អ្នកដើម្បីចុះឈ្មោះអង្គការ
          </p>
        </div>
      </div>

      <div className="w-full  border-2 border-iDonate-navy-accent rounded-lg flex flex-col items-center justify-center p-9  gap-6">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h2 className="text-2xl font-semibold text-iDonate-navy-primary">
            Connecting Many Hearts of Kindness Together
          </h2>

          <p className="text-iDonate-navy-secondary">
            Rise Together, Share Together
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Card className="w-full flex flex-col gap-6 border-iDonate-navy-accent  border-0 shadow-none">
              <CardHeader className="flex p-0 py-4 items-start justify-between  m-0 border-b-2 border-iDonate-navy-secondary border-dashed">
                <CardTitle className="text-lg lg:text-2xl font-medium text-iDonate-navy-secondary whitespace-nowrap">
                  Basic Information
                </CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-3 gap-4 p-0 px-6 m-0">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                        Oragnization Name
                      </FormLabel>
                      <FormControl className="text-description-eng">
                        <Input
                          placeholder="kanpheakbopha hospital"
                          className="w-full"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                        This is the name of the organization.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                        Email
                      </FormLabel>
                      <FormControl className="text-description-eng">
                        <Input
                          placeholder="ElizabethJoe@gmail.com"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                        This is the email of the organization.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                        Description
                      </FormLabel>
                      <FormControl className="text-description-eng">
                        <Input
                          placeholder="kanpheakbopha hospital"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                        This is the description of the organization.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                        Contact
                      </FormLabel>
                      <FormControl className="text-description-eng">
                        <Input
                          placeholder="070 ********"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                        This is the email of the organization.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                        Address
                      </FormLabel>
                      <FormControl className="text-description-eng">
                        <Input
                          placeholder="Phnom Penh, Cambodia"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                        This is the address of the organization.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                        Image URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.png"
                          className="w-full"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                        Provide the URL of the organization's image.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                        Bio
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Brief bio of the organization"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                        Provide a short bio of the organization.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                        Purpose
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Purpose of the organization"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                        Provide the purpose of the organization.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="w-full flex items-center justify-end">
              <Button
                type="submit"
                className="mt-4  bg-iDonate-green-primary text-white py-2 px-4 rounded"
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
