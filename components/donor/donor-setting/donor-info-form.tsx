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
import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import { organizationInfomationSchema } from "@/components/schema/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/services/user-profile";

type DonorInfoFormProps = {
  onFullnamePercentageUpdate: (fullnamePercentage: number) => void;
  onEmailPercentageUpdate: (emailPercentage: number) => void;
  onContactPercentageUpdate: (contactPercentage: number) => void;
};

export function DonorInfoForm({
  onFullnamePercentageUpdate,
  onEmailPercentageUpdate,
  onContactPercentageUpdate,
}: DonorInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Fetch donor profile data
  const { data: donorProfile } = useGetUserProfileQuery({});

  // Mutation to update donor profile
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const form = useForm<z.infer<typeof organizationInfomationSchema>>({
    resolver: zodResolver(organizationInfomationSchema),
    defaultValues: {
      fullName: donorProfile?.fullName || "",
      email: donorProfile?.email || "",
      contact: donorProfile?.contact || "",
    },
  });

  const { watch, handleSubmit, reset, control, formState } = form;

  const fullName = watch("fullName");
  const email = watch("email");
  const contact = watch("contact");

  // Update percentages based on input
  useEffect(() => {
    const calculateCompletionPercentage = () => {
      const fullNamePercentage = fullName.trim() ? 20 : 0;
      const emailPercentage = email.trim() ? 20 : 0;
      const contactPercentage = contact.trim() ? 20 : 0;

      onFullnamePercentageUpdate(fullNamePercentage);
      onEmailPercentageUpdate(emailPercentage);
      onContactPercentageUpdate(contactPercentage);
    };

    calculateCompletionPercentage();
  }, [
    fullName,
    email,
    contact,
    onFullnamePercentageUpdate,
    onEmailPercentageUpdate,
    onContactPercentageUpdate,
  ]);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof organizationInfomationSchema>) => {
    try {
      if (!donorProfile?.uuid) return;

      // Update the profile using RTK Mutation
      await updateUserProfile({
        uuid: donorProfile.uuid,
        updatedUserProfile: values,
      }).unwrap();

      console.log("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    reset({
      fullName: donorProfile?.fullName || "",
      email: donorProfile?.email || "",
      contact: donorProfile?.contact || "",
    });
    setIsEditing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* View Mode */}
        {!isEditing && (
          <Card className="flex flex-col rounded-lg border-2 border-iDonate-navy-accent gap-2 lg:gap-6 p-4 md:p-6 lg:p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-lg lg:text-2xl font-medium text-iDonate-navy-secondary">
                Basic Information
              </CardTitle>

              <Button
                onClick={() => setIsEditing(true)}
                className="text-xs lg:text-sm bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
              >
                <SquarePen />
                Edit
              </Button>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-4 sm:gap-6 lg:gap-9 p-0 m-0">
              <div className="flex flex-col md:space-y-1 ">
                <CardDescription className="text-xs sm:text-sm lg:text-lg text-iDonate-gray">
                  Full Name
                </CardDescription>
                <CardDescription className="text-sm sm:text-description-eng lg:text-medium-eng text-iDonate-navy-primary">
                  {donorProfile?.fullName || "No full name provided"}
                </CardDescription>
              </div>

              <div className="flex flex-col md:space-y-1">
                <CardDescription className="text-xs sm:text-sm lg:text-lg text-iDonate-gray">
                  Email
                </CardDescription>
                <CardDescription className="text-sm sm:text-description-eng lg:text-medium-eng text-iDonate-navy-primary">
                  {donorProfile?.email || "No email provided"}
                </CardDescription>
              </div>

              <div className="flex flex-col md:space-y-1">
                <CardDescription className="text-xs sm:text-sm lg:text-lg text-iDonate-gray">
                  Contact
                </CardDescription>
                <CardDescription className="text-sm sm:text-description-eng lg:text-medium-eng text-iDonate-navy-primary">
                  {donorProfile?.contact || "No contact provided"}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-2 lg:gap-6 p-4 md:p-6 lg:p-9">
            <CardHeader className="flex flex-col sm:flex-row items-start justify-between p-0 m-0">
              <CardTitle className="text-lg lg:text-2xl font-medium text-iDonate-navy-secondary whitespace-nowrap">
                Organization Information
              </CardTitle>

              <div className="flex w-full justify-end gap-3">
                {/* Cancel Button */}
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-iDonate-white-space text-xs lg:text-sm border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                >
                  Submit
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-9 p-0 m-0">
              <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                      Full Name
                    </FormLabel>
                    <FormControl className="text-sm lg:text-medium-eng">
                      <Input
                        placeholder="Elizabeth Joe"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                      This is your organization's full name.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                      Email
                    </FormLabel>
                    <FormControl className="text-sm lg:text-medium-eng">
                      <Input
                        placeholder="ElizabethJoe@gmail.com"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                      This is your organization's contact email.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-xs sm:text-sm lg:text-lg text-iDonate-navy-secondary">
                      Contact
                    </FormLabel>
                    <FormControl className="text-sm lg:text-medium-eng">
                      <Input
                        placeholder="+855 12345678"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
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