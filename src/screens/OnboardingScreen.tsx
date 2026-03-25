import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/navTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

type IntroSlide = {
  id: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  image: any;
};

export default function OnboardingScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const riseAnim = useRef(new Animated.Value(0)).current;

  const slides = useMemo<IntroSlide[]>(
    () => [
      {
        id: 'core-begin',
        title: 'Train Your Mind',
        subtitle: 'Turn thinking into power through challenges that actually make you think',
        buttonLabel: 'Start',
        image: require('../assets/images/intro/intro_core_emblem.png'),
      },
      {
        id: 'arena-pick',
        title: 'Choose Your Arena',
        subtitle: 'Logic, patterns, words, math — each zone builds a different skill',
        buttonLabel: 'Next',
        image: require('../assets/images/intro/intro_skill_constellation.png'),
      },
      {
        id: 'focus-path',
        title: 'No Random. Just You.',
        subtitle: 'No chance, no randomness — only your decisions and thinking',
        buttonLabel: 'Continue',
        image: require('../assets/images/intro/intro_focus_emblem.png'),
      },
      {
        id: 'deep-think',
        title: 'Think Deeper',
        subtitle: 'Challenges evolve as your thinking grows stronger',
        buttonLabel: 'Next',
        image: require('../assets/images/intro/intro_think_gate.png'),
      },
      {
        id: 'speed-power',
        title: 'Speed Meets Power',
        subtitle: 'Sharpen your mind to react faster and think stronger',
        buttonLabel: 'Next',
        image: require('../assets/images/intro/intro_charge_bull.png'),
      },
      {
        id: 'enter-core',
        title: 'Enter the Challenge',
        subtitle: 'Step in and test how far your mind can go',
        buttonLabel: 'Begin',
        image: require('../assets/images/intro/intro_solar_ring.png'),
      },
    ],
    []
  );

  const isLast = index === slides.length - 1;
  const current = slides[index];

  const playTransition = (onMidpoint: () => void) => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 140,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(riseAnim, {
          toValue: 12,
          duration: 140,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(10),
    ]).start(() => {
      onMidpoint();

      riseAnim.setValue(-12);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(riseAnim, {
          toValue: 0,
          duration: 180,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (isLast) {
      navigation.replace('MainTabs');
      return;
    }

    playTransition(() => {
      setIndex(prev => prev + 1);
    });
  };

  const handleClose = () => {
    navigation.replace('MainTabs');
  };

  const small = height < 760;
  const verySmall = height < 700;

  const heroWidth =
    index === 1
      ? Math.min(width * 0.62, 250)
      : index === 3
      ? Math.min(width * 0.58, 230)
      : index === 4
      ? Math.min(width * 0.68, 270)
      : index === 5
      ? Math.min(width * 0.60, 240)
      : Math.min(width * 0.60, 245);

  const heroHeight =
    index === 4
      ? heroWidth * 0.72
      : index === 1
      ? heroWidth * 0.36
      : heroWidth * 0.95;

  return (
    <ImageBackground
      source={require('../assets/images/splash_background.png')}
      resizeMode="cover"
      style={styles.bg}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.root}>
          <View style={styles.topBar}>
            <Pressable style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: riseAnim }],
              },
            ]}
          >
            <View style={[styles.heroWrap, verySmall && styles.heroWrapSmall]}>
              <Image
                source={current.image}
                resizeMode="contain"
                style={{
                  width: heroWidth,
                  height: heroHeight,
                }}
              />
            </View>

            <Text style={[styles.title, small && styles.titleSmall]}>{current.title}</Text>

            <View style={[styles.noteCard, verySmall && styles.noteCardSmall]}>
              <Text style={[styles.noteText, small && styles.noteTextSmall]}>
                {current.subtitle}
              </Text>
            </View>

            <Pressable
              style={[
                styles.actionButton,
                small && styles.actionButtonSmall,
                isLast && styles.actionButtonWide,
              ]}
              onPress={handleNext}
            >
              <Text style={[styles.actionText, small && styles.actionTextSmall]}>
                {current.buttonLabel}
              </Text>
            </Pressable>
          </Animated.View>

          <View style={styles.bottomSpacer} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#2B36D3',
  },
  safe: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
  topBar: {
    paddingTop: 8,
    alignItems: 'flex-start',
  },
  closeButton: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#07112D',
    borderWidth: 1.2,
    borderColor: '#EAC21A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.24,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  closeText: {
    color: '#EAC21A',
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '700',
    marginTop: -1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  heroWrap: {
    minHeight: 210,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  heroWrapSmall: {
    minHeight: 180,
    marginBottom: 14,
  },
  title: {
    color: '#F2A907',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: '#09132F',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  titleSmall: {
    fontSize: 26,
    marginBottom: 10,
  },
  noteCard: {
    width: '100%',
    maxWidth: 292,
    minHeight: 64,
    backgroundColor: '#07124A',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5C21A',
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  noteCardSmall: {
    maxWidth: 284,
    minHeight: 60,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
  },
  noteText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
  noteTextSmall: {
    fontSize: 12,
    lineHeight: 16,
  },
  actionButton: {
    minWidth: 105,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#F0B000',
    borderWidth: 1.4,
    borderColor: '#7E4B00',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  actionButtonSmall: {
    height: 34,
    minWidth: 98,
    paddingHorizontal: 18,
  },
  actionButtonWide: {
    minWidth: 112,
  },
  actionText: {
    color: '#141414',
    fontSize: 15,
    fontWeight: '900',
  },
  actionTextSmall: {
    fontSize: 14,
  },
  bottomSpacer: {
    height: 14,
  },
});