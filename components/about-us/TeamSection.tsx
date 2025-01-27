"use client";

import Image from "next/image";
import { Facebook, Mail, Github } from "lucide-react";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";

// Define the TeamMember type
type TeamMember = {
  image: StaticImageData;
  name: string;
  role: string;
  facebook?: string;
  email?: string;
  github?: string;
};

// Define the TeamSectionProps type
type TeamSectionProps = {
  mentors: TeamMember[];
  members: TeamMember[];
};

// MemberCard component
function MemberCard({ member }: { member: TeamMember }) {
  // Define social links dynamically
  const socialLinks = [
    { icon: Facebook, url: member.facebook },
    { icon: Mail, url: `mailto:${member.email}` },
    { icon: Github, url: member.github },
  ];

  return (
    <motion.div
      className="flex flex-col items-center mb-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Profile Image */}
      <motion.div
        className="overflow-hidden rounded-full w-32 h-32 sm:w-40 sm:h-40 mb-4 border-4 border-iDonate-green-accent dark:border-iDonate-green-primary"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={member.image}
          alt={member.name}
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Name */}
      <h3 className="font-bold text-lg sm:text-xl text-center mb-2 text-iDonate-navy-secondary dark:text-iDonate-green-secondary">
        {member.name}
      </h3>

      {/* Role */}
      <p className="text-xs sm:text-sm text-iDonate-green-primary bg-green-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full mb-4 font-semibold uppercase dark:bg-iDonate-dark-mode border dark:border-iDonate-green-secondary dark:text-iDonate-navy-accent">
        {member.role}
      </p>

      {/* Social Links */}
      <motion.div
        className="flex space-x-2 sm:space-x-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {socialLinks.map(({ icon: Icon, url }, index) => (
          <motion.a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s ${Icon.name}`}
            className="text-iDonate-navy-primary hover:text-green-600 transition-colors duration-300 border border-iDonate-green-primary rounded-full p-1 sm:p-2 dark:text-iDonate-green-secondary"
            variants={{
              hidden: { scale: 0 },
              visible: { scale: 1 },
            }}
            whileHover={{ y: -5 }}
          >
            <Icon size={20} className="sm:w-6 sm:h-6" />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}

// TeamSection component
export default function TeamSection({ mentors, members }: TeamSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        {/* Mentors Section */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-iDonate-navy-primary dark:text-iDonate-navy-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mentors
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center -mx-4 mb-12 sm:mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {mentors.map((mentor, index) => (
            <MemberCard key={index} member={mentor} />
          ))}
        </motion.div>

        {/* Team Members Section */}
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mt-16 sm:mt-24 mb-8 sm:mb-16 text-iDonate-navy-primary dark:text-iDonate-navy-accent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Team Members
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center -mx-4 mb-12 sm:mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5,
              },
            },
          }}
        >
          {members.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}