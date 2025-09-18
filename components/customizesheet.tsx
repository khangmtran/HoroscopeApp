import { BottomSheetModal, BottomSheetSectionList } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ColorModal from "./ColorModal";

type SectionItem = string;
type Section = {
  title: string;
  data: SectionItem[];
};

const CustomizeSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const colorModalRef = useRef<BottomSheetModal>(null);
  const fontModalRef = useRef<BottomSheetModal>(null);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ["40%", "70%"], []);
  const sections: Section[] = useMemo(
    () => [
      { title: "Appearance", data: ["Background Color", "Text Color", "Font"] },
    ],
    []
  );
  const renderSectionHeader = useCallback(
    ({ section }: { section: Section }) => (
      <View className="mb-3">
        <Text className="text-3xl font-bold">{section.title}</Text>
      </View>
    ),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: SectionItem }) => (
      <View className="flex-row justify-between py-3">
        <Text className="text-lg">{item}</Text>
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
          <Text>O</Text>
        </TouchableOpacity>
      </View>
    ),
    []
  );

  return (
    <>
      <BottomSheetModal ref={ref} snapPoints={snapPoints} index={1}>
        <BottomSheetSectionList
          sections={sections}
          keyExtractor={(i: string) => i}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          className="py-5 px-10"
        />
      </BottomSheetModal>

      <ColorModal ref={colorModalRef} selectedModal={selectedModal} />
    </>
  );
});

export default CustomizeSheet;
