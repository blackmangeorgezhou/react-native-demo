import React, { useState } from 'react';
import {
    Text,
    View,
    SectionList,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    title: {
        backgroundColor: '#fff',
        color: 'rgba(69, 90, 100, 0.6)',
        fontSize: 18,
        paddingBottom: 10,
        paddingTop: 18,
    },

    item: {
        alignItems: 'center',
        backgroundColor: '#f7f8fa',
        borderRadius: 99,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 40,
        marginBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
    },

    itemActive: {
        backgroundColor: '#e4e8ee'
    },

    itemText: {
        color: '#323233',
        fontWeight: '600',
    },

    itemIcon: {
        color: 'rgba(69, 90, 100, 0.35)',
        fontWeight: '900',
        fontSize: 15
    }
});

const Header = ({title}) => {
    return (
      <Text style={styles.title}>{title}</Text>  
    );
};
const Item = ({data, onPress}) => {
    const [isActive, setIsActive] = useState(false);
    const onActive = () => {
        toggleClass();
        if (onPress) {
            onPress(data);
        }
    };
    const toggleClass = () => {
        setIsActive(true);
        setTimeout(() => {
            setIsActive(false)
        }, 100)
    };

    return (
        <TouchableWithoutFeedback onPress={onActive}>
            <View style={[styles.item, isActive ? styles.itemActive : '']}>
                <Text style={styles.itemText}>{data.name}</Text>
                <Text style={styles.itemIcon}>＞</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default function EASectionList({ headerComponent, data, onDetail }) {
    const goNextPage = (item) => {
        if (onDetail) {
            onDetail(item);
        }
    };

    return (
        <SectionList
            ListHeaderComponent={headerComponent}
            sections={data}
            keyExtractor={(item,index) => item.name + index}
            renderItem={({item}) => <Item data={item} onPress={goNextPage}></Item>}
            renderSectionHeader={({section}) => <Header title={section.title}></Header>}
        >
        </SectionList>
    );
};