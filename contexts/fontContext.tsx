import { createContext, useContext } from "react";
import { useFonts } from "expo-font";

export type FontContextType = {
  fonts: string[];
  fontsLoaded: boolean;
};

const FontContext = createContext<FontContextType | null>(null);

export function useFont(): FontContextType {
  const context = useContext(FontContext);
  if (!context) throw new Error("useFont must be used within FontProvider");
  return context;
}

export const fontNames = [
  "Roboto",
  "OpenSans",
  "FuzzyBubbles",
  "Birthstone",
  "AmaticSC",
  "Caveat",
  "Creepster",
  "DancingScript",
  "Delius",
  "IndieFlower",
  "LobsterTwo",
  "Monoton",
  "Montserrat",
  "Playfair",
  "RougeScript",
  "Sacramento",
  "Sansation",
  "SpecialElite",
  "VT323",
];

// Font provider
export function FontProvider({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    OpenSans: require("../assets/fonts/OpenSans-Regular.ttf"),
    FuzzyBubbles: require("../assets/fonts/FuzzyBubbles-Regular.ttf"),
    Birthstone: require("../assets/fonts/Birthstone-Regular.ttf"),
    AmaticSC: require("../assets/fonts/AmaticSC-Regular.ttf"),
    Caveat: require("../assets/fonts/Caveat-Regular.ttf"),
    Creepster: require("../assets/fonts/Creepster-Regular.ttf"),
    DancingScript: require("../assets/fonts/DancingScript-Regular.ttf"),
    Delius: require("../assets/fonts/Delius-Regular.ttf"),
    IndieFlower: require("../assets/fonts/IndieFlower-Regular.ttf"),
    LobsterTwo: require("../assets/fonts/LobsterTwo-Regular.ttf"),
    Monoton: require("../assets/fonts/Monoton-Regular.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    Playfair: require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    RougeScript: require("../assets/fonts/RougeScript-Regular.ttf"),
    Sacramento: require("../assets/fonts/Sacramento-Regular.ttf"),
    Sansation: require("../assets/fonts/Sansation-Regular.ttf"),
    SpecialElite: require("../assets/fonts/SpecialElite-Regular.ttf"),
    VT323: require("../assets/fonts/VT323-Regular.ttf"),
  });

  return (
    <FontContext.Provider value={{ fonts: fontNames, fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
}
