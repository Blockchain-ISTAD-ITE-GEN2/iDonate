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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { organizationAddressSchema } from "@/components/schema/schema";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import { OrganizationType } from "@/difinitions/dto/OrganizationType";
import { useGetOrganizationByuuidQuery } from "@/redux/services/organization-service";

export function OrganizationAddressForm({uuid}:{uuid:string}) {

  const {data : organization} = useGetOrganizationByuuidQuery(uuid);

  const typeOrganization : OrganizationType = organization || {};
  // 1. State to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // 2. Define your form.
  const form = useForm<z.infer<typeof organizationAddressSchema>>({
    resolver: zodResolver(organizationAddressSchema),
    defaultValues: {
      address: typeOrganization?.address
    },
  });

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof organizationAddressSchema>) {
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
                Location
              </CardTitle>

              <Button
                onClick={() => setIsEditing(true)}
                className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary dark:text-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:hover:bg-black"
              >
                <SquarePen />
                Edit
              </Button>
            </CardHeader>

            <CardContent className="flex w-fle gap-9 p-0 m-0">
              <div className="flex flex-col space-y-3">
                <CardDescription className="text-xl text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                {typeOrganization?.address}
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
                    className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error dark:bg-iDonate-dark-mode dark:hover:bg-black"
                  >
                    Cancel
                  </Button>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary dark:bg-iDonate-dark-mode dark:hover:bg-black dark:text-iDonate-navy-accent"
                >
                  Submit
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex w-fle gap-9 p-0 m-0">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input placeholder="Elizabeth Joe" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-sm">
                      This is your organization's address.
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
