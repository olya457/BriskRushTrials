import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './navTypes';

import HomeHubScreen from '../screens/HomeHubScreen';
import RealWorldScreen from '../screens/RealWorldScreen';
import SavedInsightsScreen from '../screens/SavedInsightsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const icons = {
  HomeHub: require('../assets/icons/tab_brain.png'),
  RealWorld: require('../assets/icons/tab_cards.png'),
  SavedInsights: require('../assets/icons/tab_bookmark.png'),
  Profile: require('../assets/icons/tab_profile.png'),
};

function renderTabIcon(routeName: keyof MainTabParamList, focused: boolean) {
  let iconSource;

  switch (routeName) {
    case 'HomeHub':
      iconSource = icons.HomeHub;
      break;
    case 'RealWorld':
      iconSource = icons.RealWorld;
      break;
    case 'SavedInsights':
      iconSource = icons.SavedInsights;
      break;
    case 'Profile':
      iconSource = icons.Profile;
      break;
    default:
      iconSource = icons.HomeHub;
      break;
  }

  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Image
        source={iconSource}
        style={styles.iconImage}
        resizeMode="contain"
      />
    </View>
  );
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width, height } = useWindowDimensions();
  const isSmall = height < 760;

  const barWidth = Math.min(width - 40, 460);
  const barHeight = isSmall ? 72 : 86;
  const bottomOffset = 30;

  return (
    <View pointerEvents="box-none" style={styles.tabBarOuter}>
      <View
        style={[
          styles.tabBarContainer,
          {
            width: barWidth,
            height: barHeight,
            bottom: bottomOffset,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
              testID={descriptors[route.key].options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              {renderTabIcon(route.name as keyof MainTabParamList, focused)}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeHub"
        component={HomeHubScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="RealWorld"
        component={RealWorldScreen}
        options={{ title: 'Real World' }}
      />
      <Tab.Screen
        name="SavedInsights"
        component={SavedInsightsScreen}
        options={{ title: 'Saved' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },

  tabBarContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#3A1B00',
    backgroundColor: '#E08A00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 12,
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapActive: {
    backgroundColor: '#F6BE00',
  },

  iconImage: {
    width: 30,
    height: 30,
  },
});