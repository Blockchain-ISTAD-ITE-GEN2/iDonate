"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, CheckCircle, Share2Icon } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { TransactionDataType } from "@/difinitions/types/donation/donation";
import { Button } from "@/components/ui/button";

type SuccessDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  transactionData: TransactionDataType | undefined;
};

export default function SuccessDialog({
  isOpen,
  onClose,
  transactionData,
}: SuccessDialogProps) {
  const currency = "USD"; // Define the currency variable

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className=" max-w-sm md:max-w-lg w-full flex flex-col p-4 md:p-6 bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2 text-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            Payment Successful
          </h2>
          <p className="text-sm text-gray-500">
            Transaction completed successfully.
          </p>
        </div>

        {/* Transaction Details Section */}
        <div className="mt-4 md:mt-6 bg-gray-50 p-3 md:p-4 rounded-lg w-full">
          <h3 className="text-md font-semibold text-gray-700 mb-2 md:mb-3">
            Transaction Details
          </h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">From Account:</span>
              <span className="text-gray-900">{transactionData?.data?.fromAccountId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">To Account:</span>
              <span className="text-gray-900">{transactionData?.data?.toAccountId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">
                ចំនួនថវិការបរិច្ចាគ:
              </span>
              <span className="text-gray-900">
                {transactionData?.data?.amount?.toFixed(2)} {currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Created Date:</span>
              <span className="text-gray-900">{transactionData?.data?.createdDateMs}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">
                Acknowledged Date:
              </span>
              <span className="text-gray-900">{transactionData?.data?.acknowledgedDateMs}</span>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col md:flex-row gap-2 w-full mt-4 md:mt-6">
          {/* Share Button */}
          <Button className="w-full flex items-center justify-center gap-2 rounded-lg bg-iDonate-green-secondary hover:bg-iDonate-green-secondary text-iDonate-navy-primary font-semibold">
            <Share2Icon className="w-4 h-4" />
            Share Donation
          </Button>
          
          {/* Close Button */}
          <DialogPrimitive.Close className="w-full md:w-auto flex items-center justify-center gap-2 px-3 py-2 text-iDonate-gray border-2 border-iDonate-navy-accent rounded-lg hover:bg-iDonate-navy-accent disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span>Close</span>
          </DialogPrimitive.Close>
        </div>
      </DialogContent>
    </Dialog>
  );
}