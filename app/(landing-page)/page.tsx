import categories from "@/data/category.json";
import CategoryCardComponent from "@/components/events/categories/CategoryCardComponent";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import HeroSectionComponent from "@/components/herosection/HeroSectionComponent";
import TotalOrganizationComponent from "@/components/landing/TotalOrganizationComponent";
import { BarAndLineChart } from "@/components/organization/dashboard/bar-and-line-chart";
import LatestDonationCard from "@/components/landing/latest-donation-event/LatestDonationCard";
import TestimonialCarousel from "@/components/testimonials/TestimonailCardComponent";
import BannerLandingCard from "@/components/landing/banner/BannerLandingCard";
import UpcomingEvents from "@/components/landing/upcoming-event/UpComingEventComponent";

export default function Homepage() {
  const typedCategory: CategoryType[] = categories;
  return (
    <section className="flex flex-col items-center gap-9">
      {/* Here section */}
      <HeroSectionComponent />

      {/* category */}
      <section className="w-full px-6 md:px-12 lg:px-24 space-y-6 text-center">
        {/* Section Header */}
        <div className="space-y-2">
          <h2
            lang="km"
            className="text-xl font-medium text-iDonate-green-primary"
          >
            តើអ្វីខ្លះដែលយើងត្រូវធ្វើ?
          </h2>
          <h3
            lang="km"
            className="text-2xl font-medium text-iDonate-navy-primary"
          >
            ការបរិច្ចាគរបស់អ្នក ជាសេចក្តីអំណរបស់អ្នកដទៃ !
          </h3>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-9">
          <CategoryCardComponent categories={typedCategory} />
        </div>
      </section>

      {/* Total Organization */}
      <TotalOrganizationComponent />

      {/* Bar and Line Chart */}
      <section className="w-full">
        <BarAndLineChart />
      </section>

      {/* Latest Donation */}
      <section className="w-full">
        <div className="space-y-2">
          {/*Test Github actions 3 */}
          <h3
            lang="km"
            className="text-2xl text-iDonate-navy-primary text-center"
          >
            កម្មវិធីបរិច្ចាគចុងក្រោយបំផុត
          </h3>
          <LatestDonationCard />
        </div>
      </section>

      {/* Testimonail */}
      <section className="w-full">
        <TestimonialCarousel />
      </section>

      {/* Banner Landing Card */}
      <section className="w-full">
        <BannerLandingCard />
      </section>

      {/* upcoming events */}
      <section className="w-full flex flex-col items-center">
       
        <UpcomingEvents />
      </section>
    </section>
  );
}
