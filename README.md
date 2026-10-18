# 📱 Campus Hub — Зертханалық жұмыс №7 (Пайдаланушы баптаулары, Тақырып және Context API + AsyncStorage)

**ALT University**  
**Модуль II:** Навигация, архитектура және қосымшаның күйі  
**Зертханалық жұмыс №7:** Пайдаланушы баптауларын, қосымшаның тақырыбы мен күйін іске асыру  
**Оқытушы:** Блен Жанерке Жайлыбекқызы  
**Технологиялар:** React Native, Expo, TypeScript, Context API, `@react-native-async-storage/async-storage`

---

## 🎯 Жұмыс мақсаты (Слайд 2)
- `Campus Hub` қосымшасына пайдаланушы баптауларының экранын (`SettingsScreen`) қосу
- Ашық (`light`) және қараңғы (`dark`) тақырыпты ауыстыру
- Қаріп өлшемін пайдаланушы таңдауы бойынша өзгерту (`small: 14`, `normal: 17`, `large: 21` — `A−`, `A`, `A+`)
- Қосымшаның ортақ күйін `Context API` (`SettingsContext`) арқылы басқару
- Таңдалған баптауларды `AsyncStorage` (`@campus_hub_settings`) ішінде сақтау

---

## 📂 Жоба құрылымы (Слайд 7)

```
campus-hub/
├── App.tsx                             # SettingsProvider арқылы RootNavigator-ды қоршау
├── package.json                        # Тәуелділіктер (@react-native-async-storage/async-storage)
└── src/
    ├── context/
    │   └── SettingsContext.tsx         # SettingsProvider, useSettings(), AsyncStorage логикасы
    ├── theme/
    │   ├── themes.ts                   # Ашық (light) және қараңғы (dark) тақырып палитралары
    │   └── theme.ts                    # Қосымша дизайн токендері
    ├── screens/
    │   ├── HomeScreen.tsx              # Басты экран (тақырып пен қаріп өлшемін қолданады)
    │   ├── ProfileScreen.tsx           # Профиль экраны (тақырып пен қаріп өлшемін қолданады)
    │   └── SettingsScreen.tsx          # Баптаулар экраны (Тақырып, A−/A/A+, Тіл, Қалпына келтіру)
    ├── navigation/
    │   └── RootNavigator.tsx           # Экрандар арасындағы навигация (Home, Schedule, Services, Profile, Settings)
    ├── components/
    │   ├── LoginCard.tsx               # Кіру формасы
    │   └── ServiceCard.tsx             # Сервис карточкасы
    ├── data/
    │   └── services.ts                 # Сервистер мен сабақ кестесінің деректері
    └── types/
        └── Service.ts                  # Деректер типтері
```

---

## ✅ Орындалған тапсырмалар (Слайд 22)

### 1. Негізгі тапсырма:
- [x] **AsyncStorage орнатылды:** `@react-native-async-storage/async-storage`
- [x] **Типтер сипатталды:** `ThemeMode = 'light' | 'dark'`, `FontScale = 'small' | 'normal' | 'large'`, `Settings`
- [x] **Тақырыптар (`themes.ts`):** Ашық (`#F4F8FC`, `#FFFFFF`, `#102A43`, `#0B66E4`) және Қараңғы (`#101827`, `#1B2638`, `#F7FAFC`, `#20C5F5`)
- [x] **`SettingsContext.tsx` және `useSettings` hook:** Барлық экрандарды ортақ күймен қамтамасыз етеді және `@campus_hub_settings` кілтімен `AsyncStorage`-ке автоматты сақтайды/жүктейді
- [x] **`SettingsScreen.tsx`:** Тақырыпты ауыстыру (`Switch` және батырмалар) және қаріп өлшемін таңдау (`A−`, `A`, `A+`)
- [x] **Барлық экрандарға әсері:** `Home`, `Schedule`, `Services`, `Profile`, `Settings` экрандарында түстер мен қаріп өлшемі бірден өзгереді

### 2. Қосымша тапсырмалар:
- [x] **«Баптауларды қалпына келтіру» батырмасы:** `resetSettings()` функциясы баптауларды бастапқы мәнге қайтарады
- [x] **Жүйелік тақырыпты анықтау:** Қосымша алғаш ашылғанда `useColorScheme()` арқылы құрылғының жүйелік тақырыбын анықтайды
- [x] **Тіл таңдау параметрі:** `Қазақша (kk)`, `Русский (ru)`, `English (en)` тілдерін ауыстыру және сақтау
- [x] **Splash күйі:** `AsyncStorage`-тен баптаулар жүктелгенше (`!isReady`) жүктелу экраны көрсетіледі

---

## 🚀 Іске қосу нұсқаулығы

```bash
cd campus-hub
npx expo start -c
```
