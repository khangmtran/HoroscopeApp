import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import oc from "open-color";
import React, { forwardRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ColorModalProps = {
  selectedModal: string | null;
};

const ColorModal = forwardRef<BottomSheetModal, ColorModalProps>(
  (props, ref) => {
    const { selectedModal } = props;
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
    return (
      <BottomSheetModal ref={ref} snapPoints={["40%", "70%"]} index={1}>
        <BottomSheetView className="py-5 px-10">
          <Text className="self-center text-3xl font-bold mb-5">
            {selectedModal}
          </Text>
          <View className="flex-row flex-wrap gap-1.5">
            {colorPalette.map((color, index) => (
              <TouchableOpacity
                key={index}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: color }}
              ></TouchableOpacity>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default ColorModal;

const styles = StyleSheet.create({});
