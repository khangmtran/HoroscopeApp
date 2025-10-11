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
    print("❌ Failed to create UserDefaults with App Group")
    return WidgetData.default
  }
  
  guard let jsonString = userDefaults.string(forKey: "widgetData") else {
    print("❌ No data found for key 'widgetData'")
    return WidgetData.default
  }
  
  print("✅ Found data: \(jsonString)")
  
  guard let jsonData = jsonString.data(using: .utf8) else {
    print("❌ Failed to convert string to data")
    return WidgetData.default
  }
  
  do {
    let decoder = JSONDecoder()
    let widgetData = try decoder.decode(WidgetData.self, from: jsonData)
    print("✅ Successfully decoded widget data")
    print("   - Horoscope: \(widgetData.horoscope)")
    print("   - BgColor: \(widgetData.bgColor)")
    return widgetData
  } catch {
    print("❌ Failed to decode: \(error)")
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
    case "arial":
      return .custom("Arial", size: 20)
    case "helvetica":
      return .custom("Helvetica", size: 20)
    case "times new roman", "times":
      return .custom("Times New Roman", size: 20)
    case "courier", "courier new":
      return .custom("Courier New", size: 20)
    case "georgia":
      return .custom("Georgia", size: 20)
    case "verdana":
      return .custom("Verdana", size: 20)
    default:
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
