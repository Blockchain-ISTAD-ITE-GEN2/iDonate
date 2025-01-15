"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
  error?: string
}

export function DatePicker({ selectedDate, onDateChange, error }: DatePickerProps) {
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "dd-MM-yyyy")
            ) : (
              <span className="text-iDonate-navy-secondary">ជ្រើសរើស</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            initialFocus
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-red-500 text-xs mt-1 absolute">
          {error}
        </p>
      )}
    </div>
  )
}

