"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import HeroSectionImage from "@/public/missionandvission/HeroSection.png";
import ISTAD from "@/public/missionandvission/Frame1000005253.png";
import MPTC from "@/public/missionandvission/Frame1000005266.png";
import CBRD from "@/public/missionandvission/Frame1000005267.png";
import LEADER from "@/public/missionandvission/Frame1000005268.png";

export default function MissionVision() {
  const stats = [
    { icon: "💰", value: "$1,294,228", label: "បរិច្ចាគ" },
    { icon: "👥", value: "2,849", label: "មនុស្សដែលត្រូវបានជួយ" },
    { icon: "🏢", value: "150+", label: "អង្គការភាព" },
    { icon: "🌍", value: "25+", label: "ប្រទេសដែលចូលរួម" },
  ];

  const features = [
    {
      icon: "📚",
      title: "អប់រំ",
      description: "ផ្តល់ឱកាសអប់រំដល់កុមារ និងយុវជនខ្វះខាត",
    },
    {
      icon: "🤝",
      title: "ទំនួលខុសត្រូវ",
      description: "ផ្តល់ការគាំទ្រដល់សហគមន៍ក្រីក្រ",
    },
    {
      icon: "🔄",
      title: "តម្លាភាពគណនេយ្យ",
      description: "ធានាការប្រើប្រាស់ថវិកាប្រកបដោយតម្លាភាព",
    },
    {
      icon: "🌟",
      title: "សមធម៌និងយុត្តិធម៌",
      description: "ការបែងចែកធនធានដោយស្មើភាព",
    },
  ];

  const faqs = [
    {
      question: "តើធ្វើដូចម្តេចដើម្បីក្លាយជាអ្នកស្ម័គ្រចិត្ត?",
      answer: "ចូលទៅកាន់ គេហទំព័ររបស់យើងហើយចុះឈ្មោះជាអ្នកស្ម័គ្រចិត្ត។",
    },
    {
      question: "តើខ្ញុំអាចជួយអ្វីបាន ក្រៅពីការ បរិច្ចាគ?",
      answer:
        "អ្នកអាចចូលរួមក្នុងកម្មវិធីស្ម័គ្រចិត្ត ឬជួយផ្សព្វផ្សាយអំពីបេសកកម្មរបស់យើង។",
    },
    {
      question: "តើប្រាក់បរិច្ចាគត្រូវបានប្រើយ៉ាងដូចម្តេច?",
      answer:
        "ប្រាក់បរិច្ចាគត្រូវបានប្រើប្រាស់ដោយផ្ទាល់ដើម្បីគាំទ្រកម្មវិធីជួយសហគមន៍។",
    },
  ];

  const partners = [ISTAD, MPTC, CBRD, LEADER, ISTAD, MPTC, CBRD, LEADER];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] sm:h-[400px] text-white ">
        <Image
          src={HeroSectionImage}
          alt="People helping people"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl px-[70px]"
          >
            <h1 className="text-5xl font-bold mb-4">Give Hope, Save Lives</h1>
            <p className="text-xl mb-8 text-gray-200 font-siemreap leading-relaxed">
              នៅក្នុងពិភពលោកដែលពោរពេញដោយបញ្ហាប្រឈម
              ជំនួយរបស់អ្នកអាចជាសញ្ញានៃក្តីសង្ឃឹម
              ដែលនាំនរណាម្នាក់ទៅកាន់ថ្ងៃស្អែកកាន់តែប្រសើរ។
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <span className="text-4xl mb-2">{stat.icon}</span>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold mb-12 text-center text-iDonate-navy-secondary"
            >
              បេសកកម្មនិងចក្ខុវិស័យ
            </motion.h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 text-iDonate-navy-secondary">
                  បេសកកម្ម
                </h3>
                <p className="text-iDonate-navy-secondary font-siemreap">
                  ដើម្បីផ្តល់ជំនួយដល់អ្នកដែលត្រូវការជំនួយក្នុងសហគមន៍របស់យើង
                  តាមរយៈការបរិច្ចាគដោយផ្ទាល់និងតម្លាភាព។
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-green-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 font-siemreap text-iDonate-navy-secondary">
                  ចក្ខុវិស័យ
                </h3>
                <p className="text-iDonate-navy-secondary font-siemreap">
                  បង្កើតសហគមន៍ដែលមានការយកចិត្តទុកដាក់និងការចែករំលែក
                  ដើម្បីលើកកម្ពស់គុណភាពជីវិតរបស់អ្នកដែលខ្វះខាត។
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-12 text-center font-siemreap text-iDonate-navy-secondary"
          >
            ក្តីប្តេជ្ញាចិត្តក្នុងការផ្តល់ប្រយោជន៍អ្នកដទៃ
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={HeroSectionImage}
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              <Button
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/90 hover:bg-white"
                size="icon"
              >
                <PlayCircle className="w-8 h-8 text-blue-600" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center text-iDonate-navy-secondary"
                >
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2 font-siemreap text-iDonate-navy-secondary">
                    {feature.title}
                  </h3>
                  <p className="text-sm  font-siemreap text-iDonate-navy-secondary">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-12 text-center font-siemreap text-iDonate-navy-secondary"
          >
            សំណួរដែលសួរញឹកញាប់
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-siemreap text-gray-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-siemreap text-iDonate-navy-secondary">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-12 text-center font-siemreap text-iDonate-navy-secondary"
          >
            ដៃគូសហការ
          </motion.h2>
          <div className="max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {partners.map((partner, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/5"
                  >
                    <div className="p-4">
                      <Image
                        src={partner}
                        alt={`Partner ${index + 1}`}
                        width={120}
                        height={120}
                        className="mx-auto"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}
