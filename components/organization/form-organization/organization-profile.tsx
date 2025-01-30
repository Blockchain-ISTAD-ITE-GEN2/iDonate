"use client"
import { OrganizationMediaForm } from "@/components/organization/form-organization/organization-media-form";
import { OrganizationInfoForm } from "@/components/organization/form-organization/organization-info-form";
import { OrganizationAddressForm } from "@/components/organization/form-organization/organization-address-form";
import { OrganizationReferenceForm } from "@/components/organization/form-organization/organization-reference-form";
import { OrganizationBioForm } from "@/components/organization/form-organization/organization-bio-form";
import { OrganizationPaymentForm } from "@/components/organization/form-organization/organization-payment-form";
import { useParams } from "next/navigation";

export function OrganizationProfileComponent() {

  const params = useParams();
  const orgUuid = String(params.uuid); 

  return (
    <section className="w-full flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light ">
      <div className="w-full flex flex-col gap-6  border-b-2 border-iDonate-navy-accent ">
        <OrganizationMediaForm uuid={orgUuid}/>
      </div>

      <div className="w-full flex flex-col gap-6 px-20 py-12">
        <OrganizationInfoForm uuid={orgUuid}/>

        <OrganizationAddressForm uuid={orgUuid}/>

        <OrganizationReferenceForm uuid={orgUuid}/>

        <OrganizationBioForm uuid={orgUuid}/>

        <OrganizationPaymentForm uuid={orgUuid}/>
      </div>
    </section>
  );
}
