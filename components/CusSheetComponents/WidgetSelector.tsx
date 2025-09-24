import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const WidgetSelector = () => {
  const { theme, setTheme } = useTheme();
  const handlePress = (size: "small" | "medium" | "large") => {
    setTheme((prev) => ({ ...prev, widgetSize: size }));
    if (__DEV__) {
      console.log(`set ${size} widget`);
    }
  };
  return (
    <View>
      <Text className="text-2xl font-bold mb-1" style={{ color: "white" }}>
        Widget Sizes
      </Text>
      <View
        className="flex-row justify-between p-2 border rounded-xl"
        style={{ backgroundColor: "#333333" }}
      >
        <Pressable onPress={() => handlePress("small")}>
          <Text
            className="text-base border rounded-lg p-2 font-bold"
            style={{
              backgroundColor:
                theme.widgetSize === "small" ? "white" : "#8a8a8a",
            }}
          >
            Small
          </Text>
        </Pressable>

        <Pressable onPress={() => handlePress("medium")}>
          <Text
            className="text-base border rounded-lg p-2 font-bold"
            style={{
              backgroundColor:
                theme.widgetSize === "medium" ? "white" : "#8a8a8a",
            }}
          >
            Medium
          </Text>
        </Pressable>

        <Pressable onPress={() => handlePress("large")}>
          <Text
            className="text-base border rounded-lg p-2 font-bold"
            style={{
              backgroundColor:
                theme.widgetSize === "large" ? "white" : "#8a8a8a",
            }}
          >
            Large
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WidgetSelector;
