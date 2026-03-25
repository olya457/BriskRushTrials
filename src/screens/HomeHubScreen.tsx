import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, PracticeMode } from '../navigation/navTypes';
import ModeCard from '../components/ModeCard';

type StackNav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeHubScreen() {
  const navigation = useNavigation<StackNav>();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const small = height < 760;
  const verySmall = height < 700;

  const heroWidth = verySmall ? 196 : small ? 228 : 252;
  const heroHeight = verySmall ? 54 : small ? 62 : 70;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleShift = useRef(new Animated.Value(14)).current;

  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroShift = useRef(new Animated.Value(18)).current;

  const quoteOpacity = useRef(new Animated.Value(0)).current;
  const quoteShift = useRef(new Animated.Value(20)).current;

  const cardAnims = useMemo(
    () =>
      Array.from({ length: 4 }, () => ({
        opacity: new Animated.Value(0),
        shift: new Animated.Value(26),
      })),
    []
  );

  useEffect(() => {
    const cardAnimations = cardAnims.flatMap(item => [
      Animated.parallel([
        Animated.timing(item.opacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(item.shift, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 240,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(titleShift, {
          toValue: 0,
          duration: 240,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(heroShift, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(quoteOpacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(quoteShift, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      ...cardAnimations,
    ]).start();
  }, [
    titleOpacity,
    titleShift,
    heroOpacity,
    heroShift,
    quoteOpacity,
    quoteShift,
    cardAnims,
  ]);

  const openMode = (mode: PracticeMode) => {
    navigation.navigate('Practice', { mode });
  };

  return (
    <ImageBackground
      source={require('../assets/images/hub/hub_background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + (verySmall ? 18 : 26),
            paddingBottom: insets.bottom + (verySmall ? 110 : 126),
            paddingHorizontal: verySmall ? 14 : 16,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text
          style={[
            styles.headerTitle,
            small && styles.headerTitleSmall,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleShift }],
              marginBottom: verySmall ? 12 : 16,
            },
          ]}
        >
          Mind Arena
        </Animated.Text>

        <Animated.View
          style={[
            styles.heroWrap,
            {
              opacity: heroOpacity,
              transform: [{ translateY: heroShift }],
              marginBottom: verySmall ? 14 : 18,
            },
          ]}
        >
          <Image
            source={require('../assets/images/hub/hub_core_mark.png')}
            resizeMode="contain"
            style={{ width: heroWidth, height: heroHeight }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.quoteCard,
            verySmall && styles.quoteCardSmall,
            {
              opacity: quoteOpacity,
              transform: [{ translateY: quoteShift }],
            },
          ]}
        >
          <Text style={[styles.quoteText, small && styles.quoteTextSmall]}>
            Choose one focus path and train the way you think, compare, solve, and respond.
          </Text>
        </Animated.View>

        <View style={styles.cardsWrap}>
          <Animated.View
            style={{
              opacity: cardAnims[0].opacity,
              transform: [{ translateY: cardAnims[0].shift }],
            }}
          >
            <ModeCard
              title="Logic Core"
              description="Deduction, reasoning, structured answers."
              buttonLabel="Open Mode"
              imageSource={require('../assets/images/hub/hub_logic_mark.png')}
              onPress={() => openMode('logic')}
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: cardAnims[1].opacity,
              transform: [{ translateY: cardAnims[1].shift }],
            }}
          >
            <ModeCard
              title="Pattern Zone"
              description="Sequences, visual logic, hidden order."
              buttonLabel="Open Mode"
              imageSource={require('../assets/images/hub/hub_pattern_mark.png')}
              onPress={() => openMode('pattern')}
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: cardAnims[2].opacity,
              transform: [{ translateY: cardAnims[2].shift }],
            }}
          >
            <ModeCard
              title="Word Lab"
              description="Language links, meaning, verbal precision."
              buttonLabel="Open Mode"
              imageSource={require('../assets/images/hub/hub_word_mark.png')}
              onPress={() => openMode('word')}
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: cardAnims[3].opacity,
              transform: [{ translateY: cardAnims[3].shift }],
            }}
          >
            <ModeCard
              title="Quick Math Pro"
              description="Fast number thinking and sharp response."
              buttonLabel="Open Mode"
              imageSource={require('../assets/images/hub/hub_math_mark.png')}
              onPress={() => openMode('math')}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2436D0',
  },
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#F1B10E',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#08122D',
    textShadowOffset: { width: 1.2, height: 1.2 },
    textShadowRadius: 0,
  },
  headerTitleSmall: {
    fontSize: 19,
  },
  heroWrap: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteCard: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 78, 0.94)',
    borderRadius: 18,
    borderWidth: 1.8,
    borderColor: '#E3B11A',
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 18,
  },
  quoteCardSmall: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
  },
  quoteText: {
    color: '#F3F7FF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  quoteTextSmall: {
    fontSize: 12.5,
    lineHeight: 17,
  },
  cardsWrap: {
    width: '100%',
  },
});