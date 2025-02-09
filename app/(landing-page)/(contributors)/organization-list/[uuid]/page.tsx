"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetOrganizationByUserQuery } from "@/redux/services/organization-service";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { MapPinned } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OrganizationType } from "@/difinitions/types/organization/OrganizationType";
import LoadingInsidePage from "@/components/loading/LoadingComponent";
import { Button } from "@/components/ui/button";

export default function OrganizationDashboard({
  params,
}: {
  params: { uuid: string };
}) {
  const userUuid = params.uuid;
  const router = useRouter();
  const { data: organizations } = useGetOrganizationByUserQuery(userUuid);
  const { data: user, isLoading, error } = useGetUserProfileQuery({});
  const typeOrganizations: OrganizationType[] = organizations?.content || [];

  // Check if user has the ORGANIZER role
  const isOrganizer = user?.role?.some(
    (role: { name: string }) => role.name === "ORGANIZER",
  );

  // Redirect non-organizers to the registration page
  useEffect(() => {
    if (!isLoading && !error && !isOrganizer) {
      router.push("/organization-registration");
    }
    if (!user) router.push("/login");
  }, [isLoading, error, isOrganizer, router, user]);

  // Show loading state
  if (isLoading) {
    return <LoadingInsidePage />;
  } else {
    return (
      <section className="flex flex-1 flex-col h-full items-center justify-center p-9 gap-9">
        <h1 className="text-2xl font-bold text-iDonate-navy-primary dark:text-iDonate-navy-accent">
          Organizations
        </h1>

        <div className="flex flex-col gap-6 border-2 border-iDonate-navy-accent p-16 rounded-lg bg-iDonate-light-gray dark:bg-iDonate-light-gray">
          {typeOrganizations.map((org) => (
            <Card
              key={org.uuid}
              onClick={() =>
                router.push(`/organization-dashboard/${org.uuid}/dashboard`)
              }
              className="w-full rounded-[10px] bg-iDonate-white-space border-0 cursor-pointer shadow-md transition-transform hover:scale-[1.02] dark:bg-iDonate-dark-mode"
            >
              <CardContent className="flex flex-col sm:flex-row items-center justify-center p-4 gap-4">
                {/* Logo */}
                <div className="relative w-[160px] h-[160px] flex-shrink-0 rounded-lg overflow-hidden">
                  {org?.image ? (
                    <Image
                      src={typeof org.image === "string" ? org.image : ""}
                      alt={org.name || "Media"}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="flex flex-col h-full gap-2 flex-1">
                  <h2 className="text-description-eng sm:text-medium-eng font-semibold text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                    {org?.name}
                  </h2>

                  <p className="flex-1 text-sub-description-eng text-iDonate-navy-secondary sm:line-clamp-4 dark:text-iDonate-navy-accent">
                    {org?.description}
                  </p>

                  {/* Location */}
                  <div className="flex gap-2 text-iDonate-gray dark:text-iDonate-green-secondary">
                    <MapPinned className="w-5" />
                    <p className="line-clamp-1 flex gap-2 items-center">
                      {org?.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        <Button
          variant="outline"
          onClick={() =>
            router.push(`/organization-registration`)
          }
        >
          New Organization
        </Button>
        </div>

        
      </section>
    );
  }
}
