import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type ImageSourcePropType,
} from 'react-native';

type Props = {
  title: string;
  description: string;
  buttonLabel: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
};

export default function ModeCard({
  title,
  description,
  buttonLabel,
  imageSource,
  onPress,
}: Props) {
  const { height } = useWindowDimensions();
  const small = height < 760;
  const verySmall = height < 700;

  const iconSize = verySmall ? 56 : small ? 62 : 68;

  return (
    <View style={[styles.card, verySmall && styles.cardSmall]}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Image
            source={imageSource}
            resizeMode="contain"
            style={{ width: iconSize, height: iconSize }}
          />
        </View>

        <View style={styles.textWrap}>
          <Text style={[styles.title, small && styles.titleSmall]}>{title}</Text>
          <Text style={[styles.description, small && styles.descriptionSmall]}>
            {description}
          </Text>

          <Pressable style={[styles.button, small && styles.buttonSmall]} onPress={onPress}>
            <Text style={[styles.buttonText, small && styles.buttonTextSmall]}>
              {buttonLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 22,
    backgroundColor: 'rgba(8, 20, 82, 0.95)',
    borderWidth: 1.8,
    borderColor: '#E3B11A',
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 16,
  },
  cardSmall: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 86,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#F1B10E',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 8,
    textShadowColor: '#08122D',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  titleSmall: {
    fontSize: 15.5,
    marginBottom: 6,
  },
  description: {
    color: '#F2F5FB',
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  descriptionSmall: {
    fontSize: 11.5,
    lineHeight: 16,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-start',
    minWidth: 126,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F0B400',
    borderWidth: 1.4,
    borderColor: '#835100',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  buttonSmall: {
    minWidth: 116,
    height: 38,
  },
  buttonText: {
    color: '#121212',
    fontSize: 14,
    fontWeight: '900',
  },
  buttonTextSmall: {
    fontSize: 13,
  },
});