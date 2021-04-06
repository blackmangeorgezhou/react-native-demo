import * as React from 'react';
import { View, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import EANavigator from './src/components/navigator';
import HomePage from './src/views/home';
import UserProfile from './src/views/user/profile';
import ButtonPage from './src/views/elements/button';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

StatusBar.setBarStyle('light-content', false);
const styles = StyleSheet.create({
  menuIcon: {
    height: 28,
    width: 28,
    marginLeft: 12
  }
});
const Drawer = createDrawerNavigator();
const drawerNavs = [
  {
    title: 'Account',
    component: UserProfile,
  }
];
const HeaderLeft = ({navigationProps}) => {
  const toggleDrawer = () => {
    navigationProps.toggleDrawer();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image style={styles.menuIcon} source={require('./src/assets/images/menu.png')}></Image>
      </TouchableOpacity>
    </View>
  );
};

const HomeNav = ({ navigation }) => {
  const options = {
    headerStyle: {
      backgroundColor: '#001938',
    },
    headerTintColor: '#fff',
  };
  const openDrawerNav = () => {
    navigation.navigate('DrawerToggle');
  };
  const navigatorList = [
    {
      title: '主页',
      component: HomePage,
      options: {
        ...options,
        headerLeft: () => <HeaderLeft navigationProps={ navigation }></HeaderLeft>,
      }
    },
    {
      title: 'Button',
      component: ButtonPage,
      options
    }
  ];

  return (
    <EANavigator data={navigatorList}></EANavigator>
  );
};

function App() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeNav}></Drawer.Screen>
        {
          drawerNavs.map(({title, component, options}, index) => {
            return (
              <Drawer.Screen
                name={title}
                component={component}
                options={options}>
              </Drawer.Screen>
            );
          })
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
