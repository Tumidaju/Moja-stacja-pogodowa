import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
} from 'react-navigation';

import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import SignInScreen from '../screens/SignInScreen'
import CreateAccount from '../screens/CreateAccount';
import ConfigScreen from '../screens/ConfigScreen';
import AddNewWidget from '../screens/AddNewWidget';
import Widgets from '../screens/Widgets';
import EditWidget from '../screens/EditWidget';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};


const AppStack = createStackNavigator({ Home: HomeScreen, Links: LinksScreen, Settings: SettingsScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const CreateAccountStack = createStackNavigator({CreateAccount: CreateAccount})
const ConfigStack = createStackNavigator({ConfigScreen: ConfigScreen})
const AddNewWidgetStack = createStackNavigator({AddNewWidget: AddNewWidget});
const WidgetsStack = createStackNavigator({Widgets: Widgets});
const EditWidgetStack = createStackNavigator({EditWidget: EditWidget});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    SignUp: CreateAccountStack,
    Config: ConfigStack,
    NewWidget: AddNewWidgetStack,
    Widgets: WidgetsStack,
    EditWidget: EditWidgetStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
