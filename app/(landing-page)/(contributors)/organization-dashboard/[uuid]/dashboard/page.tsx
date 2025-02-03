"use client";

import { BannerComponent } from "@/components/organization/card/banner";
import { BarAndLineChart } from "@/components/organization/dashboard/bar-and-line-chart";
import WaitingForVerification from "@/components/organization/waiting-verification/waiting-verification";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGetOrganizationByuuidQuery } from "@/redux/services/organization-service";
import { useParams, useRouter } from "next/navigation";

export default function OrganizationDashboard() {
  const params = useParams();
  const router = useRouter();
  
  const uuid = params?.uuid as string; // Ensure it's treated as a string

  console.log("UUID from params:", uuid);

  const {
    data: organization,
    isLoading,
    error,
  } = useGetOrganizationByuuidQuery(uuid);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">Loading organization data...</p>
    );
  }

  if (error || !organization) {
    return (
      <p className="text-center text-red-500">
        Unable to fetch organization data. Please try again later.
      </p>
    );
  }

  // Conditional Rendering
  if (organization?.isApproved === false) {
    return <WaitingForVerification />;
  }

  return (
    <section className="flex flex-col h-full">
      <div className="hidden flex-col md:flex gap-9">
        <div className="flex-1 space-y-4 p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-medium-eng tracking-tight text-iDonate-navy-primary dark:text-iDonate-navy-accent">
              Welcome back!
            </h1>

            <div className="flex items-center space-x-2">
              <span className="flex gap-2 items-center">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage
                    src={organization?.image || "/placeholder-avatar.png"}
                    alt={organization?.name || "Organization Avatar"}
                  />
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

          {/* Components */}
          <BannerComponent />
          <BarAndLineChart orgUuid={uuid} />
        </div>
      </div>
    </section>
  );
}
