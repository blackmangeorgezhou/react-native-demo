import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({

});

export default function Button() {
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <Text>Button</Text>
            </View>
        </SafeAreaView>
    );
};
