import { OrganizationInfoForm } from "@/components/form-organization/organization-info-form";
import { OrganizationAddressForm } from "./organization-address-form";
import { OrganizationBioForm } from "./organization-bio-form";
import { OrganizationPaymentForm } from "./organization-payment-form";
import { OrganizationMediaForm } from "./organization-media-form";
import { OrganizationReferenceForm } from "./organization-reference-form";

export function OrganizationProfileComponent (){
    return (
        <section className="w-full flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light">

            <div className="w-full flex flex-col gap-6  border-b-2 border-iDonate-navy-accent">
                <OrganizationMediaForm />
            </div>
            

            <div className="w-full flex flex-col gap-6 px-20 py-12">
                <OrganizationInfoForm />

                <OrganizationAddressForm />

                <OrganizationReferenceForm />

                <OrganizationBioForm />

                <OrganizationPaymentForm />
            </div>
            
        </section>
    )
}