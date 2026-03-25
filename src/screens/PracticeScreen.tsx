import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Modal,
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
import type { PracticeMode, RootStackParamList } from '../navigation/navTypes';
import { logicData, type LogicLevel } from '../data/logicData';
import { patternData, type PatternLevel } from '../data/patternData';
import { wordData, type WordLevel } from '../data/wordData';
import { mathData, type MathLevel } from '../data/mathData';

type Props = NativeStackScreenProps<RootStackParamList, 'Practice'>;

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

type QuizLevel = {
  level: number;
  title: string;
  intro?: string;
  questions: QuizQuestion[];
};

type StoredProgress = {
  levelIndex: number;
  questionIndex: number;
  correctAnswers: number;
  phase: 'intro' | 'game';
};

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

const STATS_STORAGE_KEY = 'brain_arena_global_stats_v2';
const PROGRESS_PREFIX = 'brain_arena_progress_v2_';

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

export default function PracticeScreen({ navigation, route }: Props) {
  const { mode } = route.params;
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const small = height < 760;
  const verySmall = height < 700;

  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [levelIndex, setLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [resultState, setResultState] = useState<'idle' | 'win' | 'lose'>('idle');
  const [lastScore, setLastScore] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [statsMap, setStatsMap] = useState<StoredStatsMap>(defaultStats);

  const config = useMemo(() => {
    switch (mode) {
      case 'logic':
        return {
          title: 'Logic Core',
          progressKey: `${PROGRESS_PREFIX}logic`,
          listBackground: require('../assets/images/practice/practice_background1.png'),
          introBackground: require('../assets/images/practice/logic_core_start.png'),
          brainImage: require('../assets/images/practice/logic_core_brain.png'),
          winImage: require('../assets/images/practice/logic_core_win.png'),
          loseImage: require('../assets/images/practice/logic_core_lose.png'),
          levels: logicData as LogicLevel[],
          passScore: 3,
          introFallback: 'Test your reasoning.',
          subtitleFallback: 'Every choice matters — think before you decide.',
        };
      case 'pattern':
        return {
          title: 'Pattern Zone',
          progressKey: `${PROGRESS_PREFIX}pattern`,
          listBackground: require('../assets/images/practice/practice_background1.png'),
          introBackground: require('../assets/images/practice/pattern_zone_start.png'),
          brainImage: require('../assets/images/practice/logic_core_brain.png'),
          winImage: require('../assets/images/practice/logic_core_win.png'),
          loseImage: require('../assets/images/practice/logic_core_lose.png'),
          levels: patternData as PatternLevel[],
          passScore: 3,
          introFallback: 'Find the hidden pattern.',
          subtitleFallback: 'Look carefully before you choose.',
        };
      case 'word':
        return {
          title: 'Word Lab',
          progressKey: `${PROGRESS_PREFIX}word`,
          listBackground: require('../assets/images/practice/practice_background1.png'),
          introBackground: require('../assets/images/practice/word_lab_start.png'),
          brainImage: require('../assets/images/practice/logic_core_brain.png'),
          winImage: require('../assets/images/practice/logic_core_win.png'),
          loseImage: require('../assets/images/practice/logic_core_lose.png'),
          levels: wordData as WordLevel[],
          passScore: 4,
          introFallback: 'Connect ideas and meaning.',
          subtitleFallback: 'Read carefully before you answer.',
        };
      case 'math':
        return {
          title: 'Quick Math Pro',
          progressKey: `${PROGRESS_PREFIX}math`,
          listBackground: require('../assets/images/practice/practice_background1.png'),
          introBackground: require('../assets/images/practice/quick_math_start.png'),
          brainImage: require('../assets/images/practice/logic_core_brain.png'),
          winImage: require('../assets/images/practice/logic_core_win.png'),
          loseImage: require('../assets/images/practice/logic_core_lose.png'),
          levels: mathData as MathLevel[],
          passScore: 4,
          introFallback: 'Think fast and stay accurate.',
          subtitleFallback: 'Solve each task step by step.',
        };
      default:
        return {
          title: 'Logic Core',
          progressKey: `${PROGRESS_PREFIX}logic`,
          listBackground: require('../assets/images/practice/practice_background1.png'),
          introBackground: require('../assets/images/practice/logic_core_start.png'),
          brainImage: require('../assets/images/practice/logic_core_brain.png'),
          winImage: require('../assets/images/practice/logic_core_win.png'),
          loseImage: require('../assets/images/practice/logic_core_lose.png'),
          levels: logicData as LogicLevel[],
          passScore: 3,
          introFallback: 'Test your reasoning.',
          subtitleFallback: 'Every choice matters — think before you decide.',
        };
    }
  }, [mode]);

  const levels = config.levels as QuizLevel[];
  const currentLevel = levels[levelIndex];
  const currentQuestion = currentLevel.questions[questionIndex];
  const totalQuestions = currentLevel.questions.length;

  const introImageWidth = verySmall ? 210 : small ? 240 : 270;
  const introImageHeight = verySmall ? 180 : small ? 210 : 235;
  const resultWidth = verySmall ? 190 : small ? 220 : 248;
  const resultHeight = verySmall ? 148 : small ? 172 : 190;
  const brainSize = verySmall ? 84 : small ? 96 : 108;
  const questionCardWidth = Math.min(width - (verySmall ? 30 : 36), 340);
  const modalWidth = Math.min(width - 28, 360);

  const loadStats = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STATS_STORAGE_KEY);
      if (!raw) {
        setStatsMap(defaultStats);
        return;
      }

      const parsed = JSON.parse(raw) as Partial<StoredStatsMap>;

      setStatsMap({
        logic: { ...defaultModeStats, ...(parsed.logic ?? {}) },
        pattern: { ...defaultModeStats, ...(parsed.pattern ?? {}) },
        word: { ...defaultModeStats, ...(parsed.word ?? {}) },
        math: { ...defaultModeStats, ...(parsed.math ?? {}) },
      });
    } catch {
      setStatsMap(defaultStats);
    }
  }, []);

  const saveStats = useCallback(
    async (currentMode: PracticeMode, score: number, total: number, passed: boolean) => {
      try {
        const raw = await AsyncStorage.getItem(STATS_STORAGE_KEY);
        const parsed: StoredStatsMap = raw
          ? {
              logic: { ...defaultModeStats, ...(JSON.parse(raw).logic ?? {}) },
              pattern: { ...defaultModeStats, ...(JSON.parse(raw).pattern ?? {}) },
              word: { ...defaultModeStats, ...(JSON.parse(raw).word ?? {}) },
              math: { ...defaultModeStats, ...(JSON.parse(raw).math ?? {}) },
            }
          : defaultStats;

        const current = parsed[currentMode] ?? { ...defaultModeStats };

        const updated: StoredStatsMap = {
          ...parsed,
          [currentMode]: {
            completedLevels: current.completedLevels + (passed ? 1 : 0),
            bestScore: Math.max(current.bestScore, score),
            totalQuestions: current.totalQuestions + total,
            correctAnswersTotal: current.correctAnswersTotal + score,
          },
        };

        await AsyncStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));
        setStatsMap(updated);
      } catch {}
    },
    []
  );

  const saveProgress = useCallback(
    async (
      nextLevelIndex: number,
      nextQuestionIndex: number,
      nextCorrectAnswers: number,
      nextPhase: 'intro' | 'game'
    ) => {
      const payload: StoredProgress = {
        levelIndex: nextLevelIndex,
        questionIndex: nextQuestionIndex,
        correctAnswers: nextCorrectAnswers,
        phase: nextPhase,
      };

      await AsyncStorage.setItem(config.progressKey, JSON.stringify(payload));
    },
    [config.progressKey]
  );

  const clearProgress = useCallback(async () => {
    await AsyncStorage.removeItem(config.progressKey);
  }, [config.progressKey]);

  const loadProgress = useCallback(async () => {
    try {
      setIsLoading(true);

      const raw = await AsyncStorage.getItem(config.progressKey);

      if (!raw) {
        setLevelIndex(0);
        setQuestionIndex(0);
        setCorrectAnswers(0);
        setSelectedIndex(null);
        setIsLocked(false);
        setResultState('idle');
        setLastScore(0);
        setShowIntro(true);
        return;
      }

      const parsed: StoredProgress = JSON.parse(raw);

      const safeLevelIndex =
        parsed.levelIndex >= 0 && parsed.levelIndex < levels.length ? parsed.levelIndex : 0;

      const safeQuestionIndex =
        parsed.questionIndex >= 0 &&
        parsed.questionIndex < levels[safeLevelIndex].questions.length
          ? parsed.questionIndex
          : 0;

      setLevelIndex(safeLevelIndex);
      setQuestionIndex(safeQuestionIndex);
      setCorrectAnswers(parsed.correctAnswers ?? 0);
      setSelectedIndex(null);
      setIsLocked(false);
      setResultState('idle');
      setLastScore(0);
      setShowIntro(parsed.phase !== 'game');
    } catch {
      setLevelIndex(0);
      setQuestionIndex(0);
      setCorrectAnswers(0);
      setSelectedIndex(null);
      setIsLocked(false);
      setResultState('idle');
      setLastScore(0);
      setShowIntro(true);
    } finally {
      setIsLoading(false);
    }
  }, [config.progressKey, levels]);

  useFocusEffect(
    useCallback(() => {
      loadProgress();
      loadStats();
    }, [loadProgress, loadStats])
  );

  useEffect(() => {
    if (isLoading || resultState !== 'idle') {
      return;
    }

    saveProgress(levelIndex, questionIndex, correctAnswers, showIntro ? 'intro' : 'game').catch(
      () => {}
    );
  }, [isLoading, levelIndex, questionIndex, correctAnswers, showIntro, resultState, saveProgress]);

  const handleBack = () => {
    if (showIntro || resultState !== 'idle') {
      navigation.goBack();
      return;
    }

    Alert.alert(
      `Exit ${config.title}?`,
      'Your level progress is saved and will continue from the same point.',
      [
        { text: 'Stay', style: 'cancel' },
        { text: 'Exit', onPress: () => navigation.goBack() },
      ]
    );
  };

  const startLevel = async () => {
    setResultState('idle');
    setShowIntro(false);
    await saveProgress(levelIndex, questionIndex, correctAnswers, 'game');
  };

  const openStats = async () => {
    await loadStats();
    setStatsVisible(true);
  };

  const closeStats = () => {
    setStatsVisible(false);
  };

  const handleNextLevel = async () => {
    const isLastLevel = levelIndex === levels.length - 1;

    if (isLastLevel) {
      await clearProgress();
      navigation.goBack();
      return;
    }

    const nextLevelIndex = levelIndex + 1;

    setLevelIndex(nextLevelIndex);
    setQuestionIndex(0);
    setCorrectAnswers(0);
    setSelectedIndex(null);
    setIsLocked(false);
    setResultState('idle');
    setLastScore(0);
    setShowIntro(true);

    await saveProgress(nextLevelIndex, 0, 0, 'intro');
  };

  const handleRetryLevel = async () => {
    setQuestionIndex(0);
    setCorrectAnswers(0);
    setSelectedIndex(null);
    setIsLocked(false);
    setResultState('idle');
    setLastScore(0);
    setShowIntro(true);

    await saveProgress(levelIndex, 0, 0, 'intro');
  };

  const handleAnswer = (index: number) => {
    if (isLocked) {
      return;
    }

    const isCorrect = index === currentQuestion.correctIndex;
    const nextCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;

    setSelectedIndex(index);
    setIsLocked(true);

    if (isCorrect) {
      setCorrectAnswers(nextCorrectAnswers);
    }

    setTimeout(async () => {
      const isLastQuestion = questionIndex === totalQuestions - 1;

      if (!isLastQuestion) {
        const nextQuestionIndex = questionIndex + 1;
        setQuestionIndex(nextQuestionIndex);
        setSelectedIndex(null);
        setIsLocked(false);
        await saveProgress(levelIndex, nextQuestionIndex, nextCorrectAnswers, 'game');
        return;
      }

      const passed = nextCorrectAnswers >= config.passScore;

      await saveStats(mode, nextCorrectAnswers, totalQuestions, passed);

      setLastScore(nextCorrectAnswers);
      setSelectedIndex(null);
      setIsLocked(false);

      if (passed) {
        const isLastLevel = levelIndex === levels.length - 1;

        if (isLastLevel) {
          await clearProgress();
        } else {
          await saveProgress(levelIndex + 1, 0, 0, 'intro');
        }

        setResultState('win');
      } else {
        await saveProgress(levelIndex, 0, 0, 'intro');
        setResultState('lose');
      }
    }, 850);
  };

  const getOptionStyle = (index: number) => {
    if (!isLocked) {
      return styles.optionButton;
    }

    if (index === currentQuestion.correctIndex) {
      return [styles.optionButton, styles.correctOption];
    }

    if (selectedIndex === index && index !== currentQuestion.correctIndex) {
      return [styles.optionButton, styles.wrongOption];
    }

    return [styles.optionButton, styles.neutralLockedOption];
  };

  const getOptionTextStyle = (index: number) => {
    if (!isLocked) {
      return styles.optionText;
    }

    if (index === currentQuestion.correctIndex) {
      return [styles.optionText, styles.correctOptionText];
    }

    if (selectedIndex === index && index !== currentQuestion.correctIndex) {
      return [styles.optionText, styles.wrongOptionText];
    }

    return [styles.optionText, styles.neutralLockedOptionText];
  };

  const getProgressPercent = (entry: ModeStats) => {
    if (!entry.totalQuestions || entry.totalQuestions <= 0) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(100, Math.round((entry.correctAnswersTotal / entry.totalQuestions) * 100))
    );
  };

  const chartItems = [
    {
      key: 'logic',
      title: 'Logic Core',
      value: getProgressPercent(statsMap.logic),
      label: `${statsMap.logic.correctAnswersTotal}/${statsMap.logic.totalQuestions || 0}`,
      color: '#FF6B6B',
    },
    {
      key: 'pattern',
      title: 'Pattern Zone',
      value: getProgressPercent(statsMap.pattern),
      label: `${statsMap.pattern.correctAnswersTotal}/${statsMap.pattern.totalQuestions || 0}`,
      color: '#6BCB77',
    },
    {
      key: 'word',
      title: 'Word Lab',
      value: getProgressPercent(statsMap.word),
      label: `${statsMap.word.correctAnswersTotal}/${statsMap.word.totalQuestions || 0}`,
      color: '#4D96FF',
    },
    {
      key: 'math',
      title: 'Quick Math Pro',
      value: getProgressPercent(statsMap.math),
      label: `${statsMap.math.correctAnswersTotal}/${statsMap.math.totalQuestions || 0}`,
      color: '#FFD93D',
    },
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#F0B300" />
      </View>
    );
  }

  const content = (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + (verySmall ? 8 : 12),
        paddingBottom: insets.bottom + (verySmall ? 90 : 110),
        paddingHorizontal: verySmall ? 12 : 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topRow}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={[styles.screenTitle, small && styles.screenTitleSmall]}>{config.title}</Text>

        <View style={styles.rightBadge}>
          <Text style={[styles.rightBadgeText, verySmall && styles.rightBadgeTextSmall]}>
            L{currentLevel.level}
          </Text>
        </View>
      </View>

      <View style={styles.topLine} />

      {showIntro ? (
        <View style={[styles.introWrap, { minHeight: height - insets.top - insets.bottom - 160 }]}>
          <Image
            source={config.introBackground}
            resizeMode="contain"
            style={{ width: introImageWidth, height: introImageHeight }}
          />

          <Text style={[styles.introTitle, small && styles.introTitleSmall]}>
            {currentLevel.intro || config.introFallback}
          </Text>

          <Text style={[styles.introSubtext, small && styles.introSubtextSmall]}>
            {config.subtitleFallback}
          </Text>

          <Pressable
            style={[styles.startButton, verySmall && styles.startButtonSmall]}
            onPress={startLevel}
          >
            <Text style={[styles.startButtonText, verySmall && styles.startButtonTextSmall]}>
              {questionIndex > 0 ? 'Continue Level' : 'Start Rank'}
            </Text>
          </Pressable>
        </View>
      ) : resultState === 'idle' ? (
        <View
          style={[styles.questionWrap, { minHeight: height - insets.top - insets.bottom - 170 }]}
        >
          <View style={[styles.questionCard, { width: questionCardWidth }]}>
            <Text style={[styles.questionText, small && styles.questionTextSmall]}>
              {currentQuestion.question}
            </Text>
          </View>

          <View style={styles.optionsWrap}>
            {currentQuestion.options.map((option, index) => (
              <Pressable
                key={`${currentQuestion.id}-${index}`}
                style={getOptionStyle(index)}
                onPress={() => handleAnswer(index)}
                disabled={isLocked}
              >
                <Text style={[getOptionTextStyle(index), verySmall && styles.optionTextSmall]}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>

          <Image
            source={config.brainImage}
            resizeMode="contain"
            style={{ width: brainSize, height: brainSize }}
          />
        </View>
      ) : (
        <View style={[styles.resultWrap, { minHeight: height - insets.top - insets.bottom - 170 }]}>
          <Image
            source={resultState === 'win' ? config.winImage : config.loseImage}
            resizeMode="contain"
            style={{ width: resultWidth, height: resultHeight }}
          />

          <Text style={[styles.resultTitle, small && styles.resultTitleSmall]}>
            {resultState === 'win' ? 'Level Complete' : 'Try Again'}
          </Text>

          <View style={[styles.resultCard, verySmall && styles.resultCardSmall]}>
            <Text style={[styles.resultText, small && styles.resultTextSmall]}>
              {resultState === 'win'
                ? `You finished this level. Score: ${lastScore}/${totalQuestions}.`
                : `Not this time. Adjust your thinking and try again. Score: ${lastScore}/${totalQuestions}.`}
            </Text>
          </View>

          {resultState === 'win' ? (
            <Pressable
              style={[styles.resultButton, verySmall && styles.resultButtonSmall]}
              onPress={handleNextLevel}
            >
              <Text style={[styles.resultButtonText, verySmall && styles.resultButtonTextSmall]}>
                {levelIndex === levels.length - 1 ? 'Finish Mode' : 'Next Level'}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={[styles.resultButton, verySmall && styles.resultButtonSmall]}
              onPress={handleRetryLevel}
            >
              <Text style={[styles.resultButtonText, verySmall && styles.resultButtonTextSmall]}>
                Retry
              </Text>
            </Pressable>
          )}

          <Pressable
            style={[styles.resultButtonSecondary, verySmall && styles.resultButtonSmall]}
            onPress={openStats}
          >
            <Text style={[styles.resultButtonText, verySmall && styles.resultButtonTextSmall]}>
              Open Statistics
            </Text>
          </Pressable>

          <Pressable
            style={[styles.resultButtonSecondary, verySmall && styles.resultButtonSmall]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.resultButtonText, verySmall && styles.resultButtonTextSmall]}>
              Exit
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );

  return (
    <>
      {showIntro ? (
        <ImageBackground source={config.listBackground} resizeMode="cover" style={styles.background}>
          {content}
        </ImageBackground>
      ) : (
        <View style={styles.gameBackground}>{content}</View>
      )}

      <Modal visible={statsVisible} transparent animationType="fade" onRequestClose={closeStats}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { width: modalWidth }]}>
            <Text style={styles.modalTitle}>Statistics</Text>

            <View style={styles.chartArea}>
              {chartItems.map((item) => (
                <View key={item.key} style={styles.chartColumnWrap}>
                  <Text style={styles.chartPercent}>{item.value}%</Text>

                  <View style={styles.chartTrack}>
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

                  <Text style={styles.chartLabelTop}>{item.label}</Text>
                  <Text style={styles.chartLabelBottom}>{item.title}</Text>
                </View>
              ))}
            </View>

            <Pressable style={styles.closeModalButton} onPress={closeStats}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  loadingWrap: {
    flex: 1,
    backgroundColor: '#1026AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: '#1026AF',
  },
  gameBackground: {
    flex: 1,
    backgroundColor: '#1026AF',
  },
  container: {
    flex: 1,
  },
  topRow: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backText: {
    color: '#F0B300',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 24,
  },
  screenTitle: {
    flex: 1,
    color: '#F0B300',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#09122E',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  screenTitleSmall: {
    fontSize: 14,
  },
  rightBadge: {
    minWidth: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightBadgeText: {
    color: '#F0B300',
    fontSize: 12.5,
    fontWeight: '800',
  },
  rightBadgeTextSmall: {
    fontSize: 11.5,
  },
  topLine: {
    height: 1.5,
    backgroundColor: '#E1B21A',
    marginBottom: 18,
  },
  introWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  introTitle: {
    color: '#F0B300',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 8,
    textShadowColor: '#09122E',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  introTitleSmall: {
    fontSize: 16,
  },
  introSubtext: {
    color: '#F3F6FF',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    marginBottom: 18,
    maxWidth: 300,
  },
  introSubtextSmall: {
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 16,
    maxWidth: 280,
  },
  startButton: {
    minWidth: 128,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0B300',
    borderWidth: 1.2,
    borderColor: '#8A5600',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  startButtonSmall: {
    minWidth: 112,
    height: 36,
    paddingHorizontal: 14,
  },
  startButtonText: {
    color: '#161616',
    fontSize: 13.5,
    fontWeight: '900',
  },
  startButtonTextSmall: {
    fontSize: 12.5,
  },
  questionWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  questionCard: {
    minHeight: 96,
    backgroundColor: '#C8ECFA',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  questionText: {
    color: '#1A2330',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  questionTextSmall: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  optionsWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  optionButton: {
    width: '100%',
    maxWidth: 235,
    minHeight: 38,
    borderRadius: 6,
    backgroundColor: '#F8D111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  correctOption: {
    backgroundColor: '#63F06D',
  },
  wrongOption: {
    backgroundColor: '#E9552F',
  },
  neutralLockedOption: {
    backgroundColor: '#8E7A1A',
  },
  optionText: {
    color: '#161616',
    fontSize: 11.5,
    fontWeight: '800',
    textAlign: 'center',
  },
  optionTextSmall: {
    fontSize: 10.5,
  },
  correctOptionText: {
    color: '#111111',
  },
  wrongOptionText: {
    color: '#111111',
  },
  neutralLockedOptionText: {
    color: '#111111',
  },
  resultWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  resultTitle: {
    color: '#F0B300',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 10,
    textShadowColor: '#09122E',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  resultTitleSmall: {
    fontSize: 16,
  },
  resultCard: {
    width: '100%',
    maxWidth: 280,
    backgroundColor: '#09134F',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E1B21A',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  resultCardSmall: {
    maxWidth: 255,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  resultText: {
    color: '#F3F6FF',
    fontSize: 11.5,
    lineHeight: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  resultTextSmall: {
    fontSize: 10.5,
    lineHeight: 15,
  },
  resultButton: {
    minWidth: 132,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#B400FF',
    borderWidth: 1,
    borderColor: '#5A007B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  resultButtonSecondary: {
    minWidth: 132,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#9A00D6',
    borderWidth: 1,
    borderColor: '#550074',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  resultButtonSmall: {
    minWidth: 118,
    height: 34,
  },
  resultButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  resultButtonTextSmall: {
    fontSize: 11,
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
  modalTitle: {
    color: '#F0B300',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
  },
  chartArea: {
    height: 250,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chartColumnWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 4,
  },
  chartPercent: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 6,
  },
  chartTrack: {
    width: '100%',
    maxWidth: 58,
    height: 150,
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
  chartLabelBottom: {
    color: '#F0B300',
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 4,
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