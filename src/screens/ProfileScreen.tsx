import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../navigation/navTypes';

type TabNavigation = BottomTabNavigationProp<MainTabParamList, 'Profile'>;
type StackNavigation = NativeStackNavigationProp<RootStackParamList>;

type ModeStats = {
  completedLevels: number;
  bestScore: number;
  totalQuestions: number;
  correctAnswersTotal: number;
};

type StoredStatsMap = {
  logic: ModeStats;
  pattern: ModeStats;
  word: ModeStats;
  math: ModeStats;
};

type SettingsState = {
  notificationsEnabled: boolean;
  hapticsEnabled: boolean;
  quickResumeEnabled: boolean;
};

const SETTINGS_STORAGE_KEY = 'brain_arena_settings_v1';
const STATS_STORAGE_KEY = 'brain_arena_global_stats_v2';
const SAVED_INSIGHTS_STORAGE_KEY = 'saved_insights_v1';

const defaultModeStats: ModeStats = {
  completedLevels: 0,
  bestScore: 0,
  totalQuestions: 0,
  correctAnswersTotal: 0,
};

const defaultStats: StoredStatsMap = {
  logic: { ...defaultModeStats },
  pattern: { ...defaultModeStats },
  word: { ...defaultModeStats },
  math: { ...defaultModeStats },
};

const defaultSettings: SettingsState = {
  notificationsEnabled: true,
  hapticsEnabled: true,
  quickResumeEnabled: true,
};

export default function ProfileScreen() {
  const tabNavigation = useNavigation<TabNavigation>();
  const stackNavigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 760;
  const isVerySmallScreen = height < 700;
  const isUltraSmallScreen = height < 650;

  const modalWidth = Math.min(width - 24, isVerySmallScreen ? 330 : 360);
  const chartHeight = isUltraSmallScreen ? 210 : isVerySmallScreen ? 225 : 250;
  const chartTrackHeight = isUltraSmallScreen ? 118 : isVerySmallScreen ? 132 : 150;

  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [stats, setStats] = useState<StoredStatsMap>(defaultStats);
  const [savedFactsCount, setSavedFactsCount] = useState(0);
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);

  const loadAllData = useCallback(async () => {
    try {
      const [settingsRaw, statsRaw, savedRaw] = await Promise.all([
        AsyncStorage.getItem(SETTINGS_STORAGE_KEY),
        AsyncStorage.getItem(STATS_STORAGE_KEY),
        AsyncStorage.getItem(SAVED_INSIGHTS_STORAGE_KEY),
      ]);

      if (settingsRaw) {
        const parsedSettings = JSON.parse(settingsRaw) as Partial<SettingsState>;

        setSettings({
          notificationsEnabled:
            typeof parsedSettings.notificationsEnabled === 'boolean'
              ? parsedSettings.notificationsEnabled
              : defaultSettings.notificationsEnabled,
          hapticsEnabled:
            typeof parsedSettings.hapticsEnabled === 'boolean'
              ? parsedSettings.hapticsEnabled
              : defaultSettings.hapticsEnabled,
          quickResumeEnabled:
            typeof parsedSettings.quickResumeEnabled === 'boolean'
              ? parsedSettings.quickResumeEnabled
              : defaultSettings.quickResumeEnabled,
        });
      } else {
        setSettings(defaultSettings);
      }

      if (statsRaw) {
        const parsedStats = JSON.parse(statsRaw) as Partial<StoredStatsMap>;

        setStats({
          logic: { ...defaultModeStats, ...(parsedStats.logic ?? {}) },
          pattern: { ...defaultModeStats, ...(parsedStats.pattern ?? {}) },
          word: { ...defaultModeStats, ...(parsedStats.word ?? {}) },
          math: { ...defaultModeStats, ...(parsedStats.math ?? {}) },
        });
      } else {
        setStats(defaultStats);
      }

      if (savedRaw) {
        const parsedSaved = JSON.parse(savedRaw) as string[];
        setSavedFactsCount(Array.isArray(parsedSaved) ? parsedSaved.length : 0);
      } else {
        setSavedFactsCount(0);
      }
    } catch {
      setSettings(defaultSettings);
      setStats(defaultStats);
      setSavedFactsCount(0);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAllData();
    }, [loadAllData])
  );

  const saveSettings = async (nextSettings: SettingsState) => {
    setSettings(nextSettings);

    try {
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(nextSettings));
    } catch {}
  };

  const toggleNotifications = () => {
    saveSettings({
      ...settings,
      notificationsEnabled: !settings.notificationsEnabled,
    });
  };

  const toggleHaptics = () => {
    saveSettings({
      ...settings,
      hapticsEnabled: !settings.hapticsEnabled,
    });
  };

  const toggleQuickResume = () => {
    saveSettings({
      ...settings,
      quickResumeEnabled: !settings.quickResumeEnabled,
    });
  };

  const totalCompletedLevels =
    stats.logic.completedLevels +
    stats.pattern.completedLevels +
    stats.word.completedLevels +
    stats.math.completedLevels;

  const totalAnsweredQuestions =
    stats.logic.totalQuestions +
    stats.pattern.totalQuestions +
    stats.word.totalQuestions +
    stats.math.totalQuestions;

  const totalCorrectAnswers =
    stats.logic.correctAnswersTotal +
    stats.pattern.correctAnswersTotal +
    stats.word.correctAnswersTotal +
    stats.math.correctAnswersTotal;

  const overallAccuracy = useMemo(() => {
    if (totalAnsweredQuestions <= 0) {
      return 0;
    }

    return Math.round((totalCorrectAnswers / totalAnsweredQuestions) * 100);
  }, [totalCorrectAnswers, totalAnsweredQuestions]);

  const bestScore = useMemo(() => {
    return Math.max(
      stats.logic.bestScore,
      stats.pattern.bestScore,
      stats.word.bestScore,
      stats.math.bestScore
    );
  }, [stats]);

  const getProgressPercent = (entry: ModeStats) => {
    if (!entry.totalQuestions || entry.totalQuestions <= 0) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(100, Math.round((entry.correctAnswersTotal / entry.totalQuestions) * 100))
    );
  };

  const chartItems = useMemo(() => {
    return [
      {
        key: 'logic',
        title: 'Logic Core',
        value: getProgressPercent(stats.logic),
        label: `${stats.logic.correctAnswersTotal}/${stats.logic.totalQuestions || 0}`,
        color: '#FF6B6B',
      },
      {
        key: 'pattern',
        title: 'Pattern Zone',
        value: getProgressPercent(stats.pattern),
        label: `${stats.pattern.correctAnswersTotal}/${stats.pattern.totalQuestions || 0}`,
        color: '#6BCB77',
      },
      {
        key: 'word',
        title: 'Word Lab',
        value: getProgressPercent(stats.word),
        label: `${stats.word.correctAnswersTotal}/${stats.word.totalQuestions || 0}`,
        color: '#4D96FF',
      },
      {
        key: 'math',
        title: 'Quick Math Pro',
        value: getProgressPercent(stats.math),
        label: `${stats.math.correctAnswersTotal}/${stats.math.totalQuestions || 0}`,
        color: '#FFD93D',
      },
    ];
  }, [stats]);

  const handleOpenStatistics = () => {
    setStatisticsModalVisible(true);
  };

  const handleCloseStatistics = () => {
    setStatisticsModalVisible(false);
  };

  const handleOpenSavedFacts = () => {
    tabNavigation.navigate('SavedInsights');
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          'Brain Arena is a focused quiz app with logic, pattern, word, and math challenges.',
      });
    } catch {}
  };

  const handleAbout = () => {
    Alert.alert(
      'About App',
      'Brain Arena combines logic tasks, pattern challenges, word exercises, and math drills in one focused training space.'
    );
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress?',
      'This will remove all quiz progress and overall statistics.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                'brain_arena_progress_v2_logic',
                'brain_arena_progress_v2_pattern',
                'brain_arena_progress_v2_word',
                'brain_arena_progress_v2_math',
                STATS_STORAGE_KEY,
              ]);

              setStats(defaultStats);

              Alert.alert('Done', 'Progress and statistics were reset.');
            } catch {
              Alert.alert('Error', 'Could not reset progress.');
            }
          },
        },
      ]
    );
  };

  const handleClearSavedFacts = () => {
    Alert.alert(
      'Clear Saved Facts?',
      'This will remove all saved facts from your collection.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(SAVED_INSIGHTS_STORAGE_KEY);
              setSavedFactsCount(0);
              Alert.alert('Done', 'Saved facts were cleared.');
            } catch {
              Alert.alert('Error', 'Could not clear saved facts.');
            }
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/practice/practice_background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: insets.top + (isUltraSmallScreen ? 8 : isVerySmallScreen ? 10 : 16),
          paddingBottom:
            insets.bottom +
            (isUltraSmallScreen ? 150 : isVerySmallScreen ? 158 : isSmallScreen ? 168 : 190),
          paddingHorizontal: isUltraSmallScreen ? 10 : isVerySmallScreen ? 12 : 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.title,
            isSmallScreen && styles.titleSmall,
            isUltraSmallScreen && styles.titleUltraSmall,
          ]}
        >
          Profile
        </Text>

        <View style={[styles.topLine, isUltraSmallScreen && styles.topLineSmall]} />

        <View
          style={[
            styles.summaryCard,
            isVerySmallScreen && styles.summaryCardSmall,
            isUltraSmallScreen && styles.summaryCardUltraSmall,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              isSmallScreen && styles.sectionTitleSmall,
              isUltraSmallScreen && styles.sectionTitleUltraSmall,
            ]}
          >
            Your Progress
          </Text>

          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                isSmallScreen && styles.summaryLabelSmall,
                isUltraSmallScreen && styles.summaryLabelUltraSmall,
              ]}
            >
              Completed levels
            </Text>
            <Text
              style={[
                styles.summaryValue,
                isSmallScreen && styles.summaryValueSmall,
                isUltraSmallScreen && styles.summaryValueUltraSmall,
              ]}
            >
              {totalCompletedLevels}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                isSmallScreen && styles.summaryLabelSmall,
                isUltraSmallScreen && styles.summaryLabelUltraSmall,
              ]}
            >
              Saved facts
            </Text>
            <Text
              style={[
                styles.summaryValue,
                isSmallScreen && styles.summaryValueSmall,
                isUltraSmallScreen && styles.summaryValueUltraSmall,
              ]}
            >
              {savedFactsCount}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                isSmallScreen && styles.summaryLabelSmall,
                isUltraSmallScreen && styles.summaryLabelUltraSmall,
              ]}
            >
              Best score
            </Text>
            <Text
              style={[
                styles.summaryValue,
                isSmallScreen && styles.summaryValueSmall,
                isUltraSmallScreen && styles.summaryValueUltraSmall,
              ]}
            >
              {bestScore}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                isSmallScreen && styles.summaryLabelSmall,
                isUltraSmallScreen && styles.summaryLabelUltraSmall,
              ]}
            >
              Total answered
            </Text>
            <Text
              style={[
                styles.summaryValue,
                isSmallScreen && styles.summaryValueSmall,
                isUltraSmallScreen && styles.summaryValueUltraSmall,
              ]}
            >
              {totalAnsweredQuestions}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                isSmallScreen && styles.summaryLabelSmall,
                isUltraSmallScreen && styles.summaryLabelUltraSmall,
              ]}
            >
              Correct answers
            </Text>
            <Text
              style={[
                styles.summaryValue,
                isSmallScreen && styles.summaryValueSmall,
                isUltraSmallScreen && styles.summaryValueUltraSmall,
              ]}
            >
              {totalCorrectAnswers}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.summaryRowNoMargin]}>
            <Text
              style={[
                styles.summaryLabel,
                isSmallScreen && styles.summaryLabelSmall,
                isUltraSmallScreen && styles.summaryLabelUltraSmall,
              ]}
            >
              Accuracy
            </Text>
            <Text
              style={[
                styles.summaryValue,
                isSmallScreen && styles.summaryValueSmall,
                isUltraSmallScreen && styles.summaryValueUltraSmall,
              ]}
            >
              {overallAccuracy}%
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.sectionCard,
            isVerySmallScreen && styles.sectionCardSmall,
            isUltraSmallScreen && styles.sectionCardUltraSmall,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              isSmallScreen && styles.sectionTitleSmall,
              isUltraSmallScreen && styles.sectionTitleUltraSmall,
            ]}
          >
            App Controls
          </Text>

          <View style={[styles.toggleRow, isUltraSmallScreen && styles.toggleRowUltraSmall]}>
            <View style={styles.toggleTextWrap}>
              <Text
                style={[
                  styles.toggleTitle,
                  isSmallScreen && styles.toggleTitleSmall,
                  isUltraSmallScreen && styles.toggleTitleUltraSmall,
                ]}
              >
                Notifications
              </Text>
              <Text
                style={[
                  styles.toggleSubtitle,
                  isSmallScreen && styles.toggleSubtitleSmall,
                  isUltraSmallScreen && styles.toggleSubtitleUltraSmall,
                ]}
              >
                Enable app reminders and notices
              </Text>
            </View>

            <Switch
              value={settings.notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#2B3270', true: '#F0B300' }}
              thumbColor="#F3F4F6"
            />
          </View>

          <View style={styles.divider} />

          <View style={[styles.toggleRow, isUltraSmallScreen && styles.toggleRowUltraSmall]}>
            <View style={styles.toggleTextWrap}>
              <Text
                style={[
                  styles.toggleTitle,
                  isSmallScreen && styles.toggleTitleSmall,
                  isUltraSmallScreen && styles.toggleTitleUltraSmall,
                ]}
              >
                Haptics
              </Text>
              <Text
                style={[
                  styles.toggleSubtitle,
                  isSmallScreen && styles.toggleSubtitleSmall,
                  isUltraSmallScreen && styles.toggleSubtitleUltraSmall,
                ]}
              >
                Enable small touch feedback
              </Text>
            </View>

            <Switch
              value={settings.hapticsEnabled}
              onValueChange={toggleHaptics}
              trackColor={{ false: '#2B3270', true: '#F0B300' }}
              thumbColor="#F3F4F6"
            />
          </View>

          <View style={styles.divider} />

          <View style={[styles.toggleRow, isUltraSmallScreen && styles.toggleRowUltraSmall]}>
            <View style={styles.toggleTextWrap}>
              <Text
                style={[
                  styles.toggleTitle,
                  isSmallScreen && styles.toggleTitleSmall,
                  isUltraSmallScreen && styles.toggleTitleUltraSmall,
                ]}
              >
                Quick Resume
              </Text>
              <Text
                style={[
                  styles.toggleSubtitle,
                  isSmallScreen && styles.toggleSubtitleSmall,
                  isUltraSmallScreen && styles.toggleSubtitleUltraSmall,
                ]}
              >
                Continue from your latest saved point
              </Text>
            </View>

            <Switch
              value={settings.quickResumeEnabled}
              onValueChange={toggleQuickResume}
              trackColor={{ false: '#2B3270', true: '#F0B300' }}
              thumbColor="#F3F4F6"
            />
          </View>
        </View>

        <View
          style={[
            styles.sectionCard,
            isVerySmallScreen && styles.sectionCardSmall,
            isUltraSmallScreen && styles.sectionCardUltraSmall,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              isSmallScreen && styles.sectionTitleSmall,
              isUltraSmallScreen && styles.sectionTitleUltraSmall,
            ]}
          >
            Shortcuts
          </Text>

          <Pressable style={[styles.actionButton, isUltraSmallScreen && styles.actionButtonUltraSmall]} onPress={handleOpenStatistics}>
            <Text
              style={[
                styles.actionButtonText,
                isSmallScreen && styles.actionButtonTextSmall,
                isUltraSmallScreen && styles.actionButtonTextUltraSmall,
              ]}
            >
              Open Statistics
            </Text>
          </Pressable>

          <Pressable style={[styles.actionButton, isUltraSmallScreen && styles.actionButtonUltraSmall]} onPress={handleOpenSavedFacts}>
            <Text
              style={[
                styles.actionButtonText,
                isSmallScreen && styles.actionButtonTextSmall,
                isUltraSmallScreen && styles.actionButtonTextUltraSmall,
              ]}
            >
              Open Saved Facts
            </Text>
          </Pressable>

          <Pressable style={[styles.actionButton, isUltraSmallScreen && styles.actionButtonUltraSmall]} onPress={handleShareApp}>
            <Text
              style={[
                styles.actionButtonText,
                isSmallScreen && styles.actionButtonTextSmall,
                isUltraSmallScreen && styles.actionButtonTextUltraSmall,
              ]}
            >
              Share App
            </Text>
          </Pressable>

          <Pressable style={[styles.actionButton, isUltraSmallScreen && styles.actionButtonUltraSmall]} onPress={handleAbout}>
            <Text
              style={[
                styles.actionButtonText,
                isSmallScreen && styles.actionButtonTextSmall,
                isUltraSmallScreen && styles.actionButtonTextUltraSmall,
              ]}
            >
              About
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.sectionCard,
            isVerySmallScreen && styles.sectionCardSmall,
            isUltraSmallScreen && styles.sectionCardUltraSmall,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              isSmallScreen && styles.sectionTitleSmall,
              isUltraSmallScreen && styles.sectionTitleUltraSmall,
            ]}
          >
            Data
          </Text>

          <Pressable style={[styles.warningButton, isUltraSmallScreen && styles.actionButtonUltraSmall]} onPress={handleResetProgress}>
            <Text
              style={[
                styles.warningButtonText,
                isSmallScreen && styles.warningButtonTextSmall,
                isUltraSmallScreen && styles.warningButtonTextUltraSmall,
              ]}
            >
              Reset Progress
            </Text>
          </Pressable>

          <Pressable style={[styles.warningButton, isUltraSmallScreen && styles.actionButtonUltraSmall]} onPress={handleClearSavedFacts}>
            <Text
              style={[
                styles.warningButtonText,
                isSmallScreen && styles.warningButtonTextSmall,
                isUltraSmallScreen && styles.warningButtonTextUltraSmall,
              ]}
            >
              Clear Saved Facts
            </Text>
          </Pressable>
        </View>

        <Text
          style={[
            styles.versionText,
            isSmallScreen && styles.versionTextSmall,
            isUltraSmallScreen && styles.versionTextUltraSmall,
          ]}
        >
          Brain Arena • Version 1.0
        </Text>
      </ScrollView>

      <Modal
        visible={statisticsModalVisible}
        animationType="fade"
        transparent
        onRequestClose={handleCloseStatistics}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              isVerySmallScreen && styles.modalCardSmall,
              { width: modalWidth },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                isUltraSmallScreen && styles.modalTitleUltraSmall,
              ]}
            >
              Statistics
            </Text>

            <View style={[styles.chartArea, { height: chartHeight }]}>
              {chartItems.map((item) => (
                <View key={item.key} style={styles.chartColumnWrap}>
                  <Text
                    style={[
                      styles.chartPercent,
                      isUltraSmallScreen && styles.chartPercentUltraSmall,
                    ]}
                  >
                    {item.value}%
                  </Text>

                  <View style={[styles.chartTrack, { height: chartTrackHeight }]}>
                    <View
                      style={[
                        styles.chartBar,
                        {
                          height: `${Math.max(item.value, 4)}%`,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                  </View>

                  <Text
                    style={[
                      styles.chartLabelTop,
                      isUltraSmallScreen && styles.chartLabelTopUltraSmall,
                    ]}
                  >
                    {item.label}
                  </Text>

                  <Text
                    style={[
                      styles.chartLabelBottom,
                      isUltraSmallScreen && styles.chartLabelBottomUltraSmall,
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.modalStatsBox}>
              <View style={styles.modalStatsRow}>
                <Text style={styles.modalStatsLabel}>Completed levels</Text>
                <Text style={styles.modalStatsValue}>{totalCompletedLevels}</Text>
              </View>

              <View style={styles.modalStatsRow}>
                <Text style={styles.modalStatsLabel}>Saved facts</Text>
                <Text style={styles.modalStatsValue}>{savedFactsCount}</Text>
              </View>

              <View style={styles.modalStatsRow}>
                <Text style={styles.modalStatsLabel}>Best score</Text>
                <Text style={styles.modalStatsValue}>{bestScore}</Text>
              </View>

              <View style={styles.modalStatsRow}>
                <Text style={styles.modalStatsLabel}>Total answered</Text>
                <Text style={styles.modalStatsValue}>{totalAnsweredQuestions}</Text>
              </View>

              <View style={styles.modalStatsRow}>
                <Text style={styles.modalStatsLabel}>Correct answers</Text>
                <Text style={styles.modalStatsValue}>{totalCorrectAnswers}</Text>
              </View>

              <View style={[styles.modalStatsRow, styles.modalStatsRowNoMargin]}>
                <Text style={styles.modalStatsLabel}>Accuracy</Text>
                <Text style={styles.modalStatsValue}>{overallAccuracy}%</Text>
              </View>
            </View>

            <Pressable style={styles.closeModalButton} onPress={handleCloseStatistics}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2030C7',
  },

  container: {
    flex: 1,
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

  titleUltraSmall: {
    fontSize: 17,
    marginBottom: 8,
  },

  topLine: {
    height: 1.5,
    backgroundColor: '#E1B21A',
    marginBottom: 18,
  },

  topLineSmall: {
    marginBottom: 12,
  },

  summaryCard: {
    backgroundColor: 'rgba(7, 18, 74, 0.95)',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E1B21A',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },

  summaryCardSmall: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },

  summaryCardUltraSmall: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },

  sectionCard: {
    backgroundColor: 'rgba(7, 18, 74, 0.95)',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E1B21A',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },

  sectionCardSmall: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },

  sectionCardUltraSmall: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },

  sectionTitle: {
    color: '#F0B300',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
    textShadowColor: '#111111',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },

  sectionTitleSmall: {
    fontSize: 16,
    marginBottom: 12,
  },

  sectionTitleUltraSmall: {
    fontSize: 15,
    marginBottom: 10,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 32,
    marginBottom: 8,
  },

  summaryRowNoMargin: {
    marginBottom: 0,
  },

  summaryLabel: {
    color: '#F3F6FF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },

  summaryLabelSmall: {
    fontSize: 12.5,
  },

  summaryLabelUltraSmall: {
    fontSize: 11.5,
    paddingRight: 8,
  },

  summaryValue: {
    color: '#F0B300',
    fontSize: 15,
    fontWeight: '900',
  },

  summaryValueSmall: {
    fontSize: 13.5,
  },

  summaryValueUltraSmall: {
    fontSize: 12.5,
  },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 54,
  },

  toggleRowUltraSmall: {
    minHeight: 50,
  },

  toggleTextWrap: {
    flex: 1,
    paddingRight: 12,
  },

  toggleTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },

  toggleTitleSmall: {
    fontSize: 13.5,
  },

  toggleTitleUltraSmall: {
    fontSize: 12.5,
    marginBottom: 3,
  },

  toggleSubtitle: {
    color: '#D7DEF7',
    fontSize: 12,
    lineHeight: 16,
  },

  toggleSubtitleSmall: {
    fontSize: 11,
    lineHeight: 15,
  },

  toggleSubtitleUltraSmall: {
    fontSize: 10,
    lineHeight: 13,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(225, 178, 26, 0.22)',
    marginVertical: 10,
  },

  actionButton: {
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: '#F0B300',
    borderWidth: 1.2,
    borderColor: '#8A5600',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  actionButtonUltraSmall: {
    minHeight: 42,
    borderRadius: 9,
    marginBottom: 10,
    paddingHorizontal: 12,
  },

  actionButtonText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },

  actionButtonTextSmall: {
    fontSize: 13.5,
  },

  actionButtonTextUltraSmall: {
    fontSize: 12,
  },

  warningButton: {
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: '#B91C1C',
    borderWidth: 1.2,
    borderColor: '#7F1111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  warningButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },

  warningButtonTextSmall: {
    fontSize: 13.5,
  },

  warningButtonTextUltraSmall: {
    fontSize: 12,
  },

  versionText: {
    color: '#F3F6FF',
    fontSize: 12.5,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  },

  versionTextSmall: {
    fontSize: 11.5,
  },

  versionTextUltraSmall: {
    fontSize: 10.5,
    marginTop: 2,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 10, 28, 0.76)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },

  modalCard: {
    backgroundColor: '#0C165B',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E1B21A',
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
  },

  modalCardSmall: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 16,
  },

  modalTitle: {
    color: '#F0B300',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
  },

  modalTitleUltraSmall: {
    fontSize: 16,
    marginBottom: 10,
  },

  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  chartColumnWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 3,
  },

  chartPercent: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 6,
  },

  chartPercentUltraSmall: {
    fontSize: 9,
    marginBottom: 4,
  },

  chartTrack: {
    width: '100%',
    maxWidth: 58,
    borderRadius: 10,
    backgroundColor: '#1D2A84',
    borderWidth: 1,
    borderColor: '#3145C8',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    padding: 4,
  },

  chartBar: {
    width: '100%',
    borderRadius: 8,
  },

  chartLabelTop: {
    color: '#DDE4FF',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
    minHeight: 14,
  },

  chartLabelTopUltraSmall: {
    fontSize: 8,
    marginTop: 6,
    minHeight: 12,
  },

  chartLabelBottom: {
    color: '#F0B300',
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 4,
  },

  chartLabelBottomUltraSmall: {
    fontSize: 8,
    marginTop: 3,
  },

  modalStatsBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  modalStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 28,
    marginBottom: 6,
  },

  modalStatsRowNoMargin: {
    marginBottom: 0,
  },

  modalStatsLabel: {
    color: '#F3F6FF',
    fontSize: 12.5,
    fontWeight: '600',
    flex: 1,
    paddingRight: 8,
  },

  modalStatsValue: {
    color: '#F0B300',
    fontSize: 13.5,
    fontWeight: '900',
  },

  closeModalButton: {
    alignSelf: 'center',
    minWidth: 120,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#F0B300',
    borderWidth: 1.2,
    borderColor: '#8A5600',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  closeModalButtonText: {
    color: '#161616',
    fontSize: 13,
    fontWeight: '900',
  },
});