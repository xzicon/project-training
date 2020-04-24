import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, NavigationBar, ToastAndroid, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

export default class Material extends Component {
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
            flag: '1',
        }

    }
    componentDidMount() {
        fetch('http://116.62.14.0:8402/material/zuire/' + this.props.msid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data});
                console.log(res.data);
            })
    }
    Change1 = () => {
        fetch('http://116.62.14.0:8402/material/zuire/' + this.props.msid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data, flag: '1' });
                console.log(res.data);
            })
    }
    Change2 = () => {
        fetch('http://116.62.14.0:8402/material/zuixin/' + this.props.msid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data, flag: '2' });
                console.log(res.data);
            })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Icon onPress={() => { Actions.pop() }} name="left" color="#000" style={{ marginLeft: 30 }} size={40 * s} />
                    <Text style={{ color: '#000', marginLeft: width * 0.34, marginRight: width * 0.32, fontSize: 35 * s }}>{this.props.msname}</Text>
                </View>
                {this.state.flag === '1' ?
                    <View>
                        <View style={styles.source}>
                            <TouchableOpacity>
                                <Text onPress={() => { this.Change1() }} style={{ color: 'red', borderBottomColor: 'red', borderBottomWidth: 4 * s, marginLeft: 30 * s, fontSize: 26 * s }}>最热</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text onPress={() => { this.Change2() }} style={{ color: '#000',  marginLeft: 30 * s, fontSize: 26 * s }}>最新</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <FlatList
                                style={{ backgroundColor: '#fff' }}
                                data={this.state.data}
                                numColumns={1}
                                renderItem={({ item }) => (
                                    item.mimage === '' ?
                                    <View>
                                        <View style={styles.container}>
                                            <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                <Text style={{ fontSize: 30 * s, margin: 10 * s, height: 320 * s, paddingTop: 100 * s }}>{item.mtitle}</Text>
                                                <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        </View>
                                        : (item.mimage.split('.')[1] === 'mp4' ?
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                    <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
                                                        <Video
                                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                            ref={(ref) => { //方法对引用Video元素的ref引用进行操作
                                                                this.video = ref
                                                            }}
                                                            style={{ width: width, height: 280*s }}
                                                            rate={this.state.rate}//播放速率
                                                            paused={this.state.paused}//暂停
                                                            volume={this.state.volume}//调节音量
                                                            muted={this.state.muted}//控制音频是否静音
                                                        />
                                                    </TouchableOpacity>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                    <Image
                                                        style={{ width: width - 20* s, height: 280 * s, margin: 10 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                </TouchableOpacity>
                                            </View>)
                                )}
                            />
                        </View>
                    </View> :
                    (this.state.flag === '2' ?
                        <View>
                            <View style={styles.source}>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change1() }} style={{ color: '#000', marginLeft: 30 * s, fontSize: 18 }}>最热</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change2() }} style={{ color: 'red', borderBottomColor: 'red', marginLeft: 30 * s, borderBottomWidth: 4, fontSize: 18 }}>最新</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <FlatList
                                    style={{ backgroundColor: '#fff' }}
                                    data={this.state.data}
                                    numColumns={1}
                                    renderItem={({ item }) => (
                                        item.mimage === '' ?
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                <Text style={{ fontSize: 30 * s, margin: 10 * s, height: 320 * s, paddingTop: 100 * s }}>{item.mtitle}</Text>
                                                <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            : (item.mimage.split('.')[1] === 'mp4' ?
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                        <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
                                                            <Video
                                                                source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                                ref={(ref) => { //方法对引用Video元素的ref引用进行操作
                                                                    this.video = ref
                                                                }}
                                                                style={{ width: width, height: 260 * s }}
                                                                rate={this.state.rate}//播放速率
                                                                paused={this.state.paused}//暂停
                                                                volume={this.state.volume}//调节音量
                                                                muted={this.state.muted}//控制音频是否静音
                                                            />
                                                        </TouchableOpacity>
                                                        <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                    <Image
                                                        style={{ width: width - 20* s, height: 280 * s, margin: 10 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                    </TouchableOpacity>
                                                </View>)
                                    )}
                                />
                            </View>
                        </View> :
                        <View>
                            <View style={styles.source}>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change1() }} style={{ color: this.state.onecolor, borderBottomColor: this.state.oneborderBottomColor, borderBottomWidth: 4, marginLeft: 30 * s, fontSize: 18 }}>最热</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change2() }} style={{ color: this.state.twocolor, borderBottomColor: this.state.twoborderBottomColor, marginLeft: 30 * s, borderBottomWidth: 4, fontSize: 18 }}>最新</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <FlatList
                                    style={{ backgroundColor: '#fff' }}
                                    data={this.state.data}
                                    numColumns={1}
                                    renderItem={({ item }) => (
                                        item.mimage === '' ?
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                <Text style={{ fontSize: 30 * s, margin: 10 * s, height: 320 * s, paddingTop: 100 * s }}>{item.mtitle}</Text>
                                                <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            : (item.mimage.split('.')[1] === 'mp4' ?
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                        <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
                                                            <Video
                                                                source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                                ref={(ref) => { //方法对引用Video元素的ref引用进行操作
                                                                    this.video = ref
                                                                }}
                                                                style={{ width: width, height: 260 * s }}
                                                                rate={this.state.rate}//播放速率
                                                                paused={this.state.paused}//暂停
                                                                volume={this.state.volume}//调节音量
                                                                muted={this.state.muted}//控制音频是否静音
                                                            />
                                                        </TouchableOpacity>
                                                        <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                    <Image
                                                        style={{ width: width - 20* s, height: 280 * s, margin: 10 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                    </TouchableOpacity>
                                                </View>)
                                    )}
                                />
                            </View>
                        </View>
                    )}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height: 90 * s,
        flexDirection: 'row',
        alignItems: 'center',
    },
    source: {
        width: width,
        height: 70 * s,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10 * s,
        marginBottom: 10 * s
    },
    container: {
        width: width,
        height: 400 * s,
        borderBottomColor: '#f5f4f9',
        borderBottomWidth: 10 * s
    }
})