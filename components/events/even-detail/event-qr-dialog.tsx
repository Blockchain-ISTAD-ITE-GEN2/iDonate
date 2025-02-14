"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { DonationDataType } from "@/difinitions/types/donation/donation";

type EventQrDialogProps = {
  qrcode: string;
  isOpen: boolean;
  onClose: () => void;
  paymentData?: DonationDataType;
};

export default function EventQrDialog({
  qrcode,
  isOpen,
  onClose,
  paymentData,
}: EventQrDialogProps) {
  if (!qrcode || !paymentData) return null;

  const qrCodeSrc = qrcode.startsWith("data:image/")
    ? qrcode
    : `data:image/png;base64,${qrcode}`;

  const { eventUuid, donor, amount, recipient, acquiringBank, currency, city } =
    paymentData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent
        className="max-h-[90%] w-full max-w-lg md:min-w-[800px] flex flex-col p-4 md:p-6 overflow-auto scrollbar-hide gap-4 md:gap-6"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header Section */}
        <DialogHeader className="sticky top-0 z-50 px-4 md:px-6 py-4 w-full flex flex-row items-center justify-between bg-white shadow-sm">
          <DialogTitle className="text-iDonate-navy-primary font-semibold text-lg md:text-2xl">
            Event QR Code
          </DialogTitle>

          <DialogPrimitive.Close className="flex items-center justify-center gap-1 px-3 py-2 text-iDonate-gray border-2 border-iDonate-navy-accent rounded-lg hover:bg-iDonate-navy-accent disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span>Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>

        {/* Content Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center bg-white p-4 md:p-6 rounded-lg shadow-md gap-4 md:gap-6">
          {/* Payment Data Section */}
          <div className="flex flex-col gap-3 text-sm text-gray-700 w-full max-w-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Donation Event ID:</span>
              <span className="text-gray-600">{eventUuid}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Donor:</span>
              <span className="text-gray-600">{donor}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">ចំនួនថវិការបរិច្ចាគ:</span>
              <span className="text-gray-600">
                {amount} {currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Recipient:</span>
              <span className="text-gray-600">{recipient}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Acquiring Bank:</span>
              <span className="text-gray-600">
                {acquiringBank.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">City:</span>
              <span className="text-gray-600">{city}</span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center items-center bg-gray-100 p-3 md:p-4 rounded-lg shadow-md">
            <Image
              src={qrCodeSrc}
              width={250}
              height={250}
              alt="QR Code"
              className="rounded-lg"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
