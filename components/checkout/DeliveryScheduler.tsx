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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Select Delivery Schedule</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {availableDates.map((date) => {
            const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                className={`min-w-[80px] p-3 rounded-lg border text-center transition-colors ${
                  isSelected 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-xs uppercase font-semibold">{format(date, 'MMM')}</div>
                <div className="text-xl font-bold">{format(date, 'd')}</div>
                <div className="text-xs text-gray-500">{format(date, 'EEE')}</div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {OPERATIONAL_HOURS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-2 rounded-md border text-sm transition-colors ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm' 
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
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
