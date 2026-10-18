import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { ServiceCard } from '../components/ServiceCard';
import { Service } from '../types/Service';

export type NavTab = 'home' | 'schedule' | 'services' | 'profile' | 'settings';

type HomeScreenProps = {
  user: string;
  servicesList: Service[];
  cardWidth: number;
  gap: number;
  onNavigateTab: (tab: NavTab) => void;
  onSelectService: (service: Service) => void;
  onToggleFavorite: (id: string) => void;
};

const HOME_TEXTS = {
  kk: {
    greet: 'Сәлем',
    heroBadge: 'ЖАҢА КАМПУС',
    heroTitle: 'ERDU Campus Hub',
    heroDesc: 'БҰҰ Тұрақты даму мақсаттары (SDG) аясындағы цифрлық орта',
    quickAccess: 'Жедел кіру',
    schedule: 'Кесте',
    services: 'Сервистер',
    profile: 'Профиль',
    settings: 'Баптаулар',
    featuredServices: 'Қызметтер',
    seeAll: 'Барлығы →',
  },
  ru: {
    greet: 'Привет',
    heroBadge: 'НОВЫЙ КАМПУС',
    heroTitle: 'ERDU Campus Hub',
    heroDesc: 'Цифровая среда в рамках Целей устойчивого развития ООН (SDG)',
    quickAccess: 'Быстрый доступ',
    schedule: 'Расписание',
    services: 'Сервисы',
    profile: 'Профиль',
    settings: 'Настройки',
    featuredServices: 'Популярные сервисы',
    seeAll: 'Все →',
  },
  en: {
    greet: 'Hello',
    heroBadge: 'SMART CAMPUS',
    heroTitle: 'ERDU Campus Hub',
    heroDesc: 'Digital student environment powered by UN SDGs',
    quickAccess: 'Quick Access',
    schedule: 'Schedule',
    services: 'Services',
    profile: 'Profile',
    settings: 'Settings',
    featuredServices: 'Services',
    seeAll: 'See all →',
  },
};

export function HomeScreen({
  user,
  servicesList,
  cardWidth,
  gap,
  onNavigateTab,
  onSelectService,
  onToggleFavorite,
}: HomeScreenProps) {
  const { colors, fontSize, scaleFont, language } = useSettings();
  const t = HOME_TEXTS[language];

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 88 }}
    >
      {/* Жоғарғы жолақ */}
      <View style={styles.homeTopBar}>
        <View>
          <Text
            style={[
              styles.erduLogo,
              { color: colors.primary, fontSize: scaleFont(22) },
            ]}
          >
            ERDU
          </Text>
          <Text
            style={[
              styles.erduSub,
              { color: colors.primaryDark, fontSize: scaleFont(9) },
            ]}
          >
            UNIVERSITY
          </Text>
        </View>
        <View
          style={[
            styles.greetPill,
            {
              backgroundColor: colors.primaryLight,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.greetText,
              { color: colors.primary, fontSize: scaleFont(12) },
            ]}
          >
            {t.greet}, {user}
          </Text>
        </View>
      </View>

      {/* Баннер */}
      <View style={[styles.heroBanner, { backgroundColor: colors.primary }]}>
        <View style={styles.heroPill}>
          <Text style={[styles.heroPillText, { fontSize: scaleFont(10) }]}>
            {t.heroBadge}
          </Text>
        </View>
        <Text style={[styles.heroTitle, { fontSize }]}>{t.heroTitle}</Text>
        <Text
          style={[
            styles.heroDesc,
            { fontSize: scaleFont(12), lineHeight: scaleFont(17) },
          ]}
        >
          {t.heroDesc}
        </Text>
      </View>

      {/* Жедел меню 2×2 */}
      <Text
        style={[
          styles.secTitle,
          { color: colors.text, fontSize: scaleFont(15) },
        ]}
      >
        {t.quickAccess}
      </Text>
      <View style={styles.quickGrid}>
        {[
          { icon: '≡', label: t.schedule, tab: 'schedule' as NavTab },
          { icon: '⊞', label: t.services, tab: 'services' as NavTab },
          { icon: 'profile', label: t.profile, tab: 'profile' as NavTab },
          { icon: '⚙', label: t.settings, tab: 'settings' as NavTab },
        ].map(item => (
          <Pressable
            key={item.label}
            style={[
              styles.quickCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => onNavigateTab(item.tab)}
          >
            {item.icon === 'profile' ? (
              <View style={[styles.personIconCircle, { borderColor: colors.primary }]}>
                <View style={[styles.personHead, { backgroundColor: colors.primary }]} />
                <View style={[styles.personBody, { backgroundColor: colors.primary }]} />
              </View>
            ) : (
              <Text style={[styles.quickIcon, { color: colors.primary }]}>
                {item.icon}
              </Text>
            )}
            <Text
              style={[
                styles.quickLabel,
                { color: colors.text, fontSize: scaleFont(13) },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Қызметтер алдын-ала (4 карточка) */}
      <View style={styles.secRow}>
        <Text
          style={[
            styles.secTitleInline,
            { color: colors.text, fontSize: scaleFont(15) },
          ]}
        >
          {t.featuredServices}
        </Text>
        <Pressable onPress={() => onNavigateTab('services')}>
          <Text
            style={[
              styles.seeAll,
              { color: colors.primary, fontSize: scaleFont(12) },
            ]}
          >
            {t.seeAll}
          </Text>
        </Pressable>
      </View>

      <View style={[styles.grid, { gap }]}>
        {servicesList.slice(0, 4).map(svc => (
          <ServiceCard
            key={svc.id}
            service={svc}
            width={cardWidth}
            onPress={onSelectService}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  homeTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  erduLogo: {
    fontWeight: '900',
    letterSpacing: 1,
  },
  erduSub: {
    fontWeight: '800',
    letterSpacing: 3,
  },
  greetPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  greetText: {
    fontWeight: '700',
  },
  heroBanner: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  heroPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  heroPillText: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    marginBottom: 4,
  },
  heroDesc: {
    color: '#FCE7ED',
  },
  secTitle: {
    fontWeight: '800',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  secTitleInline: {
    fontWeight: '800',
  },
  secRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  seeAll: {
    fontWeight: '700',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    gap: 10,
    marginBottom: 24,
  },
  quickCard: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  quickIcon: {
    fontSize: 28,
    marginBottom: 8,
    lineHeight: 32,
  },
  personIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 8,
  },
  personHead: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginBottom: 2,
  },
  personBody: {
    width: 18,
    height: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  quickLabel: {
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
  },
});
