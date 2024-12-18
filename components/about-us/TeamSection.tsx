import Image from "next/image"
import { Facebook, Mail, Github} from 'lucide-react'
import { StaticImageData } from "next/image"
import {motion} from "framer-motion"

interface TeamMember {
  image: StaticImageData
  name: string
  role: string
}

interface TeamSectionProps {
  mentors: TeamMember[]
  members: TeamMember[]
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
        <motion.div
      className="flex flex-col items-center mb-8 "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
        <motion.div
        className="overflow-hidden rounded-full w-40 h-40 mb-4 border-4 border-iDonate-green-accent"
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
      <h3 className="font-bold text-xl text-center mb-2">{member.name}</h3>
      <p className="ext-sm text-iDonate-green-primary bg-green-100 px-4 py-2 rounded-full mb-4 font-semibold uppercase">
        {member.role}
      </p>
      <motion.div
        className="flex space-x-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
    {[Facebook, Mail, Github].map((Icon, index) => (
          <motion.a
            key={index}
            href="#"
            className="text-iDonate-navy-primary hover:text-green-600 transition-colors duration-300 border border-iDonate-green-primary rounded-full p-2"
            variants={{
              hidden: { scale: 0 },
              visible: { scale: 1 }
            }}
            whileHover={{ y: -5 }}
          >
            <Icon size={24} />
          </motion.a>
        ))}
      </motion.div>
      </motion.div>
  )
}

export default function TeamSection({ mentors, members }: TeamSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
      <motion.h2
          className="text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mentors
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-52 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
                {mentors.map((mentor, index) => (
            <MemberCard key={index} member={mentor} />
          ))}

        </motion.div>
       
        <motion.h2
          className="text-4xl font-bold text-center mt-24 mb-16 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          សមាជិកក្រុម
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-52 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
              }
            }
          }}
        >
          {members.slice(0, 2).map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-52 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
              }
            }
          }}
        >
          {members.slice(2).map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </motion.div>

        
      </div>
    </section>
  )
}

