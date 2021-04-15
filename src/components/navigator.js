import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
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
    eaLogo: {
        height: 108,
        width: 108
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
    },
    topArea: {
        alignItems: 'center',
        backgroundColor: 'rgb(251,45,55)',
        justifyContent: 'center',
    }
})
const NavHeaderLeft = ({onPress, source}) => {
    const toggleDrawer = () => {
        onPress();
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image style={styles.menuIcon} source={source}></Image>
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
const CustomerDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.topArea}>
                <Image style={styles.eaLogo} source={require('../assets/images/ea.png')}></Image>
            </View>
            <DrawerItemList {...props}></DrawerItemList>
        </DrawerContentScrollView>
    );
};

const DrawerNav = ({data, theme, homeTitle, homeComponent}) => {
    return (
        <NavigationContainer theme={theme || DefaultTheme}>
            <Drawer.Navigator drawerContent={props => <CustomerDrawerContent {...props}/>}>
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

    const Home = ({navigation}) => {
        const toggleDrawer = () => {
            navigation.toggleDrawer();
        };
        const goBack = () => {
            navigation.goBack();
        };
        navList.forEach((nav, index) => {
            console.log(index)
            if (index === 0) {
                nav.options.headerLeft = () =>  <NavHeaderLeft onPress={toggleDrawer} source={require('../assets/images/menu.png')}></NavHeaderLeft>;
            } else {
                nav.options.headerLeft = () => <NavHeaderLeft onPress={goBack} source={require('../assets/images/back.png')}></NavHeaderLeft>;
            }
        });
        return <Nav data={navList}></Nav>
    };

    return <DrawerNav
        data={drawerList}
        theme={theme}
        homeTitle={navList[0].title}
        homeComponent={Home}></DrawerNav>
};