import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useSettings } from '../context/SettingsContext';

type LoginCardProps = {
  onSuccess: (username: string) => void;
};

export function LoginCard({ onSuccess }: LoginCardProps) {
  const { colors, scaleFont, theme, setTheme } = useSettings();
  const [login, setLogin] = useState('asan.ussenov');
  const [password, setPassword] = useState('student123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    if (!login.trim() || !password.trim()) {
      setError('Барлық өрісті толтырыңыз');
      return;
    }
    if (login.trim().length < 4) {
      setError('Логин кемінде 4 таңба болуы керек');
      return;
    }
    if (password.length < 6) {
      setError('Пароль кемінде 6 таңба болуы керек');
      return;
    }
    setError('');
    onSuccess(login.trim());
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.screen, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View
          style={[
            styles.cardContainer,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {/* Жоғарғы тақырып ауыстырғыш */}
          <View style={styles.topRow}>
            <Pressable
              onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={[
                styles.themeQuickBtn,
                { backgroundColor: colors.primaryLight, borderColor: colors.border },
              ]}
            >
              <Text style={{ color: colors.primary, fontSize: scaleFont(11), fontWeight: '800' }}>
                {theme === 'dark' ? '☾ Қараңғы тақырып' : '☀ Ашық тақырып'}
              </Text>
            </Pressable>
          </View>

          {/* ERDU Бренді */}
          <View style={styles.brandHeader}>
            <View style={styles.logoBadge}>
              <Text
                style={[
                  styles.logoTitle,
                  { color: colors.primary, fontSize: scaleFont(28) },
                ]}
              >
                ERDU
              </Text>
              <Text
                style={[
                  styles.logoSubtitle,
                  { color: colors.primaryDark, fontSize: scaleFont(10) },
                ]}
              >
                UNIVERSITY
              </Text>
            </View>
            <Text
              style={[
                styles.appTitle,
                { color: colors.text, fontSize: scaleFont(15) },
              ]}
            >
              Студенттік портал · Campus Hub
            </Text>
            <View
              style={[
                styles.sdgTag,
                { backgroundColor: colors.primaryLight, borderColor: colors.border },
              ]}
            >
              <Text
                style={[
                  styles.sdgTagText,
                  { color: colors.primary, fontSize: scaleFont(10) },
                ]}
              >
                SDG • ТҰРАҚТЫ ДАМУ ХАБЫ
              </Text>
            </View>
          </View>

          {/* Логин өрісі */}
          <View style={styles.inputGroup}>
            <Text
              style={[
                styles.inputLabel,
                { color: colors.subtext, fontSize: scaleFont(12.5) },
              ]}
            >
              Логин / Студент ID
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: error ? colors.danger : colors.border,
                  color: colors.text,
                  fontSize: scaleFont(14),
                },
              ]}
              placeholder="Мысалы: asan.ussenov"
              placeholderTextColor="#94A3B8"
              autoCapitalize="none"
              value={login}
              onChangeText={text => {
                setLogin(text);
                setError('');
              }}
            />
          </View>

          {/* Пароль өрісі */}
          <View style={styles.inputGroup}>
            <Text
              style={[
                styles.inputLabel,
                { color: colors.subtext, fontSize: scaleFont(12.5) },
              ]}
            >
              Құпиясөз
            </Text>
            <View
              style={[
                styles.passwordWrapper,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: error ? colors.danger : colors.border,
                },
              ]}
            >
              <TextInput
                style={[
                  styles.passwordField,
                  { color: colors.text, fontSize: scaleFont(14) },
                ]}
                placeholder="Кемінде 6 таңба"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setError('');
                }}
              />
              <Pressable
                onPress={() => setShowPassword(v => !v)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text
                  style={[
                    styles.togglePassword,
                    { color: colors.primary, fontSize: scaleFont(12.5) },
                  ]}
                >
                  {showPassword ? 'Жасыру' : 'Көрсету'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Мені есте сақтау */}
          <Pressable
            style={styles.rememberBox}
            onPress={() => setRememberMe(v => !v)}
          >
            <View
              style={[
                styles.checkSquare,
                {
                  borderColor: rememberMe ? colors.primary : colors.border,
                  backgroundColor: rememberMe ? colors.primary : colors.card,
                },
              ]}
            >
              {rememberMe && <View style={styles.checkDot} />}
            </View>
            <Text
              style={[
                styles.rememberLabel,
                { color: colors.subtext, fontSize: scaleFont(13) },
              ]}
            >
              Мені есте сақтау
            </Text>
          </Pressable>

          {/* Валидация қатесі */}
          {!!error && (
            <Text style={[styles.errorText, { color: colors.danger, fontSize: scaleFont(12.5) }]}>
              {error}
            </Text>
          )}

          {/* Кіру батырмасы */}
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              {
                backgroundColor: pressed ? colors.primaryDark : colors.primary,
              },
            ]}
            onPress={handleLogin}
          >
            <Text
              style={[
                styles.submitButtonText,
                { color: colors.badgeTextOnPrimary, fontSize: scaleFont(15) },
              ]}
            >
              Жүйеге кіру
            </Text>
          </Pressable>

          <View style={styles.footerInfo}>
            <Text
              style={[
                styles.footerNote,
                { color: colors.subtext, fontSize: scaleFont(11) },
              ]}
            >
              ERDU University білім беру порталы · Зертханалық жұмыс 7
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 390,
    borderRadius: 22,
    padding: 26,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  themeQuickBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 22,
  },
  logoBadge: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logoTitle: {
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  logoSubtitle: {
    fontWeight: '800',
    letterSpacing: 3,
    marginTop: -2,
  },
  appTitle: {
    fontWeight: '700',
    marginTop: 4,
  },
  sdgTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
    borderWidth: 1,
  },
  sdgTagText: {
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontWeight: '700',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    padding: 13,
    borderRadius: 12,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  passwordField: {
    flex: 1,
    padding: 13,
  },
  togglePassword: {
    fontWeight: '700',
    paddingHorizontal: 14,
  },
  rememberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkSquare: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  rememberLabel: {
    fontWeight: '500',
  },
  errorText: {
    fontWeight: '600',
    marginBottom: 8,
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 6,
  },
  submitButtonText: {
    textAlign: 'center',
    fontWeight: '800',
  },
  footerInfo: {
    marginTop: 18,
    alignItems: 'center',
  },
  footerNote: {
    textAlign: 'center',
  },
});
