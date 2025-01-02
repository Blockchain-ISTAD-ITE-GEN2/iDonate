"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSectionCategoryComponent() {
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
    <section className="w-full bg-gradient-to-br from-slate-100 to-slate-200">
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 flex flex-wrap md:flex-nowrap items-start justify-between gap-8 sm:gap-10 py-9"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Content */}
        <motion.div
          className="w-full space-y-4 sm:space-y-6 xl:space-y-8"
          variants={itemVariants}
        >
          <motion.h1
            lang="km"
            style={{ lineHeight: "1.3" }}
            className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-iDonate-navy-secondary lg:leading-normal"
            variants={itemVariants}
          >
            ជួយកុមារសម្រេចអនាគតដ៏ភ្លឺស្វាង
          </motion.h1>

          <motion.p
            lang="km"
            className="text-iDonate-gray text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed"
            variants={itemVariants}
          >
            ការអប់រំគឺជាវិធីដ៏ល្អបំផុតដើម្បីផ្លាស់ប្តូរចិត្តស្មារតី និង
            បង្កើតអនាគតដ៏ល្អសម្រាប់កុមារកម្ពុជា។
            បរិច្ចាគត្រឹមតែបន្តិចអាចជួយកុមារដែលខ្វះខាតទទួលបានឱកាសក្នុង​ការសិក្សា
            បង្កើតសុភមង្គលជីវិត និងសម្រេចក្តីសុបិន្ត។
            ចូលរួមជាមួយយើងដើម្បីធ្វើអោយក្តីសុបិន្តរបស់ពួកគេក្លាយទៅជាការពិត។
          </motion.p>

          {/* Buttons */}
          <motion.div className="flex gap-4" variants={itemVariants}>
            <Button
              lang="km"
              className="bg-green-500 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group"
              onClick={() => router.push("/auth/login")}
            >
              ចាប់ផ្ដើមបរិច្ចាគ
              <ArrowRight className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            {/* <Button
              variant="outline"
              className="w-[170px] h-[50px] text-[20px] text-idonate-navy-primary rounded-[15px] border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Learn More
            </Button> */}
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="w-full h-[250px] sm:h-[250px] md:h-[300px] xl:h-[400px]  flex flex-col sm:flex-row gap-4 items-center justify-center "
          variants={itemVariants}
        >
          <motion.div
            className="relative flex items-center flex-1 w-full h-full  rounded-lg  overflow-hidden shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQMeP0gO3Ehq579SLu1kjUuT9fHJtWO4XfBFn7zIGT1VVJAIMx0"
              alt="Slide 1"
              fill
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
