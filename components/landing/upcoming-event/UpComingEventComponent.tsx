'use client'

import { Card } from "@/components/ui/card"
import { Calendar, CalendarDays, GraduationCap, School } from 'lucide-react'
import RuralStudent1 from '@/public/upcomming-event/ruralstudent.png'
import RuralStudent2 from '@/public/upcomming-event/ruralstudent_2.png'
import PoorFamily from '@/public/upcomming-event/poorfamily.png'
import Image from "next/image"
interface Event {
  id: number
  title: string
  description?: string
  date: string
  category: string
  image: string
}

const events: Event[] = [
  {
    id: 1,
    title: "ផ្តល់កុមារផ្ទះដល់ Williams Family",
    description: "កុមារទាំងនេះត្រូវការជំនួយការពារសេរីភាពនិងសិទ្ធិរបស់កុមារ និងជួយធ្វើឱ្យពួកគេរស់នៅក្នុងសង្គម។",
    date: "25, May 2025",
    category: "Kid Education",
    image:PoorFamily.src
  },
  {
    id: 2,
    title: "រូបថតពាក់ព័ន្ធ vim",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent1.src
  },
  {
    id: 3,
    title: "រូបថតពាក់ព័ន្ធ vim",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent2.src
  },
  {
    id: 4,
    title: "រូបថតពាក់ព័ន្ធ vim",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent1.src
  },
  {
    id: 5,
    title: "រូបថតពាក់ព័ន្ធ vim",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent2.src
  }
]

export default function UpcomingEvents() {
  return (
    <div className="p-6 w-full px-[100px] mx-auto space-y-6 " lang="km">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Featured Event */}
        <Card className="overflow-hidden">
          <div className="aspect-[4/3] relative">
            <Image
              src={events[0].image}
              alt={events[0].title}
              width={600}
              height={400}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-6 space-y-4">
            <h4 className="text-xl font-semibold khmer-font text-iDonate-navy-primary">{events[0].title}</h4>
            <p className=" khmer-font text-iDonate-navy-secondary">{events[0].description}</p>
            <div className="flex justify-between gap-6">
              <div className="flex items-center gap-2 text-iDonate-navy-secondary">
                <CalendarDays className="h-4 w-4" />
                <span>{events[0].date}</span>
              </div>
              <div className="flex items-center gap-2 text-iDonate-navy-primary">
                <School className="h-4 w-4" />
                <span>{events[0].category}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Grid of Smaller Events */}
        <div className="grid grid-cols-2 gap-4">
          {events.slice(1).map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src={event.image}
                  width={0}
                  height={0}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-medium khmer-font text-iDonate-navy-secondary">{event.title}</h4>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2 text-iDonate-navy-secondary">
                    <CalendarDays className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-iDonate-navy-secondary">
                    <School className="h-4 w-4" />
                    <span>{event.category}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

