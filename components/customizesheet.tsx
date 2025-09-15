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
  const bgModalRef = useRef<BottomSheetModal>(null);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ["40%", "70%"], []);
  const sections: Section[] = useMemo(
    () => [{ title: "Appearance", data: ["Background Color", "Text Color"] }],
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
            setSelectedModal(item);
            bgModalRef.current?.present();
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

      <ColorModal ref={bgModalRef} selectedModal={selectedModal} />
    </>
  );
});

export default CustomizeSheet;
