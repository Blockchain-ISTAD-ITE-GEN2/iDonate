"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube, Send, Phone, Mail } from "lucide-react";
import iDonateSampleLogo from "@/public/images/iDonateLogoSample.png";
import CBRDLogo from "@/public/sponser/MPTC-CBRD-Logo.png";
import MPTCLogo from "@/public/sponser/MPTC-Logo.png";
import ISTADLogo from "@/public/sponser/ISTAD-Logo.png";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import logo from "@/public/logo/logodesign no background.png";

const links = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Contributors", href: "/donor-dashboard" },
  { name: "Events", href: "/organizations" },
];
const links_suppoort = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Mission & Vision", href: "/mission-vision" },
  { name: "Donor", href: "/donor-dashboard" },
  { name: "Organization", href: "/organization-dashboard" },
  { name: "Categories", href: "/categories" },
];
export default function FooterComponent() {
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/sign-up" ||
    pathname === "/verification" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/profile" ||
    pathname === "/waiting-verification"
  ) {
    return null;
  }

  return (
    <footer className=" text-white ">
      {/* Social Media Section */}
      <div className="bg-[#1B2A4E] text-white py-6 dark:bg-[#18181B]">
        <div className="container mx-auto px-4 md:px-6 lg:px-[100px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center md:items-start w-full md:w-auto"
            >
              <span className="text-sm mb-1">តាមដានពួកយើងនៅលើ</span>
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-center md:text-left">
                បណ្ដាញសង្គមផ្សេងៗ
              </h2>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Youtube, label: "Youtube" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href="#"
                    className="hover:text-gray-300 transition-colors rounded-full bg-gray-50 p-2"
                    aria-label={`តាមដានពួកយើងនៅលើ ${social.label}`}
                  >
                    <social.icon
                      size={18}
                      className="text-iDonate-navy-primary"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Donation Text Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-right"
            >
              <p className="text-base md:text-lg mb-1">
                ការបរិច្ចាគផ្លាស់ប្តូរជីវិតរបស់ពួកគេ
              </p>
              <p className="text-lg md:text-xl">
                ដែលជា​ <span className="font-bold">ក្មេងកំព្រានិងជនពិការ</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto px-4 md:px-6 lg:px-[100px] py-8 bg-white dark:bg-iDonate-dark-mode ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-0 justify-center md:justify-start"
            >
              <Image
                src={logo}
                alt="iDONATE Logo"
                width={200}
                height={200}
                //   width={80}
                // height={80}
                className="w-20 md:w-24 h-20 md:h-24 mt-[-17px] ml-[-17px]  object-cover"
              />
              <span className="text-xl md:text-2xl font-bold text-iDonate-navy-primary dark:text-iDonate-navy-accent ml-2">
                iDONATE
              </span>
            </Link>
            <p className="text-iDonate-navy-primary text-center md:text-left dark:text-iDonate-navy-accent">
              ការបរិច្ចាគគឺជាសកម្មភាពនៃការផ្តល់ធនធាន ដូចជាប្រាក់ ទំនិញ ឬពេលវេលា
              ដើម្បីជួយអ្នកដ៏ទៃ ឬជួយដល់បុព្វហេតុមួយ ដោយមិនរំពឹងអ្វីមកវិញឡើយ
            </p>
            <div className="space-y-2 text-iDonate-navy-primary dark:text-iDonate-navy-accent">
              <h3 className="font-semibold text-lg text-center md:text-left">
                Contact Information
              </h3>
              <div className="flex flex-col items-center md:items-start gap-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+85595990910" className="text-sm">
                    +855 95 990 910
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info.istad@gmail.com" className="text-sm">
                    info.istad@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="ml-0 md:ml-[72px] text-center md:text-left">
            <h3 className="text-xl text-iDonate-navy-primary font-semibold mb-4 dark:text-iDonate-navy-accent">
              Quick Link
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-iDonate-navy-primary hover:text-iDonate-green-primary transition-colors dark:text-iDonate-navy-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="text-center md:text-left">
            <h3 className="text-xl text-iDonate-navy-primary font-semibold mb-4 dark:text-iDonate-navy-accent">
              Support
            </h3>
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
                    className="text-iDonate-navy-primary hover:text-iDonate-green-primary transition-colors dark:text-iDonate-navy-accent"
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
              <h3 className="text-xl font-semibold mb-4 text-iDonate-navy-primary text-center md:text-left dark:text-iDonate-navy-accent">
                Stay Up-To-Date
              </h3>
              <div className="flex gap-2 max-w-sm mx-auto md:mx-0">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-iDonate-navy-secondary hover:bg-iDonate-navy-secondary border-iDonate-navy-primary text-white placeholder:text-gray-400"
                />
                <Button
                  size="icon"
                  className="bg-iDonate-navy-secondary hover:bg-iDonate-navy-primary ml-[-30px] text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-iDonate-navy-primary text-center md:text-left dark:text-iDonate-navy-accent">
                Our Sponsor
              </h3>
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
                <Image
                  src={MPTCLogo}
                  alt="MPTC Logo"
                  width={1000}
                  height={1000}
                  className="p-2 w-full h-full object-cover  "
                  onClick={() => window.open("https://www.mptc.gov.kh/")}
                />
                <Image
                  src={CBRDLogo}
                  alt="CBRD Logo"
                  width={1000}
                  height={1000}
                  className="p-2 w-full h-full object-cover"
                  onClick={() => window.open("https://cbrd.gov.kh/")}
                />
                <Image
                  src={ISTADLogo}
                  alt="ISTAD Logo"
                  width={1000}
                  height={1000}
                  className="p-2 w-full h-full object-cover"
                  onClick={() => window.open("https://www.cstad.edu.kh/")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-iDonate-navy-secondary border-t border-gray-700 dark:bg-[#18181B]">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-xs md:text-sm text-iDonate-navy-accent dark:text-iDonate-navy-accent">
            © 2025 Institute of Science and Technology Advanced Development |
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
