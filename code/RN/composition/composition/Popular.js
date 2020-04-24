import React, { Component } from 'react'
import { Text, View, AsyncStorage, ScrollView, Modal, TouchableOpacity, StyleSheet, Dimensions, NavigationBar, ToastAndroid, FlatList, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
// import HTML from 'react-native-render-html';
import Word from './Word';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

// const htmlContent = `
// <input type="text" value="This"/>
// <h1>This HTML snippet is now rendered with native components !</h1>
// <h2>Enjoy a webview-free and blazing fast application</h2>
// `;

// 素材详情页
export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            com: false,
            mccontent: '',//评论内容
            updatec: false,//更新评论
            updatea: false,//更新练笔
            data: [],
            onecolor: 'red',
            oneborderBottomColor: '#ffdf41',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            lp: '1',
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
        AsyncStorage.getItem('uid')
            .then((res) => {
                console.log(s, scale)
                res === null ?
                    this.setState({ uid: '6' })
                    :
                    this.setState({ uid: res })
                this.getMaterial();
            })
    }
    getMaterial = () => {
        fetch('http://116.62.14.0:8402/material/xiang/' + this.props.mid + '/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data)
                this.setState({ data: res.data });
            })
    }
    // 评论显示
    _comment = () => {
        let com1 = this.state.com;
        this.setState({
            com: !com1
        })
    }
    // 添加评论
    addComment = () => {
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
        let data = {
            mccontent: this.state.mccontent,
            mctime: Y + M + D + h + m,
            uid: this.state.uid,
            mid: this.props.mid
        }
        fetch('http://116.62.14.0:8402/comment/addmaterial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                if (res.status == 0) {
                    ToastAndroid.show('评论成功', 100);
                    this._comment();
                    this.getMaterial();
                    this.setState({
                        updatec: true
                    })
                } else {
                    ToastAndroid.show('评论失败', 100)
                }

            })
    }
    Change1 = () => {
        this.setState({
            onecolor: 'red',
            oneborderBottomColor: '#ffdf41',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            lp: '1'
        })
    }
    Change2 = () => {
        this.setState({
            onecolor: '#000',
            oneborderBottomColor: '#fff',
            twocolor: 'red',
            twoborderBottomColor: '#ffdf41',
            lp: '2'
        })
    }
    fetchGood = (e) => {
        let data = {
            uid: this.state.uid,
            mid: this.props.mid
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/likes/material', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                switch (data.status) {
                    case "0": {
                        console.log(data.data);
                        this.getMaterial();
                        ToastAndroid.show('收藏成功', 100);
                        break;
                    }
                    default: {
                        console.log(data.data);
                        break;
                    }
                }
            })
    }
    // 练笔评论
    _word = (mid) => {
        return (
            <Word updatea={this.state.updatea} updatec={this.state.updatec} lp={this.state.lp} mid={mid} />
        )
    }

    render() {
        console.log(this.state.paused);
        return (
            <View style={{ flex: 1 }}>
                {/* 添加评论 */}
                <Modal
                    style={styles.con}
                    animationType='silde'
                    onRequestClose={this._comment}//安卓必须设置
                    transparent={true}
                    visible={this.state.com}
                >
                    <TouchableOpacity style={styles.cover}
                        onPress={this._comment}>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#FFF', position: 'absolute', bottom: 0, right: 0, left: 0, flexDirection: 'row', padding: 20 * s, justifyContent: 'space-around' }}>
                        <View style={{ width: '90%' }}>
                            <TextInput
                                multiline={true}
                                style={{ width: '100%', backgroundColor: '#F5F5F5', borderRadius: 10 * s, height: 200 * s }}
                                minHeight={200 * s}
                                placeholder='写评论~'
                                textAlignVertical={'top'}
                                onChangeText={(mccontent) => {
                                    this.setState({
                                        mccontent: mccontent
                                    })
                                }}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-between', marginTop: 10 * s }}>
                            <TouchableOpacity onPress={this.addComment}>
                                <Text>发送</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* 标题栏 */}
                <View style={styles.header}>
                    <Icon onPress={() => { Actions.pop() }} name="left" color="#000" style={{ marginLeft: 30 * s }} size={40 * s} />
                    <TouchableOpacity style={{ marginLeft: width * 0.78 }}>
                        <Image
                            source={require('../../assets/composition/composition/dy.png')}
                            style={{ width: 40 * s, height: 40 * s }}
                        />
                    </TouchableOpacity>
                </View>
                {/* 素材内容 */}
                {/* <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} /> */}
                <FlatList
                    data={this.state.data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        this.props.mtab === 'sucai' ? (
                            item.mimage === '' ?
                                <View>
                                    <View style={styles.container}>
                                        <Text style={{ fontSize: 34 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                        <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                        <Text style={{ fontSize: 30 * s, margin: 10 * s }}>解析：</Text>
                                        <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                        <Text style={{ fontSize: 30 * s, margin: 10 * s }}>示例：</Text>
                                        <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                    </View>
                                    <View style={styles.source}>
                                        <TouchableOpacity onPress={() => { this.Change1() }}>
                                            <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>练笔</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.Change2() }}>
                                            <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>评论</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        {this._word(item.mid)}
                                    </View>
                                </View>
                                : (item.mimage.split('.')[1] === 'mp4' ?
                                    <View>
                                        <View style={styles.container}>
                                            <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
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
                                            <Text style={{ fontSize: 34 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                            <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                            <Text style={{ fontSize: 30 * s, margin: 10 * s }}>解析：</Text>
                                            <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                            <Text style={{ fontSize: 30 * s, margin: 10 * s }}>示例：</Text>
                                            <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                        </View>
                                        <View style={styles.source}>
                                            <TouchableOpacity onPress={() => { this.Change1() }}>
                                                <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>练笔</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.Change2() }}>
                                                <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>评论</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            {this._word(item.mid)}
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        <View style={styles.container}>
                                            <Image
                                                style={{ width: width - 20 * s, height: 280 * s, margin: 10 * s }}
                                                source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                            />
                                            <Text style={{ fontSize: 34 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                            <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                            <Text style={{ fontSize: 30 * s, margin: 10 * s }}>解析：</Text>
                                            <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                            <Text style={{ fontSize: 30 * s, margin: 10 * s }}>示例：</Text>
                                            <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                        </View>
                                        <View style={styles.source}>
                                            <TouchableOpacity onPress={() => { this.Change1() }}>
                                                <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>练笔</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.Change2() }}>
                                                <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>评论</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View>
                                            {this._word(item.mid)}
                                        </View>
                                    </View>)) : (this.props.mtab === 'fanwen' ?
                                        (item.mimage === '' ?
                                            <View>
                                                <View style={styles.container}>
                                                    <Text style={{ fontSize: 34 * s, margin: 10 * s, textAlign: 'center' }}>{item.mtitle}</Text>
                                                    <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                    <Text style={{ fontSize: 30 * s, margin: 10 * s }}>解析：</Text>
                                                    <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                    <Text style={{ fontSize: 30 * s, margin: 10 * s }}>示例：</Text>
                                                    <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                </View>
                                                <View style={styles.source}>
                                                    <TouchableOpacity onPress={() => { this.Change1() }}>
                                                        <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>练笔</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { this.Change2() }}>
                                                        <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>评论</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <Word lp={this.state.lp} mid={item.mid} />
                                                </View>
                                            </View>
                                            : (item.mimage.split('.')[1] === 'mp4' ?
                                                <View>
                                                    <View style={styles.container}>
                                                        <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
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
                                                            /></TouchableOpacity>
                                                        <Text style={{ fontSize: 34 * s, margin: 10 * s, textAlign: 'center' }}>{item.mtitle}</Text>
                                                        <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                        <Text style={{ fontSize: 30 * s, margin: 10 * s }}>解析：</Text>
                                                        <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                        <Text style={{ fontSize: 30 * s, margin: 10 * s }}>示例：</Text>
                                                        <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                    </View>
                                                    <View style={styles.source}>
                                                        <TouchableOpacity onPress={() => { this.Change1() }}>
                                                            <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>练笔</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.Change2() }}>
                                                            <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>评论</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        {this._word(item.mid)}
                                                    </View>
                                                </View>
                                                :
                                                <View>
                                                    <View style={styles.container}>
                                                        <Image
                                                            style={{ width: width - 20 * s, height: 280 * s, margin: 10 * s }}
                                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                        />
                                                        <Text style={{ fontSize: 34 * s, margin: 10 * s, textAlign: 'center' }}>{item.mtitle}</Text>
                                                        <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                        <Text style={{ fontSize: 30 * s, margin: 10 * s }}>解析：</Text>
                                                        <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                        <Text style={{ fontSize: 30 * s, margin: 10 * s }}>示例：</Text>
                                                        <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                    </View>
                                                    <View style={styles.source}>
                                                        <TouchableOpacity onPress={() => { this.Change1() }}>
                                                            <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>练笔</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.Change2() }}>
                                                            <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>评论</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        {this._word(item.mid)}
                                                    </View>
                                                </View>)) : (
                                            item.mimage === '' ?
                                                <View>
                                                    <View style={styles.container}>
                                                        <Text style={{ fontSize: 34 * s, margin: 10 * s, textAlign: 'center' }}>{item.mtitle}</Text>
                                                        <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                        <Text style={{ fontSize: 30 * s, margin: 10 * s }}>解析：</Text>
                                                        <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                        <Text style={{ fontSize: 30 * s, margin: 10 * s }}>示例：</Text>
                                                        <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                    </View>
                                                    <View style={styles.source}>
                                                        <TouchableOpacity onPress={() => { this.Change1() }}>
                                                            <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>练笔</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.Change2() }}>
                                                            <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>评论</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        {this._word(item.mid)}
                                                    </View>
                                                </View>
                                                : (item.mimage.split('.')[1] === 'mp4' ?
                                                    <View>
                                                        <View style={styles.container}>
                                                            <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
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
                                                                /></TouchableOpacity>
                                                            <Text style={{ fontSize: 34 * s, margin: 10 * s, textAlign: 'center' }}>{item.mtitle}</Text>
                                                            <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                            <Text style={{ fontSize: 30 * s, margin: 10 * s }}>解析：</Text>
                                                            <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                            <Text style={{ fontSize: 30 * s, margin: 10 * s }}>示例：</Text>
                                                            <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                        </View>
                                                        <View style={styles.source}>
                                                            <TouchableOpacity onPress={() => { this.Change1() }}>
                                                                <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>练笔</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { this.Change2() }}>
                                                                <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>评论</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            {this._word(item.mid)}
                                                        </View>
                                                    </View>
                                                    :
                                                    <View>
                                                        <View style={styles.container}>
                                                            <Image
                                                                style={{ width: width - 20 * s, height: 280 * s, margin: 10 * s }}
                                                                source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                            />
                                                            <Text style={{ fontSize: 34 * s, margin: 10 * s, textAlign: 'center' }}>{item.mtitle}</Text>
                                                            <Text style={{ fontSize: 18 * s, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                            <Text style={{ fontSize: 30 * s, margin: 10 * s }}>解析：</Text>
                                                            <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                            <Text style={{ fontSize: 30 * s, margin: 10 * s }}>示例：</Text>
                                                            <Text style={{ fontSize: 24 * s, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                        </View>
                                                        <View style={styles.source}>
                                                            <TouchableOpacity onPress={() => { this.Change1() }}>
                                                                <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>练笔</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { this.Change2() }}>
                                                                <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>评论</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            {this._word(item.mid)}
                                                        </View>
                                                    </View>)
                                        )
                            )
                    )}
                />
                {/* 点赞，练笔，评论悬浮 */}
                <View>
                    {
                        this.state.data.map(item => (
                            <View style={styles.footer}>
                                <TouchableOpacity style={{ width: '15%', alignItems: 'center' }} onPress={this.fetchGood}>
                                    {item.look == null ?
                                        <Icon name='staro' size={40 * s} />
                                        :
                                        <Icon name='star' color='yellow' size={40 * s} />
                                    }
                                    {item.look == null ?
                                        <Text style={{ fontSize: 18 * s }}>收藏&nbsp;&nbsp;{item.mcollect}</Text>
                                        : <Text style={{ fontSize: 18 * s }}>已收藏&nbsp;&nbsp;{item.mcollect}</Text>}
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '15%', alignItems: 'center' }} onPress={() => { Actions.addEssaywrite({ mid: item.mid }) }}>
                                    <Image
                                        style={{ width: 40 * s, height: 40 * s }}
                                        source={require('../../assets/composition/composition/write.png')}
                                    />
                                    <Text style={{ fontSize: 18 * s }}>练笔</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._comment} style={{ justifyContent: 'center', alignItems: 'center', width: '15%' }}>
                                    <Icon name='message1' size={40 * s} />
                                    <Text style={{ fontSize: 18 * s }}>评论</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '15%' }}>
                                    <Icon name='sharealt' size={40 * s} />
                                    <Text style={{ fontSize: 18 * s }}>分享</Text>
                                </TouchableOpacity>
                            </View>))}
                </View>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        width: width,
        borderBottomColor: 'gray',
        borderBottomWidth: 2 * s,
        paddingTop: 10 * s
    },
    footer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: width,
        height: 90 * s
    },
    onelabel: {
        borderBottomWidth: 4 * s,
        fontSize: 26 * s,
        marginLeft: 20 * s
    },
    twolabel: {
        borderBottomWidth: 4 * s,
        fontSize: 26 * s,
        marginLeft: 20 * s
    },
    con: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cover: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
})