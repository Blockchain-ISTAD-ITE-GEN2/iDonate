import { CalendarDateRangePicker } from "@/components/organization/dashboard/date-range-picker";
import { Button } from "@/components/ui/button";
import { BannerComponent } from "@/components/organization/card/banner";
import { BarAndLineChart } from "@/components/organization/dashboard/bar-and-line-chart";

export default function Contributor() {
  return (
    <section className="flex flex-col h-full">
      <div className="hidden flex-col md:flex gap-9">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-heading-two-eng font-bold tracking-tight text-iDonate-navy-primary">
              Dashboard
            </h2>

            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button className="bg-iDonate-navy-secondary hover:bg-iDonate-navy-primary">
                Download
              </Button>
            </div>
          </div>

          <BannerComponent />

          <div className="flex">
            <BarAndLineChart />
          </div>
        </div>
      </div>
    </section>
  );
}
