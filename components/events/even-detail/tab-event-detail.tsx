import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EvenDetailDescription } from "@/components/events/even-detail/event-detail-description";
import { DonationForm } from "@/components/events/even-detail/donation-form";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";

export function TabEventDetail() {
  const { data: user, isLoading } = useGetUserProfileQuery({});
  const router = useRouter();

  const handleTabChange = (value: string) => {
    if (value === "make-donation" && !user) {
      router.push("/login");
    }
  };

  return (
    <Tabs defaultValue="event-description" onValueChange={handleTabChange} className="w-full h-full">
      <TabsList className="flex h-auto bg-transparent w-full border-2 border-iDonate-navy-accent py-6 gap-6 rounded-lg">
        <TabsTrigger
          className="border-2 rounded-lg lg:px-9 border-iDonate-navy-accent data-[state=active]:bg-iDonate-navy-accent data-[state=active]:text-iDonate-navy-secondary"
          value="event-description"
        >
          ការពិពណ៌នា
        </TabsTrigger>
        <TabsTrigger
          className="border-2 rounded-lg lg:px-9 border-iDonate-navy-accent data-[state=active]:bg-iDonate-navy-accent data-[state=active]:text-iDonate-navy-secondary"
          value="make-donation"
        >
          ធ្វើការបរិច្ចាគ
        </TabsTrigger>
      </TabsList>

      <TabsContent value="event-description" className="h-full">
        <EvenDetailDescription />
      </TabsContent>

      {user && (
        <TabsContent value="make-donation" className="h-full">
          <DonationForm />
        </TabsContent>
      )}
    </Tabs>
  );
}
