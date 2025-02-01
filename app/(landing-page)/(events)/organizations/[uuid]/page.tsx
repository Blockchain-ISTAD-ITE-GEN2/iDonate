import { OrganizationDetail } from "@/components/events/organization-event/[uuid]/organization-detail";
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";
import { useGetEventByOrganizationQuery } from "@/redux/services/event-service";
import { Metadata } from "next";

type OrganizationDetail = {
  params: {
    uuid: string;
  };
};


// get Event  Detail 
async function getOrganizationDetails(uuid: string) {

  const response = await fetch(`https://idonateapi.kangtido.life//api/v1/events/get-event-by-organization/${uuid}`);
  
  const data = await response.json();

  return {
    name: data.name || `Organization ${uuid}`,
    description: data.description || `Details about Organization ${uuid}`,
  };
}
// Generate metadata dynamically
export async function generateMetadata({ params }: OrganizationDetail): Promise<Metadata> {

  const organization = await getOrganizationDetails(params.uuid);

  return {
    title: `${organization.name} - Organization Details`,
    description: organization.description,
    keywords: [
      "IDONATE",
      "iDonate",
      "idonate",
      "idonate istad",
      "idonate.istad.co",
      "donation",
      "idonate cambodia",
      "charity",
      "Charity",
    ],
    openGraph: {
      title: organization.name,
      description: organization.description,
      url: `/organization/${params.uuid}`,
      type: "website",
    },
  };
}

export default function Page({params}:OrganizationDetail) {
  return (
    <section className="flex flex-col gap-9 py-9 justify-center">
      
      {/*Start Hero Section*/}
      <OrganizationDetailHeroSection />

      <OrganizationDetail uuid={params.uuid} />
      
    </section>
  );
}








