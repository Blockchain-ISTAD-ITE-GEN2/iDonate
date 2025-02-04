import { Skeleton } from "@/components/ui/skeleton";
import { EvnetCardPlaceholder } from "./EventCardPlacehoder";

export default function CategoryPlaceholderDetailComponent() {
  return (
    <section className="flex flex-col md:flex-row gap-9 px-9">
      {/* Left Section */}
      <div className="md:order-first flex flex-col gap-9 flex-1 h-full">
        <div className="relative min-h-[600px] flex flex-col gap-6">
          {/* Image Placeholder */}
          <div className="relative min-h-[600px] bg-iDonate-light-gray rounded-lg">
            <Skeleton className="w-full h-full rounded-lg cursor-pointer shadow-md bg-transparent bg-iDonate-dark-mode dark:bg-iDonate-dark-mode" />
          </div>

          {/* Name and Description Section */}
          <div className="flex flex-col gap-6">
            <h1 className="text-heading-two-khmer text-iDonate-navy-primary leading-normal">
              <Skeleton className="h-8 w-2/3" />
            </h1>
            <div className="text-iDonate-navy-primary text-description-khmer md:text-lg lg:text-xl leading-9">
              <Skeleton className="h-5 w-3/4 m-2" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
              <EvnetCardPlaceholder />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
