"use client";

import { useState } from "react";
import { DonorProfilePercentage } from "@/components/donor/donor-setting/doner-profile-percentage";
import { DonorInfoForm } from "@/components/donor/donor-setting/donor-info-form";
import { DonorMediaForm } from "./donor-media-form";

export function DonorProfileComponent() {
  const [imagePercentage, setImagePercentage] = useState(0);
  const [firstNamePercentage, setFirstNamePercentage] = useState(0);
  const [lastNamePercentage, setLastNamePercentage] = useState(0);
  const [usernamePercentage, setUsernamePercentage] = useState(0);
  const [dateOfBirthPercentage, setDateOfBirthPercentage] = useState(0);
  const [genderPercentage, setGenderPercentage] = useState(0);
  const [phoneNumberPercentage, setPhoneNumberPercentage] = useState(0);

  return (
    <section className="flex gap-4 md:gap-6 xl:gap-9 flex-col lg:flex-row">
      <div className="w-full order-last lg:order-first flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light">
        <div className="w-full flex flex-col gap-6  border-b-2 border-iDonate-navy-accent">
          <DonorMediaForm onPercentageUpdate={setImagePercentage} />
        </div>

        <div className="w-full flex flex-col gap-6 px-4 sm:px-6 lg-px-9 xl:px-12 pb-9">
          <DonorInfoForm
            onFirstNamePercentageUpdate={setFirstNamePercentage}
            onLastNamePercentageUpdate={setLastNamePercentage}
            onUsernamePercentageUpdate={setUsernamePercentage}
            onDateOfBirthPercentageUpdate={setDateOfBirthPercentage}
            onGenderPercentagePercentageUpdate={setGenderPercentage}
            onPhoneNumberPercentageUpdate={setPhoneNumberPercentage}
          />

          {/* <DonorAddressForm onPercentageUpdate={setAddressPercentage} />

          <DonorBioForm onPercentageUpdate={setBioPercentage} /> */}
        </div>
      </div>

      <DonorProfilePercentage
        percentages={[
          imagePercentage,
          firstNamePercentage,
          lastNamePercentage,
          usernamePercentage,
          dateOfBirthPercentage,
          genderPercentage,
          phoneNumberPercentage,
        ]}
      />
    </section>
  );
}
