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
import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import { organizationBioSchema } from "@/components/schema/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import { Textarea } from "@/components/ui/textarea";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/services/user-profile";
import { EditprofileType, EditUserBioType } from "@/lib/definition";

export function DonorBioForm({
  onPercentageUpdate,
}: {
  onPercentageUpdate: (percentage: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  // Fetch donor profile data
  const { data: donorProfile } = useGetUserProfileQuery({});

  // Mutation to update donor profile
  const [updateUserProfile] = useUpdateUserProfileMutation();

  // Fetch donor profile data
  const { data: donorProfile } = useGetUserProfileQuery({});

  // Mutation to update donor profile
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const form = useForm<z.infer<typeof organizationBioSchema>>({
    resolver: zodResolver(organizationBioSchema),
    defaultValues: {
      bio: donorProfile?.bio || "",
      bio: donorProfile?.bio || "",
    },
  });

  const { watch, handleSubmit, reset, control, formState } = form;
  const bioValue = watch("bio");

  // Update percentage based on input
  useEffect(() => {
    if (bioValue.trim()) {
      onPercentageUpdate(10); // Bio field filled, update percentage
      onPercentageUpdate(10); // Bio field filled, update percentage
    } else {
      onPercentageUpdate(0); // Bio field empty, reset percentage
      onPercentageUpdate(0); // Bio field empty, reset percentage
    }
  }, [bioValue, onPercentageUpdate]);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof organizationBioSchema>) => {
    try {
      if (!donorProfile?.uuid) return;
  
      // Update the profile using RTK Mutation
      await updateUserProfile({
        uuid: donorProfile.uuid,
        updatedUserProfile: values?.bio as unknown as EditprofileType
      }).unwrap();
  
      console.log("Bio updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update bio:", error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    reset({ bio: donorProfile?.bio || "" });
    setIsEditing(false);
  };
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isEditing && (
          <Card className="flex flex-col rounded-lg border-2 border-iDonate-navy-accent gap-2 lg:gap-6 p-4 md:p-6 lg:p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-lg lg:text-2xl font-medium text-iDonate-navy-secondary">
                Bio
              </CardTitle>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-iDonate-white-space border-2 text-xs lg:text-sm hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
              >
                <SquarePen />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4 sm:gap-6 lg:gap-9 p-0 m-0">
              <div className="flex flex-col md:space-y-1 ">
                <CardDescription className="text-sm sm:text-description-eng lg:text-medium-eng text-iDonate-navy-primary">
                  {donorProfile?.bio || "No bio provided"}
                <CardDescription className="text-sm sm:text-description-eng lg:text-medium-eng text-iDonate-navy-primary">
                  {donorProfile?.bio || "No bio provided"}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        )}

        {isEditing && (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-2 lg:gap-6 p-4 md:p-6 lg:p-9">
            <CardHeader className="flex flex-col sm:flex-row items-start justify-between p-0 m-0">
              <CardTitle className="text-lg lg:text-2xl font-medium text-iDonate-navy-secondary">
                Bio
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
                >
                  Submit
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-9 p-0 m-0">
              <FormField
                control={control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="w-full">
                  <FormItem className="w-full">
                    <FormControl className="text-sm lg:text-medium-eng">
                      <Textarea placeholder="Enter your bio" {...field} />
                      <Textarea placeholder="Enter your bio" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
                      This is your organization's bio.
                      This is your organization's bio.
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