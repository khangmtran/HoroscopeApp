import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { widgetStorage } from "../utils/widgetStorage";

export type ThemeState = {
  bgColor: string;
  textColor: string;
  textFont: string;
  widgetSize: string;
  topic: string;
  zodiac: string;
  isLoading: boolean;
};

export type ThemeContextType = {
  theme: ThemeState;
  setTheme: Dispatch<SetStateAction<ThemeState>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeState>({
    bgColor: "white",
    textColor: "black",
    textFont: "system",
    widgetSize: "medium",
    topic: "string",
    zodiac: "string",
    isLoading: true,
  });

  // Load theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedBgColor = await AsyncStorage.getItem("bg_color");
        const savedTextColor = await AsyncStorage.getItem("text_color");
        const savedTextFont = await AsyncStorage.getItem("text_font");
        const savedWidgetSize = await AsyncStorage.getItem("widget_size");
        const savedTopic = await AsyncStorage.getItem("topic");
        const savedZodiac = await AsyncStorage.getItem("zodiac");
        setTheme({
          bgColor: savedBgColor || "black",
          textColor: savedTextColor || "white",
          textFont: savedTextFont || "system",
          widgetSize: savedWidgetSize || "medium",
          topic: savedTopic || "General",
          zodiac: savedZodiac || "Aquarius",
          isLoading: false,
        });
      } catch (error) {
        console.log("Error loading theme", error);
        setTheme((prev) => ({ ...prev, isLoading: false }));
      }
    };
    loadTheme();
  }, []);

  // Save theme to AsyncStorage
  useEffect(() => {
    if (!theme.isLoading) {
      AsyncStorage.setItem("bg_color", theme.bgColor);
      AsyncStorage.setItem("text_color", theme.textColor);
      AsyncStorage.setItem("text_font", theme.textFont);
      AsyncStorage.setItem("widget_size", theme.widgetSize);
      AsyncStorage.setItem("topic", theme.topic);
      AsyncStorage.setItem("zodiac", theme.zodiac);
      widgetStorage.saveWidgetTheme(
        theme.bgColor,
        theme.textColor,
        theme.textFont
      );
    }
  }, [
    theme.bgColor,
    theme.textColor,
    theme.textFont,
    theme.widgetSize,
    theme.topic,
    theme.zodiac,
    theme.isLoading,
  ]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
