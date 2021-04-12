import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

import commonStyl from '../../assets/style/common';


const styles = StyleSheet.create({
    ...commonStyl,
    profile: {
        backgroundColor: '#fff',
        marginTop: 14,
        flexDirection: 'row',
        padding: 16
    },
    headIcon: {
        height: 64,
        width: 64,
    }
});

export default UserProfile = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch('http://localhost:8081/public/data/user.json');
            const user = await response.json();
            setUser(user);
        }

        getUserData();
    }, null);

    return  user ? (
        <View style={styles.account}>
            <View style={[styles.profile, styles.c_padding]}>
                <Image style={styles.headIcon} source={require('../../assets/images/ea-logo.png')}></Image>
                <View>
                    <Text>{user.name}</Text>
                    <Text>{user.description}</Text>
                </View>
            </View>
        </View>
    ) : <ActivityIndicator></ActivityIndicator>;
};