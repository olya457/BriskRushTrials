import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/navTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'SessionResult'>;

type ModeStats = {
  completedLevels: number;
  bestScore: number;
  totalQuestions: number;
};

type StoredStatsMap = {
  logic: ModeStats;
  pattern: ModeStats;
  word: ModeStats;
  math: ModeStats;
};

const STATS_STORAGE_KEY = 'brain_arena_global_stats_v1';

const defaultModeStats: ModeStats = {
  completedLevels: 0,
  bestScore: 0,
  totalQuestions: 0,
};

const defaultStats: StoredStatsMap = {
  logic: { ...defaultModeStats },
  pattern: { ...defaultModeStats },
  word: { ...defaultModeStats },
  math: { ...defaultModeStats },
};

export default function SessionResultScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const small = height < 760;
  const verySmall = height < 700;

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StoredStatsMap>(defaultStats);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const loadStats = async () => {
        try {
          setIsLoading(true);

          const raw = await AsyncStorage.getItem(STATS_STORAGE_KEY);

          if (!raw) {
            if (active) {
              setStats(defaultStats);
            }
            return;
          }

          const parsed = JSON.parse(raw) as Partial<StoredStatsMap>;

          if (active) {
            setStats({
              logic: parsed.logic ?? defaultStats.logic,
              pattern: parsed.pattern ?? defaultStats.pattern,
              word: parsed.word ?? defaultStats.word,
              math: parsed.math ?? defaultStats.math,
            });
          }
        } catch {
          if (active) {
            setStats(defaultStats);
          }
        } finally {
          if (active) {
            setIsLoading(false);
          }
        }
      };

      loadStats();

      return () => {
        active = false;
      };
    }, [])
  );

  const totalCompleted =
    stats.logic.completedLevels +
    stats.pattern.completedLevels +
    stats.word.completedLevels +
    stats.math.completedLevels;

  const totalAnswered =
    stats.logic.totalQuestions +
    stats.pattern.totalQuestions +
    stats.word.totalQuestions +
    stats.math.totalQuestions;

  const bestScore = Math.max(
    stats.logic.bestScore,
    stats.pattern.bestScore,
    stats.word.bestScore,
    stats.math.bestScore
  );

  const renderCard = (
    title: string,
    completedLevels: number,
    best: number,
    answered: number
  ) => {
    return (
      <View style={[styles.card, verySmall && styles.cardSmall]}>
        <Text style={[styles.cardTitle, small && styles.cardTitleSmall]}>{title}</Text>

        <Text style={[styles.cardText, small && styles.cardTextSmall]}>
          Completed levels: {completedLevels}
        </Text>

        <Text style={[styles.cardText, small && styles.cardTextSmall]}>
          Best score: {best}
        </Text>

        <Text style={[styles.cardText, small && styles.cardTextSmall]}>
          Total answered: {answered}
        </Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/splash_background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: insets.top + (verySmall ? 10 : 16),
          paddingBottom: insets.bottom + (verySmall ? 90 : 110),
          paddingHorizontal: verySmall ? 12 : 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, small && styles.titleSmall]}>
          Quiz Statistics
        </Text>

        <View style={[styles.summaryCard, verySmall && styles.summaryCardSmall]}>
          <Text style={[styles.summaryTitle, small && styles.summaryTitleSmall]}>
            Overall Progress
          </Text>

          <Text style={[styles.summaryText, small && styles.summaryTextSmall]}>
            Total completed levels: {totalCompleted}
          </Text>

          <Text style={[styles.summaryText, small && styles.summaryTextSmall]}>
            Total answered questions: {totalAnswered}
          </Text>

          <Text style={[styles.summaryText, small && styles.summaryTextSmall]}>
            Best single score: {bestScore}
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#F0B300" />
          </View>
        ) : (
          <View style={styles.cardsWrap}>
            {renderCard(
              'Logic Core',
              stats.logic.completedLevels,
              stats.logic.bestScore,
              stats.logic.totalQuestions
            )}

            {renderCard(
              'Pattern Zone',
              stats.pattern.completedLevels,
              stats.pattern.bestScore,
              stats.pattern.totalQuestions
            )}

            {renderCard(
              'Word Lab',
              stats.word.completedLevels,
              stats.word.bestScore,
              stats.word.totalQuestions
            )}

            {renderCard(
              'Quick Math Pro',
              stats.math.completedLevels,
              stats.math.bestScore,
              stats.math.totalQuestions
            )}
          </View>
        )}

        <Pressable
          style={[styles.button, verySmall && styles.buttonSmall]}
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={[styles.buttonText, verySmall && styles.buttonTextSmall]}>
            Back to Home
          </Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1023A3',
  },
  container: {
    flex: 1,
  },
  title: {
    color: '#F0B300',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: '#09122E',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  titleSmall: {
    fontSize: 21,
    marginBottom: 14,
  },
  summaryCard: {
    backgroundColor: 'rgba(9, 19, 80, 0.95)',
    borderRadius: 18,
    borderWidth: 1.8,
    borderColor: '#E1B21A',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  summaryCardSmall: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },
  summaryTitle: {
    color: '#F0B300',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  summaryTitleSmall: {
    fontSize: 16,
    marginBottom: 8,
  },
  summaryText: {
    color: '#F3F6FF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600',
  },
  summaryTextSmall: {
    fontSize: 12.5,
    lineHeight: 17,
  },
  loaderWrap: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsWrap: {
    marginBottom: 18,
  },
  card: {
    backgroundColor: 'rgba(9, 19, 80, 0.95)',
    borderRadius: 18,
    borderWidth: 1.8,
    borderColor: '#E1B21A',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 14,
  },
  cardSmall: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#F0B300',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardTitleSmall: {
    fontSize: 15.5,
    marginBottom: 8,
  },
  cardText: {
    color: '#F3F6FF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600',
  },
  cardTextSmall: {
    fontSize: 12.5,
    lineHeight: 17,
  },
  button: {
    minWidth: 160,
    height: 42,
    alignSelf: 'center',
    borderRadius: 9,
    backgroundColor: '#F0B300',
    borderWidth: 1.2,
    borderColor: '#8A5600',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonSmall: {
    minWidth: 146,
    height: 38,
  },
  buttonText: {
    color: '#161616',
    fontSize: 14,
    fontWeight: '900',
  },
  buttonTextSmall: {
    fontSize: 13,
  },
});