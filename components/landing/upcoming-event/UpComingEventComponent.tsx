"use client";

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, School } from 'lucide-react'
import RuralStudent1 from '@/public/landing/CambodianRuralStudent.jpg'
import RuralStudent2 from '@/public/landing/Student.jpg'
import RuralStudent3 from '@/public/landing/Student_1.jpg'
import RuralStudent4 from '@/public/landing/Student_2.jpg'
import PoorFamily from '@/public/landing/PoorFamily.jpg'

interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  category: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "ការផ្តល់ជំនួយទៅឲ្យក្រុមគ្រួសាររបស់សុខ",
    description: "ទឹកទន្លេមេគង្គហក់ឡើងលឿនគួរជាទីកត់សម្គាល់ដោយសារតែភ្លៀងធ្លាក់ជាបន្តបន្ទាប់ស្របពេលមានព្យុះផង បង្កឲ្យផ្ទះ សាលារៀន មន្ទីរពេទ្យ និងវត្តអារាមនៅតាមបណ្តាខេត្តមួយចំនួននៅតាមដងទន្លេត្រូវបានជន់លិច និង​មានប្រជាជនមួយចំនួនត្រូវបានជម្លៀសទៅកាន់ទីទួលសុវត្ថិភាព។​​ ក្នុងនោះក៏មានក្រុមគ្រួសាររបស់សុខត្រូវបានចួបប្រទះទៅនឹងគ្រោះថ្នាក់ខ្យល់ព្យុះដែលបណ្តាល់ឲ្យផ្ទះរបស់ពួគគេត្រូវបានខ្ទិចខ្ទីខូចខាតច្រើនសឹងតែទាំងស្រុង។​ គ្រោះថ្នាក់នេះមិនបណ្តាលឲ្យមានជនរងគ្រោះរហូតដល់បាត់បង់ជីវិតនោះទេ ប៉ុន្តែគ្រាន់តែធ្វើឲ្យខូចខាងសម្ភារប្រើប្រាស់នានាតែប៉ុណ្ណោះ",
    date: "25, May 2025",
    category: "Kid Education",
    image: PoorFamily.src,
  },
  {
    id: 2,
    title: "រូបថតពាក់ព័ន្ធ ",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent1.src,
  },
  {
    id: 3,
    title: "រូបថតពាក់ព័ន្ធ ",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent2.src,
  },
  {
    id: 4,
    title: "រូបថតពាក់ព័ន្ធ ",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent3.src
  },
  {
    id: 5,
    title: "រូបថតពាក់ព័ន្ធ ",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent4.src
  }
]

export default function UpcomingEvents() {
  return (
    <section
      className="w-full lg:w-full mx-auto md:px-4 px-4  lg:px-[100px] py-12 space-y-8"
     
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Featured Event */}
        <Card className="overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={events[0].image}
              alt={events[0].title}
              width={7000}
              height={7000}
              className="object-cover w-full h-full"
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="p-6 space-y-4">
            <CardTitle className="text-xl font-semibold khmer-font text-iDonate-navy-primary">{events[0].title}</CardTitle>
            <p className="khmer-font text-left text-iDonate-navy-secondary">{events[0].description}</p>
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex items-center gap-2 text-iDonate-navy-secondary">
                <CalendarDays className="h-4 w-4 flex-shrink-0" />
                <span>{events[0].date}</span>
              </div>
              <div className="flex items-center gap-2 text-iDonate-navy-primary">
                <School className="h-4 w-4 flex-shrink-0" />
                <span>{events[0].category}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid of Smaller Events */}
        <div className="grid sm:grid-cols-2 gap-4">
          {events.slice(1).map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={7000}
                  height={7000}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <CardTitle className="text-sm font-medium khmer-font text-iDonate-navy-secondary">
                  {event.title}
                </CardTitle>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2 text-iDonate-navy-secondary">
                    <CalendarDays className="h-3 w-3 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-iDonate-navy-secondary">
                    <School className="h-3 w-3 flex-shrink-0" />
                    <span>{event.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
