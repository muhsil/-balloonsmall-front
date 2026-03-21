"use client";

import React, { useState, useEffect } from 'react';
import { format, addDays, isToday, startOfDay, getHours } from 'date-fns';
import { useCartStore } from '@/store/useCartStore';

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
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {availableDates.map((date) => {
            const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                className={`min-w-[100px] p-5 rounded-[2rem] border-2 text-center transition-all duration-300 ${
                  isSelected 
                    ? 'border-violet-600 bg-violet-600 text-white shadow-xl shadow-violet-200 scale-105' 
                    : 'border-gray-100 bg-white text-gray-600 hover:border-violet-200 hover:shadow-lg'
                }`}
              >
                <div className={`text-[10px] uppercase font-black tracking-widest mb-1 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                  {format(date, 'MMM')}
                </div>
                <div className="text-3xl font-black mb-1">{format(date, 'd')}</div>
                <div className={`text-[10px] font-bold ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                  {format(date, 'EEE')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Select Time Slot</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {OPERATIONAL_HOURS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-4 rounded-2xl border-2 text-sm font-black transition-all ${
                    isSelected 
                      ? 'border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200' 
                      : 'border-gray-100 bg-white text-gray-600 hover:border-violet-100 hover:bg-violet-50/30'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
