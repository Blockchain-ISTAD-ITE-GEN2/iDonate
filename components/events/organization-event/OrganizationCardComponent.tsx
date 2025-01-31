"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { OrganizationParam } from "@/difinitions/types/media/organization";
import { MapPinned } from "lucide-react";
import { useRouter } from "next/navigation";

export function OrganizationCardComponent({
  image,
  name,
  description,
  address,
}: OrganizationParam) {
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        router.push("/organizations/0");
      }}
      className="w-full rounded-[10px] bg-iDonate-light-gray border-0 cursor-pointer shadow-md transition-transform hover:scale-[1.02] dark:bg-iDonate-dark-mode"
    >
      <CardContent className="flex flex-col sm:flex-row items-center justify-center p-4 gap-4">
        {/* Logo */}
        <div className="relative aspect-square min-w-[160px] h-full flex-shrink-0 rounded-lg">
          {image ? (
            <Image
              src={image}
              alt={name || "Media"}
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col h-full gap-2 flex-1">
          <h2 className="text-description-eng sm:text-medium-eng font-semibold text-iDonate-navy-primary dark:text-iDonate-navy-accent">
            {name}
          </h2>

          <p className="flex-1 text-sub-description-eng text-iDonate-navy-secondary  sm:line-clamp-4 dark:text-iDonate-navy-accent">
            {description}
          </p>

          {/* Location */}
          <div className="flex gap-2 text-iDonate-gray dark:text-iDonate-green-secondary">
            <MapPinned className="w-5" />
            <p className=" line-clamp-1 flex gap-2 items-center ">{address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
