import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomSheetModal, BottomSheetSectionList } from "@gorhom/bottom-sheet";
import React, { forwardRef, useRef, useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import ColorModal from "./CusSheetComponents/ColorModal";
import FontModal from "./CusSheetComponents/FontModal";
import TopicModal from "./CusSheetComponents/TopicModal";
import WidgetSelector from "./CusSheetComponents/WidgetSelector";

type SectionItem = string;
type Section = {
  title: string;
  data: SectionItem[];
};

const CustomizeSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const { theme } = useTheme();
  const colorModalRef = useRef<BottomSheetModal>(null);
  const fontModalRef = useRef<BottomSheetModal>(null);
  const topicModalRef = useRef<BottomSheetModal>(null);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  // Snap points for the bottom sheet
  const sections: Section[] = [
    { title: "Appearances", data: ["Background Color", "Text Color", "Font"] },
    { title: "Settings", data: ["Topic"] },
  ];

  const renderRightContent = (item: string) => {
    switch (item) {
      case "Background Color":
        return <FontAwesomeIcon icon={faPalette as IconProp} size={20} />;
      case "Text Color":
        return <FontAwesomeIcon icon={faPalette as IconProp} size={20} />;
      case "Font":
        return (
          <Text className="text-lg font-bold color-blueButton">
            {theme.textFont}
          </Text>
        );
      case "Topic":
        return (
          <Text className="text-lg font-bold color-blueButton">
            {theme.topic}
          </Text>
        );
      default:
        return null;
    }
  };

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View>
      <Text className="text-2xl font-bold mb-1 color-white">
        {section.title}
      </Text>
      <View className="border p-3 rounded-2xl mb-5 bg-white">
        {section.data.map((item, index) => {
          const isLast = index === section.data.length - 1;
          return (
            <React.Fragment key={item}>
              {renderItem({ item, isLast })}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );

  const renderItem = ({
    item,
    isLast,
  }: {
    item: SectionItem;
    isLast?: boolean;
  }) => (
    <View
      className="flex-row justify-between items-center"
      style={{ marginBottom: isLast ? 0 : 20 }}
    >
      <Text className="text-lg font-medium">{item}</Text>
      <Pressable
        onPress={() => {
          if (item === "Background Color" || item === "Text Color") {
            setSelectedModal(item);
            colorModalRef.current?.present();
          } else if (item === "Font") {
            fontModalRef.current?.present();
          } else if (item === "Topic") {
            topicModalRef.current?.present();
          }
        }}
      >
        {renderRightContent(item)}
      </Pressable>
    </View>
  );

  return (
    <>
      <BottomSheetModal
        ref={ref}
        snapPoints={["55%"]}
        index={1}
        backgroundStyle={{ borderRadius: 25, backgroundColor: "#000021" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <ImageBackground
          source={require("../assets/images/bg.png")}
          style={{ flex: 1 }}
          resizeMode="stretch"
        >
          <View className="px-5 flex-1">
            <View className="flex-row justify-end px-3">
              <Pressable
                onPress={() =>
                  ref &&
                  (ref as React.RefObject<BottomSheetModal>).current?.close()
                }
              >
                <Text className="text-xl" style={{ color: "white" }}>
                  X
                </Text>
              </Pressable>
            </View>
            <WidgetSelector />
            <BottomSheetSectionList
              sections={sections}
              keyExtractor={(i: string) => i}
              renderSectionHeader={renderSectionHeader}
              renderItem={() => null}
            />
          </View>
        </ImageBackground>
      </BottomSheetModal>
      <ColorModal ref={colorModalRef} selectedModal={selectedModal} />
      <FontModal ref={fontModalRef} />
      <TopicModal ref={topicModalRef} />
    </>
  );
});

export default CustomizeSheet;
