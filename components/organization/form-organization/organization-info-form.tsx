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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { organizationInfomationSchema } from "@/components/schema/schema";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import {
  useEditOrganizationsMutation,
  useGetOrganizationByuuidQuery,
} from "@/redux/services/organization-service";
import { OrganizationType } from "@/difinitions/types/organization/OrganizationType";
import { toast } from "@/hooks/use-toast";

export function OrganizationInfoForm({ uuid }: { uuid: string }) {
  const {
    data: organization,
    isLoading,
    error,
  } = useGetOrganizationByuuidQuery(uuid);
  const [editOrganization] = useEditOrganizationsMutation();

  const [isEditing, setIsEditing] = useState(false);

  // Initialize form with default values
  const form = useForm<z.infer<typeof organizationInfomationSchema>>({
    resolver: zodResolver(organizationInfomationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Update form values when organization data is fetched
  useEffect(() => {
    if (organization) {
      form.reset({
        name: organization?.name || "",
        email: organization?.email || "",
        phone: organization?.phone || "",
      });
    }
  }, [organization, form]);

  async function onSubmit(
    values: z.infer<typeof organizationInfomationSchema>,
  ) {
    if (!organization?.uuid) return;

    try {
      const updatedOrganization = {
        // ... values, // Keep all existing properties
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: organization.address || "", // Ensure address is always included
        description: organization.description || null,
        bio: organization.bio || null,
        image: organization.image || null,
        purpose: organization.purpose || null,
        fileReferences: organization.fileReferences,
      };

      await editOrganization({
        uuid: organization.uuid,
        updatedData: updatedOrganization,
      }).unwrap();

      toast({
        title: "Organization Updated",
        description: "The organization details have been updated successfully.",
        variant: "default",
      });

      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update the organization details.",
        variant: "destructive",
      });
    }
  }

  function handleCancel() {
    if (organization) {
      form.reset({
        name: organization.name || "",
        email: organization.email || "",
        phone: organization.phone || "",
      });
    }
    setIsEditing(false);
  }

  if (isLoading) return <p>Loading organization details...</p>;
  if (error)
    return <p className="text-red-500">Failed to load organization details.</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* View Mode */}
        {!isEditing && (
          <Card className="flex flex-col rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                Organization Information
              </CardTitle>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary dark:text-iDonate-navy-accent dark:bg-iDonate-dark-mode"
              >
                <SquarePen />
                Edit
              </Button>
            </CardHeader>

            <CardContent className="flex w-full gap-9 p-0 m-0">
              <div className="flex flex-col space-y-3">
                <CardDescription className="text-lg text-iDonate-gray">
                  Full Name
                </CardDescription>
                <CardDescription className="text-xl text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                  {organization?.name}
                </CardDescription>
              </div>

              <div className="flex flex-col space-y-3">
                <CardDescription className="text-lg text-iDonate-gray">
                  Email
                </CardDescription>
                <CardDescription className="text-xl text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                  {organization?.email}
                </CardDescription>
              </div>

              <div className="flex flex-col space-y-3">
                <CardDescription className="text-lg text-iDonate-gray">
                  Contact
                </CardDescription>
                <CardDescription className="text-xl text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                  {organization?.phone}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9 dark:bg-iDonate-dark-mode">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                Edit Organization Information
              </CardTitle>

              <div className="flex gap-3">
                {/* Cancel Button */}
                {form.formState.isDirty ? (
                  <AlertComfirmDialog
                    trigger={
                      <Button
                        type="button"
                        className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error "
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
                    className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error dark:bg-black dark:hover:bg-iDonate-dark-mode"
                  >
                    Cancel
                  </Button>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary dark:text-iDonate-navy-accent dark:bg-iDonate-dark-mode"
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex gap-9 p-0 m-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}
      </form>
    </Form>
  );
}
