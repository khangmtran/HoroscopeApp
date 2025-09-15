import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomizeSheet from "../components/CustomizeSheet";

export default function Index() {
  // control bottom sheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);
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
            <View className="w-40 h-40 self-center my-auto border items-center justify-center">
              <Text className="">Test Widget</Text>
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
            <CustomizeSheet ref={bottomSheetRef} />
          </View>
          {/* end of main content */}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
