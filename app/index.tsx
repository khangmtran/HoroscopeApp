import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomizeSheet from "../components/CustomizeSheet";
import WidgetPreview from "../components/WidgetPreview";
import { useTheme } from "../contexts/themeContext";

export default function Index() {
  // control bottom sheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { theme, setTheme } = useTheme();
  const [horoscope, setHoroscope] = useState("Loading...");

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
        if (__DEV__) {
          console.log(response.data.horoscope);
        }
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
          <View className="items-center justify-center p-10">
            <Text className="text-3xl font-bold">Daily Horoscope</Text>
            <Text className="text-2xl mt-3">Zodiac</Text>
          </View>
          {/* main content */}
          <View className="flex-1 ">
            {/* widget */}
            {/* using my-auto will take up the whole vertical space */}
            <WidgetPreview
              size="medium"
              style={{
                backgroundColor: theme.bgColor,
                alignSelf: "center",
                margin: "auto",
              }}
            >
                <AutoSizeText
                  fontSize={20}
                  numberOfLines={1000}
                  mode={ResizeTextMode.max_lines}
                  style={{
                    color: theme.textColor,
                    fontFamily: theme.textFont,
                    textAlign: "center",
                    //includeFontPadding: false,
                    textAlignVertical: "center",
                  }}
                >
                  {horoscope}
                </AutoSizeText>
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
