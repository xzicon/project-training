import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, NavigationBar, ToastAndroid, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

export default class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
        }
    }
    componentDidMount() {
        this.fetchf(this.props.flag)
    }
    // componentDidUpdate(){
    //     if(this.props.flag==1){
    //         this.fetchf(this.props.flag)
    //     }else if(this.props.flag==2){
    //         this.fetchf(this.props.flag)
    //     }else if(this.props.flag==3){
    //         this.fetchf(this.props.flag)
    //     }else if(this.props.flag==4){
    //         this.fetchf(this.props.flag)
    //     }else if(this.props.flag==5){
    //         this.fetchf(this.props.flag)
    //     }else if(this.props.flag==6){
    //         this.fetchf(this.props.flag)
    //     }else{
    //         break;
    //     }
        
    // }
    fetchf=(flag)=>{
        if(flag==1){
            fetch('http://116.62.14.0:8402/usort/tiaoguo')
                .then((res) => res.json())
                .then((res) => {
                    this.setState({ data: res.data });
                })
        }else{
            fetch('http://116.62.14.0:8402/usort/tab/' + this.props.msid[flag-2])
                .then((res) => res.json())
                .then((res) => {
                    this.setState({ data: res.data });
                })
        }
    }

    render() {
        // console.log('a'+this.state.rate);
        return (
            <View style={styles.content}>
                <FlatList
                    style={{ backgroundColor: '#fff' }}
                    data={this.state.data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        item.mtab === 'sucai' ?
                            (item.mimage === '' ?
                                <View style={styles.container}>
                                    <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                        <Text style={{ fontSize: 18 * s, margin: 10 * s }}>素材--{item.msname}</Text>
                                        <Text style={{ fontSize: 30 * s, margin: 10 * s, height: 280 * s, paddingTop: 100 * s }}>{item.mtitle}</Text>
                                        <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                    </TouchableOpacity>
                                </View>
                                : (item.mimage.split('.')[1] === 'mp4' ?
                                    <View style={styles.container}>
                                        <Text style={{ fontSize: 18 * s, margin: 10 * s }}>素材--{item.msname}</Text>
                                        <TouchableOpacity onPress = {() => this.setState({ paused: !this.state.paused })}>
                                        <Video
                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                            ref={(ref) => { //方法对引用Video元素的ref引用进行操作
                                                this.video = ref
                                            }}
                                            style={{ width: width, height: 290 * s }}
                                            rate={this.state.rate}//播放速率
                                            paused={this.state.paused}//暂停
                                            volume={this.state.volume}//调节音量
                                            muted={this.state.muted}//控制音频是否静音
                                            repeat={false}//确定在到达结尾时是否重复播放视频
                                        // onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                                        // onLoad={this.setDuration}//当视频加载完毕时的回调函数
                                        // onProgress={this.setTime}//进度控制，每250ms调用一次，以获取视频播放的进度
                                        // onEnd={this.onEnd}//当视频播放完毕后的回调函数
                                        />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                            <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={styles.container}>
                                        <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                            <Text style={{ fontSize: 18 * s, margin: 10 * s }}>素材--{item.msname}</Text>
                                            <Image
                                                style={{ width: width-20 * s, height: 240 * s, margin: 10* s }}
                                                source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                            />
                                            <Text style={{ fontSize: 26 * s, margin: 10* s }}>{item.mtitle}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )) : (item.mtab === 'fanwen' ?
                                    (item.mimage === '' ?
                                        <View style={styles.container}>
                                            <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                <Text style={{ fontSize: 18 * s, margin: 10 * s }}>范文--{item.msname}</Text>
                                                <Text style={{ fontSize: 30 * s, margin: 10 * s, height: 280 * s, paddingTop: 100 * s }}>{item.mtitle}</Text>
                                                <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        : (item.mimage.split('.')[1] === 'mp4' ?
                                            <View style={styles.container}>
                                                <Text style={{ fontSize: 18 * s, margin: 18 * s }}>范文--{item.msname}</Text>
                                                <TouchableOpacity onPress = {() => this.setState({ paused: !this.state.paused })}>
                                                <Video
                                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    ref={(ref) => { //方法对引用Video元素的ref引用进行操作
                                                        this.video = ref
                                                    }}
                                                    style={{ width: width, height: 290 * s }}
                                                    rate={this.state.rate}//播放速率
                                                    paused={this.state.paused}//暂停
                                                    volume={this.state.volume}//调节音量
                                                    muted={this.state.muted}//控制音频是否静音
                                                    repeat={false}//确定在到达结尾时是否重复播放视频
                                                />
                                                </TouchableOpacity>
                                                <Text onPress={() => this.setState({ paused: !this.state.paused })}></Text>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                    <Text style={{ fontSize: 18 * s, margin: 10 * s }}>范文--{item.msname}</Text>
                                                    <Image
                                                        style={{ width: width-20 * s, height: 240 * s, margin: 10* s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s, margin: 10* s }}>{item.mtitle}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                    :
                                    (item.mimage === '' ?
                                        <View style={styles.container}>
                                            <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                <Text style={{ fontSize: 18 * s, margin: 10 }}>技法--{item.msname}</Text>
                                                <Text style={{ fontSize: 30 * s, margin: 10 * s, height: 280 * s, paddingTop: 100 * s }}>{item.mtitle}</Text>
                                                <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        : (item.mimage.split('.')[1] === 'mp4' ?
                                            <View style={styles.container}>
                                                <Text style={{ fontSize: 18*s, margin: 10*s }}>技法--{item.msname}</Text>
                                                <TouchableOpacity onPress = {() => this.setState({ paused: !this.state.paused })}>
                                                <Video
                                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    ref={(ref) => { //方法对引用Video元素的ref引用进行操作
                                                        this.video = ref
                                                    }}
                                                    style={{ width: width, height: 290*s }}
                                                    rate={this.state.rate}//播放速率
                                                    paused={this.state.paused}//暂停
                                                    volume={this.state.volume}//调节音量
                                                    muted={this.state.muted}//控制音频是否静音
                                                    repeat={false}//确定在到达结尾时是否重复播放视频
                                                />
                                                </TouchableOpacity>
                                                <Text onPress={() => this.setState({ paused: !this.state.paused })}></Text>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                    <Text style={{ fontSize: 26*s, margin: 10*s }}>{item.mtitle}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                    <Text style={{ fontSize: 18*s, margin: 10*s }}>技法--{item.msname}</Text>
                                                    <Image
                                                        style={{ width: width-20 * s, height: 240 * s, margin: 10* s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 *s, margin: 26*s }}>{item.mtitle}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )))
                    )}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10 * s
    },
    container: {
        width: width * 0.94,
        height: 400 * s,
        borderBottomColor: '#f5f4f9',
        borderBottomWidth: 6 * s
    }
})