import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonorProfileComponent } from "@/components/donor/donor-setting/donor-profile";
import TransactionHistory from "@/components/donor/transaction-history/transaction-history";

export function TabsDonorProfile() {
  return (
    <Tabs
      defaultValue="transaction-history"
      className="w-full flex flex-col gap-6"
    >
      <TabsList className="flex h-auto bg-transparent w-full border-2 border-iDonate-navy-accent py-6 gap-6 rounded-lg">
        <TabsTrigger
          className="border-2 rounded-lg px-9 border-iDonate-navy-accent data-[state=active]:bg-iDonate-navy-accent data-[state=active]:text-iDonate-navy-secondary dat`a-[state=active]:shadow-none"
          value="transaction-history"
        >
          Transaction History
        </TabsTrigger>
        <TabsTrigger
          className="border-2 rounded-lg px-9 border-iDonate-navy-accent data-[state=active]:bg-iDonate-navy-accent data-[state=active]:text-iDonate-navy-secondary dat`a-[state=active]:shadow-none"
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
