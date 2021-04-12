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
        alignItems: 'center',
        padding: 16
    },
    headIcon: {
        height: 64,
        width: 64,
        marginRight: 10
    },
    vipIcon: {
        height: 24,
        width: 24
    },
    name: {
        marginBottom: 8
    },
    description: {
        color: '#8a8a8a',
        fontSize: 13
    },
    vip: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vipTxt: {
        color: '#FFA500',
        marginLeft: 2
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
                    <Text style={[styles.name, styles.text_1]}>{user.name}</Text>
                    <Text style={styles.description}>简介：{user.description}</Text>
                </View>
                <View style={styles.vip}>
                    <Image style={styles.vipIcon} source={user.isVIP ? require('../../assets/images/vip.png') : require('../../assets/images/vip_inactive.png')}></Image>
                    <Text style={styles.vipTxt}>会员</Text>
                </View>
            </View>
        </View>
    ) : <ActivityIndicator></ActivityIndicator>;
};