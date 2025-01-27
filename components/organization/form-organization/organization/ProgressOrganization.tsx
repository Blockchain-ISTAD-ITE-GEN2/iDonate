import React from "react";

type ProgressOrganizationProps = {
  name: number; // Percentage completion for the name field
  description: number; // Percentage completion for the description field
  email: number; // Percentage completion for the email field
  phone: number; // Percentage completion for the phone field
  address: number; // Percentage completion for the address field
};

export function ProgressOrganization({
  name,
  description,
  email,
  phone,
  address,
}: ProgressOrganizationProps) {
  // Calculate the overall progress percentage
  const totalPercentage = (name + description + email + phone + address) / 5;

  return (
    <div className="w-full space-y-4">
      {/* Overall Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${totalPercentage}%` }}
        ></div>
      </div>

      {/* Individual Progress Labels */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-medium">Name:</span>
          <span>{name}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Description:</span>
          <span>{description}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Email:</span>
          <span>{email}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Phone:</span>
          <span>{phone}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Address:</span>
          <span>{address}%</span>
        </div>
      </div>
    </div>
  );
}
