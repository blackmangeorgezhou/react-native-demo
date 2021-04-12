import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    requiredMsg: {
        color: '#F56C6C',
        fontSize: 24,
        fontWeight: '500'
    },
    menuIcon: {
        height: 28,
        width: 28,
        marginLeft: 12
    },
    backIcon: {
        height: 24,
        width: 24,
        marginLeft: 12
    }
})
const NavHeaderLeft = ({navigationProps}) => {
    const toggleDrawer = () => {
        navigationProps.toggleDrawer();
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image style={styles.menuIcon} source={require('../assets/images/menu.png')}></Image>
            </TouchableOpacity>
        </View>
    );
};
const DrawerHeaderLeft = ({navigationProps}) => {
    const toggleDrawer = () => {
        navigationProps.goBack();
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image style={styles.backIcon} source={require('../assets/images/back.png')}></Image>
            </TouchableOpacity>
        </View>
    );
};

const DrawerNav = ({data, theme, homeTitle, homeComponent}) => {
    return (
        <NavigationContainer theme={theme || DefaultTheme}>
            <Drawer.Navigator>
                <Drawer.Screen name={homeTitle} component={homeComponent}></Drawer.Screen>
                {
                    data.map(({title, component, options}, index) => {
                        return (
                            <Drawer.Screen
                                name={title}
                                component={component}
                                options={({navigation}) => ({
                                    ...options,
                                    headerLeft: () => <DrawerHeaderLeft navigationProps={navigation}></DrawerHeaderLeft>
                                })}
                                key={title + index}>
                            </Drawer.Screen>
                        );
                    })
                }
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

const Nav = ({data}) => {
    return (
        <Stack.Navigator initialRouteName={data[0].name}>
            {
                data.map(({title, component, options}, index) => {
                    return (
                        <Stack.Screen
                            name={title}
                            component={component}
                            options={options}
                            key={title + index}>
                        </Stack.Screen>
                    );
                })
            }
        </Stack.Navigator>
    );
};

export default EANav = ({navList, drawerList, theme}) => {
    if (!navList || !navList.length || !drawerList || !drawerList.length) {
        return (
            <View style={styles.container}>
                <Text style={styles.requiredMsg}>[navList && drawerList] are required !</Text>
            </View>
        );
    }

    let theFirstNav = navList[0];
    const Home = ({navigation}) => {
        theFirstNav.options.headerLeft = () => <NavHeaderLeft navigationProps={ navigation }></NavHeaderLeft>;
        return <Nav data={navList}></Nav>
    };

    return <DrawerNav
        data={drawerList}
        theme={theme}
        homeTitle={theFirstNav.title}
        homeComponent={Home}></DrawerNav>
};