"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import StudentHeroSection from "@/public/howitwork/donationinCommunity.png";
import ProcessIllustration from "@/public/howitwork/Rectangle10206.png";
import HowItWork1 from "@/components/jsonComponent/HowItWork1.json";
import HowItWork2 from "@/components/jsonComponent/HowItWork2.json";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function HowItWorks() {
  useEffect(() => {
    // Any browser-specific logic here
    if (typeof document !== "undefined") {
      console.log("Document is available on the client!");
    }
  }, []);
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 md:px-[100px] dark:from-gray-800 dark:to-white-900">
        <div className="absolute inset-0 bg-grid-gray-200 opacity-30" />
        <div className="container mx-auto py-10 md:py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left space-y-4 sm:space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                ចែករំលែកគឺជាការយកចិត្តទុកដាក់
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 text-green-600 font-siemreap dark:text-iDonate-green-secondary">
                ការជួយគ្នាទៅវិញទៅមក
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl mb-8 font-siemreap text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                និងការចែករំលែកទ្រព្យសម្បត្តិ
              </h3>
              <p className="text-iDonate-navy-secondary mb-8 font-siemreap leading-relaxed sm:leading-loose text-base sm:text-lg md:text-xl dark:text-iDonate-navy-accent">
                ដើម្បីជួយដល់អ្នកដែលខ្វះខាតក្នុងសង្គមយើង។
                ការជួយគ្នាទៅវិញទៅមកគឺជាការបង្ហាញពីក្តីស្រលាញ់។
                បរិច្ចាគទ្រព្យសម្បត្តិដើម្បីជួយដល់អ្នកដទៃគឺជាទង្វើដ៏ល្អ។
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[250px] sm:h-[300px] md:h-[500px] mx-auto rounded-md"
            >
              <Image
                src={StudentHeroSection}
                alt="Volunteer with children"
                fill
                className="object-cover rounded-tr-[30%] sm:rounded-tr-[40%] md:rounded-tr-[20%] rounded-bl-[30%] sm:rounded-bl-[40%] md:rounded-bl-[20%]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-10 md:py-20 bg-iDonate-navy-accent dark:bg-iDonate-dark-mode">
        <div className="container mx-auto px-4 sm:px-6 md:px-[100px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 md:mb-12 font-siemreap text-center text-iDonate-navy-secondary"
          >
            ជំហានក្នុងការបរិច្ចាគ
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              {[
                {
                  number: "១",
                  title: "ជ្រើសរើស Event ណាមួយដែលចង់បរិច្ចាគ",
                  description: "ជ្រើសរើសពីការបរិច្ឆេទដែលអ្នកចង់បរិច្ឆេទដោយមានភាពទំនាក់ទំនងច្បាស់លាស់។",
                },
                {
                  number: "២",
                  title: "បញ្ចូលចំនួនទឹកប្រាក់ដែលចង់បរិច្ចាគ",
                  description:
                    "ប្រើប្រាស់គណនីធនាគារណាមួយដើម្បីធ្វើការបរិច្ចាគ",
                },
                {
                  number: "៣",
                  title: "វិក័យប័ត្រ",
                  description:
                    "បន្ទាប់ពីការបរិច្ចាគទទួលជោគជ័យនោះអ្នកបរិច្ចាគនឹងទទួលបានវិក័យប័ត្របញ្ជាក់ពីការបរិច្ចាគ",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-4 p-4 sm:p-6"
                >
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-base sm:text-lg">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 font-siemreap text-base sm:text-lg md:text-xl dark:text-iDonate-navy-accent">
                      {step.title}
                    </h3>
                    <p className="text-iDonate-navy-secondary font-siemreap text-sm sm:text-lg md:text-xl dark:text-iDonate-navy-accent">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="order-first md:order-last"
            >
              <div className="w-full h-auto max-w-[300px] sm:max-w-[350px] mx-auto">
                <Lottie className="w-full h-auto max-h-[400px] md:mb-[200px] md:w-[500px] md:h-[500px]" animationData={HowItWork1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section
        className="relative py-10 md:py-20 bg-cover bg-center dark:bg-iDonate-dark-mode"
        style={{ backgroundImage: `url(${ProcessIllustration.src})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 font-siemreap text-white"
            >
              ចូលរួមក្នុងសហគមន៍នៃការបរិច្ចាគ
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl mb-8 font-siemreap px-4 text-white"
            >
              ចាប់ផ្តើមដំណើររបស់អ្នកជាអ្នកបរិច្ចាគ ហើយធ្វើឱ្យមានអត្ថិភាពពិតប្រាកដលើសហគមន៍។
            </motion.p>
            <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto px-6 py-3">
              ចាប់ផ្តើមបរិច្ចាគ
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-10 md:py-20 bg-white dark:bg-iDonate-dark-mode">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 md:mb-12 font-siemreap text-center text-iDonate-navy-secondary dark:text-iDonate-navy-accent"
          >
            ដំណើរការរបស់យើង
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-last md:order-first"
            >
              <div className="w-full h-auto max-w-[300px] sm:max-w-[350px] mx-auto md:ml-[200px]">
                <Lottie animationData={HowItWork2} className="w-full h-auto max-h-[400px]" />
              </div>
            </motion.div>
            <div className="space-y-6 md:space-y-8">
              {[
                {
                  number: "១",
                  title: "ជំហាន ១៖ ចុះបញ្ជីជាអ្នកបរិច្ចាគ",
                  description:
                    "ចុះបញ្ជីដើម្បីចាប់ផ្តើមការបរិច្ឆេទដោយមានភាពទំនាក់ទំនងច្បាស់លាស់។",
                },
                {
                  number: "២",
                  title: "ជំហាន ២៖ បរិច្ចាគ",
                  description:
                    "ការបរិច្ឆេទរបស់អ្នកនឹងទៅជូនអ្នកទទួលដោយគ្មានគិតតម្លៃសេវាកម្ម។",
                },
                {
                  number: "៣",
                  title: "ជំហាន ៣៖ តាមដានការបរិច្ឆេទរបស់អ្នក",
                  description:
                    "មើលថាតើការបរិច្ឆេទរបស់អ្នកមានអត្ថិភាពយ៉ាងដូចម្តេចលើបុគ្គលនិងសហគមន៍។",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-4 p-4 sm:p-6"
                >
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center text-iDonate-green-primary font-bold text-base sm:text-lg">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 font-siemreap text-base sm:text-lg md:text-xl text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                      {step.title}
                    </h3>
                    <p className="text-iDonate-navy-secondary font-siemreap text-sm sm:text-lg md:text-xl dark:text-iDonate-navy-accent">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
       
        </section>
    </div>
  );
}
