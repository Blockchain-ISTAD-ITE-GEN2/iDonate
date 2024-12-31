import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSectionCategoryComponent() {
  return (
    <section className="mx-[100px] h-[600px]">
      <div className="grid px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        {/* Left Content */}
        <div className="lg:col-span-7 mt-0 mr-[100px]">
          <h1 className="text-iDonate-navy-primary max-w-2xl text-[36px] tracking-tight leading-none md:text-[36px] xl:text-[36px] dark:text-white">
            ជួយកុមារសម្រេចអនាគតដ៏ភ្លឺស្វាង
          </h1>

          <p className="text-iDonate-navy-primary font-description-khmer  leading-7  my-[36px] lg:mb-10 md:text-lg lg:text-xl dark:text-gray-400 line-champ-5 ">
            ការអប់រំគឺជាវិធីដ៏ល្អបំផុតដើម្បីផ្លាស់ប្តូរចិត្តស្មារតី និង
            បង្កើតអនាគតដ៏ល្អសម្រាប់កុមារកម្ពុជា។
            បរិច្ចាគត្រឹមតែបន្តិចអាចជួយកុមារដែលខ្វះខាតទទួលបានឱកាសក្នុង​ការសិក្សា
            បង្កើតសុភមង្គលជីវិត និងសម្រេចក្តីសុបិន្ត។
            ចូលរួមជាមួយយើងដើម្បីធ្វើអោយក្តីសុបិន្តរបស់ពួកគេក្លាយទៅជាការពិត។
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
        <div className=" hidden lg:mt-0 lg:col-span-5 lg:flex flex-col items-center ">
          <Image
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQMeP0gO3Ehq579SLu1kjUuT9fHJtWO4XfBFn7zIGT1VVJAIMx0"
            alt="Slide 1"
            className="rounded-[15px] object-cover"
            width={643}
            height={560}
          />
        </div>
      </div>
    </section>
  );
}
