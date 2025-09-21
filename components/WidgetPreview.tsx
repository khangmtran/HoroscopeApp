import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { useHoroscope } from "../contexts/HoroscopeContext";
import { useTheme } from "../contexts/ThemeContext";

type WidgetSize = "small" | "medium" | "large";

interface WidgetPreviewProps {
  size?: WidgetSize;
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({ size = "medium" }) => {
  const { theme } = useTheme();
  const [currentFont, setCurrentFont] = useState(20);
  const [isAdjustingFont, setIsAdjustingFont] = useState(false);
  const { width: screenWidth } = Dimensions.get("window");
  const { horoscope } = useHoroscope();
  const horoscopeText = horoscope.error || horoscope.data || "Loading...";

  // iOS WidgetKit default sizes (points)
  const iosSizes: Record<WidgetSize, { w: number; h: number }> = {
    small: { w: 155, h: 155 },
    medium: { w: 329, h: 155 },
    large: { w: 329, h: 345 },
  };

  useEffect(() => {
    switch (size) {
      case "small":
        setCurrentFont(40);
        break;
      case "medium":
        setCurrentFont(50);
        break;
      case "large":
        setCurrentFont(60);
        break;
    }
  }, [size]);

  const baseSize = iosSizes[size];
  // Scale to device width
  const scale = screenWidth / 375; // baseline iPhone width
  const width = baseSize.w * scale;
  const height = baseSize.h * scale;

  const handleTextLayout = (e: any) => {
    const { lines } = e.nativeEvent;

    // Calculate total text height
    const textHeight = lines.reduce(
      (acc: number, line: any) => acc + line.height,
      0
    );

    const containerHeight = iosSizes[size].h * scale - 20;

    if (textHeight > containerHeight) {
      setIsAdjustingFont(true);
      setCurrentFont(currentFont - 1); // shrink gradually
      if (__DEV__) {
        console.log("Font decreased to: " + (currentFont - 1));
      }
    } else {
      setIsAdjustingFont(false);
    }
  };

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: 16,
          backgroundColor: theme.bgColor,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          alignSelf: "center",
          margin: "auto",
        },
      ]}
    >
      <Text
        style={{
          fontSize: currentFont,
          color: theme.textColor,
          fontFamily: theme.textFont,
          textAlign: "center",
          textAlignVertical: "center",
          opacity: isAdjustingFont ? 0 : 1,
        }}
        onTextLayout={handleTextLayout}
      >
        {horoscopeText}
      </Text>
    </View>
  );
};

export default WidgetPreview;
