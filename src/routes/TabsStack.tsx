import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../screens/Home';
import {Settings} from '../screens/Settings';
import React from 'react';

export function TabsStack() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
