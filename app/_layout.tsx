import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator, Text, View } from "react-native";
import "./globals.css";

//describe theme object type
type ThemeState = {
  bgColor: string;
  textColor: string;
  isLoading: boolean;
};

//describe context
type ThemeContextType = {
  theme: ThemeState;
  setTheme: Dispatch<SetStateAction<ThemeState>>;
};

//shared state container
const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("error exporting useTheme in _layout");
  }
  return context;
}

export default function RootLayout() {
  const [theme, setTheme] = useState<ThemeState>({
    bgColor: "white",
    textColor: "black",
    isLoading: true,
  });

  const [fontsLoaded] = useFonts({
    FuzzyBubbles: require("../assets/fonts/FuzzyBubbles-Regular.ttf"),
    Birthstone: require("../assets/fonts/Birthstone-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl">Loading Fonts...</Text>
        <ActivityIndicator size="large" className="mt-10"></ActivityIndicator>
      </View>
    );
  }

  // Load theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedBgColor = await AsyncStorage.getItem("bg_color");
        const savedTextColor = await AsyncStorage.getItem("text_color");
        setTheme({
          bgColor: savedBgColor || "white",
          textColor: savedTextColor || "black",
          isLoading: false,
        });
        if (__DEV__) {
          console.log("done load theme");
        }
      } catch (error) {
        console.log("Error loading theme", error);
        setTheme((prev) => ({ ...prev, isLoading: false }));
      }
    };
    if (__DEV__) {
      console.log("load theme");
    }
    loadTheme();
  }, []);

  // Update theme to AsyncStorage
  useEffect(() => {
    if (!theme.isLoading) {
      if (__DEV__) {
        console.log("update theme");
      }
      AsyncStorage.setItem("bg_color", theme.bgColor);
      AsyncStorage.setItem("text_color", theme.textColor);
    }
  }, [theme.bgColor, theme.textColor, theme.isLoading]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Stack />
    </ThemeContext.Provider>
  );
}
