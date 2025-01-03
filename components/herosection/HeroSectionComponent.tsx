"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroSectionImageOne from "@/public/landing/RuralKidStudy.jpg";
import HeroSectionImageTwo from "@/public/landing/RuralKidGroup.jpg";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSectionComponent() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
      <section
          className="w-full bg-gradient-to-br from-slate-50 to-slate-200 dark:from-gray-800  dark:to-white-900">
        <motion.div
            className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 flex flex-wrap md:flex-nowrap items-start justify-between gap-8 sm:gap-10 py-9"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 xl:space-y-8">
            <motion.h1
                lang="km"
                style={{lineHeight: "1.3"}}
                className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-iDonate-navy-secondary dark:text-iDonate-navy-accent"
                variants={itemVariants}
            >
              ការបរិច្ចាគដោយមានទំនុកចិត្ត និងតម្លាភាព
            </motion.h1>

            <motion.h2
                lang="km"
                className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-iDonate-green-primary dark:text-iDonate-green-secondary"
                variants={itemVariants}
            >
              មានប្រសិទ្ធភាព ជាមួយ <span className="font-inter">iDONATE</span>
            </motion.h2>

            <motion.p
                lang="km"
                className="text-iDonate-gray text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed dark:text-iDonate-navy-accent"
                variants={itemVariants}
            >
              iDONATE បានប្រើប្រាស់បច្ចេកវិទ្យា Blockchain
              ដើម្បីធ្វើឱ្យប្រព័ន្ធបរិច្ចាគមានតម្លាភាព សុវត្ថិភាព
              និងមានប្រសិទ្ធភាពខ្ពស់ ដើម្បីធានាថាចំនួនទឹកប្រាក់ដែលបានបរិច្ចាគ
              ត្រូវបានដល់ដៃជនរងគ្រោះយ៉ាងពិតប្រាកដ។
            </motion.p>

            {/* Button */}
            <motion.div className="flex gap-4" variants={itemVariants}>
              <Button
                  lang="km"
                  className="bg-green-500 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group"
                  onClick={() => router.push("/auth/login")}
              >
                ចាប់ផ្ដើមបរិច្ចាគ
                <ArrowRight className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"/>
              </Button>
            </motion.div>
          </div>
          {/* Right Content */}
          <motion.div
              className="relative w-full md:w-1/2 h-[250px] sm:h-[350px] md:h-auto lg:h-[400px] xl:h-[500px] 2xl:h-[600px] flex flex-col sm:flex-row gap-4 items-center justify-center"
              variants={itemVariants}
          >
            <motion.div
                className="relative flex-1 md:absolute md:top-0 md:left-0 md:z-10 w-full md:w-[180px] lg:w-[240px] xl:w-[300px] 2xl:w-[360px] h-full md:h-[180px] lg:h-[240px] xl:h-[300px] 2xl:h-[360px] rounded-lg md:rounded-full overflow-hidden shadow-lg"
                whileHover={{scale: 1.02}}
                transition={{duration: 0.3}}
            >
              <Image
                  src={HeroSectionImageOne}
                  alt="Students greeting with traditional sampeah"
                  fill
                  className="w-full h-full object-cover"
                  priority
                  quality={100}
              />
            </motion.div>

            <motion.div
                className="relative flex-1 md:absolute md:top-20 md:left-[40px] lg:left-[120px] xl:left-[150px] 2xl:left-[180px] w-full md:w-[260px] lg:w-[320px] xl:w-[400px] 2xl:w-[480px] h-full md:h-[260px] lg:h-[320px] xl:h-[400px] 2xl:h-[480px] rounded-lg  md:rounded-full overflow-hidden shadow-lg"
                whileHover={{scale: 1.02}}
                transition={{duration: 0.1}}
            >
              <Image
                  src={HeroSectionImageTwo}
                  alt="Classroom scene with students and teacher"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                  priority
                  quality={100}
              />
            </motion.div>
          </motion.div>

        </motion.div>

      </section>
  );
}
