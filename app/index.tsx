import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomizeSheet from "../components/CustomizeSheet";

export default function Index() {
  // control bottom sheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [bgColor, setBgColor] = useState("white");
  const [textColor, setTextColor] = useState("black");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemeSetting();
  }, []);

  const loadThemeSetting = async () => {
    try {
      const savedBgColor = await AsyncStorage.getItem("bg_color");
      const savedTextColor = await AsyncStorage.getItem("text_color");
      if (savedBgColor) setBgColor(savedBgColor);
      if (savedTextColor) setTextColor(savedTextColor);
    } catch (error) {
      if (__DEV__) {
        console.log("Error loading theme setting: ", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onBgColorChange = async (color: string) => {
    try {
      await AsyncStorage.setItem("bg_color", color);
      setBgColor(color);
    } catch (error) {
      if (__DEV__) {
        console.log("Failed to save background color:", error);
      }
    }
  };

  const onTextColorChange = async (color: string) => {
    try {
      await AsyncStorage.setItem("text_color", color);
      setTextColor(color);
    } catch (error) {
      if (__DEV__) {
        console.log("Failed to save text color:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl">Loading...</Text>
        <ActivityIndicator size="large" className="mt-10"></ActivityIndicator>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      {/* wraps screen to enable modals */}
      <BottomSheetModalProvider>
        <View className="flex-1">
          {/* header */}
          <View className="items-center justify-center p-10">
            <Text className="text-4xl font-bold">Daily Horoscope</Text>
            <Text className="text-2xl mt-3">Zodiac</Text>
          </View>
          {/* main content */}
          <View className="flex-1 border-8">
            {/* widget */}
            {/* using my-auto will take up the whole vertical space */}
            <View
              className="w-40 h-40 self-center my-auto border items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              <Text className="" style={{color: textColor}}>Test Widget</Text>
            </View>

            {/* customize button */}
            <View className="p-5">
              <TouchableOpacity
                className="border rounded-xl self-start p-3.5"
                onPress={() => bottomSheetRef.current?.present()}
              >
                <Text>Customize ⚙️</Text>
              </TouchableOpacity>
            </View>

            {/* bottom sheet */}
            <CustomizeSheet
              ref={bottomSheetRef}
              onBgColorChange={onBgColorChange}
              onTextColorChange={onTextColorChange}
              bgColor={bgColor}
              textColor={textColor}
            />
          </View>
          {/* end of main content */}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
