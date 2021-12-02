import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Home from '../ui/home/HomeView';
import Setting from '../ui/settings/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Stock"
        barStyle={{ backgroundColor: '#fff' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name == 'Stock') {
              iconName = 'paw';
            } else if (route.name == 'Settings') {
              iconName = focused ? 'stats' : 'stats-outline';
            }
            return <FontIcon name={iconName} size={25} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 15,
            margin: 0,
            padding: 0,
          }
        }}
      >
        <Tab.Screen name="Stock" component={Home} />
        <Tab.Screen name="Settings" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}
export default AppNavigator;
