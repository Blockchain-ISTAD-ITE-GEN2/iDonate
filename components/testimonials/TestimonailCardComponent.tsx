// import { TestimonialType } from "@/difinitions/types/components-type/testimonial";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
// import { Card, CardContent } from "../ui/card";
// import Image from 'next/image';

// export default function TestimonialCardComponent({ testimonials }: { testimonials: TestimonialType[] }) {
//     return (
//         <div>
//             <Carousel >
//             <CarouselContent className="-ml-2 md:-ml-4" >
//                 {testimonials.map((testimonial, index) => (
//                     <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//                             <Card className="w-[366px] ">
//                                 <CardContent className=" flex flex-col items-center p-6">
//                                     <Image 
//                                         src={testimonial.media} 
//                                         alt={testimonial.name} 
//                                         className="w-20 h-20 rounded-full mb-4" 
//                                     />
//                                     <p className="text-center mb-2">{testimonial.comment}</p>
//                                     <p className="font-semibold text-center">{testimonial.name}</p>
//                                     <p className="text-center">{testimonial.position}</p>
//                                 </CardContent>
//                             </Card>
//                     </CarouselItem>
//                 ))}
//             </CarouselContent>
//             <CarouselPrevious />
//             <CarouselNext />
//         </Carousel>
//         </div>
        
//     );
// }


'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import TestimonialProfile from '@/public/members/sokcheat.jpg'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { AnimatePresence, motion } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  testimonial: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Elizabeth Joe",
    role: "Founder of ADRF",
    image: TestimonialProfile.src,
    testimonial: "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។"
  },
  {
    id: 2,
    name: "Esther Howard",
    role: "Web Designer",
    image: TestimonialProfile.src,
    testimonial: "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។"
  },
  {
    id: 3,
    name: "Albert Flores",
    role: "President of Sales",
    image: TestimonialProfile.src,
    testimonial: "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។"
  },
  {
    id: 4,
    name: "Albert Flores",
    role: "President of Sales",
    image: TestimonialProfile.src,
    testimonial: "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។"
  },
  {
    id: 5,
    name: "Albert Flores",
    role: "President of Sales",
    image: TestimonialProfile.src,
    testimonial: "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។"
  },
  {
    id: 6,
    name: "Albert Flores",
    role: "President of Sales",
    image: TestimonialProfile.src,
    testimonial: "iDonateគឺជាក្តីស្រមៃដើម្បីជួយសហគមន៍ការប្រមូលផ្តុំនិងផ្តល់ឱ្យមនុស្សគ្រប់គ្នាដែលខ្វះខាត។ ខ្ញុំស្រលាញ់ការដែលរបស់ពួកគេខ្ញុំដឹងថាស់។ ខ្ញុំត្រូវបានចូលរួមក្នុងការនិងកល្យបជាក្តីភាពត្រឹមត្រូវជាមួយពិភពលោក។ ខ្ញុំនឹងនៅទីនេះរហូតនៅពេលដែលពួកគេត្រូវការ។"
  },
  
]

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    // const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // useEffect(() => {
  //   const handleResize = () => {
  //     setCurrentIndex(0)
  //   }
  //   window.addEventListener('resize', handleResize)
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === Math.ceil(testimonials.length / 3) - 1 ? 0 : prevIndex + 1
      )
    }
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? Math.ceil(testimonials.length / 3) - 1 : prevIndex - 1
      )
    }
  
    return (
        <>
         <section className="w-full text-center">
        <span className="text-2xl text-iDonate-navy-primary " lang="km">មតិអ្នកបរិច្ចាគរបស់យើង</span>
      </section>
      <div className="px-0 max-w-7xl mx-auto">
        <div className="relative">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 z-10 -translate-x-1/2 border hover:bg-iDonate-green-primary"
              onClick={prevSlide}
            >
              <ChevronsLeft className="h-8 w-8" />
            </Button>
  
            <div className="overflow-hidden mx-12 w-full">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="flex w-full shrink-0 ">
                    {testimonials
                      .slice(slideIndex * 3, slideIndex * 3 + 3)
                      .map((testimonial) => (
                        <div key={testimonial.id} className="w-1/3 p-4 ">
                          <Card className="p-8">
                            <div className="flex flex-col items-center text-center">
                              <Avatar className="h-24 w-24 mb-4 ">
                                <AvatarImage src={testimonial.image} alt={testimonial.name}  className='object-cover'/>
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <h3 className="text-xl font-semibold text-iDonate-navy-primary">{testimonial.name}</h3>
                              <p className="text-muted-foreground mb-6 text-iDonate-navy-primary">{testimonial.role}</p>
                              <p className="khmer-font leading-relaxed text-iDonate-navy-primary" lang='km'>
                                {testimonial.testimonial}
                              </p>
                            </div>
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
              className="absolute right-0 z-10 translate-x-1/2 border hover:bg-iDonate-green-primary"
              onClick={nextSlide}
            >
              <ChevronsRight className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>
        </>
    
    )
  }

// const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction: number) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0
//     })
//   }

//   const cardVariants = {
//     initial: { scale: 0.96, opacity: 0 },
//     enter: { scale: 1, opacity: 1 },
//     hover: { scale: 1.05, transition: { duration: 0.2 } }
//   }
  

//   return (
//     <>
//       <motion.section 
//         className="w-full text-center"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <span className="text-xl sm:text-2xl md:text-3xl text-iDonate-navy-primary" lang="km">
//           មតិអ្នកបរិច្ចាគរបស់យើង
//         </span>
//       </motion.section>

//       <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="relative">
//           <div className="flex items-center">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute top-1/2 -translate-y-1/2 left-0 z-10 border hover:bg-iDonate-green-primary hidden sm:flex"
//               onClick={prevSlide}
//             >
//               <ChevronsLeft className="h-6 w-6 sm:h-8 sm:w-8" />
//             </Button>

//             <div className="overflow-hidden mx-4 sm:mx-12 w-full">
//               <AnimatePresence initial={false} custom={direction}>
//                 <motion.div 
//                   key={currentIndex}
//                   custom={direction}
//                   variants={slideVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   transition={{
//                     x: { type: "spring", stiffness: 300, damping: 30 },
//                     opacity: { duration: 0.2 }
//                   }}
//                   className="flex w-full"
//                 >
//                   {Array.from({ length: Math.ceil(testimonials.length / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)) }).map((_, slideIndex) => (
//                     <div key={slideIndex} className="flex w-full shrink-0">
//                       {testimonials
//                         .slice(slideIndex * (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1), slideIndex * (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1) + (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))
//                         .map((testimonial, index) => (
//                           <motion.div
//                             key={testimonial.id}
//                             className="w-full sm:w-1/2 lg:w-1/3 p-2 sm:p-4"
//                             variants={cardVariants}
//                             initial="initial"
//                             animate="enter"
//                             whileHover="hover"
//                             transition={{ delay: index * 0.1 }}
//                           >
//                             <Card className="p-4 sm:p-6 md:p-8">
//                               <motion.div 
//                                 className="flex flex-col items-center text-center"
//                                 initial={{ y: 20, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ delay: index * 0.2 }}
//                               >
//                                 <Avatar className="h-24 w-24 mb-4">
//                                   <AvatarImage src={testimonial.image} alt={testimonial.name} className='object-cover'/>
//                                   <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
//                                 </Avatar>
//                                 <h3 className="text-xl font-semibold text-iDonate-navy-primary">{testimonial.name}</h3>
//                                 <p className="text-muted-foreground mb-6 text-iDonate-navy-primary">{testimonial.role}</p>
//                                 <p className="khmer-font leading-relaxed text-iDonate-navy-primary" lang='km'>
//                                   {testimonial.testimonial}
//                                 </p>
//                               </motion.div>
//                             </Card>
//                           </motion.div>
//                         ))}
//                     </div>
//                   ))}
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute top-1/2 -translate-y-1/2 right-0 z-10 border hover:bg-iDonate-green-primary hidden sm:flex"
//               onClick={nextSlide}
//             >
//               <ChevronsRight className="h-6 w-6 sm:h-8 sm:w-8" />
//             </Button>
//           </div>
//         </div>
//         <div className="flex justify-center mt-4 sm:hidden">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="mr-2 border hover:bg-iDonate-green-primary"
//             onClick={prevSlide}
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="ml-2 border hover:bg-iDonate-green-primary"
//             onClick={nextSlide}
//           >
//             <ChevronRight className="h-6 w-6" />
//           </Button>
//         </div>
//       </div>
//     </>
//   )
// }