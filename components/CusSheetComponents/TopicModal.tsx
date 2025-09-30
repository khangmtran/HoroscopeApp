import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

type Topic = {
  name: string;
};

const topics: Topic[] = [
  { name: "General" },
  { name: "Love" },
  { name: "Health" },
  { name: "Career" },
];

const TopicModal = forwardRef<BottomSheetModal>((props, ref) => {
  const { theme, setTheme } = useTheme();

  const renderTopicItem = ({ item }: { item: Topic }) => {
    return (
      <Pressable
        onPress={() => setTheme((prev) => ({ ...prev, topic: item.name }))}
      >
        <View
          className="flex-row justify-between items-center border rounded-2xl p-5 mb-5"
        >
          <Text className="text-lg font-bold">{item.name}</Text>
          {theme.topic === item.name && (
            <Text className="color-green-600 text-xl font-bold">✔</Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <BottomSheetModal ref={ref}>
      <BottomSheetFlatList
        data={topics}
        keyExtractor={(item: Topic) => item.name}
        renderItem={renderTopicItem}
        contentContainerStyle={styles.listContainer}
      />
    </BottomSheetModal>
  );
});

export default TopicModal;

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
});
