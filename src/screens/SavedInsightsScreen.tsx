import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/navTypes';
import InsightCard from '../components/InsightCard';
import { insightsData, type InsightItem } from '../data/insightsData';

const SAVED_INSIGHTS_STORAGE_KEY = 'saved_insights_v1';

type NavigationType = BottomTabNavigationProp<MainTabParamList, 'SavedInsights'>;

export default function SavedInsightsScreen() {
  const navigation = useNavigation<NavigationType>();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const isSmallScreen = height < 760;
  const isVerySmallScreen = height < 700;

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

  const savedItems = useMemo(() => {
    return insightsData.filter(item => savedIds.includes(item.id));
  }, [savedIds]);

  const handleToggleSave = async (item: InsightItem) => {
    try {
      const nextSavedIds = savedIds.filter(id => id !== item.id);
      setSavedIds(nextSavedIds);
      await AsyncStorage.setItem(
        SAVED_INSIGHTS_STORAGE_KEY,
        JSON.stringify(nextSavedIds)
      );
    } catch {}
  };

  const handleGoToRealWorld = () => {
    navigation.navigate('RealWorld');
  };

  return (
    <ImageBackground
      source={require('../assets/images/practice/practice_background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <FlatList
        data={savedItems}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + (isVerySmallScreen ? 12 : 18),
          paddingBottom: insets.bottom + (isVerySmallScreen ? 92 : 108),
          paddingHorizontal: isVerySmallScreen ? 14 : 18,
          flexGrow: 1,
        }}
        ListHeaderComponent={
          <View style={styles.headerWrapper}>
            <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>
              Saved Facts
            </Text>
            <View style={styles.topLine} />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyWrapper}>
            <Image
              source={require('../assets/images/saved_facts_empty.png')}
              resizeMode="contain"
              style={{
                width: isVerySmallScreen ? 220 : isSmallScreen ? 250 : 280,
                height: isVerySmallScreen ? 180 : isSmallScreen ? 205 : 230,
              }}
            />

            <Text style={[styles.emptyTitle, isSmallScreen && styles.emptyTitleSmall]}>
              No saved facts yet
            </Text>

            <Text
              style={[
                styles.emptySubtitle,
                isSmallScreen && styles.emptySubtitleSmall,
              ]}
            >
              Explore Real World and save facts that catch your attention
            </Text>

            <Pressable
              style={[
                styles.realWorldButton,
                isVerySmallScreen && styles.realWorldButtonSmall,
              ]}
              onPress={handleGoToRealWorld}
            >
              <Text
                style={[
                  styles.realWorldButtonText,
                  isVerySmallScreen && styles.realWorldButtonTextSmall,
                ]}
              >
                Go to Real World
              </Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <InsightCard
            item={item}
            isSaved={true}
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
  headerWrapper: {
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
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 26,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: '#FF8C00',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 12,
    textShadowColor: '#111111',
    textShadowOffset: { width: 1.2, height: 1.2 },
    textShadowRadius: 0,
  },
  emptyTitleSmall: {
    fontSize: 22,
    marginTop: 14,
    marginBottom: 10,
  },
  emptySubtitle: {
    color: '#F3F6FF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 290,
    marginBottom: 28,
  },
  emptySubtitleSmall: {
    fontSize: 12.5,
    lineHeight: 18,
    maxWidth: 260,
    marginBottom: 24,
  },
  realWorldButton: {
    minWidth: 210,
    height: 58,
    borderRadius: 10,
    backgroundColor: '#F0B300',
    borderWidth: 1.5,
    borderColor: '#8A5600',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  realWorldButtonSmall: {
    minWidth: 186,
    height: 50,
    borderRadius: 9,
    paddingHorizontal: 16,
  },
  realWorldButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    textShadowColor: '#7A3E00',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  realWorldButtonTextSmall: {
    fontSize: 16,
  },
});