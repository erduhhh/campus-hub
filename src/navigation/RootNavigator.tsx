import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { LoginCard } from '../components/LoginCard';
import { ServiceCard } from '../components/ServiceCard';
import { useSettings } from '../context/SettingsContext';
import {
  ScheduleItem,
  sampleSchedule,
  services as initialServices,
} from '../data/services';
import { HomeScreen, NavTab } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SdgCategory, Service } from '../types/Service';

const NAV_ICONS: Record<NavTab, string> = {
  home: '⌂',
  schedule: '≡',
  services: '⊞',
  profile: '◯',
  settings: '⚙',
};

const NAV_LABELS_I18N = {
  kk: {
    home: 'Басты',
    schedule: 'Кесте',
    services: 'Сервис',
    profile: 'Профиль',
    settings: 'Баптаулар',
  },
  ru: {
    home: 'Главная',
    schedule: 'Расписание',
    services: 'Сервисы',
    profile: 'Профиль',
    settings: 'Настройки',
  },
  en: {
    home: 'Home',
    schedule: 'Schedule',
    services: 'Services',
    profile: 'Profile',
    settings: 'Settings',
  },
};

export function RootNavigator() {
  const { colors, theme, scaleFont, language } = useSettings();
  const [user, setUser] = useState<string | null>('asan.ussenov');
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedDay, setSelectedDay] = useState('Ср 10');
  const [servicesList, setServicesList] = useState<Service[]>(initialServices);
  const [activeCategory, setActiveCategory] = useState<SdgCategory>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [activeModalService, setActiveModalService] = useState<Service | null>(
    null
  );

  const { width } = useWindowDimensions();
  const columns = width >= 700 ? 3 : 2;
  const PAD = 16;
  const GAP = 10;
  const cardWidth = (width - PAD * 2 - GAP * (columns - 1)) / columns;

  const handleToggleFavorite = (id: string) => {
    setServicesList(prev =>
      prev.map(s => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  const filteredServices = servicesList.filter(s => {
    if (onlyFavorites && !s.isFavorite) return false;
    if (activeCategory === 'all') return true;
    return s.sdgCategory === activeCategory;
  });

  if (!user) {
    return (
      <View style={[styles.authWrap, { backgroundColor: colors.background }]}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <LoginCard onSuccess={setUser} />
      </View>
    );
  }

  const daysList = ['Дс 8', 'Сс 9', 'Ср 10', 'Бс 11', 'Жм 12'];
  const schedule: ScheduleItem[] =
    sampleSchedule[selectedDay] ?? sampleSchedule['Ср 10'];
  const navLabels = NAV_LABELS_I18N[language];

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* ════════════════ БАСТЫ БЕТ (HOME) ════════════════ */}
      {currentTab === 'home' && (
        <HomeScreen
          user={user}
          servicesList={servicesList}
          cardWidth={cardWidth}
          gap={GAP}
          onNavigateTab={setCurrentTab}
          onSelectService={setActiveModalService}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* ════════════════ КЕСТЕ (SCHEDULE) ════════════════ */}
      {currentTab === 'schedule' && (
        <ScrollView
          style={[styles.page, { backgroundColor: colors.background }]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 88 }}
        >
          <View
            style={[
              styles.schedHeader,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text
              style={[styles.schedTitle, { fontSize: scaleFont(20) }]}
            >
              {navLabels.schedule}
            </Text>
            <View style={styles.daysRow}>
              {daysList.map(day => {
                const [dn, dd] = day.split(' ');
                const active = day === selectedDay;
                return (
                  <Pressable
                    key={day}
                    style={[
                      styles.dayBtn,
                      active && [
                        styles.dayBtnActive,
                        { backgroundColor: colors.card },
                      ],
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text
                      style={[
                        styles.dayName,
                        { fontSize: scaleFont(10) },
                        active && { color: colors.primary, fontWeight: '800' },
                      ]}
                    >
                      {dn}
                    </Text>
                    <Text
                      style={[
                        styles.dayNum,
                        { fontSize: scaleFont(16) },
                        active && { color: colors.primary },
                      ]}
                    >
                      {dd}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={{ paddingHorizontal: PAD, marginTop: 16 }}>
            {schedule.map(item => (
              <View
                key={item.id}
                style={[
                  styles.lessonCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.timeCol}>
                  <Text
                    style={[
                      styles.lessonTime,
                      { color: colors.text, fontSize: scaleFont(13) },
                    ]}
                  >
                    {item.time}
                  </Text>
                  <View
                    style={[
                      styles.timeLine,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                </View>
                <View style={styles.lessonBody}>
                  <View style={styles.lessonTitleRow}>
                    <Text
                      style={[
                        styles.lessonSubject,
                        { color: colors.text, fontSize: scaleFont(14) },
                      ]}
                      numberOfLines={2}
                    >
                      {item.subject}
                    </Text>
                    <View
                      style={[
                        styles.typeBadge,
                        {
                          backgroundColor:
                            item.type === 'Лекция'
                              ? '#F3E8FF'
                              : item.type === 'Практика'
                              ? '#FEF3C7'
                              : '#E0F2FE',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.typeBadgeText,
                          {
                            color:
                              item.type === 'Лекция'
                                ? '#7E22CE'
                                : item.type === 'Практика'
                                ? '#B45309'
                                : '#0369A1',
                            fontSize: scaleFont(10),
                          },
                        ]}
                      >
                        {item.type}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.lessonRoom,
                      { color: colors.subtext, fontSize: scaleFont(11) },
                    ]}
                  >
                    {item.room} · {item.building}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* ════════════════ СЕРВИСТЕР (SERVICES) ════════════════ */}
      {currentTab === 'services' && (
        <ScrollView
          style={[styles.page, { backgroundColor: colors.background }]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 88, paddingHorizontal: PAD }}
        >
          <View style={{ paddingTop: 16, marginBottom: 12 }}>
            <Text
              style={[
                styles.pageHeading,
                { color: colors.primary, fontSize: scaleFont(22) },
              ]}
            >
              SDG {navLabels.services}
            </Text>
            <Text
              style={[
                styles.pageSub,
                { color: colors.subtext, fontSize: scaleFont(11) },
              ]}
            >
              {Math.round(width)}px · {columns} баған ·{' '}
              {width >= 700 ? 'Планшет' : 'Телефон'}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterBar}
          >
            {(
              [
                { key: 'all', label: `Барлығы (${servicesList.length})` },
                { key: 'fav', label: 'Таңдаулы' },
                { key: 'education', label: 'Білім' },
                { key: 'eco', label: 'Экология' },
                { key: 'health', label: 'Денсаулық' },
              ] as { key: string; label: string }[]
            ).map(f => {
              const isActive =
                f.key === 'fav'
                  ? onlyFavorites
                  : f.key === 'all'
                  ? activeCategory === 'all' && !onlyFavorites
                  : activeCategory === f.key && !onlyFavorites;
              return (
                <Pressable
                  key={f.key}
                  style={[
                    styles.fChip,
                    {
                      backgroundColor: isActive ? colors.primary : colors.card,
                      borderColor: isActive ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => {
                    if (f.key === 'fav') {
                      setOnlyFavorites(v => !v);
                      return;
                    }
                    setActiveCategory(f.key as SdgCategory);
                    setOnlyFavorites(false);
                  }}
                >
                  <Text
                    style={[
                      styles.fChipText,
                      {
                        color: isActive
                          ? colors.badgeTextOnPrimary
                          : colors.subtext,
                        fontSize: scaleFont(12),
                      },
                    ]}
                  >
                    {f.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={[styles.grid, { gap: GAP }]}>
            {filteredServices.map(svc => (
              <ServiceCard
                key={svc.id}
                service={svc}
                width={cardWidth}
                onPress={sv => setActiveModalService(sv)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </View>
        </ScrollView>
      )}

      {/* ════════════════ ПРОФИЛЬ (PROFILE) ════════════════ */}
      {currentTab === 'profile' && (
        <ProfileScreen
          user={user}
          onLogout={() => setUser(null)}
          onOpenSettings={() => setCurrentTab('settings')}
        />
      )}

      {/* ════════════════ БАПТАУЛАР (SETTINGS) ════════════════ */}
      {currentTab === 'settings' && <SettingsScreen />}

      {/* ════════════════ ТӨМЕНГІ МӘЗІР (BOTTOM NAV) ════════════════ */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: colors.card, borderTopColor: colors.border },
        ]}
      >
        {(
          ['home', 'schedule', 'services', 'profile', 'settings'] as NavTab[]
        ).map(tab => {
          const active = currentTab === tab;
          const iconColor = active ? colors.primary : colors.subtext;
          return (
            <Pressable
              key={tab}
              style={styles.navItem}
              onPress={() => setCurrentTab(tab)}
            >
              <View
                style={[
                  styles.navIconWrap,
                  active && { backgroundColor: colors.primaryLight },
                ]}
              >
                {tab === 'profile' ? (
                  <View
                    style={[
                      styles.navPersonCircle,
                      { borderColor: iconColor },
                    ]}
                  >
                    <View
                      style={[
                        styles.navPersonHead,
                        { backgroundColor: iconColor },
                      ]}
                    />
                    <View
                      style={[
                        styles.navPersonBody,
                        { backgroundColor: iconColor },
                      ]}
                    />
                  </View>
                ) : (
                  <Text style={[styles.navIcon, { color: iconColor }]}>
                    {NAV_ICONS[tab]}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.navLabel,
                  {
                    color: iconColor,
                    fontWeight: active ? '800' : '600',
                    fontSize: scaleFont(10),
                  },
                ]}
              >
                {navLabels[tab]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* ════════════════ МОДАЛЬ ════════════════ */}
      <Modal
        visible={!!activeModalService}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModalService(null)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalBox,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {activeModalService && (
              <>
                <View
                  style={[
                    styles.modalTop,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text
                    style={[styles.modalTitle, { fontSize: scaleFont(18) }]}
                  >
                    {activeModalService.title}
                  </Text>
                  {activeModalService.sdgNumber && (
                    <Text
                      style={[styles.modalSdg, { fontSize: scaleFont(12) }]}
                    >
                      SDG #{activeModalService.sdgNumber}
                    </Text>
                  )}
                </View>
                <View style={styles.modalBody}>
                  <Text
                    style={[
                      styles.modalDesc,
                      {
                        color: colors.text,
                        fontSize: scaleFont(13.5),
                        lineHeight: scaleFont(20),
                      },
                    ]}
                  >
                    {activeModalService.description}
                  </Text>
                  {[
                    ['Бағыт', activeModalService.sdgTitle ?? '—'],
                    [
                      'Күйі',
                      activeModalService.status === 'unavailable'
                        ? 'Қолжетімсіз'
                        : activeModalService.status === 'new'
                        ? 'Жаңа'
                        : 'Белсенді',
                    ],
                  ].map(([k, v]) => (
                    <View
                      key={k}
                      style={[
                        styles.modalRow,
                        { borderTopColor: colors.border },
                      ]}
                    >
                      <Text
                        style={[
                          styles.modalRowLabel,
                          { color: colors.subtext, fontSize: scaleFont(12) },
                        ]}
                      >
                        {k}
                      </Text>
                      <Text
                        style={[
                          styles.modalRowValue,
                          { color: colors.text, fontSize: scaleFont(12) },
                        ]}
                      >
                        {v}
                      </Text>
                    </View>
                  ))}
                  <Pressable
                    style={[
                      styles.modalClose,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setActiveModalService(null)}
                  >
                    <Text
                      style={[
                        styles.modalCloseText,
                        {
                          color: colors.badgeTextOnPrimary,
                          fontSize: scaleFont(14),
                        },
                      ]}
                    >
                      Жабу
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authWrap: { flex: 1 },
  root: { flex: 1 },
  page: { flex: 1 },
  schedHeader: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  schedTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    marginBottom: 16,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  dayBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 14,
  },
  dayBtnActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayName: {
    color: '#FCE7ED',
    fontWeight: '600',
  },
  dayNum: {
    color: '#FFFFFF',
    fontWeight: '800',
    marginTop: 3,
  },
  lessonCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  timeCol: { width: 56, alignItems: 'flex-start', paddingTop: 2 },
  lessonTime: { fontWeight: '800' },
  timeLine: {
    width: 2,
    height: 16,
    borderRadius: 1,
    marginTop: 4,
  },
  lessonBody: { flex: 1, paddingLeft: 10 },
  lessonTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  lessonSubject: { fontWeight: '700', flex: 1, marginRight: 8 },
  lessonRoom: {},
  typeBadge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6 },
  typeBadgeText: { fontWeight: '800' },
  pageHeading: { fontWeight: '900' },
  pageSub: { marginTop: 2, marginBottom: 12 },
  filterBar: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  fChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  fChipText: { fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: { alignItems: 'center', flex: 1, paddingVertical: 6 },
  navIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: { fontSize: 19, lineHeight: 22 },
  navPersonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  navPersonHead: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 1.5,
  },
  navPersonBody: {
    width: 12,
    height: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  navLabel: { marginTop: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  modalTop: { padding: 20 },
  modalTitle: { fontWeight: '800', color: '#FFFFFF' },
  modalSdg: { color: '#E2E8F0', marginTop: 4, fontWeight: '600' },
  modalBody: { padding: 20 },
  modalDesc: { marginBottom: 16 },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  modalRowLabel: {},
  modalRowValue: { fontWeight: '700' },
  modalClose: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  modalCloseText: { fontWeight: '800' },
});
