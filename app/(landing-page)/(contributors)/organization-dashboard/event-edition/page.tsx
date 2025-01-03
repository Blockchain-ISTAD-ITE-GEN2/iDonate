import { EventFormEdition } from "@/components/organization/event-edition/event-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function EventEdition() {
  return (
    <section className="flex flex-col p-9 gap-9">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-lg font-medium text-iDonate-navy-secondary hover:text-iDonate-navy-primary"
              href="/organization-dashboard/events"
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
