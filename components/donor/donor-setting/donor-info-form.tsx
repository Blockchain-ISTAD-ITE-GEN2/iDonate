"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/services/user-profile";
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook from shadcn/ui

const donorSchema = z.object({
  phoneNumber: z.string().min(1, "លេខទូរស័ព្ទត្រូវបំពេញ"),
  firstName: z.string().min(1, "នាមត្រូវបំពេញ"),
  lastName: z.string().min(1, "នាមខ្លួនត្រូវបំពេញ"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "សូមជ្រើសរើសភេទ",
  }),
  username: z.string().min(3, "ឈ្មោះអ្នកប្រើត្រូវតែមានយ៉ាងហោចណាស់ ៣ តួអក្សរ"),
  dateOfBirth: z
    .date({
      required_error: "កាលបរិច្ឆេទកំណើតត្រូវបំពេញ",
    })
    .refine((date) => date <= new Date(), {
      message: "កាលបរិច្ឆេទកំណើតមិនអាចនៅអនាគតបានទេ",
    }),
});

type DonorFormData = z.infer<typeof donorSchema>;

const formFields = [
  {
    name: "firstName",
    label: "នាម",
    placeholder: "បញ្ចូលនាម",
    description: "នាមរបស់អ្នក",
  },
  {
    name: "lastName",
    label: "នាមខ្លួន",
    placeholder: "បញ្ចូលនាមខ្លួន",
    description: "នាមខ្លួនរបស់អ្នក",
  },
  {
    name: "username",
    label: "ឈ្មោះអ្នកប្រើ",
    placeholder: "បញ្ចូលឈ្មោះអ្នកប្រើ",
    description: "ជ្រើសរើសឈ្មោះអ្នកប្រើដែលប្លែក",
  },
  {
    name: "phoneNumber",
    label: "លេខទូរស័ព្ទ",
    placeholder: "បញ្ចូលលេខទូរស័ព្ទ",
    description: "លេខទូរស័ព្ទរបស់អ្នក",
  },
];

type DonorInfoFormProps = {
  onFirstNamePercentageUpdate: (firstNamePercentage: number) => void;
  onLastNamePercentageUpdate: (lastNamePercentage: number) => void;
  onUsernamePercentageUpdate: (usernamePercentage: number) => void;
  onDateOfBirthPercentageUpdate: (dateOfBirthPercentage: number) => void;
  onGenderPercentagePercentageUpdate: (genderPercentage: number) => void;
  onPhoneNumberPercentageUpdate: (phoneNumberPercentage: number) => void;
};
export function DonorInfoForm({
  onFirstNamePercentageUpdate,
  onLastNamePercentageUpdate,
  onUsernamePercentageUpdate,
  onDateOfBirthPercentageUpdate,
  onGenderPercentagePercentageUpdate,
  onPhoneNumberPercentageUpdate,
}: DonorInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast(); // Initialize the toast hook
  const {
    data: profile,
    isLoading,
    error: fetchError,
  } = useGetUserProfileQuery({});
  const [updateProfile] = useUpdateUserProfileMutation();

  const form = useForm<DonorFormData>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      phoneNumber: profile?.phoneNumber || "",
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      gender:
        (profile?.gender?.toLowerCase() as DonorFormData["gender"]) || "other",
      username: profile?.username || "",
      dateOfBirth: profile?.dateOfBirth
        ? new Date(profile.dateOfBirth)
        : undefined,
    },
  });

  const { watch, handleSubmit, reset, control, formState } = form;

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const userName = watch("username");
  const dateOfBirth = watch("dateOfBirth");
  const gender = watch("gender");
  const phoneNumber = watch("phoneNumber");

  // Update percentages based on input
  useEffect(() => {
    const calculateCompletionPercentage = () => {
      const firstNamePercentage = firstName.trim() ? 20 : 0;
      const lastNamePercentage = lastName.trim() ? 20 : 0;
      const userNamePercentage = userName.trim() ? 20 : 0;
      const dateOfBirthPercentage = dateOfBirth ? 20 : 0;
      const genderPercentage = gender ? 20 : 0;
      const phoneNumberPercentage = phoneNumber.trim() ? 20 : 0;

      onFirstNamePercentageUpdate(firstNamePercentage);
      onLastNamePercentageUpdate(lastNamePercentage);
      onUsernamePercentageUpdate(userNamePercentage);
      onDateOfBirthPercentageUpdate(dateOfBirthPercentage);
      onGenderPercentagePercentageUpdate(genderPercentage);
      onPhoneNumberPercentageUpdate(phoneNumberPercentage);
    };

    calculateCompletionPercentage();
  }, [
    firstName,
    lastName,
    userName,
    dateOfBirth,
    phoneNumber,
    gender,
    onFirstNamePercentageUpdate,
    onLastNamePercentageUpdate,
    onUsernamePercentageUpdate,
    onDateOfBirthPercentageUpdate,
    onGenderPercentagePercentageUpdate,
    onPhoneNumberPercentageUpdate,
  ]);

  const onSubmit = async (data: DonorFormData) => {
    try {
      setIsSubmitting(true);

      if (!profile?.uuid) {
        throw new Error("រកមិនឃើញ UUID របស់អ្នកប្រើ");
      }

      await updateProfile({
        uuid: profile.uuid,
        updatedUserProfile: {
          ...data,
          gender: data.gender.charAt(0).toUpperCase() + data.gender.slice(1),
          dateOfBirth: format(data.dateOfBirth, "dd-MM-yyyy"),
        },
      }).unwrap();

      console.log("Profile updated successfully"); // Add this line
      toast({
        title: "ជោគជ័យ",
        description: "កែប្រែព័ត៌មានជោគជ័យ",
        duration: 3000,
        variant: "default",
      });

      setIsEditing(false);
    } catch (error: any) {
      console.error("កែប្រែព័ត៌មានបរាជ័យ:", error);
      console.log("Showing error toast"); // Add this line
      toast({
        title: "កំហុស",
        description: error.message || "កែប្រែព័ត៌មានបរាជ័យ។ សូមព្យាយាមម្តងទៀត។",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <CardContent>កំពុងផ្ទុកព័ត៌មានអ្នកប្រើ...</CardContent>
      </Card>
    );
  }

  if (fetchError) {
    return (
      <Card className="p-6">
        <CardContent className="text-red-500">
          កំហុសក្នុងការផ្ទុកព័ត៌មានអ្នកប្រើ។ សូមព្យាយាមម្តងទៀត។
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="p-6">
          <CardHeader className="flex flex-row items-center justify-between p-0 mb-6">
            <CardTitle className="text-3xl font-medium text-iDonate-navy-primary dark:text-iDonate-navy-accent">
              ព័ត៌មានផ្ទាល់ខ្លួន
            </CardTitle>

            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="gap-2 text-iDonate-navy-primary dark:text-iDonate-navy-accent"
              >
                <SquarePen className="h-4 w-4" />
                កែប្រែព័ត៌មាន
              </Button>
            )}
          </CardHeader>

          <CardContent className="p-0">
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-iDonate-navy-primary">
                {formFields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <CardDescription className="text-md font-medium">
                      {field.label}
                    </CardDescription>
                    <p className="text-base p-2 border-1 border rounded-md bg-iDonate-navy-accent">
                      {profile?.[field.name as keyof typeof profile] ||
                        "មិនមាន"}
                    </p>
                  </div>
                ))}
                <div className="space-y-1">
                  <CardDescription className="text-md font-medium">
                    កាលបរិច្ឆេទកំណើត
                  </CardDescription>
                  <p className="text-base p-2 border-1 border rounded-md bg-iDonate-navy-accent">
                    {profile?.dateOfBirth || "មិនមាន"}
                  </p>
                </div>
                <div className="space-y-1">
                  <CardDescription className="text-md font-medium">
                    ភេទ
                  </CardDescription>
                  <p className="text-base p-2 border-1 border rounded-md bg-iDonate-navy-accent">
                    {profile?.gender || "មិនមាន"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name as keyof DonorFormData}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel className="text-md text-iDonate-navy-secondary">
                          {field.label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...formField}
                            placeholder={field.placeholder}
                            className="text-iDonate-navy-primary p-2 border-1 border rounded-md bg-iDonate-navy-accent text-md"
                            value={
                              formField.value instanceof Date
                                ? formField.value.toISOString()
                                : formField.value
                            }
                          />
                        </FormControl>
                        <FormDescription>{field.description}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-md text-iDonate-navy-secondary">
                        កាលបរិច្ឆេទកំណើត
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>ជ្រើសរើសកាលបរិច្ឆេទ</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        កាលបរិច្ឆេទកំណើតរបស់អ្នក
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="text-md text-iDonate-navy-secondary">
                        ភេទ
                      </FormLabel>
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                      >
                        <FormControl>
                          <SelectTrigger className="p-2 border-1 border rounded-md bg-iDonate-navy-accent">
                            <SelectValue placeholder="ជ្រើសរើសភេទ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="p-2 border-1 border rounded-md bg-iDonate-navy-accent">
                          <SelectItem value="male">ប្រុស</SelectItem>
                          <SelectItem value="female">ស្រី</SelectItem>
                          <SelectItem value="other">ផ្សេងៗ</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>ភេទរបស់អ្នក</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2 flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    បោះបង់
                  </Button>
                  <Button
                    type="submit"
                    className="bg-iDonate-navy-primary hover:bg-iDonate-navy-secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
