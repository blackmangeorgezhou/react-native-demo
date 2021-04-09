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
        options: {
            ...options,
            headerLeft: () => <HeaderLeft navigationProps={navigation}></HeaderLeft>,
        }
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
    }
];

export default root = () => {
    return (
        <EANav navList={navs} drawerList={drawerNavs}></EANav>
    );
};
