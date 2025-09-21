import { HoroscopeProvider, useHoroscope } from "../contexts/HoroscopeContext";
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FontProvider, useFont } from "../contexts/FontContext";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import "./globals.css";

export default function RootLayout() {
  return (
    <FontProvider>
      <ThemeProvider>
        <HoroscopeProvider>
          <Content />
        </HoroscopeProvider>
      </ThemeProvider>
    </FontProvider>
  );
}

function Content() {
  const { fontsLoaded } = useFont();
  const { theme } = useTheme();
  const {horoscope} = useHoroscope();

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl">Loading Fonts...</Text>
        <ActivityIndicator size="large" className="mt-10" />
      </View>
    );
  }

  if (theme.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl">Loading Settings...</Text>
        <ActivityIndicator size="large" className="mt-10" />
      </View>
    );
  }

  if (horoscope.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl">Loading Horoscope...</Text>
        <ActivityIndicator size="large" className="mt-10" />
      </View>
    );
  }

  return <Stack />;
}
