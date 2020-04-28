'use strict';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, ViewPagerAndroid, Dimensions} from 'react-native';
import viewPager from 'react-native-viewpager'
const {width, height} = Dimensions.get("window");

//图片地址
const PAGE_IMAGES = [
    'http://a.hiphotos.baidu.com/image/h%3D300/sign=4f5477ac8f26cffc762ab9b289014a7d/b3fb43166d224f4ad8b5722604f790529822d1d3.jpg',
    'http://a.hiphotos.baidu.com/image/h%3D300/sign=10b374237f0e0cf3bff748fb3a47f23d/adaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
    'http://e.hiphotos.baidu.com/image/h%3D300/sign=8562b2c234dbb6fd3a5be3263925aba6/8ad4b31c8701a18b536e1476932f07082838fe06.jpg',
    'http://a.hiphotos.baidu.com/image/h%3D300/sign=fbe3d9666ed9f2d33f1122ef99ed8a53/3bf33a87e950352a464bc38f5f43fbf2b2118b0b.jpg'
];

export default class TestViewPager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            totalPage: PAGE_IMAGES.length,
        }
    }

    onPageSelected = (event) => {
        this.setState({
            page: event.nativeEvent.position,
        });
    };

    render() {
        let pages = [];
        let len = this.state.totalPage;
        for (let i = 0; i < len; i++) {
            pages.push(
                <View key={i} collapsable={false}>
                    <Image
                        style={styles.image}
                        source={{uri: PAGE_IMAGES[i]}}
                    />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ViewPagerAndroid
                    style={styles.viewPager}
                    initialPage={0}
                    onPageSelected={this.onPageSelected}
                    ref={viewPager => {
                        this.viewPager = viewPager;
                    }}
                >
                    {pages}
                </ViewPagerAndroid>

                <View style={styles.showArea}>
                    <Text style={styles.showText}>{this.state.page + 1} / {this.state.totalPage}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    viewPager: {
        width: width,
        height: height
    },
    image: {
        resizeMode: "contain",
        flex: 1,
        width: width
    },
    showArea: {
        position: "absolute",
        bottom: 60,
        flexDirection: 'row',
        width: width,
        height: 60,
        justifyContent: "center",
        alignItems: 'center',
    },
    showText: {
        fontSize: 20,
        color: "white"
    }
});