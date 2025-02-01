import { OrganizationDetail } from "@/components/events/organization-event/[uuid]/organization-detail";
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";

import { SearchPage } from "@/components/search/SearchOnPageComponent";


type OrganizationDetail = {
  params: {
    uuid: string;
  };
};


export default function Page({params}:OrganizationDetail) {
  return (
    <section className="flex flex-col gap-9 py-9 justify-center">
      
      {/*Start Hero Section*/}
      <OrganizationDetailHeroSection />

      <OrganizationDetail uuid={params.uuid} />
      
    </section>
  );
}








