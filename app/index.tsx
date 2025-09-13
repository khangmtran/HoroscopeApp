import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomizeSheet from "../components/customizesheet";

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openCustomize = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* header */}
        <View style={{ alignItems: "center", justifyContent: "center", padding: 40 }}>
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>Daily Horoscope</Text>
          <Text style={{ fontSize: 24, marginTop: 12 }}>Zodiac</Text>
        </View>

        {/* main content */}
        <View style={{ flex: 1, borderWidth: 2 }}>
          <View
            style={{
              width: 160,
              height: 160,
              alignSelf: "center",
              marginVertical: "auto",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Test Widget</Text>
          </View>

          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 16,
                alignSelf: "flex-start",
              }}
              onPress={openCustomize}
            >
              <Text>Customize ⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* SectionList BottomSheet */}
      <CustomizeSheet ref={bottomSheetRef} />
    </GestureHandlerRootView>
  );
}
