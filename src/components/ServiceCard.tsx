import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CardProps } from '../types/Service';
import { useSettings } from '../context/SettingsContext';

// Сервис иконкалары (SVG emoji жоқ, таза Unicode/text symbols)
const SERVICE_ICONS: Record<string, string> = {
  LIB:  '▤',
  CAL:  '◫',
  LMS:  '◈',
  BUS:  '◉',
  FOOD: '◎',
  MED:  '✚',
  ECO:  '◆',
  REC:  '↻',
  EQL:  '◑',
  PTR:  '◐',
};

export function ServiceCard({ service, width, onPress, onToggleFavorite }: CardProps) {
  const { colors, scaleFont } = useSettings();
  const isUnavailable = service.status === 'unavailable';
  const isNew = service.status === 'new';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          width,
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: isUnavailable ? 0.55 : pressed ? 0.88 : 1,
        },
      ]}
      onPress={() => !isUnavailable && onPress && onPress(service)}
    >
      {/* Иконка + Таңдаулы батырмасы */}
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.iconSymbol, { color: colors.primary }]}>
            {SERVICE_ICONS[service.icon] ?? '◈'}
          </Text>
        </View>
        {onToggleFavorite && (
          <Pressable
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            onPress={() => onToggleFavorite(service.id)}
          >
            <Text style={[styles.starIcon, service.isFavorite && styles.starActive]}>
              {service.isFavorite ? '★' : '☆'}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Мазмұн */}
      <View style={styles.body}>
        <Text
          style={[
            styles.cardTitle,
            { color: colors.text, fontSize: scaleFont(14) },
          ]}
          numberOfLines={1}
        >
          {service.title}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color: colors.subtext,
              fontSize: scaleFont(12),
              lineHeight: scaleFont(16),
            },
          ]}
          numberOfLines={2}
        >
          {service.description}
        </Text>
      </View>

      {/* Футер: SDG пен жаңа белгі */}
      <View style={styles.footerRow}>
        {service.sdgNumber && (
          <View
            style={[
              styles.sdgChip,
              {
                backgroundColor: colors.primaryLight,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.sdgChipText,
                { color: colors.primary, fontSize: scaleFont(10) },
              ]}
            >
              SDG {service.sdgNumber}
            </Text>
          </View>
        )}
        {isNew && (
          <View style={[styles.newChip, { backgroundColor: colors.primary }]}>
            <Text
              style={[
                styles.newChipText,
                { color: colors.badgeTextOnPrimary, fontSize: scaleFont(10) },
              ]}
            >
              ЖАҢА
            </Text>
          </View>
        )}
        {isUnavailable && (
          <View style={[styles.unavailChip, { backgroundColor: colors.inputBg }]}>
            <Text
              style={[
                styles.unavailChipText,
                { color: colors.subtext, fontSize: scaleFont(10) },
              ]}
            >
              ЖАБЫҚ
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 155,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSymbol: {
    fontSize: 20,
    lineHeight: 24,
  },
  starIcon: {
    fontSize: 20,
    color: '#94A3B8',
  },
  starActive: {
    color: '#F59E0B',
  },
  body: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontWeight: '400',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  sdgChip: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  sdgChipText: {
    fontWeight: '700',
  },
  newChip: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  newChipText: {
    fontWeight: '800',
  },
  unavailChip: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  unavailChipText: {
    fontWeight: '700',
  },
});
