"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetTestimonialsQuery } from "@/redux/services/testimony";
import { TestimonialType } from "@/difinitions/types/components-type/testimonial";
import TestmonailCardPleaceHolder from "@/components/testimonials/TestmonailCardPleaceHolder";

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Fetch testimonials data using RTK Query
  const {
    data: testimonials = [],
    isLoading,
    isError,
    error,
  } = useGetTestimonialsQuery({});

  const typedTestimonials: TestimonialType[] = testimonials || [];

  console.log("Data of Testimonials: ", testimonials);

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


  // Handle Skalaton start  

  if (isLoading) {
    return(
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8 p-6 md:gap-24 flex">
            <TestmonailCardPleaceHolder />
            <TestmonailCardPleaceHolder />
            <TestmonailCardPleaceHolder />
          </div>
        </div>
    )
  }

  return (
    <div className="w-full container mx-auto px-4">
      <section className="w-full text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-iDonate-navy-primary dark:text-iDonate-navy-accent">
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
                  length: Math.ceil(typedTestimonials.length / itemsPerPage),
                }).map((_, slideIndex) => (
                  <div key={slideIndex} className="flex w-full shrink-0 gap-4">
                    {typedTestimonials
                      .slice(
                        slideIndex * itemsPerPage,
                        slideIndex * itemsPerPage + itemsPerPage,
                      )
                      .map((testimonial) => (
                        <div
                          key={testimonial.uuid}
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
                                <h3 className="text-lg md:text-xl font-semibold text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                                  {testimonial.name}
                                </h3>
                                <p className="text-sm md:text-base text-muted-foreground mb-4 text-iDonate-navy-primary dark:text-iDonate-green-secondary">
                                  {testimonial.position}
                                </p>
                                <p className="khmer-font text-sm md:text-base leading-relaxed text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                                  {testimonial.comment}
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
