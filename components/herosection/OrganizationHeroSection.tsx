"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function OrganizationHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      title: "ចូលរួមចំណែកដើម្បីអនាគតដ៏ល្អប្រសើរជាងនេះ",
      description:
        "ស្វែងរកអង្គការដែលកំពុងបង្កើតការផ្លាស់ប្តូរ ជាមួយតាមរយៈ iDonate។ យើងភ្ជាប់អ្នកបរិច្ចាគដែលមានចិត្តសប្បុរសជាមួយអង្គការមិនរកប្រាក់ចំណេញដ៏ទុកចិត្ត។",
      buttonPrimary: "Starting Donation",
      buttonSecondary: "Learn More",
      image:
        "https://i.pinimg.com/736x/a8/fe/36/a8fe362d95c794fd58b832a8450d7a17.jpg",
    },
    {
      title: "បរិច្ចាគដើម្បីការប្រែប្រួល",
      description:
        "ជួយទទួលស្គាល់និងរួមចំណែកជាមួយអង្គការដែលអាចជួយជីវិតអ្នកផ្សេងទៀត។",
      buttonPrimary: "Join Us",
      buttonSecondary: "Explore More",
      image:
        "https://i.pinimg.com/736x/ae/76/12/ae76127d1444bcfce1640b0bb736f440.jpg",
    },
  ];

  return (
    <section className="mx-[106px] relative">
      <Carousel>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="grid px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                {/* Left Content */}
                <div className="lg:col-span-7 mt-0">
                  <h1
                    
                    className="text-iDonate-navy-primary max-w-2xl text-[36px] tracking-tight leading-none md:text-[36px] xl:text-[36px] dark:text-white"
                  >
                    {slide.title}
                    <div className="flex justify-center mt-[18px]">
                      <span  className="text-iDonate-navy-primary">
                        ជាមួយ iDonate
                      </span>
                    </div>
                  </h1>
                  <p
                    
                    className="text-iDonate-navy-primary leading-loose max-w-2xl tracking-normal my-[36px] font-light lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
                  >
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center space-x-4">
                    <Button className="w-[228px] h-[50px] text-[20px] bg-iDonate-green-secondary text-idonate-navy-primary">
                      {slide.buttonPrimary}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-[228px] h-[50px] text-[20px] text-idonate-navy-primary"
                    >
                      {slide.buttonSecondary}
                    </Button>
                  </div>
                </div>

                {/* Right Content */}
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex flex-col items-center">
                  <Image
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="rounded-[6px] object-cover"
                    width={520}
                    height={500}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Custom Slider Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-[30px] h-[30px] rounded-full ${
              index === activeIndex
                ? "bg-iDonate-green-secondary"
                : "bg-gray-300"
            }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  );
}
