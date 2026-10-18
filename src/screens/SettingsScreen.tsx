import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {
  AppLanguage,
  FontScale,
  useSettings,
} from '../context/SettingsContext';

const TEXTS = {
  kk: {
    title: 'Баптаулар',
    subtitle: 'Қосымшаның тақырыбы, қаріп өлшемі және тілі',
    themeLabel: 'Тақырып',
    light: 'Ашық',
    dark: 'Қараңғы',
    fontLabel: 'Қаріп өлшемі',
    smallDesc: 'Кіші (14px)',
    normalDesc: 'Қалыпты (17px)',
    largeDesc: 'Үлкен (21px)',
    langLabel: 'Қосымша тілі',
    previewLabel: 'Мәтін үлгісі (Preview)',
    previewText:
      'Campus Hub — БҰҰ Тұрақты даму мақсаттары (SDG) аясындағы студенттік цифрлық экожүйе. Таңдалған баптаулар барлық экрандарда қолданылады және AsyncStorage арқылы сақталады.',
    storageLabel: 'AsyncStorage күйі',
    storageDesc: 'Кілт: @campus_hub_settings (автоматты сақталды)',
    resetBtn: 'Баптауларды қалпына келтіру',
  },
  ru: {
    title: 'Настройки',
    subtitle: 'Тема приложения, размер шрифта и язык интерфейса',
    themeLabel: 'Тема',
    light: 'Светлая',
    dark: 'Тёмная',
    fontLabel: 'Размер шрифта',
    smallDesc: 'Малый (14px)',
    normalDesc: 'Обычный (17px)',
    largeDesc: 'Крупный (21px)',
    langLabel: 'Язык приложения',
    previewLabel: 'Пример текста (Preview)',
    previewText:
      'Campus Hub — цифровая студенческая экосистема в рамках Целей устойчивого развития ООН (SDG). Выбранные настройки применяются ко всем экранам и сохраняются в AsyncStorage.',
    storageLabel: 'Состояние AsyncStorage',
    storageDesc: 'Ключ: @campus_hub_settings (сохранено автоматически)',
    resetBtn: 'Сбросить настройки',
  },
  en: {
    title: 'Settings',
    subtitle: 'App theme, font scale, and interface language',
    themeLabel: 'Theme',
    light: 'Light',
    dark: 'Dark',
    fontLabel: 'Font Size',
    smallDesc: 'Small (14px)',
    normalDesc: 'Normal (17px)',
    largeDesc: 'Large (21px)',
    langLabel: 'App Language',
    previewLabel: 'Live Text Preview',
    previewText:
      'Campus Hub is a digital student ecosystem built around the UN Sustainable Development Goals (SDGs). Your preferences apply across all screens and persist via AsyncStorage.',
    storageLabel: 'AsyncStorage Status',
    storageDesc: 'Key: @campus_hub_settings (saved automatically)',
    resetBtn: 'Reset Settings',
  },
};

export function SettingsScreen() {
  const {
    theme,
    fontScale,
    language,
    colors,
    fontSize,
    scaleFont,
    setTheme,
    setFontScale,
    setLanguage,
    resetSettings,
  } = useSettings();

  const t = TEXTS[language];
  const isDark = theme === 'dark';

  const fontOptions: { key: FontScale; label: string; desc: string }[] = [
    { key: 'small', label: 'A−', desc: t.smallDesc },
    { key: 'normal', label: 'A', desc: t.normalDesc },
    { key: 'large', label: 'A+', desc: t.largeDesc },
  ];

  const langOptions: { key: AppLanguage; label: string }[] = [
    { key: 'kk', label: 'Қазақша' },
    { key: 'ru', label: 'Русский' },
    { key: 'en', label: 'English' },
  ];

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Тақырып жолағы */}
      <View style={styles.headerBlock}>
        <Text
          style={[
            styles.screenTitle,
            { color: colors.text, fontSize: scaleFont(26) },
          ]}
        >
          {t.title}
        </Text>
        <Text
          style={[
            styles.screenSubtitle,
            { color: colors.subtext, fontSize: scaleFont(13) },
          ]}
        >
          {t.subtitle}
        </Text>
      </View>

      {/* 1. Тақырып (Ашық / Қараңғы) — Слайд 3 және 18 */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.rowBetween}>
          <View>
            <Text
              style={[
                styles.sectionLabel,
                { color: colors.subtext, fontSize: scaleFont(13) },
              ]}
            >
              {t.themeLabel}
            </Text>
            <Text
              style={[
                styles.themeValueText,
                { color: colors.text, fontSize: scaleFont(20) },
              ]}
            >
              {isDark ? t.dark : t.light}
            </Text>
          </View>

          <Switch
            value={isDark}
            onValueChange={enabled => setTheme(enabled ? 'dark' : 'light')}
            trackColor={{ false: '#CBD5E1', true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Қосымша визуалды таңдау батырмалары */}
        <View style={styles.themeModeButtons}>
          {(['light', 'dark'] as const).map(mode => {
            const active = theme === mode;
            return (
              <Pressable
                key={mode}
                onPress={() => setTheme(mode)}
                style={[
                  styles.modeBtn,
                  {
                    backgroundColor: active ? colors.primary : colors.inputBg,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.modeBtnText,
                    {
                      color: active ? colors.badgeTextOnPrimary : colors.text,
                      fontSize: scaleFont(14),
                    },
                  ]}
                >
                  {mode === 'light' ? `☀ ${t.light}` : `☾ ${t.dark}`}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* 2. Қаріп өлшемі (A− / A / A+) — Слайд 3 және 18 */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text
          style={[
            styles.sectionLabel,
            { color: colors.subtext, fontSize: scaleFont(13), marginBottom: 12 },
          ]}
        >
          {t.fontLabel}
        </Text>

        <View style={styles.fontRow}>
          {fontOptions.map(opt => {
            const active = fontScale === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setFontScale(opt.key)}
                style={[
                  styles.fontBtn,
                  {
                    backgroundColor: active ? colors.primary : colors.inputBg,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fontBtnSymbol,
                    {
                      color: active ? colors.badgeTextOnPrimary : colors.text,
                      fontSize:
                        opt.key === 'small' ? 15 : opt.key === 'normal' ? 18 : 22,
                    },
                  ]}
                >
                  {opt.label}
                </Text>
                <Text
                  style={[
                    styles.fontBtnDesc,
                    {
                      color: active ? colors.badgeTextOnPrimary : colors.subtext,
                      fontSize: scaleFont(11),
                    },
                  ]}
                >
                  {opt.desc}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* 3. Тіл таңдау (Қосымша тапсырма — Слайд 22) */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text
          style={[
            styles.sectionLabel,
            { color: colors.subtext, fontSize: scaleFont(13), marginBottom: 12 },
          ]}
        >
          {t.langLabel}
        </Text>

        <View style={styles.fontRow}>
          {langOptions.map(opt => {
            const active = language === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setLanguage(opt.key)}
                style={[
                  styles.langBtn,
                  {
                    backgroundColor: active ? colors.primary : colors.inputBg,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.langBtnText,
                    {
                      color: active ? colors.badgeTextOnPrimary : colors.text,
                      fontSize: scaleFont(13),
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* 4. Тақырып пен қаріп өлшемін тексеру блогы (Слайд 19) */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text
          style={[
            styles.sectionLabel,
            { color: colors.subtext, fontSize: scaleFont(12), marginBottom: 8 },
          ]}
        >
          {t.previewLabel} ({fontSize}px)
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize,
            lineHeight: Math.round(fontSize * 1.45),
            fontWeight: '600',
          }}
        >
          {t.previewText}
        </Text>
      </View>

      {/* 5. AsyncStorage ақпараты */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text
          style={[
            styles.sectionLabel,
            { color: colors.subtext, fontSize: scaleFont(12), marginBottom: 4 },
          ]}
        >
          {t.storageLabel}
        </Text>
        <Text
          style={{
            color: colors.primary,
            fontSize: scaleFont(12),
            fontWeight: '700',
            marginBottom: 6,
          }}
        >
          {t.storageDesc}
        </Text>
        <View
          style={[
            styles.codeBox,
            { backgroundColor: colors.inputBg, borderColor: colors.border },
          ]}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: scaleFont(12),
              fontFamily: 'monospace',
            }}
          >
            {JSON.stringify({ theme, fontScale, language })}
          </Text>
        </View>
      </View>

      {/* 6. Баптауларды қалпына келтіру батырмасы (Слайд 14, 22) */}
      <Pressable
        onPress={resetSettings}
        style={({ pressed }) => [
          styles.resetButton,
          {
            backgroundColor: colors.dangerBg,
            borderColor: colors.dangerBorder,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text
          style={[
            styles.resetButtonText,
            { color: colors.danger, fontSize: scaleFont(14) },
          ]}
        >
          ↺ {t.resetBtn}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 96,
  },
  headerBlock: {
    marginBottom: 16,
    paddingTop: 4,
  },
  screenTitle: {
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  screenSubtitle: {
    marginTop: 4,
    fontWeight: '500',
  },
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    fontWeight: '700',
  },
  themeValueText: {
    fontWeight: '800',
    marginTop: 4,
  },
  themeModeButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  modeBtnText: {
    fontWeight: '800',
  },
  fontRow: {
    flexDirection: 'row',
    gap: 10,
  },
  fontBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontBtnSymbol: {
    fontWeight: '900',
    marginBottom: 4,
  },
  fontBtnDesc: {
    fontWeight: '600',
    textAlign: 'center',
  },
  langBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  langBtnText: {
    fontWeight: '800',
  },
  codeBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  resetButton: {
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 4,
  },
  resetButtonText: {
    fontWeight: '800',
  },
});
