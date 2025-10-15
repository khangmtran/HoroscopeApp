import WidgetKit
import SwiftUI

struct WidgetData: Codable {
  let bgColor: String
  let textColor: String
  let textFont: String
  let horoscope: String
  
  // Default values if data can't be loaded
  static let `default` = WidgetData(
    bgColor: "#000000",
    textColor: "#FFFFFF",
    textFont: "system",
    horoscope: "Open the app to see your horoscope"
  )
}

// Read from App Group
func loadWidgetData() -> WidgetData {
  let appGroupID = "group.com.knt.HoroscopeApp"
  
  guard let userDefaults = UserDefaults(suiteName: appGroupID) else {
    return WidgetData.default
  }
  
  guard let jsonString = userDefaults.string(forKey: "widgetData") else {
    return WidgetData.default
  }
  
  print("✅ Found data: \(jsonString)")
  
  guard let jsonData = jsonString.data(using: .utf8) else {
    return WidgetData.default
  }
  
  do {
    let decoder = JSONDecoder()
    let widgetData = try decoder.decode(WidgetData.self, from: jsonData)
    return widgetData
  } catch {
    return WidgetData.default
  }
}

import SwiftUI

extension Color {
    init(hex: String) {
        let scanner = Scanner(string: hex)
        _ = scanner.scanString("#")

        var rgb: UInt64 = 0
        scanner.scanHexInt64(&rgb)

        let red = Double((rgb >> 16) & 0xFF) / 255.0
        let green = Double((rgb >> 8) & 0xFF) / 255.0
        let blue = Double(rgb & 0xFF) / 255.0

        self.init(red: red, green: green, blue: blue)
    }
}

struct Provider: AppIntentTimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(
      date: Date(),
      configuration: ConfigurationAppIntent(),
      widgetData: WidgetData.default
    )
  }
  
  func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
    let widgetData = loadWidgetData()
    return SimpleEntry(
      date: Date(),
      configuration: configuration,
      widgetData: widgetData
    )
  }
  
  func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
    var entries: [SimpleEntry] = []
    
    // Load widget data once
    let widgetData = loadWidgetData()
    
    // Generate a timeline consisting of five entries an hour apart, starting from the current date.
    let currentDate = Date()
    for hourOffset in 0 ..< 5 {
      let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
      let entry = SimpleEntry(
        date: entryDate,
        configuration: configuration,
        widgetData: widgetData  // ADD widgetData to each entry
      )
      entries.append(entry)
    }
    
    return Timeline(entries: entries, policy: .atEnd)
  }
  
  //    func relevances() async -> WidgetRelevances<ConfigurationAppIntent> {
  //        // Generate a list containing the contexts this widget is relevant in.
  //    }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
  let configuration: ConfigurationAppIntent
  let widgetData: WidgetData
}

struct widgetEntryView : View {
  var entry: Provider.Entry
  init(entry: Provider.Entry) {
    self.entry = entry
    
    //test
    // Print all available fonts
    for family in UIFont.familyNames.sorted() {
      print("Font Family: \(family)")
      for name in UIFont.fontNames(forFamilyName: family) {
        print("  - \(name)")
      }
    }
  }
  var body: some View {
      VStack {
        Text(entry.widgetData.horoscope)
        .font(getFontForFamily(entry.widgetData.textFont))
        .foregroundStyle(Color(hex: entry.widgetData.textColor))
        .multilineTextAlignment(.center)
        .minimumScaleFactor(0.5)
      }
      .frame(maxWidth: .infinity, maxHeight: .infinity)
  }
  
  // Helper function to map font family names
  private func getFontForFamily(_ fontFamily: String) -> Font {
    switch fontFamily.lowercased() {
    case "system":
      return .system(size: 20, weight: .regular)
    case "roboto":
      return .custom("Roboto-Regular", size: 20)
    case "opensans":
      return .custom("OpenSans-Regular", size: 20)
    case "fuzzybubbles":
      return .custom("FuzzyBubbles-Regular", size: 20)
    case "creepster":
      return .custom("Creepster-Regular", size: 20)
    case "delius":
      return .custom("Delius-Regular", size: 20)
    case "indieflower":
      return .custom("IndieFlower-Regular", size: 20)
    case "lobstertwo":
      return .custom("LobsterTwo-Regular", size: 20)
    case "monoton":
      return .custom("Monoton-Regular", size: 20)
    case "montserrat":
      return .custom("Montserrat-Regular", size: 20)
    case "playfair", "playfairdisplay":
      return .custom("PlayfairDisplay-Regular", size: 20)
    case "sansation":
      return .custom("Sansation-Regular", size: 20)
    case "specialelite":
      return .custom("SpecialElite-Regular", size: 20)
    case "vt323":
      return .custom("VT323-Regular", size: 20)
    default:
      return .system(size: 20, weight: .regular)
    }
    //test
    if UIFont(name: fontName, size: 20) != nil {
    return .custom(fontName, size: 20)
  } else {
    print("⚠️ Font '\(fontName)' not found! Falling back to system font.")
    return .system(size: 20, weight: .regular)
  }
  }
}

struct widget: Widget {
  let kind: String = "widget"
  
  var body: some WidgetConfiguration {
    AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
      widgetEntryView(entry: entry)
        .containerBackground(for: .widget) {
          Color(hex: entry.widgetData.bgColor)
        }
    }
  }
}

extension ConfigurationAppIntent {
  fileprivate static var smiley: ConfigurationAppIntent {
    let intent = ConfigurationAppIntent()
    intent.favoriteEmoji = "😀"
    return intent
  }
  
  fileprivate static var starEyes: ConfigurationAppIntent {
    let intent = ConfigurationAppIntent()
    intent.favoriteEmoji = "🤩"
    return intent
  }
}

#Preview(as: .systemSmall) {
  widget()
} timeline: {
  SimpleEntry(date: .now, configuration: .smiley, widgetData: WidgetData.default)
  SimpleEntry(date: .now, configuration: .starEyes, widgetData: WidgetData.default)
}
