import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React, { forwardRef } from "react";
import {
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type ZodiacItem = {
  name: string;
  date: string;
  icon: ImageSourcePropType;
};

const ZodiacSheet = forwardRef<BottomSheet>((props, ref) => {
  const { theme, setTheme } = useTheme();

  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      snapPoints={["30%", "100%"]}
      index={-1}
      enableDynamicSizing={false}
    >
      <View className="px-7 py-2 flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Choose Your Sign</Text>
        <Pressable
          onPress={() =>
            ref && (ref as React.RefObject<BottomSheet>).current?.close()
          }
        >
          <Text className="text-xl" style={{ color: "gray" }}>
            X
          </Text>
        </Pressable>
      </View>
      <BottomSheetFlatList
        data={ZodiacData}
        keyExtractor={(item: ZodiacItem) => item.name}
        renderItem={({ item }: { item: ZodiacItem }) => (
          <View className="p-5">
            <Pressable
              onPress={() => {
                setTheme((prev) => ({ ...prev, zodiac: item.name }));
                if (__DEV__) {
                  console.log("set zodiac to ", item.name);
                }
              }}
              className="flex-row items-center border rounded-xl py-5"
            >
              <View style={{ width: "15%" }}>
                <Image
                  source={item.icon}
                  style={{ width: 30, height: 30, alignSelf: "center" }}
                />
              </View>
              <View style={{ width: "30%" }}>
                <Text className="text-lg font-medium text-center">
                  {item.name}
                </Text>
              </View>
              <View style={{ width: "45%" }}>
                <Text className="italic text-center">{item.date}</Text>
              </View>
              <View style={{ width: "10%" }}>
                {theme.zodiac === item.name && (
                  <Text className="text-green-600 text-xl font-bold text-center">
                    ✔
                  </Text>
                )}
              </View>
            </Pressable>
          </View>
        )}
      />
    </BottomSheet>
  );
});

export default ZodiacSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

export const ZodiacData = [
  {
    name: "Aquarius",
    date: "January 20 - February 18",
    icon: require("../assets/icons/aquarius.png"),
  },
  {
    name: "Pisces",
    date: "February 19 - March 20",
    icon: require("../assets/icons/pisces.png"),
  },
  {
    name: "Aries",
    date: "March 21 - April 19",
    icon: require("../assets/icons/aries.png"),
  },
  {
    name: "Taurus",
    date: "April 20 - May 20",
    icon: require("../assets/icons/taurus.png"),
  },
  {
    name: "Gemini",
    date: "May 21 - June 20",
    icon: require("../assets/icons/gemini.png"),
  },
  {
    name: "Cancer",
    date: "June 21 - July 22",
    icon: require("../assets/icons/cancer.png"),
  },
  {
    name: "Leo",
    date: "July 23 - August 22",
    icon: require("../assets/icons/leo.png"),
  },
  {
    name: "Virgo",
    date: "August 23 - September 22",
    icon: require("../assets/icons/virgo.png"),
  },
  {
    name: "Libra",
    date: "September 23 - October 22",
    icon: require("../assets/icons/libra.png"),
  },
  {
    name: "Scorpio",
    date: "October 23 - November 21",
    icon: require("../assets/icons/scorpio.png"),
  },
  {
    name: "Sagittarius",
    date: "November 22 - December 21",
    icon: require("../assets/icons/sagittarius.png"),
  },
  {
    name: "Capricorn",
    date: "December 22 - January 19",
    icon: require("../assets/icons/capricorn.png"),
  },
];
