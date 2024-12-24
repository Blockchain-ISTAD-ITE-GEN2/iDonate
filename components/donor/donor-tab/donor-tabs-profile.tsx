import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonorProfileComponent } from "@/components/donor/donor-setting/donor-profile";
import TransactionHistory from "../transaction-history/transaction-history";

export function TabsDonorProfile() {
  return (
    <Tabs defaultValue="transaction-history" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="transaction-history">
          Transaction History
        </TabsTrigger>
        <TabsTrigger value="donor-setting">Donor Setting</TabsTrigger>
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
