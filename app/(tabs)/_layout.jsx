import { View, Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react'
import { Tabs } from 'expo-router'
import colors from '../../utils/colors';

export default function _layout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: colors.PRIMARY,
        headerShown: false
    }}>
        <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="history" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}