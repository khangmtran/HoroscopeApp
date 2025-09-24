import { BottomSheetModal, BottomSheetSectionList } from "@gorhom/bottom-sheet";
import React, { forwardRef, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ColorModal from "./ColorModal";
import WidgetSelector from "./CusSheetComponents/WidgetSelector";
import FontModal from "./FontModal";
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTheme } from "../contexts/ThemeContext";

type SectionItem = string;
type Section = {
  title: string;
  data: SectionItem[];
};

const CustomizeSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const { theme } = useTheme();
  const colorModalRef = useRef<BottomSheetModal>(null);
  const fontModalRef = useRef<BottomSheetModal>(null);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  // Snap points for the bottom sheet
  const snapPoints = ["40%", "70%"];
  const sections: Section[] = [
    { title: "Appearance", data: ["Background Color", "Text Color", "Font"] },
  ];

  const renderRightContent = (item: string) => {
  switch (item) {
    case "Background Color":
    case "Text Color":
      return <FontAwesomeIcon icon={faPalette as IconProp} color="white" />;
    case "Font":
      return <Text style={{ color: "white"}}>{theme.textFont}</Text>;
    default:
      return null;
  }
};

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View>
      <Text className="text-2xl font-bold mb-1" style={{ color: "white" }}>
        {section.title}
      </Text>
      <View
        className="border p-3 rounded-xl"
        style={{ backgroundColor: "#333333" }}
      >
        {section.data.map((item) => renderItem({ item }))}
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: SectionItem }) => (
    <View className="flex-row justify-between items-center mb-2">
      <Text className="text-lg" style={{ color: "white" }}>
        {item}
      </Text>
      <TouchableOpacity
        onPress={() => {
          // Open Color Modal when data is bgC or txtC
          if (item === "Background Color" || item === "Text Color") {
            setSelectedModal(item);
            colorModalRef.current?.present();
          } else if (item === "Font") {
            fontModalRef.current?.present();
          }
        }}
      >
        {renderRightContent(item)}
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={1}
        backgroundStyle={{ borderRadius: 25, backgroundColor: "black" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <View className="px-10 py-2">
          <WidgetSelector />
          <BottomSheetSectionList
            sections={sections}
            keyExtractor={(i: string) => i}
            renderSectionHeader={renderSectionHeader}
            renderItem={() => null}
            className="my-5"
          />
        </View>
      </BottomSheetModal>
      <ColorModal ref={colorModalRef} selectedModal={selectedModal} />
      <FontModal ref={fontModalRef} />
    </>
  );
});

export default CustomizeSheet;
