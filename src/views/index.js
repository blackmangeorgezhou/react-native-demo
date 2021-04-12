import * as React from 'react';
import { StatusBar } from 'react-native';

import EANav from '../components/navigator';

import HomePage from './home';
import UserProfile from './user/profile';
import ButtonPage from './elements/button';

StatusBar.setBarStyle('light-content', false);

const options = {
    headerStyle: {
        backgroundColor: '#001938',
    },
    headerTintColor: '#fff',
};
const navs = [
    {
        title: 'Home',
        component: HomePage,
        options
    },
    {
        title: 'Button',
        component: ButtonPage,
        options
    }
];
const drawerNavs = [
    {
        title: 'Account',
        component: UserProfile,
        options: {
            ...options,
            headerShown: true
        }
    }
];

export default root = () => {
    return (
        <EANav navList={navs} drawerList={drawerNavs}></EANav>
    );
};
