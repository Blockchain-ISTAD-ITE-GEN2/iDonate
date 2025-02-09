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
import {
  useGenerateQrCodeMutation,
  useMakeDonationMutation,
  useSaveRecordMutation,
} from "@/redux/services/donation-service";
import { EventType } from "@/difinitions/types/event/EventType";
import {
  DonationDataType,
  DonationRecordType,
  DonationType,
  ReceiptType,
  TransactionDataType,
} from "@/difinitions/types/donation/donation";
import { useToast } from "@/hooks/use-toast";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { use, useEffect, useState } from "react";
import EventQrDialog from "@/components/events/even-detail/event-qr-dialog";
import { useParams } from "next/navigation";
import SuccessDialog from "./Success-dialog";
import { CircleDollarSign } from "lucide-react";
import { useSendReceiptMutation } from "@/redux/services/donation-service";

export function DonationForm() {
  const uuid = useParams();

  console.log("UUID", uuid);
  const [isOpened, setIsOpened] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false); // State to control the success dialog
  const [qrcode, setQrCode] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<DonationDataType | undefined>(
    undefined,
  );
  const [transactionData, setTransactionData] = useState<
    TransactionDataType | undefined
  >(undefined);
  const { data: events } = useGetEventByUuidQuery(uuid?.uuid);
  const { toast } = useToast();
  const [donate] = useMakeDonationMutation();
  const [saveRecord] = useSaveRecordMutation();
  const { data: userProfile } = useGetUserProfileQuery({});
  const typedEvents: EventType = events;
  const [md5, setMd5] = useState();
  const [generatedQr] = useGenerateQrCodeMutation();
  const [sendReceipt, { isLoading, isError, isSuccess }] = useSendReceiptMutation();

  console.log("md5", md5);

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      eventUuid: typedEvents?.uuid || "",
      // donor: userProfile?.uuid || "",
      amount: 0,
      // recipient: typedEvents?.organization?.uuid || "",
      acquiringBank: "aba",
      currency: "USD",
      city: "Phnom Penh",
      // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  console.log("Transaction Data: ", transactionData);

  const handleSendReceipt = async () => {
    try {
      if (!userProfile || !events) {
        console.error("User profile or event data is missing");
        return;
      }
  
      const receiptData: ReceiptType = {
        userUuid: userProfile.uuid,
        eventUuid: events.uuid,
        remark: "Thank you for your donation!", // Add a meaningful message
        amount: form.getValues("amount"), // Fetch amount from form
      };
  
      const response = await sendReceipt(receiptData).unwrap();
      console.log("Receipt sent successfully:", response);
  
      toast({
        title: "Success",
        description: "Receipt has been sent successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to send receipt:", error);
      
      toast({
        title: "Error",
        description: "Failed to send receipt. Please try again.",
        variant: "destructive",
      });
    }
  };
  

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

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
            },
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
        if (elapsedTime >= 300000) {
          // 5 minutes
          setIsOpened(false);
          if (interval) clearInterval(interval);
        }
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [md5]);

  useEffect(() => {
    if (transactionData?.responseCode === 0) {
      const record: DonationRecordType = {
        donationEventID: typedEvents?.uuid || "",
        amount: transactionData?.data?.amount,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      saveRecord(record)
        .unwrap()
        .then(() => {
          console.log("Record saved successfully");
          handleSendReceipt();
        })
        .catch((error) => {
          console.error("Error saving record:", error);
        });

      setIsSuccessDialogOpen(true);
    }
  }, [transactionData]);

  // Submit handler for the donation form
  async function onSubmit(values: z.infer<typeof donationSchema>) {
    try {
      // Build the donation object
      const donation: DonationType = {
        eventUuid: typedEvents?.uuid || "",
        amount: values.amount,
        acquiringBank: values.acquiringBank,
        currency: values.currency,
        city: values.city,
      };

      // Save payment data for QR dialog
      setPaymentData({
        eventUuid: typedEvents?.uuid || "",
        donor: userProfile?.username,
        amount: values.amount,
        recipient: typedEvents?.organization?.name || "",
        acquiringBank: values.acquiringBank,
        currency: values.currency,
        city: values.city,
        visibily: true, // Add the missing visibily property
      });

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
      const donateResponse = await donate({
        donation: donation,
        organizationUuid: typedEvents?.organization?.uuid || "",
      }).unwrap();
      console.log("Donation API Response:", donateResponse);

      const md5Value = donateResponse?.data?.md5;
      if (md5Value) {
        setMd5(md5Value); // Set md5 value
      } else {
        throw new Error("MD5 value missing in donation response.");
      }

      // Fetch the QR code manually
      const qrResponse = generatedQr(donateResponse?.data?.qr || "").unwrap();

      const qrData = await qrResponse;
      setQrCode(qrData?.base64QRCode); // Save QR code
      setIsOpened(true); // Open QR dialog

      // Success dialog - check transaction
      const successResponse = await fetch(
        `https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzIwOWMwNDYzNjBlNDEwMSJ9LCJpYXQiOjE3MzczNTg3NTcsImV4cCI6MTc0NTEzNDc1N30.8CdSi4fVh_b1bT-pjEN0peTi_ws4K4AOKGCxrrH0EYE`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            md5: donateResponse?.dataKHQRResponse?.data?.md5,
          }),
        },
      );

      const successData = await successResponse.json();
      setTransactionData(successData); // Save transaction data
    } catch (error: any) {
      // console.error("Error during submission:", error);
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
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                ព័ត៌មានអំពីការបរិច្ចាគ
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-9 px-9 m-0">
              <FormField
                control={control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full h-full">
                    <FormLabel
                      className="text-iDonate-navy-secondary text-md dark:text-iDonate-navy-accent"
                      htmlFor="amount"
                    >
                      <div className="flex items-center gap-1 m-2">
                        <span>ចំនួនថវិការបរិច្ចាគ</span>
                        <span>
                          <CircleDollarSign className="h-5 w-5 text-iDonate-green-primary dark:text-iDonate-green-secondary" />
                        </span>
                      </div>
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
              {isSubmitting ? "Processing..." : "បរិច្ចាគឥឡូវនេះ"}
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

      {transactionData?.responseCode === 0 && isSuccessDialogOpen && (
        <SuccessDialog
          isOpen={true}
          onClose={() => setTransactionData(undefined)}
          transactionData={transactionData}
        />
      )}
    </Form>
  );
}
