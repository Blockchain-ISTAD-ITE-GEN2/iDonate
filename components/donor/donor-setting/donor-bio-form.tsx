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

export function DonorBioForm({
  onPercentageUpdate,
}: {
  onPercentageUpdate: (percentage: number) => void;
}) {
  // 1. State to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // 2. Define your form.
  const form = useForm<z.infer<typeof organizationBioSchema>>({
    resolver: zodResolver(organizationBioSchema),
    defaultValues: {
      bio: "Elizabeth Joe គឺជាអ្នកសកម្មក្នុងវិស័យឧស្សាហកម្មស្រ្តីដែលបង្កើតរបស់ជាច្រើនគាត់ជាអ្នកផ្តល់ជំនួយដល់ជំនួយដ៏ធំដល់អ្នកដទៃគាត់គឺជាមនុស្សម្ន ាក់ ដែលស្រឡាញវិជ្ជាសាស្រ្ត ពិភពលោក ផងដែរ🌍។គាត់គឺជាស្ថាបត្យករ GreenFuture Innovations ដែលពេញនិយមសម្រាប់ការបង្កើតដំណោះស្រាយមិត្តភាពដូចជា គ្រឿងពិនិត្យការពុលអាកាសដែលប្រើថាមពលព្រះអាទិត្យ។ គាត់ក៏ជាកម្មសិក្ខារ EmpowerHer Foundation ដែលគាំទ្រស្រ្តីក្នុងវិស័យ STEM តាមរយៈទទួល​អាហារូបករណ៍ និងការបណ្ដុះបណ្ដាលផ្សេង 💡។ គាត់ក៏បានសរសេរសៀវភៅ Sustainability Starts With You ដែលជាសៀវភៅបង្ហាញបុគ្គលភាពទៅកាន់ការរស់នៅ ក្នុងរបរិស្ថានតែមួយ។ ក្នុងពេលសំរាករបស់នាង Elizabeth មានការចូលរួមក្នុងការឆ្លងកាត់ភ្នំ គំនូរ និងចំណាយពេលជាមួយឆ្មារបស់នាង ​🐾 តែពេលនេះគាត់ពិតត្រូវការ  ជួយពីអ្នកទាំងអស់យ៉ាងក្រៃឡេង ដោយសារគាត់បានជួបជាមួយ និងឧបទ្ទវហេតុក្នុងគ្រោះថ្នាក់ចរាចរណ៍ពេលនេះគាត់កំពុងត្រូវអ្នកទាំងអស់គ្នាដើ់ម្បីបន្តនិងសេចក្តីសង្ឈឹមនូវជិវិតរបស់គាត់។",
    },
  });

  const { watch, handleSubmit, reset, control, formState } = form;
  const bioValue = watch("bio");

  // Update percentage based on input
  useEffect(() => {
    if (bioValue.trim()) {
      onPercentageUpdate(10); // Address field filled, update percentage
    } else {
      onPercentageUpdate(0); // Address field empty, reset percentage
    }
  }, [bioValue, onPercentageUpdate]);

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof organizationBioSchema>) {
    console.log(values);
    // Switch back to view mode after submitting
    setIsEditing(false);
  }

  function handleCancel() {
    reset(); // Reset the form
    setIsEditing(false); // Switch back to view mode
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* View Mode */}
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
                <CardDescription lang="km" className="text-sm sm:text-description-eng lg:text-medium-eng text-iDonate-navy-primary">
                  Elizabeth Joe
                  គឺជាអ្នកសកម្មក្នុងវិស័យឧស្សាហកម្មស្រ្តីដែលបង្កើតរបស់ជាច្រើនគាត់ជាអ្នកផ្តល់ជំនួយដល់ជំនួយដ៏ធំដល់អ្នកដទៃគាត់គឺជាមនុស្សម្នាក់
                  ដែលស្រឡាញវិជ្ជាសាស្រ្ត ពិភពលោក ផងដែរ🌍។គាត់គឺជាស្ថាបត្យករ
                  GreenFuture Innovations
                  ដែលពេញនិយមសម្រាប់ការបង្កើតដំណោះស្រាយមិត្តភាពដូចជា
                  គ្រឿងពិនិត្យការពុលអាកាសដែលប្រើថាមពលព្រះអាទិត្យ។
                  គាត់ក៏ជាកម្មសិក្ខារ EmpowerHer Foundation
                  ដែលគាំទ្រស្រ្តីក្នុងវិស័យ STEM តាមរយៈទទួល​អាហារូបករណ៍
                  និងការបណ្ដុះបណ្ដាលផ្សេង 💡។ គាត់ក៏បានសរសេរសៀវភៅ Sustainability
                  Starts With You ដែលជាសៀវភៅបង្ហាញបុគ្គលភាពទៅកាន់ការរស់នៅ
                  ក្នុងរបរិស្ថានតែមួយ។ ក្នុងពេលសំរាករបស់នាង Elizabeth
                  មានការចូលរួមក្នុងការឆ្លងកាត់ភ្នំ គំនូរ
                  និងចំណាយពេលជាមួយឆ្មារបស់នាង ​🐾 តែពេលនេះគាត់ពិតត្រូវការ
                  ជួយពីអ្នកទាំងអស់យ៉ាងក្រៃឡេង ដោយសារគាត់បានជួបជាមួយ
                  និងឧបទ្ទវហេតុក្នុងគ្រោះថ្នាក់ចរាចរណ៍ពេលនេះគាត់កំពុងត្រូវអ្នកទាំងអស់គ្នាដើ់ម្បីបន្តនិងសេចក្តីសង្ឈឹមនូវជិវិតរបស់គាត់។
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-2 lg:gap-6 p-4 md:p-6 lg:p-9">
            <CardHeader className="flex flex-col sm:flex-row items-start justify-between p-0 m-0">

              <CardTitle className="text-lg lg:text-2xl font-medium text-iDonate-navy-secondary">
                Bio
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
                  <FormItem className="w-full h-full">
                    <FormControl className="text-sm lg:text-medium-eng">
                      <Textarea
                        className="h-auto overflow-auto scrollbar-hide"
                        placeholder="Elizabeth Joe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-xs sm:text-sm lg:text-lg">
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
