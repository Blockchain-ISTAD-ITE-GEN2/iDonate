"use client"

import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Youtube, Send } from 'lucide-react'
import iDonateSampleLogo from "@/public/images/iDonateLogoSample.png"
import CBRDLogo from '@/public/sponser/MPTC-CBRD-Logo.png'
import MPTCLogo from '@/public/sponser/MPTC-Logo.png'
import ISTADLogo from '@/public/sponser/ISTAD-Logo.png'
import { Phone, Mail } from 'lucide-react';
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"


export default function FooterComopent() {

  const pathname = usePathname();
  if (pathname === "/auth/login" ||
    pathname === "/auth/sign-up" ||
    pathname === "/auth/verification"){
      return null;
    }
    else

  return (
    <footer className="bg-iDonate-navy-secondary text-white">
      {/* Social Media Section */}
      <div className="bg-[#1B2A4E] text-white py-6">
      <div className="container mx-auto px-[100px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Media Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <span className="text-sm mb-1">Follow us on</span>
            <h2 className="text-2xl font-bold mb-3">Social Media Platform</h2>
            <div className="flex gap-4 ">
              <Link 
                href="#" 
                className="hover:text-gray-300 transition-colors rounded-full bg-gray-50 p-2"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} className="text-iDonate-navy-primary"/>
              </Link>
              <Link 
                href="#" 
                className="hover:text-gray-300 transition-colors rounded-full bg-gray-50 p-2"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={18} className="text-iDonate-navy-primary" />
              </Link>
              <Link 
                href="#" 
                className="hover:text-gray-300 transition-colors rounded-full bg-gray-50 p-2 "
                aria-label="Follow us on Youtube"
              >
                <Youtube size={18}  className="text-iDonate-navy-primary"/>
              </Link>
            </div>
          </motion.div>

          {/* Donation Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-right"
          >
            <p className="text-lg mb-1">Donation Change their life</p>
            <p className="text-xl">
              who are <span className="font-bold">orphan and ILLITERATE</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-[100px] py-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-0 ">
              <Image
                src={iDonateSampleLogo}
                alt="iDONATE Logo"
                width={200}
                height={200}
                className="w-24 h-24 mt-[-17px] ml-[-17px]"
              />
              <span className="text-2xl font-bold text-iDonate-navy-primary">iDONATE</span>
            </Link>
            <p className="text-iDonate-navy-primary text-sm">
              Donation is the act of giving resources, such as money, goods, or
              time, to help others or support a cause without expecting anything in
              return
            </p>
            <div className="space-y-2 text-iDonate-navy-primary">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              <p className="flex items-center gap-2 text-iDonate-navy-primary">
                <span className="flex flex-wrap gap-2 text-sm"> <Phone  className="w-4 h-4" /> +855 95 990 910</span>
              </p>
              <p className="flex items-center gap-2 text-iDonate-navy-primary">
                <span className="flex flex-wrap gap-2 text-sm "> <Mail className="w-4 h-4"/> info.istad@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="ml-[72px]">
            <h3 className="text-xl text-iDonate-navy-primary font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Contributors", "Events"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-iDonate-navy-primary hover:text-iDonate-green-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl text-iDonate-navy-primary  font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                "How It Works",
                "Mission & Vision",
                "Donor",
                "Organization",
                "Categories",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-iDonate-navy-primary hover:text-iDonate-green-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay up to date */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-iDonate-navy-primary">Stay Up To Date</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-iDonate-navy-secondary hover:bg-iDonate-navy-secondary  border-iDonate-navy-primary text-white placeholder:text-gray-400"
                />
                <Button size="icon" className="bg-transparent">
                  <Send className="h-4 w-4 mr-24" size="icon" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-iDonate-navy-primary">Our Sponsor</h3>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src={MPTCLogo}
                  alt="MPTC Logo"
                  width={700}
                  height={700}
                  className="p-2 w-full h-full object-cover"
                />
                <Image
                  src={CBRDLogo}
                  alt="CBRD Logo"
                  width={700}
                  height={700}
                  className="p-2 w-full h-full object-cover"
                />
                <Image
                  src={ISTADLogo}
                  alt="ISTAD Logo"
                  width={700}
                  height={700}
                  className="p-2 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-400">
            © 2024 Institute of Science and Technology Advanced Development | All
            Rights Reserved
          </p>
        </div>
      </div>

    
    </footer>
  )
}

