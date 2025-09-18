import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { Pressable, Text } from "react-native";
import { useFont } from "../contexts/fontContext";
import { useTheme } from "../contexts/themeContext";

type FontItem = {
  item: string;
};

const FontModal = forwardRef<BottomSheetModal>((props, ref) => {
  const { fonts } = useFont();
  const { setTheme } = useTheme();

  const renderFontItem = ({ item }: FontItem) => (
    <Pressable
      className="basis-[48%] h-32 items-center justify-center bg-black mb-5"
      onPress={() => {
        setTheme((prev) => ({ ...prev, textFont: item }));
      }}
    >
      <Text
        style={{
          fontFamily: item,
          fontSize: 20,
          color: "white",
          textAlign: "center",
        }}
      >
        {item}
      </Text>
    </Pressable>
  );

  return (
    <BottomSheetModal ref={ref} snapPoints={["75%"]} index={0}>
      <BottomSheetFlatList
        data={fonts}
        keyExtractor={(item: string) => item}
        numColumns={2}
        contentContainerStyle={{ padding: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={renderFontItem}
      />
    </BottomSheetModal>
  );
});

export default FontModal;
