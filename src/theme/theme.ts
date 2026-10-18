export const theme = {
  spacing: {
    screenPadding: 18,
    gap: 12,
    cardPadding: 16,
    inputPadding: 14,
  },
  borderRadius: {
    small: 8,
    medium: 14,
    large: 20,
    xlarge: 26,
  },
  typography: {
    headerTitle: { fontSize: 22, fontWeight: '800' as const, letterSpacing: -0.4 },
    sectionTitle: { fontSize: 16, fontWeight: '800' as const, letterSpacing: -0.2 },
    cardTitle: { fontSize: 14, fontWeight: '700' as const },
    body: { fontSize: 13, lineHeight: 18 },
    caption: { fontSize: 11, fontWeight: '600' as const },
  },
  shadows: {
    card: {
      shadowColor: '#8B1236',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 10,
      elevation: 3,
    },
    header: {
      shadowColor: '#5C0820',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
    bottomBar: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 8,
    },
  },
  colors: {
    // ERDU University брендтік түстері (Фотодағы нархоз/бордо стилі)
    primary: '#A8133E',         // Негізгі қызыл-бордо (Burgundy)
    primaryDark: '#850C2F',     // Қою бордо
    primaryLight: '#FFF0F4',    // Ашық қызғылт-ақ фон
    primarySoft: '#FCE7ED',     // Жұмсақ акцент
    accent: '#C92354',          // Жарқын акцент
    white: '#FFFFFF',           // Таза ақ
    surface: '#FFFFFF',
    background: '#F9FAFC',      // Ашық фон
    cardBorder: '#F2D4DE',      // Жиектер
    textDark: '#1E293B',        // Қара-сұр негізгі мәтін
    textMuted: '#64748B',       // Сұр қосымша мәтін
    textBurgundy: '#A8133E',    // Бордо мәтін
    lectureBadgeBg: '#F3E8FF',  // Дәріс фоны (күлгін)
    lectureBadgeText: '#7E22CE',// Дәріс мәтіні
    practiceBadgeBg: '#FEF3C7', // Тәжірибе фоны (сары)
    practiceBadgeText: '#B45309',// Тәжірибе мәтіні
    border: '#E2E8F0',
    error: '#DC2626',
  },
};
