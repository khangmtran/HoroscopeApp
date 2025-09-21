import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomizeSheet from "../components/CustomizeSheet";
import WidgetPreview from "../components/WidgetPreview";
import { useTheme } from "../contexts/themeContext";

export default function Index() {
  // control bottom sheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { theme, setTheme } = useTheme();
  const [horoscope, setHoroscope] = useState("Loading...");
  const [widgetSize, setWidgetSize] = useState<"small" | "medium" | "large">(
    "small"
  );
  const [currentFont, setCurrentFont] = useState(20)
  useEffect(() => {
    switch (widgetSize) {
      case "small":
        setCurrentFont(20);
        break;
      case "medium":
        setCurrentFont(25);
        break;
      case "large":
        setCurrentFont(30);
        break;
    }
  }, [widgetSize]);

  function stripDate(raw: string) {
    if (!raw) return raw;
    //find the index of the first '-'
    const dashIndex = raw.indexOf("-");
    if (dashIndex !== -1) {
      return raw.substring(dashIndex + 1).trim();
    }
    return raw;
  }

  useEffect(() => {
    const fetchHoroscope = async () => {
      const options = {
        method: "GET",
        url: "https://the-numerology-api.p.rapidapi.com/horoscope/today",
        params: { dob: "2001-07-14" },
        headers: {
          "x-rapidapi-key":
            "7c287f10cdmsh97eddefee96db57p13c3f7jsnb07ec911fecb",
          "x-rapidapi-host": "the-numerology-api.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        // if (__DEV__) {
        //   console.log(response.data.horoscope);
        // }
        const raw = response.data.horoscope || "";
        const horoscopeOnly = stripDate(raw);
        setHoroscope(horoscopeOnly || "No data found");
      } catch (error) {
        console.error(error);
        setHoroscope("Failed to load");
      }
    };

    fetchHoroscope();
  }, []);

  return (
    <GestureHandlerRootView>
      {/* wraps screen to enable modals */}
      <BottomSheetModalProvider>
        <View className="flex-1">
          {/* header */}
          <View className="flex-row justify-around p-5">
            <TouchableOpacity
              className="border rounded-xl p-3"
              onPress={() => setWidgetSize("small")}
            >
              <Text>Small</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border rounded-xl p-3"
              onPress={() => setWidgetSize("medium")}
            >
              <Text>Medium</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border rounded-xl p-3"
              onPress={() => setWidgetSize("large")}
            >
              <Text>Large</Text>
            </TouchableOpacity>
          </View>
          <View className="items-center justify-center p-10">
            <Text className="text-3xl font-bold">Daily Horoscope</Text>
            <Text className="text-2xl mt-3">Zodiac</Text>
          </View>
          {/* main content */}
          <View className="flex-1 ">
            {/* widget */}
            {/* using my-auto will take up the whole vertical space */}
            <WidgetPreview
              size={widgetSize}
              style={{
                backgroundColor: theme.bgColor,
                alignSelf: "center",
                margin: "auto",
              }}
            >
              <Text
                style={{
                  fontSize: currentFont,
                  color: theme.textColor,
                  fontFamily: theme.textFont,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
                onTextLayout={(e) => {
                  const { lines } = e.nativeEvent;

                  // calculate total text height
                  const textHeight = lines.reduce(
                    (acc, line) => acc + line.height,
                    0
                  );

                  const iosSizes: Record<
                    "small" | "medium" | "large",
                    { w: number; h: number }
                  > = {
                    small: { w: 155, h: 155 },
                    medium: { w: 329, h: 155 },
                    large: { w: 329, h: 345 },
                  };
                  const scale = Dimensions.get("window").width / 375;
                  const containerHeight = iosSizes[widgetSize].h * scale - 20;

                  console.log("*********** tH: " + textHeight)
                  console.log("*********** cH: " + containerHeight)

                  if (textHeight > containerHeight) {
                    setCurrentFont(currentFont - 0.5); // shrink gradually
                    console.log("Font decreased to: " + (currentFont - 0.5));
                  }
                }}
              >
                You're ready to soar like a bird, Cancer. When the next gust of
                wind comes up, you'll take flight and send your beautiful
                presence all over the world. Try not to spread yourself too
                thin, but feel free to soar to every corner of the field.
                There's an expansive feeling in the air today that gives a boost
                to your emotions.
              </Text>
            </WidgetPreview>

            {/* customize button */}
            <View className="p-5">
              <TouchableOpacity
                className="border rounded-xl self-start p-3.5"
                onPress={() => bottomSheetRef.current?.present()}
              >
                <Text>Customize ⚙️</Text>
              </TouchableOpacity>
            </View>

            {/* bottom sheet */}
            <CustomizeSheet ref={bottomSheetRef} />
          </View>
          {/* end of main content */}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
