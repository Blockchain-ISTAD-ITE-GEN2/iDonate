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
import { DonationType } from "@/difinitions/types/donation/donation";

type EventQrDialogProps = {
  qrcode: string;
  isOpen: boolean;
  onClose: () => void;
  paymentData?: DonationType;
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

  const { donationEventID, donor, amount, recipient, acquiringBank, currency, city } = paymentData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent
        className="max-h-[90%] min-w-[800px] w-auto max-w-full flex flex-col p-0 overflow-auto scrollbar-hide gap-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sticky top-0 z-50 px-6 py-4 w-full flex flex-row items-center justify-between bg-white shadow-sm">
          <DialogTitle className="text-iDonate-navy-primary font-semibold text-2xl">
            Event QR Code
          </DialogTitle>

          <DialogPrimitive.Close className="flex items-center justify-center gap-1 px-3 py-1 text-iDonate-gray border-2 border-iDonate-navy-accent rounded-lg hover:bg-iDonate-navy-accent disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span>Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>

        <div className="flex flex-col md:flex-row items-center justify-center bg-white p-6 rounded-lg shadow-md gap-6">
          {/* QR Code Section */}
          <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md">
            {qrcode && (
              <Image
                src={qrCodeSrc}
                width={300}
                height={300}
                alt="QR Code"
                className="rounded-lg"
              />
            )}
          </div>

          {/* Payment Data Section */}
          <div className="flex flex-col gap-4 text-sm text-gray-700 w-full max-w-sm">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-start">Donation Event ID:</span>
              <span className="text-gray-600 text-end">{donationEventID}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-start">Donor:</span>
              <span className="text-gray-600 text-end">{donor}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-start">Amount:</span>
              <span className="text-gray-600 text-end">
                {amount} {currency}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-start">Recipient:</span>
              <span className="text-gray-600 text-end">{recipient}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-start">Acquiring Bank:</span>
              <span className="text-gray-600 text-end">{acquiringBank.toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-start">City:</span>
              <span className="text-gray-600 text-end">{city}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
