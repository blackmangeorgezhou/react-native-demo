import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
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
})

const Default = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.requiredMsg}>[Component] is required !</Text>
        </View>
    );
};

export default function EANavigator({data, theme}) {
    if (!data || !data.length) {
        return (
            <View style={styles.container}>
                <Text style={styles.requiredMsg}>[data] is required !</Text>
            </View>
        );
    }

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