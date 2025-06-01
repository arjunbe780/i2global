import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';
import {IconButton} from 'react-native-paper';
import fonts from '../config/fonts';
import {hp, wp} from '../config/dimension';
import Home from '../screens/home/Home';
import News from '../screens/news/News';
import Settings from '../screens/settings/Settings';

const Tab = createBottomTabNavigator();

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

//Bottom tabBar card//
const MyTabBar = ({state, descriptors, navigation}: TabBarProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.primaryBackground,
        height: Platform.OS === 'ios' ? hp(72) : hp(64),
      }}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const badge = options.tabBarBadge;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={1}
            style={styles.tabBar}>
            <View style={styles.bottomTab}>
              <View>
                <IconButton
                  icon={options.tabBarIcon}
                  size={wp(24)}
                  style={styles.icon}
                  iconColor={
                    isFocused ? colors.primaryButton : colors.primaryText
                  }
                />
                {badge ? (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{badge}</Text>
                  </View>
                ) : null}
              </View>
              <Text
                style={{
                  fontSize: wp(12),
                  fontFamily: fonts.GloryBold,
                  fontWeight: '600',
                  color: isFocused ? colors.primaryButton : colors.primaryText,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="homeTab"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'red',
          height: Platform.OS === 'ios' ? hp(100) : hp(100),
          zIndex: 1,
        },
        tabBarActiveTintColor: colors.primaryButton,
        headerTitleAlign: 'center',
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarItemStyle: {
          height: '100%',
          marginHorizontal: wp(2),
          marginTop: hp(12),
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          paddingBottom: hp(18),
          color: colors.primaryButton,
        },
      }}
      tabBar={props => <MyTabBar {...props} />}
      backBehavior="initialRoute">
      <Tab.Screen
        name="homeTab"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: 'home',
        }}
      />
      <Tab.Screen
        name="newsTab"
        component={News}
        options={{
          headerShown: false,
          tabBarLabel: 'Explore',
          tabBarIcon: 'earth',
        }}
      />
      <Tab.Screen
        name="settingTab"
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabel: 'Cart',
          tabBarIcon: 'cog',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.primaryBackground,
    borderTopWidth: wp(1),
    borderTopColor: colors.borderColor,
  },
  tabBar: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  icon: {
    margin: 0,
    width: wp(24),
    height: wp(24),
  },
  badgeContainer: {
    position: 'absolute',
    top: wp(-8),
    right: wp(-6),
  },
  badgeText: {
    color: colors.primaryButton,
    fontSize: wp(14),
    fontFamily: fonts.GloryBold,
  },
});

export default HomeNavigator;
