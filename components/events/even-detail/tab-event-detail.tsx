import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EvenDetailDescription } from "@/components/events/even-detail/event-detail-description";
import { DonotionForm } from "@/components/events/even-detail/donation-form";

export function TabEventDetail() {
  return (
    <Tabs defaultValue="event-description" className="w-full">
      <TabsList className="flex h-auto bg-transparent w-full border-2 border-iDonate-navy-accent py-6 gap-6 rounded-lg">
        <TabsTrigger
          className="border-2 rounded-lg px-9 border-iDonate-navy-accent data-[state=active]:bg-iDonate-navy-accent data-[state=active]:text-iDonate-navy-secondary dat`a-[state=active]:shadow-none"
          value="event-description"
        >
          xa Description
        </TabsTrigger>
        <TabsTrigger
          className="border-2 rounded-lg px-9  border-iDonate-navy-accent data-[state=active]:bg-iDonate-navy-accent data-[state=active]:text-iDonate-navy-secondary dat`a-[state=active]:shadow-none"
          value="make-donation"
        >
          Make Donation
        </TabsTrigger>
      </TabsList>

      <TabsContent value="event-description">
        <EvenDetailDescription />
      </TabsContent>

      <TabsContent value="make-donation">
        <DonotionForm />
      </TabsContent>
    </Tabs>
  );
}
