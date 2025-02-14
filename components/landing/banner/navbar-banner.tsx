'use client';

import { BellRing } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function NavbarBanner() {
  const [scrollText] = useState(
    '10,000 Riel 10,000" campaign, Kantha Bopha Foundation of Cambodia receives...'
  );

  return (
    <div className="relative flex flex-col md:flex-row border-b border-iDonate-navy-accent">
      {/* Left section with white background */}
      <div className="flex flex-1 items-center bg-white text-black py-2 px-4 overflow-hidden whitespace-nowrap">
        <BellRing className="mr-2 shrink-0" />
        <div className="w-full overflow-hidden">
          <p className="animate-marquee inline-block">{scrollText}</p>
        </div>
      </div>

      {/* Right section with navy background and slanted edge */}
      <div className="relative flex flex-wrap items-center justify-center md:justify-between gap-2 md:gap-6 px-4 md:px-9 bg-iDonate-navy-primary text-white before:absolute before:-left-4 before:top-0 before:h-full before:w-8 before:bg-iDonate-navy-primary before:skew-x-[30deg]">
        <Link href="mailto:info.istads@gmail.com" className="text-sm md:text-base">
          info.istads@gmail.com
        </Link>
        <span className="hidden md:inline">|</span>
        <Link href="tel:+88595900910" className="text-sm md:text-base">
          +885 95-900-910
        </Link>
        <span className="hidden md:inline">|</span>
        <Link href="#" className="text-sm md:text-base whitespace-nowrap">
          Phnom Penh, Cambodia
        </Link>
      </div>

      {/* CSS for marquee effect */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
