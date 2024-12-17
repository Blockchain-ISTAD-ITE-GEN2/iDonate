import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { EventType } from "@/difinitions/types/events/EventType";
import { Users, CircleDollarSign } from "lucide-react";

export function CardEvent({ events }: { events: EventType[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((item, index) => (
                <Card
                    key={index}
                    className="w-full h-auto rounded-lg shadow-md bg-white overflow-hidden"
                >
                    {/* Image Section */}
                    <CardHeader className="w-full h-[180px] p-0">
                        {item.image && (
                            <Image
                                className="object-cover w-full h-full"
                                width={280}
                                height={180}
                                src={item.image}
                                alt={item.title || "Event"}
                            />
                        )}
                    </CardHeader>

                    {/* Content Section */}
                    <CardContent className="p-4 flex flex-col gap-2">
                        {/* Title */}
                        {item.title && (
                            <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                                {item.title}
                            </h3>
                        )}

                        {/* Description */}
                        {item.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {item.description}
                            </p>
                        )}

                        {/* Stats Section */}
                        <div className="flex flex-col gap-1 mt-2">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Users className="h-5 w-5 text-blue-600" />
                                <span className="text-sm">{item.total_donor} នាក់បរិច្ចាគ</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <CircleDollarSign className="h-5 w-5 text-blue-600" />
                                <span className="text-sm">{item.total_amount}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
