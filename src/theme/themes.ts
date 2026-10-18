export const themes = {
  light: {
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#0F172A',
    primary: '#A8133E',         // Точно тот самый исходный цвет из App.tsx (BURG = '#A8133E')
    primaryDark: '#850C2F',     // BURG_DARK = '#850C2F'
    primaryLight: '#FFF0F4',    // BURG_LIGHT = '#FFF0F4'
    primarySoft: '#FCE7ED',     // #FCE7ED
    subtext: '#64748B',
    border: '#F0DCE3',          // #F0DCE3
    pillBorder: '#F5C2CE',      // BURG_BORDER = '#F5C2CE'
    inputBg: '#F8FAFC',
    danger: '#A8133E',
    dangerBg: '#FFF0F4',
    dangerBorder: '#F5C2CE',
    badgeTextOnPrimary: '#FFFFFF',
  },
  dark: {
    background: '#101827',
    card: '#1B2638',
    text: '#F7FAFC',
    primary: '#C92354',         // Светлее для читаемости на тёмном фоне (из theme.ts accent)
    primaryDark: '#850C2F',
    primaryLight: '#2D121E',
    primarySoft: '#FCE7ED',
    subtext: '#94A3B8',
    border: '#2D3B55',
    pillBorder: '#5C162E',
    inputBg: '#131C2E',
    danger: '#F87171',
    dangerBg: '#2D121E',
    dangerBorder: '#5C162E',
    badgeTextOnPrimary: '#FFFFFF',
  },
};

export type AppTheme = typeof themes.light;
