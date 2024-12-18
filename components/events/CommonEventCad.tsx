import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { EventType } from "@/difinitions/types/events/EventType";
import { CircleDollarSign, Users } from "lucide-react";

export function CommonEventCard ({events}: {events:EventType[]}) {
    return (
        <>
            {events.map((item, index) => (
                <Card  key={index} className="w-[280px] h-[400px] rounded-[10px] bg-iDonate-light-gray p-0 m-0 border-0">

                    <CardHeader lang="km" className="w-full h-[180px] p-0 m-0 rounded-t-[10px]">
                        {item.image && <Image className="rounded-t-[10px]" width={280} height={180} src={item.image} alt={item.title || "Media"} />}   
                    </CardHeader>

                    <CardContent className="px-4 flex flex-col justify-between h-[220px] gap-6" >
                        <div className="mt-[18px]">
                            {item.title && <h3 lang={"km"} className="font-extrabold text-medium-khmer line-clamp-1 text-left  text-iDonate-navy-primary">{item.title}</h3>}
                            {item.description && <p lang={"km"}  className="font-thin text-iDonate-navy-secondary text-title-card line-clamp-2 text-start ">{item.description}</p>}
                        </div>

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
        </>  
    )
}