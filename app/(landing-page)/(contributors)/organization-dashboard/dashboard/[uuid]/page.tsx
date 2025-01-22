"use client"; 

import { BannerComponent } from "@/components/organization/card/banner";
import { BarAndLineChart } from "@/components/organization/dashboard/bar-and-line-chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetOrganizationByuuidQuery } from "@/redux/services/organization-service";
import { useRouter } from "next/navigation";


export default function OrganizationDashboard({ params }: { params: { uuid: string } }) {
  const { uuid } = params; 
  const router = useRouter();
  const { data: organization, isLoading, isError } = useGetOrganizationByuuidQuery(uuid);

  console.log("UUID: ", uuid)

  console.log("Data of Organization", organization)
  // Extract the first organization from the array (with error handling)
  

  // // Redirect logic
  // useEffect(() => {
  //   if (!isLoading && !isError) {
  //     if (!organization) {
  //       // If no organization data is found, redirect to create organization page
  //       console.log("No organization found. Redirecting to /create-organization...");
  //       router.push("/organization-dashboard/create-organization");
  //     }
  //   }
  // }, [organization, isLoading, isError, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("Approve check : ", organization?.isApproved)

  if (!organization) {
    router.push("/organization-dashboard/organization-registration");
  }

  else if(organization?.isApproved == true){
  return (
    <section className="flex flex-col h-full">
      <div className="hidden flex-col md:flex gap-9">
        <div className="flex-1 space-y-4 p-8">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-medium-eng tracking-tight text-iDonate-navy-primary dark:text-iDonate-navy-accent">
              Welcome back!
            </h1>

            <div className="flex items-center space-x-2">
              <span className="flex gap-2 items-center">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage src={organization.src} alt={""} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col flex-1 text-left text-sm leading-tight">
                  <span className="text-iDonate-navy-primary text-lg truncate font-semibold dark:text-iDonate-navy-accent">
                    {organization?.name || "Organization Name"}
                  </span>
                  <span className="truncate text-iDonate-gray text-sm dark:text-iDonate-green-secondary">
                    {organization?.email || "info@example.com"}
                  </span>
                </div>
              </span>
            </div>
          </div>

          <BannerComponent />

          <BarAndLineChart />
        </div>
      </div>
    </section>
  );
 }
}