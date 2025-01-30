"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import { eventSchema } from "@/components/schema/schema";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import Image from "next/image";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import categories from "@/data/category.json";
import { useGetCategoriesQuery } from "@/redux/services/category-service";


type EventCategoryFormProps = {
  onPercentageUpdate: (percentage: number) => void;
  uuid: string
};


export function EventCategoryFormEdition({
  onPercentageUpdate,
  uuid
}: EventCategoryFormProps) {
  const categories = useGetCategoriesQuery({});

  const typeCategories: CategoryType[] = categories?.currentData || [];

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
    },
  });

  const { watch, handleSubmit, reset, control, formState } = form;
  const categoryValue = watch("title");

  // Track if the form is filled
  const isFormFilled = !!categoryValue.trim();

  // Update percentage based on input
  useEffect(() => {
    if (isFormFilled) {
      onPercentageUpdate(10); // Address field filled, update percentage
    } else {
      onPercentageUpdate(0); // Address field empty, reset percentage
    }
  }, [isFormFilled, onPercentageUpdate]);

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

  function onSubmit(values: z.infer<typeof eventSchema>) {
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
        {/* View Mode */}
        {!isEditing && (
          <Card className="flex flex-col rounded-lg border-2 border-iDonate-navy-accent gap-2 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Event Category
              </CardTitle>

              <Button
                onClick={() => setIsEditing(true)}
                className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
              >
                <SquarePen />
                Edit
              </Button>
            </CardHeader>

            <CardContent className="border-2 flex flex-col items-center justify-center border-iDonate-navy-accent  w-[200px] h-[200px] gap-4 p-0 m-0 rounded-lg">
              <div className=" w-[100px] h-[100px] bg-iDonate-navy-accent rounded-full border flex items-center justify-center">
                <Image
                  width={60}
                  height={60}
                  src="https://charius-next.netlify.app/_next/static/media/3.0714cc33.svg"
                  alt={"Media"}
                />
              </div>

              <CardDescription className="text-iDonate-navy-secondary text-xl">
                អាហារ សុខភាព
              </CardDescription>
            </CardContent>
          </Card>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-2 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Event Category
              </CardTitle>

              <div className="flex gap-3">
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
                    className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error"
                  >
                    Cancel
                  </Button>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                >
                  Submit
                </Button>
              </div>
            </CardHeader>

            <div className="flex items-center gap-9">
              {typeCategories.map((item, index) => (
                <CardContent
                  key={index}
                  className="border-2 flex flex-col items-center justify-center border-iDonate-navy-accent w-[200px] h-[200px] gap-4 p-0 m-0 rounded-lg"
                >
                  <div className="w-[100px] h-[100px] bg-iDonate-navy-accent rounded-full border flex items-center justify-center">
                    <Image
                      width={60}
                      height={60}
                      src={
                        item.media ||
                        "https://charius-next.netlify.app/_next/static/media/3.0714cc33.svg"
                      }
                      alt="Media"
                    />
                  </div>

                  <CardDescription className="text-iDonate-navy-secondary text-xl">
                    {item.name || ""}{" "}
                    {/* Assuming 'item.name' holds the category name */}
                  </CardDescription>
                </CardContent>
              ))}
            </div>
          </Card>
        )}
      </form>
    </Form>
  );
}
