"use client";

import { z } from "zod";
import { useState } from "react";
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
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/services/user-profile";
import { useToast } from "@/hooks/use-toast";

const donorSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  username: z.string().min(3, "Username must be at least 3 characters"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
});

type DonorFormData = z.infer<typeof donorSchema>;

const formFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
    description: "Your given name",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
    description: "Your family name",
  },
  {
    name: "username",
    label: "Username",
    placeholder: "Enter username",
    description: "Choose a unique username",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter phone number",
    description: "Your contact number",
  },
];

export function DonorInfoForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { data: profile, isLoading, error: fetchError } = useGetUserProfileQuery({});
  const [updateProfile] = useUpdateUserProfileMutation();

  const form = useForm<DonorFormData>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      phoneNumber: profile?.phoneNumber || "",
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      gender: (profile?.gender?.toLowerCase() as DonorFormData["gender"]) || "other",
      username: profile?.username || "",
      dateOfBirth: profile?.dateOfBirth ? new Date(profile.dateOfBirth) : undefined,
    },
  });

  const onSubmit = async (data: DonorFormData) => {
    try {
      setIsSubmitting(true);
      
      if (!profile?.uuid) {
        throw new Error("Profile UUID not found");
      }

      await updateProfile({
        uuid: profile.uuid,
        updatedUserProfile: {
          ...data,
          gender: data.gender.charAt(0).toUpperCase() + data.gender.slice(1),
          dateOfBirth: format(data.dateOfBirth, "dd-MM-yyyy"),
        }
      }).unwrap();

      toast({
        title: "Success",
        description: "Profile updated successfully",
        duration: 3000,
      });

      setIsEditing(false);
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile. Please try again.",
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
        <CardContent>Loading profile information...</CardContent>
      </Card>
    );
  }

  if (fetchError) {
    return (
      <Card className="p-6">
        <CardContent className="text-red-500">
          Error loading profile. Please refresh the page and try again.
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="p-6">
          <CardHeader className="flex flex-row items-center justify-between p-0 mb-6">
            <CardTitle className="text-3xl font-medium text-iDonate-navy-primary">
              Personal Information
            </CardTitle>

            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="gap-2 text-iDonate-navy-primary"
              >
                <SquarePen className="h-4 w-4" />
                Edit Profile
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
                      {profile?.[field.name as keyof typeof profile] || "Not provided"}
                    </p>
                  </div>
                ))}
                <div className="space-y-1">
                  <CardDescription className="text-md font-medium">
                    Date of Birth
                  </CardDescription>
                  <p className="text-base p-2 border-1 border rounded-md bg-iDonate-navy-accent">
                    {profile?.dateOfBirth || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <CardDescription className="text-md font-medium">
                    Gender
                  </CardDescription>
                  <p className="text-base p-2 border-1 border rounded-md bg-iDonate-navy-accent">
                    {profile?.gender || "Not provided"}
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
                        <FormLabel className="text-md text-iDonate-navy-secondary">{field.label}</FormLabel>
                        <FormControl>
                          <Input
                            {...formField}
                            placeholder={field.placeholder}
                            className="text-iDonate-navy-primary p-2 border-1 border rounded-md bg-iDonate-navy-accent text-md"
                            value={formField.value instanceof Date ? formField.value.toISOString() : formField.value}
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
                      <FormLabel className="text-md text-iDonate-navy-secondary">Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
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
                      <FormDescription>Your date of birth</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="text-md text-iDonate-navy-secondary">Gender</FormLabel>
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                      >
                        <FormControl>
                          <SelectTrigger className="p-2 border-1 border rounded-md bg-iDonate-navy-accent">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="p-2 border-1 border rounded-md bg-iDonate-navy-accent">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Your gender identity</FormDescription>
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
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
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