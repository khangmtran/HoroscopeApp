import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import oc from "open-color";
import React, { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

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
      <BottomSheetModal
        ref={ref}
        snapPoints={["30%","75%"]}
        index={1}
        enableDynamicSizing={false}
      >
        <View className="flex-row px-7 mb-5">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold">{selectedModal}</Text>
          </View>

          <Pressable
            onPress={() =>
              ref && (ref as React.RefObject<BottomSheetModal>).current?.close()
            }
          >
            <Text className="text-xl" style={{ color: "gray" }}>
              X
            </Text>
          </Pressable>
        </View>
        {/* color palette */}
        <BottomSheetFlatList
          data={colorPalette}
          keyExtractor={(item: string, index: number) => `${item}-${index}`}
          numColumns={12}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 15,
          }}
          renderItem={({ item }: { item: string }) => (
            <Pressable
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: item, margin: 5 }}
              onPress={() => handleColorPress(item)}
            />
          )}
        />

        {/* widget preview */}
        <View className="p-5">
          <Text className="self-center text-2xl font-bold my-5">Preview</Text>
          <View
            className="w-40 h-40 self-center border items-center justify-center"
            style={{ backgroundColor: theme.bgColor }}
          >
            <Text
              style={{ color: theme.textColor, fontFamily: theme.textFont }}
            >
              Preview
            </Text>
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

export default ColorModal;

const styles = StyleSheet.create({});
