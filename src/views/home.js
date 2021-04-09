import React from 'react';
import {
    Image,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

import commonStyl from '../assets/style/common';
import SectionList from '../components/section-list';

const styles = StyleSheet.create({
    ...commonStyl,
    title: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
    },

    titleText: {
        color: '#323233',
        fontSize: 32,
        marginLeft: 8,
    },

    tinyLogo: {
        height: 32,
        width: 32,
    },

    description: {
        color: 'rgba(69, 90, 100, 0.6)',
        fontSize: 14,
        marginBottom: 40
    },
});
const headerComponent = () => {
    return (
        <View>
            <View style={styles.title}>
                <Image style={styles.tinyLogo} source={require('../assets/images/ea-logo.png')}></Image>
                <Text style={styles.titleText}>EA Player</Text>
            </View>
            <View>
                <Text style={styles.description}>Pattern Library 组件库 - NDS</Text>
            </View>
        </View>
    );
};

export default function Home({ navigation }) {
    const data = [
        {
            title: "基础组件",
            data: [
                { name: 'Button 按钮', link: 'Button' },
                { name: 'Cell 单元格', link: '' },
                { name: 'Icon 图标', link: '' },
            ]
        },
        {
            title: "表单组件",
            data: [
                { name: 'Calendar 日历', link: '' },
                { name: 'Cascader 级联选择', link: '' },
                { name: 'Checkbox 选择框', link: '' },
            ]
        },
        {
            title: "反馈组件",
            data: [
                { name: 'ActionSheet 动画面板', link: '' },
                { name: 'Dialog 弹出框', link: '' },
                { name: 'DropdownMenu 下拉菜单', link: '' },
                { name: 'Loading 加载', link: '' },
            ]
        },
        {
            title: "展示组件",
            data: [
                { name: 'Badge 徽标', link: '' },
                { name: 'Circle 环形进度条', link: '' },
                { name: 'Collapse 折叠面板', link: '' },
            ]
        },
        {
            title: "导航组件",
            data: [
                { name: 'Grid 宫格', link: '' },
                { name: 'IndexBar 索引栏', link: '' },
                { name: 'NavBar 导航栏', link: '' },
            ]
        },
        {
            title: "业务组件",
            data: [
                { name: 'AddressEdit 地址编辑', link: '' },
                { name: 'AddressList 地址列表', link: '' },
                { name: 'Area 省市区选择', link: '' },
            ]
        },
        {
            title: "废弃",
            data: [
                { name: 'Panel 面板', link: '' },
                { name: 'SwitchCell 开关单元格', link: '' },
            ]
        }
    ];

    const goDetail = (detail) => {
        if (!detail || !detail.link) {
            alert('[link] is required !');
            return;
        }
        navigation.navigate(detail.link);
    };

    return (
        <View style={styles.container}>
            <SectionList
                data={data}
                headerComponent={headerComponent}
                onDetail={goDetail}></SectionList>
        </View>            
    );
};
