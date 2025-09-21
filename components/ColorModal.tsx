import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import oc from "open-color";
import React, { forwardRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type ColorModalProps = {
  selectedModal: string | null;
};

const ColorModal = forwardRef<BottomSheetModal, ColorModalProps>(
  (props, ref) => {
    const { selectedModal } = props;
    const { theme, setTheme } = useTheme();
    const colorPalette = [
      "white",
      ...oc.gray,
      "black",
      ...oc.red,
      ...oc.pink,
      ...oc.grape,
      ...oc.violet,
      ...oc.indigo,
      ...oc.blue,
      ...oc.cyan,
      ...oc.teal,
      ...oc.green,
      ...oc.lime,
      ...oc.yellow,
      ...oc.orange,
    ];

    const handleColorPress = (color: string) => {
      if (selectedModal === "Background Color") {
        if (__DEV__) {
          console.log("bg change");
        }
        setTheme((prev) => ({ ...prev, bgColor: color }));
      }
      if (selectedModal === "Text Color") {
        if (__DEV__) {
          console.log("text change");
        }
        setTheme((prev) => ({ ...prev, textColor: color }));
      }
    };

    return (
      <BottomSheetModal ref={ref} snapPoints={["75%"]} index={1}>
        <BottomSheetView className="py-5 px-10">
          <Text className="self-center text-3xl font-bold mb-5">
            {selectedModal}
          </Text>
          {/* color palette */}
          <View className="flex-row flex-wrap gap-1.5">
            {colorPalette.map((color, index) => (
              <TouchableOpacity
                key={index}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: color }}
                onPress={() => handleColorPress(color)}
              ></TouchableOpacity>
            ))}
          </View>

          {/* widget preview */}
          <View>
            <Text className="self-center text-2xl font-bold my-5">Preview</Text>
            <View
              className="w-40 h-40 self-center border items-center justify-center mb-5"
              style={{ backgroundColor: theme.bgColor }}
            >
              <Text
                style={{ color: theme.textColor, fontFamily: theme.textFont }}
              >
                Preview
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default ColorModal;

const styles = StyleSheet.create({});
