import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { NavTab } from './HomeScreen';

type ProfileScreenProps = {
  user: string;
  onLogout: () => void;
  onOpenSettings: () => void;
};

const PROFILE_TEXTS = {
  kk: {
    birthDate: 'Туған күні',
    email: 'Пошта',
    phone: 'Телефон',
    grant: 'Грант',
    grantVal: 'Мемлекеттік грант',
    gpa: 'GPA',
    iin: 'ИИН',
    theme: 'Ағымдағы тақырып',
    light: 'Ашық',
    dark: 'Қараңғы',
    font: 'Қаріп өлшемі',
    openSettings: '⚙ Баптауларды ашу',
    logout: 'Шығу',
  },
  ru: {
    birthDate: 'Дата рождения',
    email: 'Почта',
    phone: 'Телефон',
    grant: 'Грант',
    grantVal: 'Государственный грант',
    gpa: 'GPA',
    iin: 'ИИН',
    theme: 'Текущая тема',
    light: 'Светлая',
    dark: 'Тёмная',
    font: 'Размер шрифта',
    openSettings: '⚙ Открыть настройки',
    logout: 'Выйти',
  },
  en: {
    birthDate: 'Birth Date',
    email: 'Email',
    phone: 'Phone',
    grant: 'Scholarship',
    grantVal: 'State Grant',
    gpa: 'GPA',
    iin: 'National ID',
    theme: 'Current Theme',
    light: 'Light',
    dark: 'Dark',
    font: 'Font Scale',
    openSettings: '⚙ Open Settings',
    logout: 'Log Out',
  },
};

export function ProfileScreen({
  user,
  onLogout,
  onOpenSettings,
}: ProfileScreenProps) {
  const { colors, theme, fontSize, scaleFont, language } = useSettings();
  const t = PROFILE_TEXTS[language];

  const rows = [
    [t.birthDate, '15.12.2003'],
    [t.email, `${user.toLowerCase()}@erdu.kz`],
    [t.phone, '+7 777 458 92 11'],
    [t.grant, t.grantVal],
    [t.gpa, '3.68'],
    [t.iin, '031215501234'],
    [t.theme, theme === 'dark' ? t.dark : t.light],
    [t.font, `${fontSize}px`],
  ];

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 88 }}
    >
      {/* Жоғарғы блок */}
      <View style={[styles.profileHero, { backgroundColor: colors.primary }]}>
        <View
          style={[
            styles.avatarBox,
            { backgroundColor: colors.card, borderColor: colors.background },
          ]}
        >
          <Text
            style={[
              styles.avatarLetters,
              { color: colors.primary, fontSize: scaleFont(24) },
            ]}
          >
            {user.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.profileCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text
          style={[
            styles.profileName,
            { color: colors.text, fontSize: scaleFont(20) },
          ]}
        >
          {user}
        </Text>
        <Text
          style={[
            styles.profileId,
            { color: colors.primary, fontSize: scaleFont(12) },
          ]}
        >
          ID: 1982103121
        </Text>

        {/* Мәліметтер */}
        {rows.map(([label, value], i, arr) => (
          <View
            key={label}
            style={[
              styles.infoRow,
              { borderBottomColor: colors.border },
              i === arr.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Text
              style={[
                styles.infoLabel,
                { color: colors.subtext, fontSize: scaleFont(12.5) },
              ]}
            >
              {label}
            </Text>
            <Text
              style={[
                label === t.gpa ? styles.infoValueHighlight : styles.infoValue,
                {
                  color: label === t.gpa ? colors.primary : colors.text,
                  fontSize: scaleFont(12.5),
                },
              ]}
            >
              {value}
            </Text>
          </View>
        ))}

        {/* Баптауларға өту батырмасы */}
        <Pressable
          style={[
            styles.settingsBtn,
            {
              backgroundColor: colors.primaryLight,
              borderColor: colors.border,
            },
          ]}
          onPress={onOpenSettings}
        >
          <Text
            style={[
              styles.settingsBtnText,
              { color: colors.primary, fontSize: scaleFont(13) },
            ]}
          >
            {t.openSettings}
          </Text>
        </Pressable>

        {/* Шығу батырмасы */}
        <Pressable
          style={[
            styles.logoutBtn,
            {
              backgroundColor: colors.dangerBg,
              borderColor: colors.dangerBorder,
            },
          ]}
          onPress={onLogout}
        >
          <Text
            style={[
              styles.logoutBtnText,
              { color: colors.danger, fontSize: scaleFont(13) },
            ]}
          >
            {t.logout}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  profileHero: {
    height: 110,
    alignItems: 'center',
    position: 'relative',
  },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    position: 'absolute',
    bottom: -40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarLetters: {
    fontWeight: '900',
  },
  profileCard: {
    marginHorizontal: 16,
    marginTop: 52,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  profileName: {
    fontWeight: '900',
    textAlign: 'center',
  },
  profileId: {
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontWeight: '500',
  },
  infoValue: {
    fontWeight: '700',
  },
  infoValueHighlight: {
    fontWeight: '800',
  },
  settingsBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 18,
    alignItems: 'center',
  },
  settingsBtnText: {
    fontWeight: '800',
  },
  logoutBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  logoutBtnText: {
    fontWeight: '800',
  },
});
