
"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { members, mentors } from "@/difinitions/types/about-us/member"
import AboutUsHeroSection from "@/public/images/aboutus-bg.png"
import { motion } from "framer-motion"
import TrustContent from "@/public/images/trust-content.png"
import GiveAndRecieve from "@/public/images/give-and-recieve.png"
import BlockchainTech from "@/public/images/blockchain.png"
import TeamSection from "./TeamSection"

export default function AboutUsComponent() {
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }
  return (
    <div className="w-full h-full">

      {/* Hero Section */}
      <section className="relative bg-slate-800 text-white">
      {/* Background Image */}
      <Image
        src={AboutUsHeroSection}
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      />

      {/* Content */}
      <div className="relative container mx-auto px-[100px] py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-iDonate-green-secondary  mb-4"
          >
            ដល់ពេល​ចាប់ផ្តើមហើយ
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl leading-loose  md:text-5xl font-bold mb-2"
          >
            ផ្ដល់​ជូន​ដំណោះ​ស្រាយ<br />
            <span className="text-iDonate-green-secondary leading-loose">ផ្ទាល់ខ្លួន​ដើម្បី</span><br />
            ធ្វើ​ឲ្យ​ដំណើរការ<br />
            <span className="leading-loose"> ការផ្តល់​ជំនួយ​ល្អប្រសើរ​ឡើង</span>

          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 mb-8"
          >
            ធ្វើ​ឲ្យ​មាន​ផ្លាស់ប្ដូរ​តាម​រយៈ​ការ​ផ្តល់​ជំនួយ
            ទឹកចិត្តបន្តិចបន្តួច​របស់​លោកអ្នកអាច​ជម្រុញ​ឲ្យ​មាន​ក្តីសង្ឃឹម​  និង
            ជួយ​បង្កើត​ពិភព​ដ៏អស្ចារ្យ​សម្រាប់​សហគមន៍​ដែល​កំពុងចួបការលំបាក។ ពួក​យើង​នឹងបង្កើតវាទាំងអស់គ្នា។
          </motion.p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button className="bg-iDonate-green-primary hover:bg-green-600 text-white">
                តោះចាប់ផ្តើម
              </Button>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">យើងធ្វើអ្វីខ្លះ</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrustContent,
                title: "មាតិកាដែលមានទុកចិត្ត",
                description: "ការបង្កើតនិងការចែកចាយមាតិកាអប់រំដែលទុកចិត្ត គឺធ្វើឡើងដោយការចូលរួមរបស់អ្នកឧបត្ថម្ភ។ការគាំទ្ររបស់ពួកគេធានាថានឹងមានការចូលដំណើរការ។"
              },
              {
                icon: GiveAndRecieve,
                title: "ការផ្តល់និងការទទួល",
                description: "ការផ្លាស់ប្តូរការសកម្មភាព ការសំដែងចិត្ត ឬអារម្មណ៍រវាងមនុស្សគ្នា។វាបង្ហាញពីភាពសមស្របរបស់ការផ្តល់និងទទួលអ្វីមួយ។"
              },
              {
                icon: BlockchainTech,
                title: "ឧបករណ៍ដើម្បីលើកកម្ពស់ការបរិច្ចាក",
                description: "ឧបករណ៍ដែលទុកចិត្តនឹងនៅស្ថិតក្នុងលក្ខណៈឥតគិតថ្លៃ និងអាចប្រើបានសម្រាប់សិស្ស និងគ្រូបង្រៀននៅទូទាំងពិភពលោក។"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ scale: 1.05 }}
                className=" rounded-xl shadow-sm p-8 text-center transform transition-all duration-200 hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image src={feature.icon} alt={feature.title} width={120} height={120} className="mx-auto mb-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-slate-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection mentors={mentors} members={members} />

    </div>
  )
}
