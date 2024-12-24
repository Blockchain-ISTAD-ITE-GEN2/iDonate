"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import Image from "next/image";
import HeroSectionImage from "@/public/images/image (6).png";
import HeroSectionImageOne from "@/public/images/image 1.png";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSectionComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
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
      className="w-full px-5 py-16 md:py-14 lg:px-[100px] mx-auto overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200"
      lang="km"
    >
      <motion.div
        className="flex flex-wrap md:flex-nowrap items-start md:items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full md:w-2/3 space-y-8 md:space-y-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-iDonate-navy-primary "
            variants={itemVariants}
          >
            ការបរិច្ចាគដោយមានទំនុកចិត្ត​{" "}
            <span className="lg:leading-loose md:leading-normal leading-relaxed ">
              និងតម្លាភាព
            </span>
          </motion.h1>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-iDonate-green-primary leading-[-20px]"
            variants={itemVariants}
          >
            មានប្រសិទ្ធភាព ជាមួយ <span className="font-inter">iDonate</span>
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg sm:text-xl md:text-xl leading-relaxed lg:w-4/5 md:w-full"
            variants={itemVariants}
          >
            iDonate បានប្រើប្រាស់បច្ចេកវិទ្យា Blockchain
            ដើម្បីធ្វើឱ្យប្រព័ន្ធបរិច្ចាគមាន តម្លាភាព សុវត្ថិភាព
            និងមានប្រសិទ្ធភាពខ្ពស់​
            ដែលធ្វើឡើងដើម្បីធានាថាចំនួនទឹកប្រាក់ដែលបានបរិច្ចាគ
            ត្រូវបានដល់ដៃជនរងគ្រោះយ៉ាងពិតប្រាកដ​ ដោយគ្មានការក្លែងបន្លំ
          </motion.p>
          <motion.div className="flex flex-wrap gap-6" variants={itemVariants}>
            <Button
              className="bg-green-500 px-8 py-4 text-white text-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group"
              onClick={() => router.push("/auth/login")}
            >
              ចាប់ផ្ដើមបរិច្ចាគ
              <ArrowRight className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="relative w-full md:w-3/5 h-[450px] sm:h-[500px] md:h-[600px] flex items-center justify-center py-8 md:py-14"
          variants={itemVariants}
        >
          <motion.div
            className="absolute top-10 left-0 z-10 w-[220px] sm:w-[280px] lg:w-[350px] h-[220px] sm:h-[280px] lg:h-[350px] rounded-full overflow-hidden shadow-xl"
            whileHover={{ scale: 1.05, rotate: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={HeroSectionImageOne}
              alt="Students greeting with traditional sampeah"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
              priority
              quality={100}
            />
          </motion.div>
          <motion.div
            className="absolute top-20 left-16 sm:left-[50px] md:left-[100px] lg:left-[220px] w-[300px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-full overflow-hidden shadow-xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={HeroSectionImage}
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

      <motion.div
        className="mt-16 md:mt-11 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-iDonate-navy-primary hover:bg-transparent hover:text-iDonate-green-primary transition-colors duration-300 "
        >
          ស្វែងយល់បន្ថែម អំពី iDonate
          <ChevronDown
            className={`ml-2 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </Button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto"
            >
              iDonate
              គឺជាកម្មវិធីបរិច្ចាគតាមប្រព័ន្ធអេឡិចត្រូនិចដែលប្រើប្រាស់បច្ចេកវិទ្យា
              Blockchain ដើម្បីធានានូវតម្លាភាព និងសុវត្ថិភាពខ្ពស់។
              យើងផ្តល់នូវវេទិកាងាយស្រួលប្រើប្រាស់សម្រាប់អ្នកបរិច្ចាគ
              និងអង្គការសប្បុរសធម៌
              ដោយធានាថាការបរិច្ចាគរបស់អ្នកទៅដល់អ្នកដែលត្រូវការវាពិតប្រាកដ។
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
