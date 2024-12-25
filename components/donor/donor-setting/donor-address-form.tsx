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
import { organizationAddressSchema } from "@/components/schema/schema";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DonorAddressForm({
  onPercentageUpdate,
}: {
  onPercentageUpdate: (percentage: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof organizationAddressSchema>>({
    resolver: zodResolver(organizationAddressSchema),
    defaultValues: {
      address: "",
    },
  });

  const { watch, handleSubmit, reset, control, formState } = form;
  const addressValue = watch("address");

  // Track if the form is filled
  const isFormFilled = !!addressValue.trim();

  // Update percentage based on input
  useEffect(() => {
    if (isFormFilled) {
      onPercentageUpdate(10); // Address field filled, update percentage
    } else {
      onPercentageUpdate(0); // Address field empty, reset percentage
    }
  }, [isFormFilled, onPercentageUpdate]);

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

  function onSubmit(values: z.infer<typeof organizationAddressSchema>) {
    console.log(values);
    setIsEditing(false);
  }

  function handleCancel() {
    reset();
    setIsEditing(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isEditing && (
          <Card className="flex flex-col rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Location
              </CardTitle>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
              >
                <SquarePen />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="flex w-full gap-9 p-0 m-0">
              <div className="flex flex-col space-y-3">
                <CardDescription className="text-xl text-iDonate-navy-primary">
                  Norodom Blvd, 41, Phnom Penh
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        )}

        {isEditing && (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Organization Information
              </CardTitle>
              <div className="flex gap-3">
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
                    className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                >
                  Submit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex w-full gap-9 p-0 m-0">
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input placeholder="Enter your address" {...field} />
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
