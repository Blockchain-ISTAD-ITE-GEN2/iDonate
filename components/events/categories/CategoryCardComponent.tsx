"use client"
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CategoryCardComponent({categories}: {categories: CategoryType[]}) {
  return (
    <>
    {categories.map((item, index) => (
        <motion.div 
          key={index} 
          className="lg:w-[300px] md:w-full h-[370px] flex flex-col items-center gap-6 px-10 py-12 rounded-[15px] shadow-light"
          initial={{ opacity: 0, y: 50 }}  // Start off with 0 opacity and slightly below
          animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
          transition={{ duration: 0.5, delay: index * 0.1 }}  // Delay each card's animation slightly
          whileHover={{ scale: 1.05 }} // Hover effect: scale and shadow
        >
            <div className="w-[100px] h-[100px] bg-iDonate-navy-accent rounded-full border border-iDonate-navy-primary flex items-center justify-center">
                {item.media && <Image width={60} height={60} src={item.media} alt={item.title || "Media"} />}
            </div>

            {item.title && <h3 className="text-title-khmer text-iDonate-navy-primary">{item.title}</h3>}
            {item.description && <p className="text-medium-khmer text-center text-iDonate-navy-primary">{item.description}</p>}
            {/* {item.benefits && <span className="text-sm">{item.benefits}</span>} */}
        </motion.div>
      ))}
    </>
  );
}
