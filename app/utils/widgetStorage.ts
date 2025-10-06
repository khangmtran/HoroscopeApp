import { ExtensionStorage } from "@bacons/apple-targets";
import { Platform } from "react-native";

const APP_GROUP = "group.com.knt.HoroscopeApp";

export interface WidgetData {
  bgColor: string;
  textColor: string;
  textFont: string;
  horoscope: string;
}

export class WidgetStorageManager {
  private storage: ExtensionStorage | null = null;

  constructor() {
    if (Platform.OS === 'ios') {
      this.storage = new ExtensionStorage(APP_GROUP);
    }
  }

  // Save horoscope data for the widget
  saveWidgetData(data: WidgetData) {
    if (!this.storage) return;
    
    this.storage.set('widgetData', {
      bgColor: data.bgColor,
      textColor: data.textColor,
      textFont: data.textFont,
      horoscope: data.horoscope,
    });
    
    ExtensionStorage.reloadWidget();
  }

  clearWidgetData() {
    if (!this.storage) return;
    this.storage.remove('widgetData');
    ExtensionStorage.reloadWidget();
  }
}

export const widgetStorage = new WidgetStorageManager();