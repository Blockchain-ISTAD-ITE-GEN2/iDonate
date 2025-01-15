"use client";
import { OrganizationCardComponent } from "@/components/events/organization-event/OrganizationCardComponent";
import { SearchInput } from "@/components/ui/SearchInput";
import OrganizationCarouseHerosection from "@/components/herosection/OrganizationCarouseHerosection";
import { DropDownButtonComponent } from "@/components/dropdown-button/DropDownButtonComponent";
import { useRouter } from "next/navigation";
import { OrganizationParam } from "@/difinitions/types/media/organization";
import { Button } from "@/components/ui/button";
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";
import { useEffect, useState } from "react";
import { Toolbar } from "@/components/filter/toolbar";

// const OrganizationCarouseHerosection = dynamic(() => import("@/components/herosection/OrganizationCarouseHerosection"), { ssr: false });

// json data for testing
const organizationData = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ISTnNfD0aD2BShZNw3_VmxokXpB7kryEg&s",
    title: "Cambodia Kantha Bopha Foundation",
    description:
      "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន",
    location: "St 123 Phom Penh",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6MAAOLgnKKemUTNtx2BWXrqPRmFsulj02A&s",
    title: "Cambodia Kantha Bopha Foundation",
    description:
      "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន",
    location: "St 123 Phom Penh",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_of_Cambodian_Red_Cross.svg/1024px-Logo_of_Cambodian_Red_Cross.svg.png",
    title: "Cambodia Kantha Bopha Foundation",
    description:
      "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន",
    location: "St 123 Phom Penh",
  },
  {
    image:
      "https://newhopeforcambodianchildren.org/wp-content/uploads/2016/12/nhcclogowtrans.png",
    title: "Cambodia Kantha Bopha Foundation",
    description:
      "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន",
    location: "St 123 Phom Penh",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6MAAOLgnKKemUTNtx2BWXrqPRmFsulj02A&s",
    title: "Cambodia Kantha Bopha Foundation",
    description:
      "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន",
    location: "St 123 Phom Penh",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_of_Cambodian_Red_Cross.svg/1024px-Logo_of_Cambodian_Red_Cross.svg.png",
    title: "Cambodia Kantha Bopha Foundation",
    description:
      "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន",
    location: "St 123 Phom Penh",
  },
  {
    image:
      "https://newhopeforcambodianchildren.org/wp-content/uploads/2016/12/nhcclogowtrans.png",
    title: "Cambodia Kantha Bopha Foundation",
    description:
      "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន",
    location: "St 123 Phom Penh",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_of_Cambodian_Red_Cross.svg/1024px-Logo_of_Cambodian_Red_Cross.svg.png",
    title: "Cambodia Kantha Bopha Foundation",
    description:
      "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន",
    location: "St 123 Phom Penh",
  },
];

export default function OrganizationOnPageComponent() {
  const [filteredOrganizations, setFilteredOrganizations] =
    useState(organizationData);

  const filtersFace = [
    {
      key: "title",
      title: "Organizations",
      options: Array.from(
        new Set(organizationData.map((organization) => organization.title)),
      ).map((organization) => ({
        label: organization,
        value: organization,
      })),
    },
  ];

  useEffect(() => {
    setFilteredOrganizations(organizationData); // Reset filtered events whenever `events` prop changes
  }, [organizationData]);

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
          searchKey={"title"}
          onFilterChange={setFilteredOrganizations}
        />

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredOrganizations.map(
            (org: OrganizationParam, index: number) => (
              <OrganizationCardComponent
                key={index}
                image={org.image}
                title={org.title}
                description={org.description}
                location={org.location}
              />
            ),
          )}
        </div>

        <div className="flex justify-end">
          <Button className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent">
            Show more
          </Button>
        </div>
      </div>
    </section>
  );
}
