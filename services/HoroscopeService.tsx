import axios from "axios";

class HoroscopeService {
  private static stripDate(raw: string): string {
    if (!raw) return raw;

    // Find the index of the first '-'
    const dashIndex = raw.indexOf("-");
    if (dashIndex !== -1) {
      return raw.substring(dashIndex + 1).trim();
    }
    return raw;
  }

  static async fetchDailyHoroscope(
    dob: string = "2025-01-20",
    topic: string = "general"
  ): Promise<string> {
    const normalizedTopic = topic.toLowerCase();
    const url =
      normalizedTopic === "general"
        ? "https://the-numerology-api.p.rapidapi.com/horoscope/today"
        : `https://the-numerology-api.p.rapidapi.com/horoscope/${normalizedTopic}/today`;
    const apiKey = process.env.EXPO_PUBLIC_RAPIDAPI_KEY;
    if (!apiKey) {
      throw new Error("API key not found. Set EXPO_PUBLIC_RAPIDAPI_KEY in .env file");
    }
    const options = {
      method: "GET",
      url,
      params: { dob },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "the-numerology-api.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const raw = response.data.horoscope || "";
      const horoscopeOnly = this.stripDate(raw);
      return horoscopeOnly || "No data found";
    } catch (error) {
      if (__DEV__) {
        console.error(`Failed to fetch topic ${topic}:`, error);
      }
      throw new Error(`Failed to load topic ${topic}`);
    }
  }
}

export default HoroscopeService;
