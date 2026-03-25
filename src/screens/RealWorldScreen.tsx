import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InsightCard from '../components/InsightCard';
import { insightsData, type InsightItem } from '../data/insightsData';

const SAVED_INSIGHTS_STORAGE_KEY = 'saved_insights_v1';

export default function RealWorldScreen() {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const small = height < 760;
  const verySmall = height < 700;

  const [savedIds, setSavedIds] = useState<string[]>([]);

  const loadSaved = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVED_INSIGHTS_STORAGE_KEY);
      if (!raw) {
        setSavedIds([]);
        return;
      }
      const parsed = JSON.parse(raw) as string[];
      setSavedIds(Array.isArray(parsed) ? parsed : []);
    } catch {
      setSavedIds([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, [loadSaved])
  );

  const handleToggleSave = async (item: InsightItem) => {
    try {
      const nextSavedIds = savedIds.includes(item.id)
        ? savedIds.filter(id => id !== item.id)
        : [...savedIds, item.id];

      setSavedIds(nextSavedIds);
      await AsyncStorage.setItem(
        SAVED_INSIGHTS_STORAGE_KEY,
        JSON.stringify(nextSavedIds)
      );
    } catch {}
  };

  return (
    <ImageBackground
      source={require('../assets/images/practice/practice_background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <FlatList
        data={insightsData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + (verySmall ? 12 : 18),
          paddingBottom: insets.bottom + (verySmall ? 92 : 108),
          paddingHorizontal: verySmall ? 14 : 18,
        }}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <Text style={[styles.title, small && styles.titleSmall]}>Real World</Text>
            <View style={styles.topLine} />
          </View>
        }
        renderItem={({ item }) => (
          <InsightCard
            item={item}
            isSaved={savedIds.includes(item.id)}
            onToggleSave={handleToggleSave}
          />
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1427B6',
  },
  headerWrap: {
    marginBottom: 18,
  },
  title: {
    color: '#F0B300',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: '#111111',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  titleSmall: {
    fontSize: 19,
    marginBottom: 10,
  },
  topLine: {
    height: 1.5,
    backgroundColor: '#E1B21A',
  },
});