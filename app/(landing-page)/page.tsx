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
    <section className="flex flex-col items-center">
      <section>
      <HeroSectionComponent />
      </section>

      <section className="w-full  px-4 py-12  space-y-4 text-center">
        <h2 className="text-xl text-iDonate-green-primary">
          តើអ្វីខ្លះដែលយើងត្រូវធ្វើ
        </h2>
        <h3 className="text-2xl text-iDonate-navy-primary">
          ការបរិច្ចាគរបស់អ្នក ជាសេចក្តីអំណរបស់អ្នកដទៃ
        </h3>
        <div
          
          className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-12 mt-8 lg:px-[100px]"
        >
          <CategoryCardComponent categories={typedCategory} />
        </div>
      </section>
      <TotalOrganizationComponent />
      <section className="w-full md:py-12 ">
        <div className="w-full mx-auto md:px-4 lg:px-[100px]">
          <BarAndLineChart />
        </div>
      </section>
      <section className="w-full py-12 lg:py-0">
        <div className="mx-auto space-y-8">
            {/*Test Github actions 3 */}
          <h3
            
            className="text-2xl text-iDonate-navy-primary text-center"
          >
            កម្មវិធីបរិច្ចាគចុងក្រោយបំផុត
          </h3>
          <LatestDonationCard />
        </div>
      </section>

      <section className="w-full py-12 lg:py-0 ">
        <div className=" mx-auto px-4">
          <TestimonialCarousel />
        </div>
      </section>

      <section className="w-full py-12 ">
        <div className="mx-auto px-4 ">
          <BannerLandingCard />
        </div>
      </section>

      <section className="w-full py-12 ">
        <div className=" mx-auto space-y-4 text-center">

          <h2  className="text-xl text-iDonate-green-primary">
            តោះ ចាប់ផ្ដើមជួយពួកគាត់ទាំងអស់គ្នា!
          </h2>
          <h3  className="text-2xl text-iDonate-navy-primary">
            កម្មវិធីបរិច្ចាគ ដែលនិងកើតឡើងឆាប់នេះ!
          </h3>
          <UpcomingEvents />
        </div>
      </section>
    </section>
  );
}
