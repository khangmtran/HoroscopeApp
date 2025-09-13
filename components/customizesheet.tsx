import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetSectionList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Types
type SectionItem = string;
type SectionType = {
  title: string;
  data: SectionItem[];
};

// Forward ref to control SectionList scroll if needed
const CustomizeSheet = forwardRef<BottomSheet>((props, ref) => {
  const modalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["40%", "70%"], []);

  const sections: SectionType[] = useMemo(
    () => [
      { title: "Appearance", data: ["Background Color", "Text Color"] },
      { title: "Widgets", data: ["Add Horoscope", "Add Calendar"] },
    ],
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: SectionItem }) => (
      <Pressable
        style={styles.item}
        onPress={() => modalRef.current?.present()}
      >
        <Text style={styles.itemText}>{item}</Text>
      </Pressable>
    ),
    []
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionType }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    ),
    []
  );

  return (
    <>
      <BottomSheet
        ref={ref as React.Ref<BottomSheet>} // type cast for forwardRef
        index={-1}
        snapPoints={snapPoints}
      >
        <BottomSheetSectionList
          sections={sections}
          keyExtractor={(i: string, index: number) => i + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.content}
        />
      </BottomSheet>

      {/* Modal for individual section items */}
      <BottomSheetModalProvider>
        <BottomSheetModal ref={modalRef} snapPoints={["50%", "80%"]}>
          <BottomSheetView style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Customize Option 🎨
            </Text>
            <Text style={{ marginTop: 10 }}>
              Here you can put color pickers, sliders, toggles, etc.
            </Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
});

const styles = StyleSheet.create({
  content: { backgroundColor: "white" },
  sectionHeader: { backgroundColor: "#f2f2f2", padding: 8 },
  sectionHeaderText: { fontSize: 16, fontWeight: "600" },
  item: {
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  itemText: { fontSize: 15 },
  modalContent: { flex: 1, alignItems: "center", padding: 20 },
});

export default CustomizeSheet;
