import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import styles from "./hero-section.module.css";
import HeroSectionImage from "@/public/images/image (6).png";
import HeroSectionImageOne from "@/public/images/image 1.png";


export default function HeroSectionComponent() {
  return (
    <section
      className="w-full px-5 py-5 md:py-0 lg:px-[100px] mx-auto overflow-hidden bg-slate-100"
      lang="km"
    >
      <div className="flex flex-wrap md:flex-nowrap items-start md:items-center justify-between ">
        <div className="w-full md:w-2/3 space-y-4 md:space-y-6">
          <h1 className="text-2xl md:text-4xl font-bold text-navy-900 leading-relaxed text-iDonate-navy-primary">
            ការបរិច្ចាគដោយមានទំនុកចិត្តខ្ពស់ តម្លាភាព
          </h1>
          <h2 className="text-lg md:text-2xl font-medium text-iDonate-green-primary">
            មានប្រសិទ្ធភាព ជាមួយ <span className="font-inter">iDonate</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed md:w-4/5">
            iDonate បានប្រើប្រាស់បច្ចេកវិទ្យា Blockchain
            ដើម្បីធ្វើឱ្យប្រព័ន្ធបរិច្ចាគ តម្លាភាព សុវត្ថិភាព
            និងមានប្រសិទ្ធភាពខ្ពស់។ បានដឹងច្បាស់ ការប្រើប្រាស់ ត្រូវដល់ដៃទទួល
            និងមានភាពតម្លាភាព។
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-green-500 px-6 py-2 text-white hover:bg-green-600">
              Starting Donation <span className="ml-2">→</span>
            </Button>
            <Button
              variant="outline"
              className="border-navy-900 px-6 py-2 text-navy-900"
            >
              Learn More <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
        <div className="relative w-full md:w-3/5 h-[380px] md:h-[550px] flex items-center justify-center py-8 md:py-14">
          {/* Left circle */}
          <div className="absolute top-10 left-0 z-10 w-[180px] h-[180px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden">
            <Image
              src={HeroSectionImageOne}
              alt="Students greeting with traditional sampeah"
              width={5000}
              height={5000}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {/* Right circle */}
          <div className="absolute top-20 left-16 md:left-[100px] md:top-20 lg:left-[220px] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden">
            <Image
              src={HeroSectionImage}
              alt="Classroom scene with students and teacher"
              width={5000}
              height={5000}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
