"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Gift, Users, CalendarDays } from "lucide-react";

const dataofTotalOrganization = [
  { amount: 27, desc: "ចំនួនសរុប", title: "អង្គការភាព", icon: Building2 },
  { amount: 18, desc: "ចំនួនសរុប", title: "កម្មវិធីបរិច្ចាគ", icon: Gift },
  { amount: 99, desc: "ចំនួនសរុប", title: "អ្នកស្ម័គ្រចិត្ត", icon: Users },
  { amount: 1, desc: "ឆ្នាំ", title: "នៃការបង្កើត", icon: CalendarDays },
];

const CounterAnimation = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const end = target;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, target]);

  return <span ref={ref}>{count}</span>;
};

export default function TotalOrganizationComponent() {
  return (
    <section className="relative overflow-hidden light:bg-gradient-to-br from-slate-100 to-slate-200 w-full mx-auto py-12 md:py-20 px-4 md:px-8 lg:px-[100px] dark:bg-iDonate-navy-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center dark:text-white text-iDonate-navy-primary mb-8 sm:mb-12 leading-tight " >
          យើងរួមគ្នា កសាងសហគមន៍ដ៏រឹងមាំ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-center">
          {dataofTotalOrganization.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center items-center text-center"
            >
              <motion.div
                className="flex flex-col items-center bg-white rounded-lg shadow-light p-4 sm:p-6 transition-all duration-300 w-full opacity-90"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                
              >
                <span className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4">
                  <item.icon
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2 sm:mb-4 text-iDonate-green-primary"
                    style={{ strokeWidth: 2 }}
                  />
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-iDonate-green-primary">
                  <CounterAnimation target={item.amount} />
                </span>
                <div className="mt-1 sm:mt-2 dark:text-white text-iDonate-navy-primary text-xs sm:text-sm">
                  <span>{item.desc}</span>
                </div>
                <div className="mt-1 text-iDonate-navy-primary font-medium text-sm sm:text-base">
                  <span>{item.title}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full bg-iDonate-navy-primary opacity-10 z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
        </svg>
        <defs>
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
      </div>
    </section>
  );
}
