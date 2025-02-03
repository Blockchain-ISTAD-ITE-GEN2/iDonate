"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BannerComponent } from "@/components/organization/card/banner";
import { BarAndLineChart } from "@/components/organization/dashboard/bar-and-line-chart";
import WaitingForVerification from "@/components/organization/waiting-verification/waiting-verification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrganizationByuuidQuery } from "@/redux/services/organization-service";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { useGetOrgTransactionsQuery } from "@/redux/services/donation-service";
import LoadingInsidePage from "@/components/loading/LoadingComponent";

export default function OrganizationDashboard({
  params,
}: {
  params: { uuid: string };
}) {
  const router = useRouter();
  const orgUuid = String(params.uuid);

  const {
    data: organization,
    isLoading,
    error,
    isUninitialized,
  } = useGetOrganizationByuuidQuery(orgUuid);

  const {
    data: orgTransaction,
    isError,
    isLoading: isTransactionLoading,
  } = useGetOrgTransactionsQuery(orgUuid);
  const typedTransactions: TransactionType[] = orgTransaction?.content || [];

  console.log("typedTransactions", typedTransactions);

  // 🔹 Handle uninitialized state by redirecting to login
  useEffect(() => {
    if (
      isUninitialized ||
      (error && "status" in error && error.status === 401)
    ) {
      router.push("/login");
    }
  }, [isUninitialized, error, router]);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500 font-semibold">
          {"status" in error && error.status === 401
            ? "You are not authorized. Redirecting to login..."
            : "Unable to fetch organization data. Please try again later."}
        </p>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500 font-semibold">
          Organization data not found.
        </p>
      </div>
    );
  }

  // 🔹 If organization is not approved, show waiting screen
  if (organization.isApproved === false) {
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

            {/* Organization Info */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-16 w-16 rounded-lg">
                {organization.image ? (
                  <AvatarImage
                    src={organization.image}
                    alt={organization.name || "Organization Avatar"}
                  />
                ) : (
                  <AvatarFallback className="bg-gray-200 text-gray-600">
                    {organization.name
                      ? organization.name
                          .split(" ")
                          .map((word: string) => word[0])
                          .join("")
                          .toUpperCase()
                      : "CN"}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col flex-1 text-left text-sm leading-tight">
                <span className="text-iDonate-navy-primary text-lg truncate font-semibold dark:text-iDonate-navy-accent">
                  {organization.name || "Organization Name"}
                </span>
                <span className="truncate text-iDonate-gray text-sm dark:text-iDonate-green-secondary">
                  {organization.email || "info@example.com"}
                </span>
              </div>
            </div>
          </div>

          {/* Components */}
          {isTransactionLoading ? (
            <LoadingInsidePage />
          ) : (
            <>
              <BannerComponent />
              <BarAndLineChart orgUuid={orgUuid} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
