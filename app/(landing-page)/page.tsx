import categories  from "@/data/category.json";
import CategoryCardComponent from "@/components/category/CategoryCardComponent";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import HeroSectionComponent from "@/components/herosection/HeroSectionComponent";
import TotalOrganizationComponent from "@/components/landing/TotalOrganizationComponent";
import { BarAndLineChart } from "@/components/organization/dashboard/bar-and-line-chart";
import LatestDonation from "@/components/landing/latest-donation-event/LatestDonation";
import LatestDonationCard from "@/components/landing/latest-donation-event/LatestDonationCard";
import TestimonialCarousel from "@/components/testimonials/TestimonailCardComponent";
import BannerLandingCard from "@/components/landing/banner/BannerLandingCard";
import UpcomingEvents from "@/components/landing/upcoming-event/UpComingEventComponent";

export default function Homepage() {

  const typedCategory: CategoryType[] = categories

  return (
    <section  className="flex flex-col md:gap-4 items-center ">
      <HeroSectionComponent/>
      <section lang="km">
        <span className="text-center text-xl text-iDonate-green-primary">តើអ្វីខ្លះដែលយើងត្រូវធ្វើ</span>
      </section>
      <section lang="km">
        <span className="text-2xl text-iDonate-navy-primary">ការបរិច្ចាគរបស់អ្នក ជាសេចក្តីអំណរបស់អ្នកដទៃ</span>
      </section>
      <section lang="km" className="flex items-center gap-9">
        <CategoryCardComponent categories={typedCategory} /> 
      </section>
      <section className="w-full ">
        <TotalOrganizationComponent/>
      </section>
      {/* data visualization and insigh */}
      <section className="flex w-full px-[110px]">
      <BarAndLineChart/>
      </section>
      {/* The latest donation transaction */}
      <section>
        <span className="text-2xl text-iDonate-navy-primary " lang="km">កម្មវិធីបរិច្ចាគចុងក្រោយបំផុត</span>
      </section>
      <section className="w-full  rounded-none">
        <LatestDonationCard/>
      </section>
      {/* The Feedbacks from Donors */}
      <section className="w-full  rounded-none">
      <TestimonialCarousel/>
      </section>
      {/* Banner */}
      <section  className="w-full  rounded-none" >
        <BannerLandingCard/>
      </section>
      {/* Upcoming-event */}
      <section lang="km">
        <span className="text-center text-xl text-iDonate-green-primary">តោះ ចាប់ផ្ដើមជួយពួកគាត់ទាំងអស់គ្នា!</span>
      </section>
      <section lang="km">
        <span className="text-2xl text-iDonate-navy-primary">កម្មវិធីបរិច្ចាគ ដែលនិងកើតឡើងឆាប់នេះ!</span>
      </section>
      <section>
        <UpcomingEvents/>
      </section>

    </section>
  );
}
