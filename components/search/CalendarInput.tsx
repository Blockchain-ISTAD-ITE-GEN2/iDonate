"use client"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function CalendarInput() {
        const [date, setDate] = React.useState<Date | undefined>(new Date())

        return (
            <div className="ml-[15px] w-[235px] h-[59px] hover:text-iDonate-navy-primary">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span className="text-iDonate-navy-seconary text-description-khmer hover:text-iDonate-navy-primary">ជ្រើសរើស កាលបរិច្ឆេទ</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto m-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </PopoverContent>
                </Popover>
            </div>

        )
}