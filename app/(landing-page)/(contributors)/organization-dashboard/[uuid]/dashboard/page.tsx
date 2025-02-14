"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetOrganizationByuuidQuery } from "@/redux/services/organization-service";
import { useGetOrgTransactionsQuery } from "@/redux/services/donation-service";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import LoadingInsidePage from "@/components/loading/LoadingComponent";
import WaitingForVerification from "@/components/organization/waiting-verification/waiting-verification";
import { BannerComponent } from "@/components/organization/card/banner";
import { BarAndLineChart } from "@/components/organization/dashboard/bar-and-line-chart";

export default function OrganizationDashboard({ params }: { params: { uuid: string } }) {
  const router = useRouter();
  const orgUuid = String(params.uuid);

  const { data: organization, isLoading, error, isUninitialized } = useGetOrganizationByuuidQuery(orgUuid);
  const { data: orgTransaction, isError, isLoading: isTransactionLoading } = useGetOrgTransactionsQuery(orgUuid);
  const transactions: TransactionType[] = orgTransaction?.content || [];

  // 🔹 Redirect to login if unauthorized
  useEffect(() => {
    if (isUninitialized || (error && "status" in error && error.status === 401)) {
      router.push("/login");
    }
  }, [isUninitialized, error, router]);

  if (isLoading || isTransactionLoading) return <LoadingInsidePage />;
  if (!organization) return <p className="text-center text-red-500">Failed to load organization data.</p>;
  if (organization.isApproved === false) return <WaitingForVerification/>;

  return (
    <section className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 py-6 overflow-auto">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-iDonate-navy-primary dark:text-iDonate-navy-accent">
            Welcome back!
          </h1>

          {/* Organization Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg">
              {organization.image ? (
                <AvatarImage src={organization.image} alt={organization.name || "Organization Avatar"} />
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

            <div className="flex flex-col text-left">
              <span className="text-lg sm:text-xl font-semibold truncate text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                {organization.name || "Organization Name"}
              </span>
              <span className="text-sm text-gray-500 dark:text-iDonate-green-secondary truncate">
                {organization.email || "info@example.com"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <BannerComponent />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <BarAndLineChart orgUuid={orgUuid}/>
        </div>
      </div>
    </section>
  );
}
