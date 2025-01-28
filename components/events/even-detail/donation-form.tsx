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
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { useGetEventsQuery } from "@/redux/services/event-service";
  import {  useMakeDonationMutation } from "@/redux/services/donation-service";
  import { EventType } from "@/difinitions/dto/EventType";
  import { DonationType, TransactionDataType } from "@/difinitions/types/donation/donation";
  import { useToast } from "@/hooks/use-toast";
  import { useGetUserProfileQuery } from "@/redux/services/user-profile";
  import { use, useEffect, useState } from "react";
  import EventQrDialog from "@/components/events/even-detail/event-qr-dialog";
import SuccessDialog from "./Success-dialog";

  export function DonationForm() {

    const [isOpened, setIsOpened] = useState(false);
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false); // State to control the success dialog
    const [qrcode, setQrCode] = useState<string | null>(null);
    const [paymentData, setPaymentData] = useState<DonationType | undefined>(undefined);
    const [transactionData, setTransactionData] = useState<TransactionDataType | undefined>(undefined);
    const { data: events } = useGetEventsQuery({});
    const { toast } = useToast();
    const [donate] = useMakeDonationMutation();
    // const [generateQrCode] = useGenerateQrCodeMutation();
    const { data: userProfile, error } = useGetUserProfileQuery({});
    const typedEvents: EventType[] = events?.content || [];

    const firstEvent = typedEvents[0];

   
    
  
    const form = useForm<z.infer<typeof donationSchema>>({
      resolver: zodResolver(donationSchema),
      defaultValues: {
        donationEventID: firstEvent?.uuid || "",
        donor: userProfile?.uuid || "",
        amount: 0,
        recipient: firstEvent?.organization?.uuid || "",
        acquiringBank: "aba",
        currency: "USD",
        city: "Phnom Penh",
      },
    });

    console.log("Transaction Data: ", transactionData);

    const { handleSubmit, control, formState: { isSubmitting } } = form;
    

   // Submit handler for the donation form
   async function onSubmit(values: z.infer<typeof donationSchema>) {
    try {
      // Build the donation object
      // const donation: DonationType = {
      //   donationEventID: firstEvent?.uuid,
      //   donor: userProfile?.uuid,
      //   amount: values.amount,
      //   recipient: firstEvent?.organization.uuid,
      //   acquiringBank: values.acquiringBank,
      //   currency: values.currency,
      //   city: values.city,
      // };

      const donation: DonationType = {
        donationEventID: firstEvent?.uuid ?? "",
        donor: userProfile?.uuid ?? "",
        amount: values.amount,
        recipient: firstEvent?.organization?.uuid ?? "",  // Fix possible undefined
        acquiringBank: values.acquiringBank,
        currency: values.currency,
        city: values.city,
      };
      

      // Save payment data for QR dialog
      // setPaymentData({
      //   donationEventID: firstEvent?.name,
      //   donor: userProfile?.username,
      //   amount: values.amount,
      //   recipient: firstEvent?.organization?.name,
      //   acquiringBank: values.acquiringBank,
      //   currency: values.currency,
      //   city: values.city,
      // });

      setPaymentData({
        donationEventID: firstEvent?.name ?? "",
        donor: userProfile?.username ?? "",
        amount: values.amount,
        recipient: firstEvent?.organization?.name ?? "", // Ensure recipient is always a string
        acquiringBank: values.acquiringBank,
        currency: values.currency,
        city: values.city,
      });
      

      // Validate required fields
      if (!donation.donationEventID || !donation.donor || !donation.recipient) {
        toast({
          title: "Error",
          description: "Missing required fields. Please check your inputs.",
          variant: "default",
        });
        return;
      }

      // Validate donation amount
      if (values.amount <= 0) {
        toast({
          title: "Error",
          description: "Donation amount must be greater than 0.",
          variant: "destructive",
        });
        return;
      }

      // Make donation API call
      const donateResponse = await donate(donation).unwrap();
      console.log("Donation API Response:", donateResponse);

      // Fetch the QR code manually
      const qrResponse = await fetch(
        `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/qr/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qr: donateResponse?.dataKHQRResponse?.data?.qr,
          }),
        }
      );

      if (!qrResponse.ok) {
        throw new Error("Failed to generate QR Code");
      }

      const qrData = await qrResponse.json();
      setQrCode(qrData?.base64QRCode); // Save QR code
      setIsOpened(true); // Open QR dialog

      // Success dialog - check transaction
      const successResponse = await fetch(
        `https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzIwOWMwNDYzNjBlNDEwMSJ9LCJpYXQiOjE3MzczNTg3NTcsImV4cCI6MTc0NTEzNDc1N30.8CdSi4fVh_b1bT-pjEN0peTi_ws4K4AOKGCxrrH0EYE`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            md5: donateResponse?.dataKHQRResponse?.data?.md5,
          }),
        }
      );
      

      const successData = await successResponse.json();
      setTransactionData(successData); // Save transaction data

      
    } catch (error: any) {
      console.error("Error during submission:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }


    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="flex flex-col bg-transparent rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <div className="flex flex-col gap-6">
              <CardHeader className="flex flex-row items-center justify-between p-0 m-0 pb-2 border-b-[2px] border-dashed border-b-iDonate-navy-primary">
                <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                  Donation Information
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-9 px-9 m-0">
                <FormField
                  control={control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full h-full">
                      <FormLabel
                        className="text-iDonate-navy-secondary text-sm"
                        htmlFor="amount"
                      >
                        Amount
                      </FormLabel>
                      <FormControl className="w-full h-full">
                        <Input
                          type="number" // Ensure the input is numeric
                          className="h-auto overflow-auto scrollbar-hide"
                          placeholder="Enter your amount"
                          {...field}
                          value={field.value || ""} // Prevent null/undefined values
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? parseFloat(value) : ""); // Convert to number or set empty string
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-sm">
                        This is the amount of your donation.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* <FormField
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
                /> */}
              </CardContent>
            </div>

            <CardFooter className="px-9 m-0">
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-iDonate-green-secondary hover:bg-iDonate-green-secondary text-iDonate-navy-primary font-semibold"
              >
                {isSubmitting ? "Processing..." : "Donate Now"}
              </Button>

            </CardFooter>
          </Card>
        </form>

        <EventQrDialog
          qrcode={qrcode || ""}
          isOpen={isOpened}
          onClose={() => setIsOpened(false)}
          paymentData={paymentData}
        />

        <EventQrDialog
  qrcode={qrcode || ""}
  isOpen={isOpened}
  onClose={() => setIsOpened(false)}
  paymentData={paymentData}
/>


{/* {transactionData && isSuccessDialogOpen && (
  <SuccessDialog
    isOpen={true}
    onClose={() => setTransactionData(undefined)}
    transactionData={{
      responseCode: 0,
      esponseMessage: "Transaction successful.",
      data: {
        hash: "abc123hash", // Static hash
        fromAccountId: "Sanh Panha", // Static sender account ID
        toAccountId: "Education Cambodia Kids news", // Static receiver account ID
        currency: "USD", // Static currency
        amount: 1.00, // Static amount
        description: "Donation for charity.", // Static description
        createdDateMs: Date.now(), // Current timestamp
        acknowledgedDateMs: Date.now(), // Current timestamp
      },
    }}
  />
)}  */}

      </Form>
    );
  }
