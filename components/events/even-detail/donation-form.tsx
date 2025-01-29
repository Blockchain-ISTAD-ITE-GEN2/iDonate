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
import { useGetEventByUuidQuery } from "@/redux/services/event-service";
import {  useMakeDonationMutation } from "@/redux/services/donation-service";
import { EventType } from "@/difinitions/dto/EventType";
import { DonationType, TransactionDataType } from "@/difinitions/types/donation/donation";
import { useToast } from "@/hooks/use-toast";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { use, useEffect, useState } from "react";
import EventQrDialog from "@/components/events/even-detail/event-qr-dialog";
import { useParams } from "next/navigation";
import SuccessDialog from "./Success-dialog";




export function DonationForm() {

const uuid = useParams();

console.log("UUID", uuid)
  const [isOpened, setIsOpened] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false); // State to control the success dialog
  const [qrcode, setQrCode] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<DonationType | undefined>(undefined);
  const [transactionData, setTransactionData] = useState<TransactionDataType | undefined>(undefined);
  const {data: events} = useGetEventByUuidQuery(uuid?.uuid)
  const { toast } = useToast();
  const [donate] = useMakeDonationMutation();
  const { data: userProfile} = useGetUserProfileQuery({});
  const typedEvents: EventType = events ;
  const [md5, setMd5] = useState();

  console.log("md5", md5)

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donationEventID: typedEvents.uuid || "",
      donor: userProfile?.uuid || "",
      amount: 0,
      recipient: typedEvents?.organization?.uuid || "",
      acquiringBank: "aba",
      currency: "USD",
      city: "Phnom Penh",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
  });

  console.log("Transaction Data: ", transactionData);

  const { handleSubmit, control, formState: { isSubmitting } } = form;

  // useEffect(() => {
  //   if (md5) {
  //     const checkTransaction = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5`,
  //           {
  //             method: "POST",
  //             headers: {
  //               Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzIwOWMwNDYzNjBlNDEwMSJ9LCJpYXQiOjE3Mzc0NDA1MTQsImV4cCI6MTc0NTIxNjUxNH0.frEDXCd_iGyhM3NvM-aNzpOpQaBCWWjE7UqxWwri1-U`, // Replace with valid token
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ md5 }),
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Failed to check transaction status.");
  //         }

  //         const successData = await response.json();
  //         setTransactionData(successData); // Save transaction data

  //         if (successData.responseCode === 0) {
  //           setIsOpened(false)
  //           setIsSuccessDialogOpen(true); // Open success dialog
  //         }
  //       } catch (error) {
  //         console.error("Error checking transaction:", error);
  //         toast({
  //           title: "Error",
  //           description: "Failed to check transaction status.",
  //           variant: "destructive",
  //         });
  //       }
  //     };

  //     checkTransaction();
  //   }
  // },[md5]); // Trigger when md5 changes
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let elapsedTime = 0;

    if (md5) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(
            `https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzIwOWMwNDYzNjBlNDEwMSJ9LCJpYXQiOjE3Mzc0NDA1MTQsImV4cCI6MTc0NTIxNjUxNH0.frEDXCd_iGyhM3NvM-aNzpOpQaBCWWjE7UqxWwri1-U`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ md5 }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to check transaction status.");
          }

          const successData = await response.json();
          setTransactionData(successData);

          if (successData.responseCode === 0) {
            setIsOpened(false);
            setIsSuccessDialogOpen(true);
            if (interval) clearInterval(interval);
          }
        } catch (error) {
          console.error("Error checking transaction:", error);
        }

        elapsedTime += 3000;
        if (elapsedTime >= 300000) { // 5 minutes
          setIsOpened(false);
          if (interval) clearInterval(interval);
        }
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [md5]);

 // Submit handler for the donation form
 async function onSubmit(values: z.infer<typeof donationSchema>) {
  try {
    // Build the donation object
    const donation: DonationType = {
      donationEventID: typedEvents?.uuid || '',
      donor: userProfile?.uuid,
      amount: values.amount,
      recipient: typedEvents?.organization?.uuid || '',
      acquiringBank: values.acquiringBank,
      currency: values.currency,
      city: values.city,
      timezone: values.timezone || "",
    };

    // Save payment data for QR dialog
    setPaymentData({
      donationEventID: typedEvents?.name,
      donor: userProfile?.username,
      amount: values.amount,
      recipient: typedEvents?.organization?.name || '',
      acquiringBank: values.acquiringBank,
      currency: values.currency,
      city: values.city,
      timezone: values.timezone || "",
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

    const md5Value = donateResponse?.dataKHQRResponse?.data?.md5;
    if (md5Value) {
      setMd5(md5Value); // Set md5 value
    } else {
      throw new Error("MD5 value missing in donation response.");
    }

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

      {/* <EventQrDialog
        qrcode={qrcode || ""}
        isOpen={isOpened}
        onClose={() => setIsOpened(false)}
        paymentData={paymentData}
        /> */}


        {transactionData?.responseCode===0 && isSuccessDialogOpen && (
        <SuccessDialog
          isOpen={true}
          onClose={() => setTransactionData(undefined)}
          transactionData={transactionData}
        />
        )}

    </Form>
  );
}