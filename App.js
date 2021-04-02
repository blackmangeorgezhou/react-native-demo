import * as React from 'react';
import { Button, StatusBar } from 'react-native';
import EANavigator from './src/components/navigator';
import HomePage from './src/views/home';
import ButtonPage from './src/views/elements/button';

StatusBar.setBarStyle('light-content', false);

function App() {
  const options = {
    headerStyle: {
      backgroundColor: '#001938',
    },
    headerTintColor: '#fff',
  };

  const navigatorList = [
    {
      title: '主页',
      component: HomePage,
      options: {
        ...options,
        headerLeft: () => (
          <Button onPress={openSideBar} title="123" />
        ),
      }
    },
    {
      title: 'Button',
      component: ButtonPage,
      options
    }
  ];

  const sideBarNavs = [
    {
      title: '11111',
      component: HomePage,
    }
  ];

  const openSideBar = () => {

  };

  return (
    <EANavigator data={navigatorList}></EANavigator>
  );
}

export default App;
