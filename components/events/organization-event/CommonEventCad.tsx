"use client";   
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { CircleDollarSign, Users } from "lucide-react";
import {EventType} from "@/difinitions/dto/EventType";
import { Toolbar } from "@/components/filter/toolbar";
import { useEffect, useState } from "react";

type OrganizationEventCardProps = {
    events?: EventType[];
  searchKey?: string;
  filtersFace?: {
    key: string;
    title: string;
    options: { label: string; value: string }[];
  }[];
  filtersDateRange?: {
    key: string;
    title: string
  }[];
}



export function CommonEventCard ({
    events,
    searchKey,
    filtersFace,
    filtersDateRange,
  }: OrganizationEventCardProps) {

    const [ filteredEvents, setFilteredEvents] = useState<EventType[]>(events || []);

    useEffect(() => {
        setFilteredEvents(events || []); // Reset filtered events whenever `events` prop changes
      }, [events]);

    return (
        <section className="flex flex-col gap-6 container mx-auto">
            <Toolbar
                events={events || []}
                filtersFace={filtersFace || []}
                searchKey={searchKey || ''}
                onFilterChange={setFilteredEvents}
                filtersDateRange={filtersDateRange}
            />

            <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                
                {filteredEvents.map((item, index) => (
                    <Card  key={index} className="w-[280px] h-[400px] rounded-[10px] bg-iDonate-light-gray p-0 m-0 border-0">

                        <CardHeader lang="km" className="w-full h-[180px] p-0 m-0 rounded-t-[10px]">
                            {item.image && <Image className="rounded-t-[10px]" width={280} height={180} src={item.image} alt={item.title || "Media"} />}   
                        </CardHeader>

                        <CardContent className="px-4 flex flex-col justify-between h-[220px] gap-6" >
                            <div className="mt-[18px]">
                                {item.title && <h3 lang={"km"} className="font-extrabold text-medium-khmer line-clamp-1 text-left  text-iDonate-navy-primary">{item.title}</h3>}
                                {item.description && <p lang={"km"}  className="font-thin text-iDonate-navy-secondary text-title-card line-clamp-2 text-start ">{item.description}</p>}
                            </div>

                            {/* {events}: {events:OrganizationEventCardProps[]} */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-4 ">
                                    <Users className="fill-iDonate-navy-primary h-6 w-6"/>
                                    {item.total_donor && <h3 className="text-description-khmer line-clamp-1 text-center text-iDonate-navy-primary">{item.total_donor}  នាក់បរិច្ចាគ</h3>}       
                                </div>

                                <div className="flex items-center gap-4">
                                    <CircleDollarSign className="fill-iDonate-navy-primary text-iDonate-white-space h-6 w-6" />
                                    {item.total_amount && <p className="text-medium-khmer line-clamp-2 text-center text-iDonate-navy-primary">{item.total_amount}</p>} 
                                </div>

                            </div>
                            
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>  
    )
}