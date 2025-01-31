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
      <DialogContent className="max-w-lg w-full flex flex-col p-6 bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <h2 className="text-xl font-bold text-gray-800">
            Payment Successful
          </h2>
          <p className="text-sm text-gray-500">
            Transaction completed successfully.
          </p>
        </div>

        {/* Transaction Details Section */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-md font-semibold text-gray-700 mb-3">
            Transaction Details
          </h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            {/* <div className="flex justify-between">
              <span className="font-medium text-gray-700">Transaction ID:</span>
              <span className="text-gray-900 font-mono">{transactionData?.data?.hash}</span>
            </div> */}
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">From Account:</span>
              <span>{transactionData?.data?.fromAccountId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">To Account:</span>
              <span>{transactionData?.data?.toAccountId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Amount:</span>
              <span>
                {transactionData?.data?.amount?.toFixed(2)} {currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Created Date:</span>
              <span>{transactionData?.data?.createdDateMs}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">
                Acknowledged Date:
              </span>
              <span>{transactionData?.data?.acknowledgedDateMs}</span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-center gap-2">
          {/* share */}
          <Button className="w-full rounded-lg bg-iDonate-green-secondary hover:bg-iDonate-green-secondary text-iDonate-navy-primary font-semibold">
            <Share2Icon />
            Share Donation
          </Button>
          <DialogPrimitive.Close className="flex items-center justify-center gap-1 px-3 py-1 text-iDonate-gray border-2 border-iDonate-navy-accent rounded-lg hover:bg-iDonate-navy-accent disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span>Close</span>
          </DialogPrimitive.Close>
        </div>
      </DialogContent>
    </Dialog>
  );
}
