"use client";

import { BannerComponent } from "@/components/organization/card/banner";
import { BarAndLineChart } from "@/components/organization/dashboard/bar-and-line-chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetOrganizationByuuidQuery } from "@/redux/services/organization-service";
import { useRouter } from "next/navigation";

export default function OrganizationDashboard({
  params,
}: {
  params: { uuid: string };
}) {
 
  const uuid = params.uuid;

  console.log("UUID", uuid)


  const router = useRouter();
  const {
    data: organization
  } = useGetOrganizationByuuidQuery(uuid);

  console.log("UUID: ", uuid);

  console.log("Data of Organization", organization);
  // Extract the first organization from the array (with error handling)

  // // // Redirect logic
  // useEffect(() => {
  //     if (!organization) {
  //       // If no organization data is found, redirect to create organization page
  //       console.log("No organization found. Redirecting to /create-organization...");
  //       router.push("/organization-registration");
  //     }
  // }, [organization,  router]);


  // console.log("Approve check : ", organization?.isApproved);

  // if (!organization) {
  //   router.push("/organization-registration");
  // }

  // else if(organization?.isApproved == true){
  return (
    <section className="flex flex-col h-full">
    
    </section>
  );
}
// }
