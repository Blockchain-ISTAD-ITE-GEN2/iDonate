"use client";

import { OrganizationCardComponent } from "@/components/events/organization-event/OrganizationCardComponent";
import { OrganizationParam } from "@/difinitions/types/media/organization";
import { Button } from "@/components/ui/button";
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";
import { useCallback, useEffect, useState } from "react";
import { Toolbar } from "@/components/filter/toolbar";
import { useGetOrganizationsQuery } from "@/redux/services/organization-service";
import { OrganizationPlaceholderComponent } from "./OrganizationPlaceholerComponent";

export default function OrganizationOnPageComponent() {

 // add state 
  const [visibleCount, setVisibleCount] = useState(6);


  const {
    data: apiResponse,
    isLoading:isLoadingOrg,
    isError,
  } = useGetOrganizationsQuery(undefined);

  console.log("API Response Data :", apiResponse);



  const organizationData: OrganizationParam[] = apiResponse?.content || [];


  const [filteredOrganizations, setFilteredOrganizations] = useState<OrganizationParam[]>(organizationData);

  const filtersFace = [
    {
      key: "name",
      title: "Organizations",
      options: Array.from(new Set(organizationData.map((org) => org.name || "Untitled"))).map((name) => ({
        label: name,                               
        value: name,
      })),
    },
  ];
 
 


  // add all  to the filter state 
  // add all  to the filter state 
  useEffect(() => {
    setFilteredOrganizations(organizationData); 
  }, [organizationData]);
  

  const handleFilterChange = useCallback((filteredData: OrganizationParam[]) => {
    setFilteredOrganizations(filteredData.slice(0, visibleCount)); 
  }, [visibleCount]);


 // show by count add 
  useEffect(() => {
    setFilteredOrganizations(organizationData.slice(0, visibleCount)); 
  }, [organizationData, visibleCount]);




  // handle show Organization 
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };


  // if (isLoadingOrg) {
  //   return (
  //     <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-6">
  //       {Array(6)
  //         .fill(null)
  //         .map((_, index) => (
  //           <OrganizationPlaceholderComponent key={index} />
  //         ))}
  //     </div>
  //   );
  // }

  if (isError) {

    console.error("Error fetching organizations");
    // return <div className="text-center m-12">Something went Wrong!</div>;
  }

  return (
    <section className="flex flex-col py-9 gap-9 items-center">
      {/* Hero */}
      <OrganizationDetailHeroSection />

      <div className="container mx-auto px-6 md:px-6 lg:px-8 xl:px-10 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center text-iDonate-navy-primary dark:text-iDonate-navy-accent">
          អង្កការភាពដែលបាន ចូលរួមជាមួយពួកយើង
        </h2>

        <Toolbar
          events={organizationData}
          filtersFace={filtersFace}
          searchKey={"name"}
          onFilterChange={handleFilterChange}
        />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {isLoadingOrg
          ? Array(visibleCount)   // 06 
              .fill(null)
              .map((_, index) => (
                <OrganizationPlaceholderComponent key={index} />
              ))
          : filteredOrganizations.map((org: OrganizationParam, index: number) => (
              <OrganizationCardComponent
                key={index}
                image={org.image || ""}
                name={org.name}
                description={org.description}
                address={org.address}
              />
            ))}
      </div>




{/* 
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredOrganizations.map((org: OrganizationParam, index: number) => (
            <OrganizationCardComponent
              key={index}
              image={org.image || ""}
              name={org.name} 
              description={org.description}
              address={org.address}
            />
          ))}
        </div> */}

        <div className="flex justify-end">
          <Button
           className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent"
           onClick={handleShowMore}
         
           >
            Show more
          </Button>
        </div>
      </div>
    </section>
  );
}


