import React from 'react';
import {
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { InsightItem } from '../data/insightsData';

type Props = {
  item: InsightItem;
  isSaved: boolean;
  onToggleSave: (item: InsightItem) => void;
};

export default function InsightCard({ item, isSaved, onToggleSave }: Props) {
  const { height } = useWindowDimensions();
  const small = height < 760;
  const verySmall = height < 700;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${item.title}\n\n${item.description}`,
      });
    } catch {}
  };

  return (
    <View style={[styles.card, verySmall && styles.cardSmall]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, small && styles.titleSmall]} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.actionsRow}>
          <Pressable
            style={[styles.iconButton, verySmall && styles.iconButtonSmall]}
            onPress={handleShare}
          >
            <Text style={[styles.iconText, verySmall && styles.iconTextSmall]}>↗</Text>
          </Pressable>

          <Pressable
            style={[
              styles.iconButton,
              verySmall && styles.iconButtonSmall,
              isSaved && styles.iconButtonSaved,
            ]}
            onPress={() => onToggleSave(item)}
          >
            <Text
              style={[
                styles.iconText,
                verySmall && styles.iconTextSmall,
                isSaved && styles.iconTextSaved,
              ]}
            >
              ⌑
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.textBox, verySmall && styles.textBoxSmall]}>
        <Text style={[styles.description, small && styles.descriptionSmall]}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#7D18B8',
    borderRadius: 26,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 18,
  },
  cardSmall: {
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    color: '#FFE100',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 19,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 17,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 7,
    backgroundColor: '#F0B300',
    borderWidth: 1.2,
    borderColor: '#8A5600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonSmall: {
    width: 30,
    height: 30,
  },
  iconButtonSaved: {
    backgroundColor: '#43D36B',
    borderColor: '#1E7E3F',
  },
  iconText: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '900',
  },
  iconTextSmall: {
    fontSize: 15,
  },
  iconTextSaved: {
    color: '#0F1A12',
  },
  textBox: {
    backgroundColor: '#F2B014',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#793E00',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textBoxSmall: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  description: {
    color: '#111111',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  descriptionSmall: {
    fontSize: 12,
    lineHeight: 18,
  },
});