import * as React from "react"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Image from "next/image";
import {OrganizationParam} from "@/difinitions/types/media/organization";

export function OrganizationCardComponent({image, title, description}:OrganizationParam) {
    return (
        <Card className="w-[600px] h-[182px] flex items-center rounded-[10px] mx-[22px]">
            <CardContent className="flex flex-row items-center">
                {/* Logo */}
                <div className="flex-shrink-0 rounded-[6px]">
                    <Image
                        src={image}
                        alt="Organization Logo"
                        width={488}
                        height={292}
                        className="w-[150px] h-[150px] object-cover rounded-[6px]"
                    />
                </div>

                {/* description */}
                <div className="ml-6">
                    <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                        {title}
                    </h2>
                    <p className="mt-2 text-iDonate-navy-secondary line-clamp-3">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}