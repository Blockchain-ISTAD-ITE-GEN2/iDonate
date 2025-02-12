"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpcommingEventPlaceholderComponent() {
  return (
    <section className="w-full lg:w-full mx-auto md:px-4 px-4 lg:px-[100px] pb-9 space-y-4">
      <h2
        lang="km"
        className="text-medium-khmer text-center text-iDonate-green-primary dark:text-iDonate-green-secondary"
      >
        តោះ ចាប់ផ្ដើមជួយពួកគាត់ទាំងអស់គ្នា!
      </h2>
      <h3
        lang="km"
        className="text-heading-two-khmer text-center text-iDonate-navy-primary leading-tight dark:text-[#DCE3F0]"
      >
        កម្មវិធីបរិច្ចាគ ដែលនិងកើតឡើងឆាប់នេះ!
      </h3>

      <div className="grid lg:grid-cols-2 gap-6 bg-transparent">
        {/* Featured Event Placeholder */}
        <Card className="overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer flex flex-col">
          <div className="flex-1 aspect-video relative">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <CardContent
            lang="km"
            className="flex-grow p-6 flex flex-col justify-between"
          >
            <div>
              <CardTitle className="text-title-khmer mb-2 font-semibold text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                <Skeleton className="h-6 w-3/4" />
              </CardTitle>
              <div className="line-clamp-4 sm:line-clamp-none text-description-khmer text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-4 pt-4">
              <div className="flex items-center gap-2 text-iDonate-navy-secondary dark:text-iDonate-green-secondary">
                <Skeleton className="h-4 w-4 flex-shrink-0" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center gap-2 text-iDonate-navy-primary dark:text-iDonate-green-secondary">
                <Skeleton className="h-5 w-5 flex-shrink-0" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid of Smaller Events Placeholders */}
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer dark:text-iDonate-navy-accent"
            >
              <div className="aspect-video relative">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>

              <CardContent className="flex-grow p-4 space-y-2">
                <CardTitle className="text-title-khmer font-semibold text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                  <Skeleton className="h-5 w-3/4" />
                </CardTitle>
                <div className="flex-1 text-description-khmer text-iDonate-navy-secondary line-clamp-2 dark:text-iDonate-navy-accent">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <div className="flex flex-wrap justify-between gap-4">
                  <div className="flex items-center gap-2 text-iDonate-navy-secondary dark:text-iDonate-green-secondary">
                    <Skeleton className="h-5 w-5 flex-shrink-0" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="flex items-center gap-2 text-iDonate-navy-secondary dark:text-iDonate-green-secondary">
                    <Skeleton className="h-5 w-5 flex-shrink-0" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
