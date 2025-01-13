import { CalendarDateRangePicker } from "@/components/organization/dashboard/date-range-picker";
import { Button } from "@/components/ui/button";
import { BannerComponent } from "@/components/organization/card/banner";
import { BarAndLineChart } from "@/components/organization/dashboard/bar-and-line-chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import organization from "@/public/images/Cambodia-Kantha-Bopha-Foundation.jpeg";



export default function Contributor() {
  return (
    <section className="flex flex-col h-full">
      <div className="hidden flex-col md:flex gap-9">
        <div className="flex-1 space-y-4 p-8">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-medium-eng tracking-tight text-iDonate-navy-primary dark:text-iDonate-navy-accent">
              Welcome back!
            </h1>

            <div className="flex items-center space-x-2">
              <span className="flex gap-2 items-center">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage src={organization.src} alt={""} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col flex-1 text-left text-sm leading-tight">
                  <span className="text-iDonate-navy-primary text-lg truncate font-semibold dark:text-iDonate-navy-accent">
                    Cambodia Kantha Bopha Foundation
                  </span>
                  <span className="truncate text-iDonate-gray text-sm dark:text-iDonate-green-secondary">
                    info@beat-richner.ch
                  </span>
                </div>
              </span>
            </div>
          </div>

          {/* <div className="flex items-center justify-between space-y-2">
            <h2 className="text-heading-two-eng font-bold tracking-tight text-iDonate-navy-primary">
              Dashboard
            </h2>

            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button className="bg-iDonate-navy-secondary hover:bg-iDonate-navy-primary">
                Download
              </Button>
            </div>
          </div> */}

          <BannerComponent />

          <div className="flex">
            <BarAndLineChart />
          </div>
        </div>
      </div>
    </section>
  );
}
