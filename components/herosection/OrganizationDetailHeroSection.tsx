"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import organization from "@/public/images/Cambodia-Kantha-Bopha-Foundation.jpeg";

export default function OrganizationDetailHeroSection() {
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
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 xl:space-y-8">
          <motion.h1
            lang="km"
            style={{ lineHeight: "1.3" }}
            className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-iDonate-navy-secondary lg:leading-normal"
            variants={itemVariants}
          >
            ចូលរួមចំណែកដើម្បីអនាគតដ៏ល្អប្រសើរជាងនេះ ជាមួយ{" "}
            <span className="font-inter text-iDonate-green-primary">
              iDONATE
            </span>
          </motion.h1>

          <motion.p
            lang="km"
            className="text-iDonate-gray text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed"
            variants={itemVariants}
          >
            ស្វែងរកអង្គការដែលកំពុងបង្កើតការផ្លាស់ប្តូរ ជាមួយតាមរយៈ iDonate។
            យើងភ្ជាប់អ្នកបរិច្ចាគដែលមានចិត្តសប្បុរសជាមួយអង្គការមិនរកប្រាក់ចំណេញដ៏ទុកចិត្ត
            ដើម្បីបង្កើនឥទ្ធិពលនៃការរួមចំណែករបស់អ្នក។ រុករកបណ្ដាញដៃគូរបស់យើង
            ហើយស្វែងរកមូលហេតុដែលនៅជិតចិត្តរបស់អ្នក។
            យើងសូមជួយធ្វើឲ្យចិត្តសប្បុរសរបស់អ្នកក្លាយ ជាសកម្មភាពជាក់ស្តែង។
          </motion.p>

          {/* Button */}
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
              className="w-full md:w-[170px] h-[50px] text-[16px] md:text-[18px] lg:text-[20px] text-idonate-navy-primary rounded-[15px] border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary transition duration-200"
            >
              Learn More
            </Button> */}
          </motion.div>
        </div>

        {/* Right Content */}
        <motion.div
          className="relative w-full md:w-1/2 h-[250px] sm:h-[350px] md:h-auto lg:h-[400px] xl:h-[500px] 2xl:h-[600px] flex flex-col sm:flex-row gap-4 items-center justify-center"
          variants={itemVariants}
        >
          <motion.div
            className="relative flex-1 md:absolute md:top-0 md:left-0 md:z-10 w-full md:w-[180px] lg:w-[240px] xl:w-[300px] 2xl:w-[360px] h-full md:h-[180px] lg:h-[240px] xl:h-[300px] 2xl:h-[360px] rounded-lg md:rounded-full overflow-hidden shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={organization}
              alt="Students greeting with traditional sampeah"
              fill
              className="w-full h-full object-cover"
              priority
              quality={100}
            />
          </motion.div>

          <motion.div
            className="relative flex-1 md:absolute md:top-20 md:left-[40px] lg:left-[120px] xl:left-[150px] 2xl:left-[180px] w-full md:w-[260px] lg:w-[320px] xl:w-[400px] 2xl:w-[480px] h-full md:h-[260px] lg:h-[320px] xl:h-[400px] 2xl:h-[480px] rounded-lg  md:rounded-full overflow-hidden shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={
                "https://i.pinimg.com/736x/ae/76/12/ae76127d1444bcfce1640b0bb736f440.jpg"
              }
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
