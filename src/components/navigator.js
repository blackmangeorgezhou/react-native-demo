import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
      }
})
const HeaderLeft = ({navigationProps}) => {
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
const Default = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.requiredMsg}>[Component] is required !</Text>
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
                                options={options}
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
    let navigation;

    // Navigations
    if (data) {
        navigation = (
            <Stack.Navigator initialRouteName={data[0].name}>
                {
                    data.map(({title, component, options}, index) => {
                        const name = title || 'Title';
                        const componentName = component || Default;
                        const styles = options || {};
                        return (
                            <Stack.Screen
                                name={name}
                                component={componentName}
                                options={styles}
                                key={title + index}>
                            </Stack.Screen>
                        );
                    })
                }
            </Stack.Navigator>
        );
    }
    return navigation;
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
        theFirstNav.options.headerLeft = () => <HeaderLeft navigationProps={ navigation }></HeaderLeft>;
        return <Nav data={navList}></Nav>
    };

    return <DrawerNav
        data={drawerList}
        theme={theme}
        homeTitle={theFirstNav.title}
        homeComponent={Home}></DrawerNav>
};