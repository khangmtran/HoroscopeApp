"use no memo";
import React from "react";
import { FlexWidget, TextWidget } from "react-native-android-widget";

interface MainWidgetProps {
  horoscopeText?: string;
  bgColor?: string;
  textColor?: string;
  textFont?: string;
  widgetSize?: "small" | "medium" | "large";
}

export function MainWidget({
  horoscopeText = "Loading...",
  bgColor = "#000000",
  textColor = "#FFFFFF",
  textFont = "Inter",
  widgetSize = "medium",
}: MainWidgetProps) {
  // Calculate font size based on text length and widget size
  const getFontSize = () => {
    const textLength = horoscopeText.length;

    if (widgetSize === "small") {
      if (textLength < 100) return 15;
      if (textLength < 200) return 14;
      if (textLength < 300) return 13;
      return 12;
    }

    if (widgetSize === "medium") {
      if (textLength < 100) return 17;
      if (textLength < 200) return 16;
      if (textLength < 300) return 15;
      return 14;
    }

    // large
    if (textLength < 100) return 19;
    if (textLength < 200) return 18;
    if (textLength < 300) return 17;
    return 16;
  };

  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor as any,
        borderRadius: 16,
        padding: 10,
      }}
    >
      <TextWidget
        text={horoscopeText}
        style={{
          fontSize: getFontSize(),
          fontFamily: textFont,
          color: textColor as any,
          textAlign: "center",
        }}
      />
    </FlexWidget>
  );
}
