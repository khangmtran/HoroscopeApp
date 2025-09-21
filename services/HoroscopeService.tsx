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
    dob: string = "2001-07-14"
  ): Promise<string> {
    const options = {
      method: "GET",
      url: "https://the-numerology-api.p.rapidapi.com/horoscope/today",
      params: { dob },
      headers: {
        "x-rapidapi-key": "7c287f10cdmsh97eddefee96db57p13c3f7jsnb07ec911fecb",
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
        console.error("Failed to fetch horoscope:", error);
      }
      throw new Error("Failed to load horoscope");
    }
  }
}

export default HoroscopeService;
