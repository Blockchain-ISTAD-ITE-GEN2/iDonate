"use client";

import { useState } from "react";

import { OrganizationInfoForm } from "./organization-info-form";
import { useEditOrganizationsMutation } from "@/redux/services/organization-service";
import { ProgressOrganization } from "./organization/ProgressOrganization";

export function OrganizationCreationForm() {
  // State for progress percentages
  const [namePercentage, setNamePercentage] = useState(0);
  const [descriptionPercentage, setDescriptionPercentage] = useState(0);
  const [emailPercentage, setEmailPercentage] = useState(0);
  const [phonePercentage, setPhonePercentage] = useState(0);
  const [addressPercentage, setAddressPercentage] = useState(0);

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    fullName: "", 

  });

  // RTK Query mutation for creating an organization
  const [createOrganization, { isLoading: isCreating }] = useEditOrganizationsMutation();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      // Call the RTK Query mutation to create an organization
      const response = await createOrganization({
        uuid: "user-uuid-here", 
        newOrganization: formData,
      }).unwrap();

      // Handle success
      alert("Organization created successfully!");
      console.log("Organization created:", response);

      // Redirect to dashboard or another page after successful creation
      // router.push("/dashboard"); // Uncomment if using Next.js router
    } catch (error) {
      // Handle error
      console.error("Error creating organization:", error);
      alert("Failed to create organization. Please try again.");
    }
  };

  return (
    <section className="w-full flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light p-6">
      {/* Progress Bar */}
      <ProgressOrganization
        name={namePercentage}
        description={descriptionPercentage}
        email={emailPercentage}
        phone={phonePercentage}
        address={addressPercentage}
      />

      {/* Organization Info Form */}
      <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <OrganizationInfoForm

          // onNamePercentageUpdate={setNamePercentage}
          // onDescriptionPercentageUpdate={setDescriptionPercentage}
          // formData={formData}
          // setFormData={setFormData}
        />
      </div>

      {/* Organization Contact Form */}
      {/* <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <OrganizationContactForm
          onEmailPercentageUpdate={setEmailPercentage}
          onPhonePercentageUpdate={setPhonePercentage}
          onAddressPercentageUpdate={setAddressPercentage}
          formData={formData}
          setFormData={setFormData}
        />
      </div> */}

      {/* Submit Button */}
      <div className="w-full flex justify-end">
        <button
          type="button" // Change to "submit" if wrapping in a form
          onClick={handleSubmit}
          disabled={isCreating} // Disable button while creating
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCreating ? "Creating..." : "Create Organization"}
        </button>
      </div>
    </section>
  );
}