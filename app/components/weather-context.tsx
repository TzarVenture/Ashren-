"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type WeatherThemeKey = "night" | "morning" | "hot" | "sunny" | "cold" | "rainy" | "snow";
export type WeatherCondition = WeatherThemeKey;

export const BG_THEMES: Record<WeatherThemeKey, string> = {
  night: "/background-night-mobile.png",
  morning: "/background-morning-mobile.png",
  hot: "/background-mobile.png",
  sunny: "/background-sunny-mobile.png",
  cold: "/background-cold-mobile.png",
  rainy: "/background-rainy-mobile.png",
  snow: "/background-snow-mobile.png",
};

export const THEME_LABELS: Record<WeatherThemeKey, string> = {
  night: "Night",
  morning: "Morning",
  hot: "Very Hot",
  sunny: "Sunny & Pleasant",
  cold: "Cold",
  rainy: "Rainy",
  snow: "Snowy",
};

function checkIsNight(): boolean {
  const h = new Date().getHours();
  return h >= 18 || h < 6;
}

interface WeatherContextType {
  temperature: number | null;
  weatherCode: number | null;
  condition: WeatherThemeKey;
  conditionLabel: string;
  isNight: boolean;
  city: string;
  country: string;
  isLoading: boolean;
  error: string | null;
  isOverride: boolean;
  manualOverride: WeatherThemeKey | null;
  bgMobileImage: string;
  bgImage: string;
  googleWeatherUrl: string;
  setManualTheme: (theme: WeatherThemeKey | null) => void;
  refreshWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isNight, setIsNight] = useState(true);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [condition, setCondition] = useState<WeatherThemeKey>("night");
  const [conditionLabel, setConditionLabel] = useState<string>("Night");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [manualOverride, setManualOverride] = useState<WeatherThemeKey | null>(null);

  useEffect(() => {
    setIsClient(true);
    const night = checkIsNight();
    setIsNight(night);
    if (!manualOverride) {
      setCondition(night ? "night" : "morning");
      setConditionLabel(night ? "Night" : "Morning");
    }
  }, [manualOverride]);

  const fetchWeatherForCoords = async (lat: number, lon: number, cityName?: string, countryName?: string) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`
      );
      if (!res.ok) throw new Error("Weather service unavailable");
      const data = await res.json();
      const temp = Math.round(data.current?.temperature_2m ?? 24);
      const code = data.current?.weather_code ?? 0;
      const night = checkIsNight();

      setTemperature(temp);
      setWeatherCode(code);
      setIsNight(night);

      const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
      const snowCodes = [71, 73, 75, 77, 85, 86];

      let detectedTheme: { theme: WeatherThemeKey; label: string };
      if (night) {
        if (rainCodes.includes(code)) {
          detectedTheme = { theme: "rainy", label: "Night • Rainy" };
        } else if (snowCodes.includes(code)) {
          detectedTheme = { theme: "snow", label: "Night • Snowy" };
        } else {
          detectedTheme = { theme: "night", label: "Night" };
        }
      } else {
        if (snowCodes.includes(code) || temp <= 0) {
          detectedTheme = { theme: "snow", label: "Snowy" };
        } else if (rainCodes.includes(code)) {
          detectedTheme = { theme: "rainy", label: "Rainy" };
        } else if (temp >= 38) {
          detectedTheme = { theme: "hot", label: "Very Hot" };
        } else if (temp <= 12) {
          detectedTheme = { theme: "cold", label: "Cold" };
        } else {
          detectedTheme = { theme: "morning", label: "Morning" };
        }
      }

      setCondition(detectedTheme.theme);
      setConditionLabel(detectedTheme.label);
      if (cityName) setCity(cityName);
      if (countryName) setCountry(countryName);
      setError(null);
    } catch (err: any) {
      console.warn("Weather fetch notice, using local device time:", err);
      const night = checkIsNight();
      setTemperature(night ? 24 : 29);
      setIsNight(night);
      setCondition(night ? "night" : "morning");
      setConditionLabel(night ? "Night" : "Morning");
      setError(err?.message || "Failed to load weather");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWeather = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(3000) });
      const data = await res.json();
      if (data && data.success && data.latitude && data.longitude) {
        await fetchWeatherForCoords(data.latitude, data.longitude, data.city || data.region || "Your City", data.country || "");
        return;
      }
    } catch {
      // fallback
    }

    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await fetchWeatherForCoords(pos.coords.latitude, pos.coords.longitude, "Local Area");
        },
        async () => {
          await fetchWeatherForCoords(28.6139, 77.209, "New Delhi", "India");
        },
        { timeout: 4000 }
      );
    } else {
      await fetchWeatherForCoords(28.6139, 77.209, "New Delhi", "India");
    }
  }, []);

  useEffect(() => {
    refreshWeather();
  }, [refreshWeather]);

  const activeTheme = manualOverride || condition;
  const activeLabel = manualOverride ? THEME_LABELS[manualOverride] : conditionLabel;
  const bgMobileImage = BG_THEMES[activeTheme] || (isNight ? "/background-night-mobile.png" : "/background-morning-mobile.png");
  const searchQuery = city ? `${city} weather` : "weather";
  const googleWeatherUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

  return (
    <WeatherContext.Provider
      value={{
        temperature,
        weatherCode,
        condition: activeTheme,
        conditionLabel: activeLabel,
        isNight,
        city,
        country,
        isLoading,
        error,
        isOverride: manualOverride !== null,
        manualOverride,
        bgMobileImage,
        bgImage: bgMobileImage,
        googleWeatherUrl,
        setManualTheme: setManualOverride,
        refreshWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
