import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppTheme, themes } from '../theme/themes';

// 3-қадам (Слайд 8): Баптаулар типін сипаттау
export type ThemeMode = 'light' | 'dark';
export type FontScale = 'small' | 'normal' | 'large';
export type AppLanguage = 'kk' | 'ru' | 'en';

export type Settings = {
  theme: ThemeMode;
  fontScale: FontScale;
  language: AppLanguage;
};

// 14-қадам (Слайд 19): Қаріп өлшемдері картасы
export const FONT_SIZES: Record<FontScale, number> = {
  small: 14,
  normal: 17,
  large: 21,
};

export const FONT_MULTIPLIERS: Record<FontScale, number> = {
  small: 0.85,
  normal: 1,
  large: 1.2,
};

// 5-қадам (Слайд 10): SettingsContext интерфейсі
type SettingsContextValue = Settings & {
  colors: AppTheme;
  fontSize: number;
  scaleFont: (base: number) => number;
  isReady: boolean;
  setTheme: (value: ThemeMode) => void;
  setFontScale: (value: FontScale) => void;
  setLanguage: (value: AppLanguage) => void;
  resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

// 6-қадам (Слайд 11): Бастапқы күй және сақтау кілті
const STORAGE_KEY = '@campus_hub_settings';

const initialSettings: Settings = {
  theme: 'light',
  fontScale: 'normal',
  language: 'kk',
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [isReady, setIsReady] = useState(false);

  // 7-қадам (Слайд 12): Сақталған баптауларды жүктеу
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<Settings>;
          setSettings({
            theme: parsed.theme === 'dark' || parsed.theme === 'light' ? parsed.theme : initialSettings.theme,
            fontScale:
              parsed.fontScale === 'small' ||
              parsed.fontScale === 'normal' ||
              parsed.fontScale === 'large'
                ? parsed.fontScale
                : initialSettings.fontScale,
            language:
              parsed.language === 'kk' ||
              parsed.language === 'ru' ||
              parsed.language === 'en'
                ? parsed.language
                : initialSettings.language,
          });
        }
      } catch (e) {
        console.warn('Failed to load settings from AsyncStorage:', e);
      } finally {
        setIsReady(true);
      }
    };
    loadSettings();
  }, []);

  // 8-қадам (Слайд 13): Күй өзгергенде сақтау
  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch(err =>
      console.warn('Failed to save settings to AsyncStorage:', err)
    );
  }, [settings, isReady]);

  // 9-қадам (Слайд 14): Баптауларды өзгерту функциялары
  const setTheme = (theme: ThemeMode) =>
    setSettings(current => ({ ...current, theme }));

  const setFontScale = (fontScale: FontScale) =>
    setSettings(current => ({ ...current, fontScale }));

  const setLanguage = (language: AppLanguage) =>
    setSettings(current => ({ ...current, language }));

  const resetSettings = () => {
    setSettings(initialSettings);
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  };

  // 10-қадам (Слайд 15): Provider мәнін беру
  const colors = themes[settings.theme];
  const fontSize = FONT_SIZES[settings.fontScale];
  const multiplier = FONT_MULTIPLIERS[settings.fontScale];
  const scaleFont = (base: number) => Math.round(base * multiplier);

  // Қосымша тапсырма (Слайд 22): Баптаулар жүктелгенше Splash күйін көрсету
  if (!isReady) {
    return (
      <View style={[styles.splashContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.splashBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.splashLogo}>CH</Text>
        </View>
        <Text style={[styles.splashTitle, { color: colors.text }]}>Campus Hub</Text>
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 16 }} />
        <Text style={[styles.splashSub, { color: colors.subtext }]}>
          Баптаулар жүктелуде...
        </Text>
      </View>
    );
  }

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        colors,
        fontSize,
        scaleFont,
        isReady,
        setTheme,
        setFontScale,
        setLanguage,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// 12-қадам (Слайд 17): useSettings hook
export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) {
    throw new Error('useSettings must be inside SettingsProvider');
  }
  return value;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  splashBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  splashLogo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },
  splashTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  splashSub: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
  },
});
