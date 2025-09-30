import { ZodiacData } from "@/components/ZodiacSheet";
import React, { createContext, useContext, useEffect, useState } from "react";
import HoroscopeService from "../services/HoroscopeService";
import { useTheme } from "./ThemeContext";

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
  const { theme } = useTheme();
  const selectedZodiac = ZodiacData.find((z) => z.name === theme.zodiac);
  const [horoscope, setHoroscope] = useState<HoroscopeState>({
    data: "",
    isLoading: true,
    error: null,
  });

  const getZodiacDate = (zodiacName?: string): string | null => {
    if (!zodiacName) return null;

    const zodiacDates: Record<string, string> = {
      Aquarius: "01-20",
      Pisces: "02-19",
      Aries: "03-21",
      Taurus: "04-20",
      Gemini: "05-21",
      Cancer: "06-21",
      Leo: "07-23",
      Virgo: "08-23",
      Libra: "09-23",
      Scorpio: "10-23",
      Sagittarius: "11-22",
      Capricorn: "12-22",
    };

    const retDate = zodiacDates[zodiacName];
    return retDate ? `2025-${retDate}` : null;
  };

  const fetchHoroscope = async () => {
    try {
      setHoroscope((prev) => ({ ...prev, isLoading: true, error: null }));
      const zodiacDate = getZodiacDate(selectedZodiac?.name) || "2025-01-20";
      if (__DEV__) {
        console.log("new zodiac date:", zodiacDate);
      }
      const horoscopeData = await HoroscopeService.fetchDailyHoroscope(
        zodiacDate,
        theme.topic
      );
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
  }, [theme.topic, selectedZodiac?.name]);

  return (
    <HoroscopeContext.Provider value={{ horoscope, refreshHoroscope }}>
      {children}
    </HoroscopeContext.Provider>
  );
}
