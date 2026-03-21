"use client";

import React, { useState, useEffect } from 'react';
import { format, addDays, isToday, startOfDay, getHours } from 'date-fns';
import { useCartStore } from '@/store/useCartStore';
import DatePickerCard from '@/components/ui/DatePickerCard';
import TimeSlotGrid from '@/components/ui/TimeSlotGrid';

const OPERATIONAL_HOURS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', 
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
];

export default function DeliveryScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const setDelivery = useCartStore((state) => state.setDelivery);
  const { deliveryDate, deliveryTime } = useCartStore();

  // Initialize from store if exists
  useEffect(() => {
    if (deliveryDate) setSelectedDate(new Date(deliveryDate));
    if (deliveryTime) setSelectedTime(deliveryTime);
  }, [deliveryDate, deliveryTime]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      setDelivery(selectedDate.toISOString(), time);
    }
  };

  // Generate next 14 days
  const today = new Date();
  const currentHour = getHours(today);
  
  // Same-day cutoff logic: If it's past 2 PM (14:00), disable today.
  const isPastCutoff = currentHour >= 14;

  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    return addDays(startOfDay(today), i);
  }).filter(date => {
    if (isToday(date) && isPastCutoff) {
      return false; // Remove today if past cutoff
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Choose Delivery Date</label>
        
        <div className="flex gap-3 max-md:gap-2 overflow-x-auto pb-4 no-scrollbar">
          {availableDates.map((date) => (
            <DatePickerCard
              key={date.toISOString()}
              month={format(date, 'MMM')}
              day={format(date, 'd')}
              weekday={format(date, 'EEE')}
              selected={!!(selectedDate && date.getTime() === selectedDate.getTime())}
              onClick={() => handleDateSelect(date)}
            />
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Select Time Slot</label>
          <TimeSlotGrid
            slots={OPERATIONAL_HOURS}
            selected={selectedTime}
            onSelect={handleTimeSelect}
          />
        </div>
      )}
    </div>
  );
}
