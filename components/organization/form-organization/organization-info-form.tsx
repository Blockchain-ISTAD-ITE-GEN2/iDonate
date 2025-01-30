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
import { useState } from "react";
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
import { useGetOrganizationByuuidQuery } from "@/redux/services/organization-service";
import { OrganizationEventType } from "@/difinitions/dto/Organization-event";
import { OrganizationType } from "@/difinitions/dto/OrganizationType";

export function OrganizationInfoForm({uuid}:{uuid:string}) {

  const {data : organization} = useGetOrganizationByuuidQuery(uuid);

  const typeOrganization : OrganizationType = organization || {};


  // 1. State to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // 2. Define your form.
  const form = useForm<z.infer<typeof organizationInfomationSchema>>({
    resolver: zodResolver(organizationInfomationSchema),
    defaultValues: {
      fullName: typeOrganization?.name,
      email: typeOrganization?.email,
      contact: typeOrganization?.phone,
    },
  });

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof organizationInfomationSchema>) {
    console.log(values);
    // Switch back to view mode after submitting
    setIsEditing(false);
  }

  function handleCancel() {
    form.reset(); // Reset the form
    setIsEditing(false); // Switch back to view mode
  }

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

            <CardContent className="flex w-fle gap-9 p-0 m-0">
              <div className="flex flex-col space-y-3">
                <CardDescription className="text-lg text-iDonate-gray">
                  Full Name
                </CardDescription>
                <CardDescription className="text-xl text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                {typeOrganization?.name}
                </CardDescription>
              </div>

              <div className="flex flex-col space-y-3">
                <CardDescription className="text-lg text-iDonate-gray">
                  Email
                </CardDescription>
                <CardDescription className="text-xl text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                  {typeOrganization?.email}
                </CardDescription>
              </div>

              <div className="flex flex-col space-y-3">
                <CardDescription className="text-lg text-iDonate-gray ">
                  Contact
                </CardDescription>
                <CardDescription className="text-xl text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                  {typeOrganization?.phone}
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
                Organization Information
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
                  Submit
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex gap-9 p-0 m-0">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Elizabeth Joe"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-sm">
                      This is your organization's full name.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ElizabethJoe@gmail.com"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-sm">
                      This is your organization's contact email.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                      Contact
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+855 12345678"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-sm">
                      This is your organization's contact number.
                    </FormDescription>
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
