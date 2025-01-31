"use client";
import { EventFormEdition } from "@/components/organization/event-edition/event-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";

export default function EventEdition() {
  const params = useParams();
  const orgUuid = String(params.uuid);

  return (
    <section className="flex flex-col p-9 gap-9">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-lg font-medium text-iDonate-navy-secondary hover:text-iDonate-navy-primary"
              href={`/organization-dashboard/${orgUuid}/events`}
            >
              Events
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-lg font-medium text-iDonate-navy-primary">
              Event Edition
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EventFormEdition />
    </section>
  );
}
