import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  error?: string;
}

export function DatePicker({ selectedDate, onDateChange, error }: DatePickerProps) {
  const [year, setYear] = useState<number | undefined>(selectedDate?.getFullYear());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => currentYear - index);

  const handleYearChange = (selectedYear: string) => {
    setYear(parseInt(selectedYear, 10));
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setFullYear(parseInt(selectedYear, 10));
      onDateChange(newDate);
    }
  };

  return (
    <div className="flex space-x-2">
      <div className='w-1/3'>
      <Select onValueChange={handleYearChange} value={year?.toString()}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={y.toString()}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      </div>
   
      <div className="w-2/3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !selectedDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'MMM d, yyyy') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date && year) {
                  const newDate = new Date(date);
                  newDate.setFullYear(year);
                  onDateChange(newDate);
                } else {
                  onDateChange(date);
                }
              }}
              initialFocus
              toYear={year}
              defaultMonth={selectedDate || new Date()}
            />
          </PopoverContent>
        </Popover>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}
