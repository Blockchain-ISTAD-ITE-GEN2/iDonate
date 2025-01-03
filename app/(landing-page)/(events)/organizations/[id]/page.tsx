import { OrganizationDetail } from "@/components/events/organization-event/detail-event/Organization-card-detail";
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";

import { SearchPage } from "@/components/search/SearchOnPageComponent";

export default function Page() {

  return (
    <section className="flex flex-col gap-9 py-9 justify-center">
      {/*Start Hero Section*/}
      <OrganizationDetailHeroSection />

      <OrganizationDetail />
    </section>
  );
}
