"use client";

import React, { createContext, useContext } from 'react';

interface StoreSettingsContextType {
  currency: string;
  numDecimals: number;
}

const StoreSettingsContext = createContext<StoreSettingsContextType>({
  currency: 'AED',
  numDecimals: 0,
});

export function useStoreSettings() {
  return useContext(StoreSettingsContext);
}

interface StoreSettingsProviderProps {
  currency: string;
  numDecimals: number;
  children: React.ReactNode;
}

export default function StoreSettingsProvider({
  currency,
  numDecimals,
  children,
}: StoreSettingsProviderProps) {
  return (
    <StoreSettingsContext.Provider value={{ currency, numDecimals }}>
      {children}
    </StoreSettingsContext.Provider>
  );
}
