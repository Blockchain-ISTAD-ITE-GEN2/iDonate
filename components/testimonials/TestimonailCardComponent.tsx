"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  testimonial: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Elizabeth Joe",
    role: "Founder of ADRF",
    image: "/members/sokcheat.jpg",
    testimonial:
      "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។",
  },
  {
    id: 2,
    name: "Esther Howard",
    role: "Web Designer",
    image: "/members/sokcheat.jpg",
    testimonial:
      "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។",
  },
  {
    id: 3,
    name: "Albert Flores",
    role: "President of Sales",
    image: "/members/sokcheat.jpg",
    testimonial:
      "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។",
  },
  {
    id: 4,
    name: "John Doe",
    role: "Marketing Manager",
    image: "/members/sokcheat.jpg",
    testimonial:
      "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។",
  },
  {
    id: 5,
    name: "Sarah Smith",
    role: "Nonprofit Coordinator",
    image: "/members/sokcheat.jpg",
    testimonial:
      "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។",
  },
  {
    id: 6,
    name: "Michael Johnson",
    role: "Volunteer Coordinator",
    image: "/members/sokcheat.jpg",
    testimonial:
      "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setItemsPerPage(1);
        } else if (window.innerWidth < 1024) {
          setItemsPerPage(2);
        } else {
          setItemsPerPage(3);
        }
      }
      setCurrentIndex(0);
    };

    handleResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(testimonials.length / itemsPerPage) - 1
        ? 0
        : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(testimonials.length / itemsPerPage) - 1
        : prevIndex - 1,
    );
  };

  return (
    <div className="w-full container mx-auto px-4 ">
      <section className="w-full text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-iDonate-navy-primary">
          មតិអ្នកបរិច្ចាគរបស់យើង
        </h2>
      </section>

      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 z-10 -translate-x-1/2 border hover:bg-iDonate-green-primary hidden sm:flex"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronsLeft className="h-6 w-6" />
            </Button>

            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({
                  length: Math.ceil(testimonials.length / itemsPerPage),
                }).map((_, slideIndex) => (
                  <div key={slideIndex} className="flex w-full shrink-0 gap-4 ">
                    {testimonials
                      .slice(
                        slideIndex * itemsPerPage,
                        slideIndex * itemsPerPage + itemsPerPage,
                      )
                      .map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className={`w-full ${itemsPerPage === 1 ? "" : itemsPerPage === 2 ? "md:w-full" : "md:w-1/2 lg:w-1/3"} lg:p-8 md:p-8`}
                        >
                          <Card className="h-full">
                            <CardContent className="p-6 md:gap-2">
                              <div className="flex flex-col items-center text-center h-full">
                                <Avatar className="h-16 w-16 md:h-20 md:w-20 mb-4">
                                  <AvatarImage
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="object-cover"
                                  />
                                  <AvatarFallback>
                                    {testimonial.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <h3 className="text-lg md:text-xl font-semibold text-iDonate-navy-primary">
                                  {testimonial.name}
                                </h3>
                                <p className="text-sm md:text-base text-muted-foreground mb-4 text-iDonate-navy-primary">
                                  {testimonial.role}
                                </p>
                                <p className="khmer-font text-sm md:text-base leading-relaxed text-iDonate-navy-primary">
                                  {testimonial.testimonial}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 z-10 translate-x-1/2 border hover:bg-iDonate-green-primary hidden sm:flex"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronsRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 border hover:bg-iDonate-green-primary"
          onClick={prevSlide}
          aria-label="Previous testimonial"
        >
          <ChevronsLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 border hover:bg-iDonate-green-primary"
          onClick={nextSlide}
          aria-label="Next testimonial"
        >
          <ChevronsRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
