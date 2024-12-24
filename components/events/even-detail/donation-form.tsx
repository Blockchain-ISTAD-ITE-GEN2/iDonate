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
import { donationSchema } from "@/components/schema/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import payment from "@/public/images/payment.jpg";
import { Separator } from "@/components/ui/separator";
import { HeartIcon } from "lucide-react";

export function DonotionForm() {
  // Track if the form is filled

  // 2. Define your form.
  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      remark: "",
      visibily: false,
    },
  });

  const { handleSubmit, control } = form;

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof donationSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="flex flex-col bg-transparent rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
          <div className="flex flex-col gap-6">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0 pb-2 border-b-[2px] border-dashed border-b-iDonate-navy-primary">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Organization Information
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-9 px-9 m-0">
              <FormField
                control={control}
                name="remark"
                render={({ field }) => (
                  <FormItem className="w-full h-full">
                    <FormLabel
                      className="text-iDonate-navy-secondary text-sm"
                      htmlFor="remark"
                    >
                      Remark
                    </FormLabel>
                    <FormControl className="w-full h-full">
                      <Textarea
                        className="h-auto overflow-auto scrollbar-hide"
                        placeholder="Enter your remark"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-sm">
                      This is remark of your donation.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="visibily"
                render={({ field }) => (
                  <FormItem className="w-full h-full">
                    <FormLabel
                      className="text-iDonate-navy-secondary text-sm"
                      htmlFor="visibility"
                    >
                      Visibility
                    </FormLabel>
                    <FormControl className="w-full h-full">
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === "you")
                        }
                        value={field.value ? "you" : "anonymous"}
                        className="flex"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="rounded-md text-iDonate-navy-primary border-iDonate-navy-primary"
                            value="you"
                            id="r1"
                          />
                          <Label
                            className="text-lg text-iDonate-navy-primary"
                            htmlFor="r1"
                          >
                            Elizabeth Joe
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="rounded-md text-iDonate-navy-primary border-iDonate-navy-primary"
                            value="anonymous"
                            id="r2"
                          />
                          <Label
                            className="text-lg text-iDonate-navy-primary"
                            htmlFor="r2"
                          >
                            Anonymous
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-sm">
                      This is visibily of your donation.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
          </div>

          <div className="flex flex-col gap-6">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0 pb-2 border-b-[2px] border-dashed border-b-iDonate-navy-primary">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Payment Method
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 px-9 m-0">
              <div className="flex flex-col">
                <CardDescription className="text-iDonate-gray text-lg leading-9">
                  Tap on link below to send payment:
                </CardDescription>

                <CardDescription className="text-iDonate-navy-primary text-lg underline">
                  https://pay.ababank.com/4GCZPe7n94Dj4Ly3A
                </CardDescription>
              </div>

              <div className="flex items-center gap-4">
                <hr className="flex-grow border-iDonate-light-gray" />
                <span className="text-iDonate-gray font-medium">OR</span>
                <hr className="flex-grow border-iDonate-light-gray" />
              </div>

              <div className="flex flex-col gap-2">
                <FormLabel className="text-iDonate-navy-secondary text-sm">
                  Event KHQR
                </FormLabel>

                <div className="flex items-center justify-center w-full h-auto border-2 border-dashed border-iDonate-light-gray rounded-lg">
                  <Image
                    src={payment}
                    alt="Organization"
                    width={300}
                    height={300}
                    className="p-9 object-cover"
                  />
                </div>

                <FormDescription className="text-iDonate-gray text-sm">
                  You can scan a QR code here for quick donation.
                </FormDescription>
              </div>
            </CardContent>
          </div>

          <CardFooter className="px-9 m-0">
            {/* Submit Button */}
            <Button className="w-full rounded-lg bg-iDonate-green-secondary hover:bg-iDonate-green-secondary text-iDonate-navy-primary font-semibold">
              <HeartIcon className="fill-iDonate-navy-primary" />
              Donate Now
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
