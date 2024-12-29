import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function OrganizationDetailHeroSection() {
  return (
    <section className="lg:mx-[106px] h-[600px]">
      <div className="grid md:px-4 py-8 lg:gap-8 xl:gap-0 xl:gap-16 2xl:gap-20 lg:grid-cols-12">
        {/* Left Content */}
        <div className="lg:col-span-7 mt-0 w-11/12 mx-auto lg:w-full">
          <h1
           
            className="text-iDonate-navy-primary max-w-2xl text-[30px] md:text-[36px] tracking-tight leading-none xl:text-[36px] dark:text-white"
          >
            ចូលរួមចំណែកដើម្បីអនាគតដ៏ល្អប្រសើរជាងនេះ
            <div className="flex justify-center mt-[18px]">
              <span
               
                className="text-iDonate-green-primary font-sine-bold"
              >
                ជាមួយ iDonate
              </span>
            </div>
          </h1>

          <p
           
            className="text-iDonate-navy-primary leading-[32px] my-[48px] lg:mb-10 md:text-lg lg:text-xl dark:text-gray-400"
          >
            ស្វែងរកអង្គការដែលកំពុងបង្កើតការផ្លាស់ប្តូរ ជាមួយតាមរយៈ iDonate។
            យើងភ្ជាប់អ្នកបរិច្ចាគដែលមានចិត្តសប្បុរសជាមួយអង្គការមិនរកប្រាក់ចំណេញដ៏ទុកចិត្ត
            ដើម្បីបង្កើនឥទ្ធិពលនៃការរួមចំណែករបស់អ្នក។ រុករកបណ្ដាញដៃគូរបស់យើង
            ហើយស្វែងរកមូលហេតុដែលនៅជិតចិត្តរបស់អ្នក។
            យើងសូមជួយធ្វើឲ្យចិត្តសប្បុរសរបស់អ្នកក្លាយ ជាសកម្មភាពជាក់ស្តែង។
          </p>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <Button className="w-[228px] h-[50px] text-[20px] bg-iDonate-green-secondary text-idonate-navy-primary rounded-[15px] hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary">
              Starting Donation
            </Button>
            <Button
              variant="outline"
              className="w-[170px] h-[50px] text-[20px] text-idonate-navy-primary rounded-[15px] border-2 border-iDonate-navy-primary  hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Content */}
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex flex-col items-center">
          <Image
            src="https://i.pinimg.com/736x/ae/76/12/ae76127d1444bcfce1640b0bb736f440.jpg"
            alt="Slide 1"
            className="rounded-[6px] object-cover"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
}
