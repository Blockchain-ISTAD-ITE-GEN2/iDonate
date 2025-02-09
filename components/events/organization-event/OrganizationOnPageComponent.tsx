"use client";
import { OrganizationCardComponent } from "@/components/events/organization-event/OrganizationCardComponent";
import { Button } from "@/components/ui/button";
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Toolbar } from "@/components/filter/toolbar";
import { useGetOrganizationsQuery } from "@/redux/services/organization-service";
import { OrganizationPlaceholderComponent } from "./OrganizationPlaceholerComponent";
import { useRouter } from "next/navigation";
import { OrganizationType } from "@/difinitions/types/organization/OrganizationType";
import { OrganizationParam } from "@/difinitions/types/media/organization";

export default function OrganizationOnPageComponent() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(3);

  // Fetch organization data
  const { data: apiResponse, isLoading: isLoadingOrg } = useGetOrganizationsQuery({});
  const organizationData: OrganizationType[] = apiResponse?.content || [];

  const [filteredOrganizations, setFilteredOrganizations] =
  useState<OrganizationParam[]>([]);

  // useEffect(() => {
  //   setFilteredOrganizations(
  //     organizationData.map((org) => ({
  //       uuid: org.uuid,
  //       image: org.image ?? "", // Ensure `image` is never null
  //       name: org.name,
  //       description: org.description ?? "", // Ensure `description` is never null
  //       address: org.address,
  //       onClick: () => handleClick(org.uuid), // Ensure `onClick` is always defined
  //     }))
  //   );
  // }, [organizationData]);



    const filtersFace = useMemo(() => [
      {
        key: "name",
        title: "Organizations",
        options: Array.from(
          new Set(organizationData.map((org) => org.name || "Untitled"))
        ).map((name) => ({
          label: name,
          value: name,
        })),
      },
    ], [organizationData]);

  // add all  to the filter state
  // useEffect(() => {
  //   setFilteredOrganizations(organizationData);
  // }, [organizationData]);

  // Handle filter changes
  const handleFilterChange = useCallback((filteredData: any) => {
    setFilteredOrganizations(
      filteredData.map((org: any) => ({
        uuid: org.uuid,
        image: org.image ?? "",
        name: org.name,
        description: org.description ?? "",
        address: org.address ?? undefined,
        email: org.email,
        phone: org.phone,
        bankAccountNumber: org.bankAccountNumber ?? null,
        isApproved: org.isApproved,
        fileReferences: Array.isArray(org.fileReferences)
          ? org.fileReferences.join(", ")  // Ensure it's a string
          : org.fileReferences ?? "",  // Default empty string if null or undefined
        user: org.user,
        bio: org.bio ?? undefined,
        onClick: () => handleClick(org.uuid),
      }))
    );
  }, []);

  useEffect(() => {
    const updatedOrganizations: any = organizationData.map((org) => ({
      uuid: org.uuid,
      image: org.image ?? "",
      name: org.name,
      description: org.description ?? "",
      address: org.address ?? undefined,
      email: org.email,
      phone: org.phone,
      bankAccountNumber: org.bankAccountNumber ?? null,
      isApproved: org.isApproved,
      fileReferences: Array.isArray(org.fileReferences)
        ? org.fileReferences.join(", ")  // Ensure it's a string
        : org.fileReferences ?? "",  // Default empty string if null or undefined
      user: org.user,
      bio: org.bio ?? undefined,
      onClick: () => handleClick(org.uuid),
    }));

    setFilteredOrganizations(updatedOrganizations.slice(0, visibleCount));
  }, [organizationData, visibleCount]);

  // handle show Organization
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Navigate to organization details
  const handleClick = (uuid?: string) => {
    if (!uuid) {
      console.error("UUID is missing, cannot navigate.");
      return;
    }
    router.push(`/organizations/${uuid}`);
  };

  return (
    <section className="flex flex-col items-center">
      {/* Hero Section */}
      <OrganizationDetailHeroSection />

      <div className="py-9 container mx-auto px-6 md:px-6 lg:px-8 xl:px-10 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center text-iDonate-navy-primary dark:text-iDonate-navy-accent">
          អង្គការភាពដែលបាន ចូលរួមជាមួយពួកយើង
        </h2>

        <Toolbar
          events={organizationData} // Always use full data for filtering
          filtersFace={filtersFace}
          searchKey={"name"}
          onFilterChange={handleFilterChange}
        />

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {isLoadingOrg
            ? Array(visibleCount)
                .fill(null)
                .map((_, index) => <OrganizationPlaceholderComponent key={index} />)
            : filteredOrganizations.slice(0, visibleCount).map((org) => (
                <OrganizationCardComponent
                  key={org.uuid}
                  uuid={org.uuid}
                  image={org.image}
                  name={org.name}
                  description={org.description}
                  address={org.address}
                  email={org.email}
                  phone={org.phone}
                  bankAccountNumber={org.bankAccountNumber}
                  isApproved={org.isApproved}
                  fileReferences={org.fileReferences}
                  user={org.user}
                  bio={org.bio}
                  onClick={() => handleClick(org.uuid)}
                />
              ))}
        </div>

        {filteredOrganizations.length > visibleCount && (
          <div className="flex justify-end">
            <Button
              className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent"
              onClick={handleShowMore}
            >
              Show more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
