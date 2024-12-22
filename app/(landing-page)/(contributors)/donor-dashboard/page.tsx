import { TabsDonorProfile } from "@/components/donor/donor-tab/donor-tabs-profile";
import {DonorProfileComponent} from "@/components/donor/donor-setting/donor-profile";

export default function ContributorDonor() {
    return (
      <section className="flex flex-col p-9">
        <TabsDonorProfile />
        {/* <DonorProfileComponent /> */}
      </section>
    );
}