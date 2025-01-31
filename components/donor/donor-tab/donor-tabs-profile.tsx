import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonorProfileComponent } from "@/components/donor/donor-setting/donor-profile";
import TransactionHistory from "@/components/donor/transaction-history/transaction-history";

export function TabsDonorProfile() {
  return (
    <Tabs
      defaultValue="transaction-history"
      className="w-full flex flex-col gap-4 md:gap-6 xl:gap-9"
    >
      <TabsList className="flex flex-col px-6 sm:px-0 sm:flex-row h-auto bg-transparent w-full border-2 border-iDonate-navy-accent py-6 gap-4 md:gap-6 rounded-lg">
        <TabsTrigger
          className="border-2 w-full sm:w-auto rounded-lg px-6 md:px-9 border-iDonate-navy-accent data-[state=active]:bg-iDonate-navy-accent data-[state=active]:text-iDonate-navy-secondary data-[state=active]:shadow-none"
          value="transaction-history"
        >
          Transaction History
        </TabsTrigger>
        <TabsTrigger
          className="border-2 w-full sm:w-auto rounded-lg px-6 md:px-9 border-iDonate-navy-accent data-[state=active]:bg-iDonate-navy-accent data-[state=active]:text-iDonate-navy-secondary data-[state=active]:shadow-none"
          value="donor-setting"
        >
          Donor Setting
        </TabsTrigger>
      </TabsList>

      <TabsContent value="transaction-history">
        <TransactionHistory />
      </TabsContent>

      <TabsContent value="donor-setting">
        <DonorProfileComponent />
      </TabsContent>
    </Tabs>
  );
}
