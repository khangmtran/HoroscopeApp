import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";

type WidgetSize = "small" | "medium" | "large";

interface WidgetPreviewProps {
  size?: WidgetSize;
  children: React.ReactNode;
  style?: object;
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  size = "medium",
  children,
  style = {},
}) => {
  const { width: screenWidth } = Dimensions.get("window");

  // iOS WidgetKit default sizes (points)
  const iosSizes: Record<WidgetSize, { w: number; h: number }> = {
    small: { w: 155, h: 155 },
    medium: { w: 329, h: 155 },
    large: { w: 329, h: 345 },
  };

  const baseSize = iosSizes[size];

  // Scale to device width
  const scale = screenWidth / 375; // baseline iPhone width
  const width = baseSize.w * scale;
  const height = baseSize.h * scale;

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default WidgetPreview;
