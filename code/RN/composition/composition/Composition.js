import React, { Component } from 'react'
import {
    Text, View, Animated, Easing, AsyncStorage, ScrollView, Modal, TouchableOpacity, StyleSheet, Dimensions, NavigationBar, ToastAndroid, FlatList, Image, TextInput, TouchableHighlight, TouchableWithoutFeedback,
    TouchableNativeFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from "react-native-vector-icons/AntDesign";
import { Scene, Actions, Tabs } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import { Radio, WhiteSpace, List, Switch } from '@ant-design/react-native'
const RadioItem = Radio.RadioItem;
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
let date = new Date();
let Y = date.getFullYear();
let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
let groomdate = Y + '-' + M + '-' + D;
let groomdate1 = date.getMonth() + 1 + '月';
console.log(groomdate);
var a = ["日", "一", "二", "三", "四", "五", "六"];  
var week = new Date().getDay();  
var str = "星期"+ a[week];  
console.log(str);

export default class Composition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
            data: [],
            uid: '',
            banner_data: [],
            banner_data1: [],
            banner_data2: [],
            banner_data3: [],
            banner_data4: [],
            banner_data5: [],
            refreshing: false,
            short_data: [], 
            backgroundColor1: '',
            backgroundColor2: '',
            color: '',
            week: ''
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                this.fetchf()
                this.banner_data()
                this.short()
            })
        setTimeout(() => {
            this.setState({
                swiperShow: true,
            });
        }, 2)

    }
    renderBanner() {
        if (this.state.swiperShow && this.state.banner_data.length > 1) {
            return (
                this.state.banner_data.length === 5 ?
                    <Swiper
                        style={styles.wrapper}
                        height={280 * s}
                        showsButtons={false}
                        removeClippedSubviews={false}
                        autoplay={true}
                        horizontal={true}
                        paginationStyle={styles.paginationStyle}
                        dotStyle={styles.dotStyle}
                        activeDotStyle={styles.activeDotStyle}
                    >
                        <View style={{ position: 'relative' }}>
                            <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data1.mid })}>
                                <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data1.mimage }} style={styles.bannerImg} />
                                {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data1.mtitle}</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'relative' }}>
                            <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data2.mid })}>
                                <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data2.mimage }} style={styles.bannerImg} />
                                {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data2.mtitle}</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'relative' }}>
                            <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data3.mid })}>
                                <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data3.mimage }} style={styles.bannerImg} />
                                {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data3.mtitle}</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'relative' }}>
                            <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data4.mid })}>
                                <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data4.mimage }} style={styles.bannerImg} />
                                {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data4.mtitle}</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'relative' }}>
                            <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data5.mid })}>
                                <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data5.mimage }} style={styles.bannerImg} />
                                {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data5.mtitle}</Text> */}
                            </TouchableOpacity>
                        </View>
                    </Swiper>
                    : (this.state.banner_data.length === 4 ?
                        <Swiper
                            style={styles.wrapper}
                            height={280 * s}
                            showsButtons={false}
                            removeClippedSubviews={false}
                            autoplay={true}
                            horizontal={true}
                            paginationStyle={styles.paginationStyle}
                            dotStyle={styles.dotStyle}
                            activeDotStyle={styles.activeDotStyle}
                        >
                            <View>
                                <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data1.mid })}>
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data1.mimage }} style={styles.bannerImg} />
                                    {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data1.mtitle}</Text> */}
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data2.mid })}>
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data2.mimage }} style={styles.bannerImg} />
                                    {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data2.mtitle}</Text> */}
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data3.mid })}>
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data3.mimage }} style={styles.bannerImg} />
                                    {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data3.mtitle}</Text> */}
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data4.mid })}>
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data4.mimage }} style={styles.bannerImg} />
                                    {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data4.mtitle}</Text> */}
                                </TouchableOpacity>
                            </View>
                        </Swiper>
                        : (this.state.banner_data.length === 3 ?
                            <Swiper
                                style={styles.wrapper}
                                height={280 * s}
                                showsButtons={false}
                                removeClippedSubviews={false}
                                autoplay={true}
                                horizontal={true}
                                paginationStyle={styles.paginationStyle}
                                dotStyle={styles.dotStyle}
                                activeDotStyle={styles.activeDotStyle}
                            >
                                <View style={{ position: 'relative' }}>
                                    <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data1.mid })}>
                                        <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data1.mimage }} style={styles.bannerImg} />
                                        {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data1.mtitle}</Text> */}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ position: 'relative' }}>
                                    <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data2.mid })}>
                                        <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data2.mimage }} style={styles.bannerImg} />
                                        {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data2.mtitle}</Text> */}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ position: 'relative' }}>
                                    <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data3.mid })}>
                                        <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data3.mimage }} style={styles.bannerImg} />
                                        {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data3.mtitle}</Text> */}
                                    </TouchableOpacity>
                                </View>
                            </Swiper>
                            :
                            <Swiper
                                style={styles.wrapper}
                                height={280 * s}
                                showsButtons={false}
                                removeClippedSubviews={false}
                                autoplay={true}
                                horizontal={true}
                                paginationStyle={styles.paginationStyle}
                                dotStyle={styles.dotStyle}
                                activeDotStyle={styles.activeDotStyle}
                            >
                                <View style={{ position: 'relative' }}>
                                    <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data1.mid })}>
                                        <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data1.mimage }} style={styles.bannerImg} />
                                        {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data1.mtitle}</Text> */}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ position: 'relative' }}>
                                    <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data2.mid })}>
                                        <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data2.mimage }} style={styles.bannerImg} />
                                        {/* <Text style={{ position: 'absolute', left: 20 * s, top: 20 * s, fontSize: 26 * s, color: '#fff' }}>{this.state.banner_data2.mtitle}</Text> */}
                                    </TouchableOpacity>
                                </View>
                            </Swiper>
                        )));
        } else {
            return (
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={() => Actions.popular({ mid: this.state.banner_data1.mid })}>
                        <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.banner_data1.mimage }} style={styles.bannerImg} />
                    </TouchableOpacity>
                </View>
            );
        }
    }
    banner_data = () => {
        fetch('http://116.62.14.0:8402/carousel')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    banner_data: res.data,
                    banner_data1: res.data[0],
                    banner_data2: res.data[1],
                    banner_data3: res.data[2],
                    banner_data4: res.data[3],
                    banner_data5: res.data[4],
                });
            })
    }
    fetchf = () => {
        this.setState({
            refreshing: true
        }, () => {
            fetch('http://116.62.14.0:8402/groom/time/' + groomdate)
                .then((res) => res.json())
                .then((res) => {
                    this.setState({
                        data: res.data,
                        refreshing: false
                    });
                })
        })

    }
    short = () => {
        fetch('http://116.62.14.0:8402/short/date/'+groomdate)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    short_data: res.data,
                });  
            })
            if(str === '星期一'){
                this.setState({backgroundColor1:'#a5ace2',backgroundColor2:'#808bcd',color:'#626bb0',week:'MON'})
            } else if(str === '星期二') {
                this.setState({backgroundColor1:'#7fb5f1',backgroundColor2:'#578ece', color:'#487bb4',week:'TUE'})  
            }else if(str === '星期三') {
                this.setState({backgroundColor1:'#93d7ec',backgroundColor2:'#56aacc', color:'#3d91b5',week:'WED'})  
            }else if(str === '星期四') {
                this.setState({backgroundColor1:'#8de0e4',backgroundColor2:'#52c9cd', color:'#24a9b8',week:'THU'})  
            }else if(str === '星期五') {
                this.setState({backgroundColor1:'#92d8a2',backgroundColor2:'#63b575', color:'#4b9d5d',week:'FRI'})  
            }else if(str === '星期六') {
                this.setState({backgroundColor1:'#efbf81',backgroundColor2:'#e59c67', color:'#d68242',week:'SAT'})  
            }else {
                this.setState({backgroundColor1:'#f4af85',backgroundColor2:'#e58964', color:'#d86a45',week:'SUN'})  
            }
    }
    render() {
        return (
            <View>
                {/* 搜索 */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', height: 80 * s, backgroundColor: '#fff' }}>
                    <TouchableOpacity style={{ marginTop: 10 * s, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60 * s, width: '90%', borderRadius: 30 * s, backgroundColor: '#F5F5F5' }}
                        onPress={() => { Actions.searchEssay() }}>
                        <Text style={{ color: '#666666' }}>请输入要搜索的内容</Text>
                        <Icon1 style={{ paddingLeft: 10 * s }} name='search1' size={30 * s} color='#666666' />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {/* 轮播 */}
                    <View style={styles.container}>
                        {this.renderBanner()}
                    </View>
                    {/* tab */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', alignItems: 'flex-end', paddingBottom: 30 * s, paddingTop: 20 * s }}>
                        <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', }}>
                            <TouchableOpacity onPress={() => { Actions.source() }}>
                                <Image source={require('../../assets/composition/composition/composition.png')} style={{ marginLeft: 14 * s }} />
                                <Text>素材分类</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Actions.skill1() }}>
                                <Image source={require('../../assets/composition/composition/jifa.png')} style={{ marginLeft: 14 * s }} />
                                <Text>技法学习</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Actions.realpaper() }}>
                                <Image source={require('../../assets/composition/composition/zhenti.png')} style={{ marginLeft: 14 * s }} />
                                <Text>真题解析</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Actions.collection() }}>
                                <Image source={require('../../assets/composition/composition/heji.png')} style={{ marginLeft: 14 * s }} />
                                <Text>日更合集</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* 日更 */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 * s }}>
                        <View><Text onPress={() => { this.fetchf() }} style={{ fontSize: 30 * s }}>每日推荐</Text></View>
                    </View>
                    {/* 一句话 */}
                    <View style={{ position: 'relative', marginTop: 20 * s, marginBottom: 10 * s }}>
                        
                        <View style={{ position: 'absolute', width: 60 * s, height: 70 * s, backgroundColor: this.state.backgroundColor1, left: '7%', top: -20 * s, zIndex: 1, justifyContent: 'center', alignItems: 'center',borderRadius:6*s }}>
                            <Text style={{ fontSize: 24 * s, color: '#fff' }}>{(moment().format('MM').slice(0,1)=='0'?moment().format('M'):moment().format('MM'))+'月'}</Text>
                            <Text style={{ fontSize: 30 * s, color: '#fff' }}>{moment().format('DD')}</Text>
                        </View>
                        <View style={{ width: '90%', marginLeft: '5%', backgroundColor: this.state.backgroundColor2, height: 60 * s,borderRadius:16*s }}>
                            <Text style={{ fontSize: 24 * s, lineHeight: 60 * s, color: '#fff', marginLeft: '16%' }}>{this.state.short_data.sentence}</Text>
                        </View>
                        <View style={{ position: 'absolute',left: '74%',top: 12*s}}>
                            <Text style={{ fontSize: 40 * s, lineHeight: 60 * s, marginLeft: '16%',color:this.state.color }}>{moment().format('dddd').slice(0,3)}</Text>
                        </View>
                    </View>
                    <View>
                        <FlatList
                            style={{ paddingBottom: 100 * s }}
                            data={this.state.data}
                            numColumns={1}
                            onRefresh={() => {
                                this.fetchf()
                            }}
                            refreshing={this.state.refreshing}
                            renderItem={({ item }) => (
                                item.mimage === '' ?
                                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                        <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', backgroundColor: '#fff' }}>
                                            <Text style={{ fontSize: 26 * s, margin: 10 * s, paddingTop: 20 * s }}>{item.mtitle}</Text>
                                            <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                        <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', backgroundColor: '#fff' }}>
                                            <Image
                                                style={{ width: "100%", height: 240 * s }}
                                                source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                            />
                                            <Text style={{ fontSize: 26 * s, marginTop: 10 * s }}>{item.mtitle}</Text>
                                            <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                        </TouchableOpacity>
                                    </View>
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 280 * s,
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: '#fff'
    },
    wrpaper: {
        height: 280 * s,
        width: '100%',
    },
    paginationStyle: {
        bottom: 6 * s,
    },
    dotStyle: {
        width: 14 * s,
        height: 4 * s,
        backgroundColor: '#fff',
    },
    activeDotStyle: {
        width: 30 * s,
        height: 4 * s,
        backgroundColor: 'red',
    },
    bannerImg: {
        height: 280 * s,
        width: '100%',
        borderRadius: 10 * s
    },
})