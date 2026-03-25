import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/navTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const spinnerHtml = useMemo(
    () => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background: transparent;
              overflow: hidden;
            }

            body {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .spinner {
              position: relative;
              width: 60px;
              height: 60px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              margin-left: -75px;
            }

            .spinner span {
              position: absolute;
              top: 50%;
              left: var(--left);
              width: 35px;
              height: 7px;
              background: #00ff40;
              animation: dominos 1s ease infinite;
              box-shadow: 2px 2px 3px 0px rgb(0, 114, 207);
            }

            .spinner span:nth-child(1) {
              --left: 80px;
              animation-delay: 0.125s;
            }

            .spinner span:nth-child(2) {
              --left: 70px;
              animation-delay: 0.3s;
            }

            .spinner span:nth-child(3) {
              left: 60px;
              animation-delay: 0.425s;
            }

            .spinner span:nth-child(4) {
              animation-delay: 0.54s;
              left: 50px;
            }

            .spinner span:nth-child(5) {
              animation-delay: 0.665s;
              left: 40px;
            }

            .spinner span:nth-child(6) {
              animation-delay: 0.79s;
              left: 30px;
            }

            .spinner span:nth-child(7) {
              animation-delay: 0.915s;
              left: 20px;
            }

            .spinner span:nth-child(8) {
              left: 10px;
            }

            @keyframes dominos {
              50% {
                opacity: 0.7;
              }

              75% {
                transform: rotate(90deg);
              }

              80% {
                opacity: 1;
              }
            }
          </style>
        </head>
        <body>
          <div class="spinner">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </body>
      </html>
    `,
    []
  );

  const logoWidth = Math.min(width * 0.62, 260);
  const logoHeight = logoWidth * 0.92;
  const spinnerWidth = Math.min(width * 0.42, 180);
  const spinnerHeight = 90;
  const lowerOffset = height < 700 ? 40 : 55;

  return (
    <ImageBackground
      source={require('../assets/images/splash_background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={[styles.centerBlock, { marginTop: lowerOffset }]}>
          <Image
            source={require('../assets/images/splash_logo.png')}
            style={{ width: logoWidth, height: logoHeight }}
            resizeMode="contain"
          />

          <View style={[styles.webWrapper, { width: spinnerWidth, height: spinnerHeight }]}>
            <WebView
              originWhitelist={['*']}
              source={{ html: spinnerHtml }}
              style={styles.webview}
              scrollEnabled={false}
              bounces={false}
              javaScriptEnabled
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  centerBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  webWrapper: {
    marginTop: 18,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});