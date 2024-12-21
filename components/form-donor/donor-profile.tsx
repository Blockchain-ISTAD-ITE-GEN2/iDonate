'use client';
import { DonorMediaForm } from "./donor-media-form";
import { DonorAddressForm } from "./donor-address-form";
import { DonorBioForm } from "./donor-bio-form";
import { DonorInfoForm } from "./donor-info-form";
import { DonorProfilePercentage } from "./doner-profile-percentage";
import { useState } from "react";

export function DonorProfileComponent (){
    const [imagePercentage, setImagePercentage] = useState(0);
    const [addressPercentage, setAddressPercentage] = useState(0);
    const [fullNamePercentage, setFullNamePercentage] = useState(0);
    const [emailPercentage, setEmailPercentage] = useState(0);
    const [contactPercentage, setContactPercentage] = useState(0);
    const [bioPercentage, setBioPercentage] = useState(0); 

    return (
        <section className="flex gap-9">
            <div className="w-full flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light">

                <div className="w-full flex flex-col gap-6  border-b-2 border-iDonate-navy-accent">
                    <DonorMediaForm onPercentageUpdate={setImagePercentage}/>
                </div>
                

                <div className="w-full flex flex-col gap-6 px-20 py-12">
                    <DonorInfoForm 
                        onFullnamePercentageUpdate={setFullNamePercentage}
                        onEmailPercentageUpdate={setEmailPercentage}
                        onContactPercentageUpdate={setContactPercentage}
                    />

                    <DonorAddressForm onPercentageUpdate={setAddressPercentage} />

                    <DonorBioForm onPercentageUpdate={setBioPercentage}/>

                </div>
            </div>

            <DonorProfilePercentage 
                percentages={
                    [
                        imagePercentage,
                        fullNamePercentage, 
                        emailPercentage,
                        contactPercentage,
                        addressPercentage,
                        bioPercentage
                    ]
                } 
            />

        </section> 
    )
}