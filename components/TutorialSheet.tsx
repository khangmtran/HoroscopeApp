import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { StyleSheet, Text, View } from "react-native";

type Step = {
  id: number;
  text: string;
};

const steps = [
  {
    id: 1,
    text: "Press and Hold on your Home Screen to enter the jiggle mode, then tap on the '+' button at the top right/left corner",
  },
  {
    id: 2,
    text: 'Scroll until you find this app "Daily Horoscope Widget"',
  },
  {
    id: 3,
    text: 'Select widget size and tap on the "Add" button',
  },
  {
    id: 4,
    text: "Open the app daily to allow the widget to synchronize",
  },
];

const TutorialSheet = forwardRef<BottomSheet>((props, ref) => {
  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      snapPoints={["30%", "100%"]}
      index={-1}
      enableDynamicSizing={false}
    >

      <View className="items-center">
        <Text className="text-2xl font-bold my-2">Widget Tutorial</Text>
      </View>

      <BottomSheetFlatList
        data={steps}
        keyExtractor={(item: Step) => item.id.toString()}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
        renderItem={({ item }: { item: Step }) => (
          <View className="items-center">
            <View className="w-14 h-14 rounded-full bg-blue-500 justify-center items-center m-2">
              <Text className="text-white font-bold text-3xl">{item.id}</Text>
            </View>
            <View className="border rounded-xl bg-gray-100 m-2 mx-5">
              <Text className="p-5 text-center text-lg">{item.text}</Text>
            </View>
          </View>
        )}
      />

    </BottomSheet>
  );
});

export default TutorialSheet;

const styles = StyleSheet.create({});
