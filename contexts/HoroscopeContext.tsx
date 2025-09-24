import React, { createContext, useContext, useEffect, useState } from "react";
import HoroscopeService from "../services/HoroscopeService";

export type HoroscopeState = {
  data: string;
  isLoading: boolean;
  error: string | null;
};

export type HoroscopeContextType = {
  horoscope: HoroscopeState;
  refreshHoroscope: () => Promise<void>;
};

const HoroscopeContext = createContext<HoroscopeContextType | null>(null);

export function useHoroscope(): HoroscopeContextType {
  const context = useContext(HoroscopeContext);
  if (!context) {
    throw new Error("useHoroscope must be used within HoroscopeProvider");
  }
  return context;
}

export function HoroscopeProvider({ children }: { children: React.ReactNode }) {
  const [horoscope, setHoroscope] = useState<HoroscopeState>({
    data: "",
    isLoading: true,
    error: null,
  });

  const fetchHoroscope = async () => {
    try {
      setHoroscope((prev) => ({ ...prev, isLoading: true, error: null }));
      const horoscopeData = await HoroscopeService.fetchDailyHoroscope();
      if (__DEV__) {
        console.log("Horoscope Fetched");
      }
      setHoroscope({
        data: horoscopeData,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch horoscope:", error);
      setHoroscope({
        data: "",
        isLoading: false,
        error: "Failed to load horoscope",
      });
    }
  };

  const refreshHoroscope = async () => {
    await fetchHoroscope();
  };

  // Fetch horoscope on app launch
  useEffect(() => {
    fetchHoroscope();
  }, []);

  return (
    <HoroscopeContext.Provider value={{ horoscope, refreshHoroscope }}>
      {children}
    </HoroscopeContext.Provider>
  );
}
