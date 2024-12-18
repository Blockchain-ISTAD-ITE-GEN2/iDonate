"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import StudentHeroSection from "@/public/howitwork/students.png"
import TransactionCommunication from "@/public/howitwork/image 24.png"
import ProcessIllustration from "@/public/howitwork/Rectangle10206.png"
import ProcessOrganisation from "@/public/howitwork/image.png"

export default function HowItWorks() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 px-[100px]">
        <div className="absolute inset-0 bg-grid-gray-200 opacity-30" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">Sharing is caring</h1>
              <h2 className="text-3xl mb-4 text-green-600 font-siemreap">
                ការជួយគ្នាទៅវិញទៅមក
              </h2>
              <h3 className="text-2xl mb-6 font-siemreap">
                និងការចែករំលែកទ្រព្យសម្បត្តិ
              </h3>
              <p className="text-gray-600 mb-8 font-siemreap leading-loose">
                ដើម្បីជួយដល់អ្នកដែលខ្វះខាតក្នុងសង្គមយើង។ <br />
                ការជួយគ្នាទៅវិញទៅមកគឺជាការបង្ហាញពីក្តីស្រលាញ់។ <br />
                បរិច្ចាគទ្រព្យសម្បត្តិដើម្បីជួយដល់អ្នកដទៃគឺជាទង្វើដ៏ល្អ។
              </p>
              <Button className="bg-[#1B2A4E] hover:bg-[#2a3e6d]">
                View Cause
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-[300px] h-[500px]"
            >
              <Image
                src={StudentHeroSection}
                alt="Volunteer with children"
                width={500}
                height={500}
                className="object-cover h-full w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-[100px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-12 font-siemreap text-center"
          >
            ក្រុមនីតិការរបស់មូលនិធិក្រ
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  number: "១",
                  title: "និយាយទៅកាន់អ្នកគ្រប់គ្រង",
                  description: "ត្រូវការការដឹកនាំនិងការណែនាំផ្លូវ"
                },
                {
                  number: "២",
                  title: "និយាយទៅ បេឡាករ (ឧទាហរណ៍: ប្រាក់ខែ)",
                  description: "បញ្ហាទាក់ទងនឹងការបង់ប្រាក់ ប្រាក់ខែមិនទាន់បាន ឬ ប្រាក់ខែមិនត្រឹមត្រូវតាមកិច្ចព្រមព្រៀង"
                },
                {
                  number: "៣",
                  title: "និយាយទៅ ប្រធានក្រុម (អនុគណៈ)",
                  description: "សម្រាប់បញ្ហាផ្សេងៗដែលមិនអាចដោះស្រាយបាន ឬ ត្រូវការការសម្រេចចិត្តពីថ្នាក់លើ និងទទួលខុសត្រូវខ្ពស់"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 font-siemreap">{step.title}</h3>
                    <p className="text-gray-600 font-siemreap">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={TransactionCommunication}
                alt="Process illustration"
                width={500}
                height={400}
                className="w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative py-20 bg-cover bg-center text-white" style={{ backgroundImage:`url(${ProcessIllustration.src})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-6 font-siemreap"
            >
              ដំណើរការរបស់សប្បុរសជន
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg mb-8 font-siemreap"
            >
              បង្កើតគណនីហើយចាប់ផ្តើមធ្វើការបរិច្ចាគ និងតាមដាន
              ការបរិច្ចាគរបស់អ្នកត្រូវបានប្រើប្រាស់ដើម្បីជួយដល់សហគមន៍។
              ក្នុងនាមជាសប្បុរសជនម្នាក់ អ្នកអាចមើលឃើញថាតើការបរិច្ចាគរបស់អ្នកបានជួយប្រជាជនប៉ុន្មាននាក់។
            </motion.p>
            <Button className="bg-green-500 hover:bg-green-600">
              ចាប់ផ្តើមការបរិច្ចាគ
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-12 font-siemreap text-center"
          >
            ដំណើរការរបស់សប្បុរសជន
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Image
                src={ProcessOrganisation}
                alt="Process steps"
                width={500}
                height={400}
                className="w-full"
              />
            </motion.div>
            <div className="space-y-8">
              {[
                {
                  number: "១",
                  title: "ជំហានទី ១៖ ចុះឈ្មោះជាអ្នកផ្តល់ជំនួយ",
                  description: "ចុះឈ្មោះជា 'Contributor' ដើម្បីចាប់ផ្តើមធ្វើការបរិច្ចាគប្រកបដោយតម្លាភាព"
                },
                {
                  number: "២",
                  title: "ជំហានទី ២៖ ធ្វើការបរិច្ចាគ",
                  description: "ជាមួយនឹងការសន្យាថាការបរិច្ចាគរបស់អ្នក ១០០% នឹងដល់ដៃអ្នកទទួលផ្ទាល់ដោយគ្មានការកាត់ថ្លៃសេវា"
                },
                {
                  number: "៣",
                  title: "ជំហានទី ៣៖ តាមដានការបរិច្ចាគរបស់អ្នក",
                  description: "មើលថាតើការបរិច្ចាគរបស់អ្នក បានជួយដល់មនុស្សប៉ុន្មាននាក់ហើយ"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 font-siemreap">{step.title}</h3>
                    <p className="text-gray-600 font-siemreap">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-[100px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-12 font-siemreap text-center"
          >
            រយៈពេលនិងដំណើរការនៃមូលនិធិនៅ iDonate
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⭐",
                title: "ត្រូវការជំនួយដើម្បី iDonateមូលនិធិនៅ និងជួយក្នុង",
                description: "ដើម្បីធ្វើឲ្យការងាររបស់អ្នកកាន់តែមានប្រសិទ្ធភាព!"
              },
              {
                icon: "⭐",
                title: "ចាប់ផ្តើមជា iDonate",
                description: "ចាប់ផ្តើមធ្វើការជាមួយមូលនិធិក្នុង និងជួយសហគមន៍តាមរយៈការបរិច្ចាគរបស់អ្នក!"
              },
              {
                icon: "⭐",
                title: "iDonate",
                description: "ធ្វើឲ្យការបរិច្ចាគរបស់អ្នកមានតម្លាភាពនិងប្រសិទ្ធភាព ហើយអាចតាមដានការប្រើប្រាស់ថវិការបស់អ្នកបាន!"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                <h3 className="font-semibold mb-4 font-siemreap">{feature.title}</h3>
                <p className="text-gray-600 font-siemreap">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

