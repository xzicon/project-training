import React, { Component } from 'react'
import {
    Text, View, Animated, Easing, AsyncStorage, ScrollView, Modal, TouchableOpacity, StyleSheet, Dimensions, NavigationBar, ToastAndroid, FlatList, Image, TextInput, TouchableHighlight, TouchableWithoutFeedback,
    TouchableNativeFeedback, BackHandler
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';

import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
//import RNFS from 'react-native-fs';
import Word from './Word';
import { Radio, WhiteSpace, List, Switch } from '@ant-design/react-native'
const RadioItem = Radio.RadioItem;
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

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
            volume: 0.6,
            muted: false,
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            play: false,
            volumeplay: false,
            favorite_modal: false,//弹出收藏夹选项
            fadeIn_favorite: new Animated.Value(0),//
            flist: [],//收藏夹列表
            mid: this.props.mid,
            create_modal: false,//创建收藏夹蒙罩
            ishide: true,//公开还是隐藏
            ftitle: 30 * s,// 字体
            ftag: 18 * s,
            fqu: 24 * s,
            fcontent: 20 * s,
            sou: false,
            sou1: false,
            color1: 'red',
            color2: '#000',
            uri: '', //生成图片
            isSave: false,
        }
        this.mainViewRef = React.createRef();
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                console.log(s, scale)
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                this.getMaterial();
            })
    }
    componentWillReceiveProps() {
        if (this.props.refresh == 1) {
            this.setState({
                updatea:true
            })
        }
    }
    getMaterial = () => {
        fetch('http://116.62.14.0:8402/material/xiang/' + this.props.mid + '/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                // console.log(res.data)
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
                    ToastAndroid.show('积分+1，经验值+5', 100);
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
    // 收藏夹功能
    favoritelist = (create) => {
        fetch('http://116.62.14.0:8402/favorite/mlist/' + this.state.uid + '/' + this.state.mid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ flist: res.data });
                console.log(this.state.flist[0].iscollect);
                if (!create) {
                    this.state.flist.forEach((item, index) => {//k,v位置是反的哦
                        item.iscollect !== null ?
                            this.setState({
                                is_checked: item.iscollect,
                                delete_col: item.iscollect
                            })
                            :
                            console.log(item.iscollect);
                        console.log(index);
                    })
                }
            })
    }
    // 弹出来收藏夹列表
    favorite = (look) => {
        this.setState({
            favorite_modal: true,
            _iscc: look == null ? false : true,
        })
        this.favoritelist(false);
    }
    // 不显示收藏夹列表
    favorite_false = () => {
        this.setState({
            favorite_modal: false
        })
    }
    // 收藏
    _iscollection = (_iscc, is_checked) => {
        if (_iscc) {
            if (is_checked == null) {
                // 取消
                let data = {
                    uid: this.state.uid,
                    mid: this.props.mid,
                    faid: this.state.delete_col
                }
                fetch('http://116.62.14.0:8402/favorite/deletecollection', {
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
                                this.favorite_false();
                                ToastAndroid.show('取消收藏成功', 100);
                                break;
                            }
                            default: {
                                console.log(data.data);
                                break;
                            }
                        }
                    })
            } else {
                
                // 修改
                let data = {
                    uid: this.state.uid,
                    mid: this.props.mid,
                    faid: this.state.is_checked
                }
                fetch('http://116.62.14.0:8402/favorite/updatecollection', {
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
                                this.favorite_false();
                                break;
                            }
                            default: {
                                console.log(data.data);
                                break;
                            }
                        }
                    })
            }
        } else {
            if (is_checked == null) {
                this.favorite_false();
            }else{
            let data = {
                uid: this.state.uid,
                mid: this.props.mid,
                faid: this.state.is_checked
            }
            fetch('http://116.62.14.0:8402/favorite/createcollection', {
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
                            this.favorite_false();
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
            // 收藏
        }
    }
    collection = () => {
        let data = {
            uid: this.state.uid,
            mid: this.props.mid,
            faid: this.state.faid
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
    checked = (faid) => {
        this.state.is_checked == faid
            ?
            this.setState({
                is_checked: null
            })
            :
            this.setState({
                is_checked: faid
            })
        console.log('faid' + faid);
    }

    // 创建收藏夹
    create = () => {
        this.setState({
            create_modal: true,
            favorite_modal: false
        })
        console.log(this.state.create_modal)
    }
    create_false = () => {
        this.setState({
            create_modal: false,
            favorite_modal: true
        })
    }
    onSwitchChange = (value) => {
        this.setState({
            ishide: value,
        })
    };
    create_favorite = (favoritename, fhide) => {
        let data = {
            uid: this.state.uid,
            favoritename: favoritename,
            fhide: fhide ? 0 : 1,
            fadescribe: this.state.fadescribe,
            faimage: 'collectlist.png'
        }
        fetch('http://116.62.14.0:8402/favorite/create', {
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
                        this.create_false();
                        this.favoritelist(true);
                        ToastAndroid.show('创建成功', 100);
                        break;
                    }
                    default: {
                        console.log(data.data);
                        break;
                    }
                }
            })
    }
    // 字体
    comset = (ffont) => {
        console.log(ffont);
        if (!ffont) {
            this.setState({
                ftitle: 36 * s,
                ftag: 24 * s,
                fqu: 30 * s,
                fcontent: 26 * s,
                color2: 'red',
                color1: '#000'
            })
        } else {
            this.setState({
                ftitle: 30 * s,
                ftag: 18 * s,
                fqu: 24 * s,
                fcontent: 20 * s,
                color1: 'red',
                color2: '#000'
            })
        }
    }
    _source = () => {
        this.setState({
            sou: true,
        })
    }
    _source_false = () => {
        this.setState({
            sou: false,
        })
    }
    _source1 = () => {
        this.setState({
            sou1: true,
            sou: false,
        })
    }
    _source1_false = () => {
        this.setState({
            sou1: false,
        })
    }
    // 视频
    static navigationOptions = {
        header: null
    };
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    
    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };
    onLoad = (data) => {
        this.setState({ duration: data.duration });
        console.log(data.duration + "xxx");
    };
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
        console.log(data.currentTime + "hhh");
    };
    onEnd = () => {
        this.setState({ paused: true })
        this.video.seek(0)
    };
    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };
    onAudioFocusChanged = (event) => {
        this.setState({ paused: !event.hasAudioFocus })
    };
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };
    _play = () => {
        this.setState({ play: true });
    }
    _play_false = () => {
        this.setState({ play: false })
    }
    ratePlay = (rate) => {
        if (rate === 1) {
            this.setState({ rate: 1.5 })
        } else if (rate === 1.5) {
            this.setState({ rate: 2 })
        } else if (rate === 2) {
            this.setState({ rate: 0.75 })
        } else if (rate === 0.75) {
            this.setState({ rate: 0.5 })
        } else if (rate === 0.5) {
            this.setState({ rate: 1 })
        }
    }
    volumePlay1 = (volume) => {
        if (volume >= 0 && volume < 1) {
            this.setState({ volume: volume + 0.1 })
        } else {
            this.setState({ volume: 1 })
        }
    }
    volumePlay2 = (volume) => {
        if (volume > 0 && volume <= 1) {
            this.setState({ volume: volume - 0.1 })
        } else {
            this.setState({ volume: 0 })
        }
    }
    _volume = () => {
        this.setState({ volumeplay: true });
    }
    _volume_false = () => {
        this.setState({ volumeplay: false })
    }
    //生成图片
    takeToImage = () => {
        captureRef(this.mainViewRef.current, {
            format: "jpg",
            quality: 0.8,
        })
            .then(
                uri => {
                    this.setState({
                        isSave: true,
                        uri: uri,

                    })
                    console.log(this.state.uri)
                    console.log("Image saved to", uri)
                },
                error => console.error("Oops, snapshot failed", error)
            );
    }
    _change = () => {
        this.setState({
            isSave: false
        })
    }
    // 下载文件
    downloadFile = () => {
        const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.jpg`;
        const formUrl = 'http://img.kaiyanapp.com/c7b46c492261a7c19fa880802afe93b3.png?imageMogr2/quality/60/format/jpg';
        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {
                let pro = res.bytesWritten / res.contentLength;
                this.setState({
                    progressNum: pro,
                });
            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            console.log(ret)
            ret.promise.then(res => {
                console.log('success', res);

                console.log('file://' + downloadDest)

                // 例如保存图片
                CameraRoll.saveToCameraRoll(downloadDest)
                    .then(() => {
                        Toast.showShortCenter('图片已保存到相册')
                    }).catch(() => {
                        Toast.showShortCenter('图片保存失败')
                    })

            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(error);
        }
    }
    refreshing=()=>{
        this.setState({
            updatea:true
        })
    }
    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (
            <View style={{ flex: 1 }}>
                {/* 创建收藏夹 */}
                <Modal
                    style={styles.con}
                    animationType='silde'
                    onRequestClose={this.create_false}//安卓必须设置
                    transparent={false}
                    visible={this.state.create_modal}
                >
                    <View style={styles.cover1}
                    >
                        <View style={{
                            paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#FFF',
                            alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 90 * s
                        }}>

                            <TouchableOpacity onPress={this.create_false}>
                                <Icon size={40 * s} style={{ color: '#000' }} name='left' />
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 28 * s }}>创建</Text>
                            </View>
                            <TouchableOpacity onPress={() => { this.create_favorite(this.state.favoritename, this.state.ishide) }}>
                                <Text>完成</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#FFF', width: '100%', marginTop: 30 * s, marginBottom: 30 * s, height: 90 * s, alignItems: 'center' }}>
                            <Text style={{ width: '20%', paddingLeft: 30 * s }}><Text style={{ color: 'red' }}>*</Text>名称</Text>
                            <TextInput
                                style={{ backgroundColor: '#FFF', padding: 10 * s }}
                                placeholder="名称"
                                onChangeText={(favoritename) => {
                                    this.setState({ favoritename: favoritename })
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#FFF', width: '100%', marginTop: 30 * s, marginBottom: 30 * s, height: 150 * s }}>
                            <Text style={{ width: '20%', paddingLeft: 30 * s, height: 100 * s, paddingTop: 10 * s }}>简介</Text>
                            <TextInput
                                style={{ height: 150 * s, backgroundColor: '#FFF', padding: 10 * s, height: 150 * s, width: '80%' }}
                                placeholder="可填写简介"
                                multiline={true}
                                minHeight={150 * s}
                                textAlignVertical={'top'}
                                onChangeText={(fadescribe) => {
                                    this.setState({ fadescribe: fadescribe })
                                }}
                            />
                        </View>
                        <View>
                            <List.Item
                                extra={
                                    <Switch
                                        color
                                        checked={this.state.ishide}
                                        onChange={this.onSwitchChange}
                                    />
                                }
                            >
                                {this.state.ishide ? '公开' : '隐藏'}
                            </List.Item>
                        </View>
                    </View>
                </Modal>
                {/* 收藏夹选项 */}
                <Modal
                    style={styles.con}
                    animationType='silde'
                    onRequestClose={this.favorite_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.favorite_modal}
                >
                    <TouchableOpacity style={styles.cover}
                        onPress={this.favorite_false}>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#FFF', position: 'absolute', bottom: 0, right: 0, left: 0, height: height * 0.5 }}>
                        <View style={{ padding: 15 * s, height: 80 * s, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='bars' size={40 * s} color={'grey'} />
                                <Text>选择收藏夹</Text>
                            </View>
                            <TouchableOpacity
                                onPress={this.create}
                            // onLongPress={()=> {alert('长按效果')}}
                            //默认是false，如果是true表示关闭该组件的触摸功能

                            >
                                <Text style={{ color: '#666666' }}>+新建收藏夹</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={this.state.flist}
                            numColumns={1}
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableNativeFeedback
                                        style={{ width: '100%' }}
                                        // activeOpacity={0.2}
                                        // underlayColor={'grey'}
                                        background={TouchableNativeFeedback.SelectableBackground()}
                                        onPress={() => { this.checked(item.faid) }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', height: 150 * s, borderRadius: 10 * s, padding: 20 * s }}>
                                            <View style={{ flexDirection: 'row', width: '90%' }}>
                                                <Image style={{ width: 120 * s, height: 120 * s, marginRight: 10 * s }} source={{ uri: 'http://116.62.14.0:8402/images/' + item.faimage }} />
                                                <View style={{ height: 120 * s, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 25 * s, marginRight: 10 * s }}>{item.favoritename}</Text>

                                                        {
                                                            item.fhide == 1 ?
                                                                <Icon1 name='lock' color='grey' size={25 * s} />
                                                                :
                                                                <Text></Text>
                                                        }
                                                    </View>
                                                    <Text style={{ color: 'grey', fontSize: 20 * s }}>{item.fnum == null ? '0个内容' : item.fnum + `个内容`}</Text>
                                                </View>
                                            </View>
                                            {
                                                this.state.is_checked == item.faid || (item.iscollect == this.state.is_checked && item.iscollect !== null && item.iscollect == item.faid) ?
                                                    <View style={{ width: 30 * s, height: 30 * s, }}>
                                                        <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/checked.png')} />
                                                    </View>
                                                    :
                                                    <View style={{ width: 30 * s, height: 30 * s, }}>
                                                        <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/check.png')} />
                                                    </View>
                                            }
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            )}
                        />
                        <TouchableOpacity style={{ height: 70 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: '#F0F0F0' }} onPress={() => { this._iscollection(this.state._iscc, this.state.is_checked) }}>
                            <Text>完成</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
                                onSubmitEditing={()=>{this.addComment()}}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-between', marginTop: 10 * s }}>
                            <TouchableOpacity onPress={this.addComment}>
                                <Text>发送</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* 字体大小 */}
                <Modal
                    animationType='silde'
                    onRequestClose={this._source_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.sou}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover2}
                        onPress={this._source_false}>
                    </TouchableOpacity>
                    <View style={{ width: '36%', backgroundColor: '#fff', position: 'absolute', top: 50 * s, right: 40 * s, borderColor: 'gray', borderWidth: s }}>
                        <TouchableOpacity onPress={this.takeToImage} style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: s, alignItems: 'center', padding: 20 * s }}>
                            <Image source={require('../../assets/composition/composition/picture.png')} style={{ width: 26 * s, height: 26 * s }} />
                            <View><Text style={{ color: '#000', fontSize: 20 * s, marginTop: 6 * s, marginLeft: 14 * s }}>生成图片</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._source1} style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: s, alignItems: 'center', padding: 20 * s }}>
                            <Image source={require('../../assets/composition/composition/font.png')} style={{ width: 26 * s, height: 26 * s }} />
                            <View><Text style={{ color: '#000', fontSize: 20 * s, marginTop: 6 * s, marginLeft: 14 * s }}>字体设置</Text></View>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    style={styles.container1}
                    animationType='silde'
                    onRequestClose={this._source1_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.sou1}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover3}
                        onPress={this._source1_false}>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, left: 0, right: 0, padding: 30 * s }}>
                        <View>
                            <Text style={{ fontSize: 24 * s }}>阅读字号</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20 * s }}>
                            <TouchableOpacity onPress={() => { this.comset(true) }}>
                                <Text style={{ color: this.state.color1, fontSize: 20 * s, marginTop: 6 * s, }}>默认</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ color: '#000', fontSize: 20 * s, marginTop: 6 * s, marginLeft: 14 * s, marginRight: 14 * s }}>&nbsp;————&nbsp;</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.comset(false) }}>
                                <Text style={{ color: this.state.color2, fontSize: 26 * s, }}>大号</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* 生成图片 */}
                <Modal
                    style={{ flex: 1, alignItems: 'center' }}
                    animationType='silde'
                    onRequestClose={this._change}
                    transparent={true}
                    visible={this.state.isSave}
                >
                    <TouchableOpacity onPress={this._change} style={styles.cover}></TouchableOpacity>
                    <View>
                        <Image style={{ width: width * 0.9, height: 400 * s, marginLeft: 0.05 * width, marginTop: 80 * s }} source={{ uri: this.state.uri }} />
                        {/* <Text onPress={this.downloadFile} style={{textAlign:'right',backgroundColor:'#fff',width:width*0.9,marginLeft:0.05*width,borderColor:'gray',borderWidth:s,padding:10*s}}>保存图片</Text> */}
                    </View>
                </Modal>
                {/* 视频 */}
                <Modal
                    animationType='silde'
                    onRequestClose={this._volume_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.volumeplay}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover2}
                        onPress={this._volume_false}>
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', top: 356 * s, right: 54 * s }}>
                        <TouchableOpacity onPress={() => { this.volumePlay1(this.state.volume) }} style={{ paddingTop: 10 * s }}>
                            <Image source={require('../../assets/composition/composition/jia.png')} style={{ width: 24 * s, height: 24 * s }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.volumePlay2(this.state.volume) }} style={{ paddingTop: 10 * s }}>
                            <Image source={require('../../assets/composition/composition/jian.png')} style={{ width: 24 * s, height: 24 * s }} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    animationType='silde'
                    onRequestClose={this._play_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.play}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover2}
                        onPress={this._play_false}>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 418 * s, left: 30 * s, right: 30 * s, justifyContent: 'space-between' }}>
                        <View>
                            {this.state.paused ?
                                <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
                                    <Image source={require('../../assets/composition/composition/zanting.png')} style={{ width: 26 * s, height: 26 * s }} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
                                    <Image source={require('../../assets/composition/composition/bofang.png')} style={{ width: 26 * s, height: 26 * s }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={styles.controls}>
                            <View style={styles.generalControls}></View>
                            <View style={styles.trackingControls}>
                                <View style={styles.progress}>
                                    <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                                    <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { this.ratePlay(this.state.rate) }}>
                            <Text style={styles.controlOption}>
                                {this.state.rate}x
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._volume()} style={{ top: -6 * s }}>
                            <Text style={{ color: '#fff' }}>
                                <Image source={require('../../assets/composition/composition/yinliang.png')} />
                                {this.state.volume * 100}%
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* 标题栏 */}
                <View style={styles.header}>
                    <Icon onPress={() => { Actions.pop() }} name="left" color="#000" style={{ marginLeft: 30 * s }} size={35 * s} />
                    <Icon onPress={() => this._source()} name="ellipsis1" color="#000" style={{ marginRight: 30 * s }} size={35 * s} />
                </View>
                {/* 素材内容 */}
                <FlatList
                    data={this.state.data}
                    style={{ backgroundColor: '#fff' }}
                    numColumns={1}
                    // onRefresh={() => {
                    //     this.new()
                    // }}
                    // refreshing={this.state.refreshing}
                    renderItem={({ item }) => (
                        this.props.mtab === 'sucai' ? (
                            item.mimage === '' ?
                                <View>
                                    <View ref={this.mainViewRef} style={styles.container}>
                                        <Text style={{ fontSize: this.state.ftitle, margin: 10 * s }}>{item.mtitle}</Text>
                                        <Text style={{ fontSize: this.state.ftag, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                        <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>解析：</Text>
                                        <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                        <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>示例：</Text>
                                        <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
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
                                            <TouchableOpacity
                                                style={styles.fullScreen}
                                                onPress={() => this._play()}
                                            >
                                                <Video
                                                    ref={(ref) => {
                                                        this.video = ref
                                                    }}
                                                    /* For ExoPlayer */
                                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    style={styles.fullScreen}
                                                    rate={this.state.rate}
                                                    paused={this.state.paused}
                                                    volume={this.state.volume}
                                                    muted={this.state.muted}
                                                    resizeMode={this.state.resizeMode}
                                                    onLoad={this.onLoad}
                                                    onProgress={this.onProgress}
                                                    onEnd={this.onEnd}
                                                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                                                    onAudioFocusChanged={this.onAudioFocusChanged}
                                                    repeat={false}
                                                />
                                            </TouchableOpacity>
                                            <View ref={this.mainViewRef} style={{ backgroundColor: '#fff' }}>
                                                <Text style={{ fontSize: this.state.ftitle, margin: 10 * s }}>{item.mtitle}</Text>
                                                <Text style={{ fontSize: this.state.ftag, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>解析：</Text>
                                                <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>示例：</Text>
                                                <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                            </View>
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
                                            <View ref={this.mainViewRef} style={{ backgroundColor: '#fff' }}>
                                                <Text style={{ fontSize: this.state.ftitle, margin: 10 * s }}>{item.mtitle}</Text>
                                                <Text style={{ fontSize: this.state.ftag, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>解析：</Text>
                                                <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>示例：</Text>
                                                <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                            </View>
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
                                                <View ref={this.mainViewRef} style={styles.container}>
                                                    <Text style={{ fontSize: this.state.ftitle, margin: 10 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ fontSize: this.state.ftag, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                    <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>解析：</Text>
                                                    <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                    <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>示例：</Text>
                                                    <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
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
                                                        <TouchableOpacity
                                                            style={styles.fullScreen}
                                                            onPress={() => this._play()}
                                                        >
                                                            <Video
                                                                ref={(ref) => {
                                                                    this.video = ref
                                                                }}
                                                                /* For ExoPlayer */
                                                                source={{ uri: 'http://116.62.14.0:8402/images/1576652999706.mp4' }}
                                                                style={styles.fullScreen}
                                                                rate={this.state.rate}
                                                                paused={this.state.paused}
                                                                volume={this.state.volume}
                                                                muted={this.state.muted}
                                                                resizeMode={this.state.resizeMode}
                                                                onLoad={this.onLoad}
                                                                onProgress={this.onProgress}
                                                                onEnd={this.onEnd}
                                                                onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                                                                onAudioFocusChanged={this.onAudioFocusChanged}
                                                                repeat={false}
                                                            />
                                                        </TouchableOpacity>
                                                        <View ref={this.mainViewRef} style={{ backgroundColor: '#fff' }}>
                                                            <Text style={{ fontSize: this.state.ftitle, margin: 10 * s }}>{item.mtitle}</Text>
                                                            <Text style={{ fontSize: this.state.ftag, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                            <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>解析：</Text>
                                                            <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                            <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>示例：</Text>
                                                            <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                        </View>
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
                                                        <View ref={this.mainViewRef} style={{ backgroundColor: '#fff' }}>
                                                            <Text style={{ fontSize: this.state.ftitle, margin: 10 * s }}>{item.mtitle}</Text>
                                                            <Text style={{ fontSize: this.state.ftag, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                            <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>解析：</Text>
                                                            <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                            <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>示例：</Text>
                                                            <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                        </View>
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
                                                    <View ref={this.mainViewRef} style={styles.container}>
                                                        <Text style={{ fontSize: this.state.ftitle, margin: 10 * s }}>{item.mtitle}</Text>
                                                        <Text style={{ fontSize: this.state.ftag, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                        <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>解析：</Text>
                                                        <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                        <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>示例：</Text>
                                                        <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
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
                                                            <TouchableOpacity
                                                                style={styles.fullScreen}
                                                                onPress={() => this._play()}
                                                            >
                                                                <Video
                                                                    ref={(ref) => {
                                                                        this.video = ref
                                                                    }}
                                                                    /* For ExoPlayer */
                                                                    source={{ uri: 'http://116.62.14.0:8402/images/1576652999706.mp4' }}
                                                                    style={styles.fullScreen}
                                                                    rate={this.state.rate}
                                                                    paused={this.state.paused}
                                                                    volume={this.state.volume}
                                                                    muted={this.state.muted}
                                                                    resizeMode={this.state.resizeMode}
                                                                    onLoad={this.onLoad}
                                                                    onProgress={this.onProgress}
                                                                    onEnd={this.onEnd}
                                                                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                                                                    onAudioFocusChanged={this.onAudioFocusChanged}
                                                                    repeat={false}
                                                                />
                                                            </TouchableOpacity>
                                                            <View ref={this.mainViewRef} style={{ backgroundColor: '#fff' }}>
                                                                <Text style={{ fontSize: this.state.ftitle, margin: 10 * s }}>{item.mtitle}</Text>
                                                                <Text style={{ fontSize: this.state.ftag, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                                <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>解析：</Text>
                                                                <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                                <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>示例：</Text>
                                                                <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                            </View>
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
                                                            <View ref={this.mainViewRef} style={{ backgroundColor: '#fff' }}>
                                                                <Text style={{ fontSize: this.state.ftitle, margin: 10 * s }}>{item.mtitle}</Text>
                                                                <Text style={{ fontSize: this.state.ftag, textAlign: 'right', margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                                <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>解析：</Text>
                                                                <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.manalyse}</Text>
                                                                <Text style={{ fontSize: this.state.fqu, margin: 10 * s, color:'red' }}>示例：</Text>
                                                                <Text style={{ fontSize: this.state.fcontent, margin: 10 * s }}>&nbsp;&nbsp;{item.mcontent}</Text>
                                                            </View>
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
                                <TouchableOpacity style={{ width: '15%', alignItems: 'center' }} onPress={() => this.favorite(item.look)}>
                                    {item.look == null ?
                                        <Image
                                            style={{ width: 40 * s, height: 40 * s }}
                                            source={require('../../assets/composition/composition/collection0.png')}
                                        />
                                        :
                                        <Image
                                            style={{ width: 40 * s, height: 40 * s }}
                                            source={require('../../assets/composition/composition/collection.png')}
                                        />
                                    }
                                    {item.look == null ?
                                        <Text style={{ fontSize: 18 * s }}>收藏&nbsp;&nbsp;{item.mcollect}</Text>
                                        : <Text style={{ fontSize: 18 * s }}>已收藏&nbsp;&nbsp;{item.mcollect}</Text>}
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '15%', alignItems: 'center' }} onPress={() => { Actions.addEssaywrite({ mid: item.mid ,refresh:()=>{this.refreshing()}}) }}>
                                    <Image
                                        style={{ width: 40 * s, height: 40 * s }}
                                        source={require('../../assets/composition/composition/write0.png')}
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
        marginBottom: 10 * s,
        justifyContent: 'space-between'
    },
    source: {
        width: width,
        height: 60 * s,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        width: width,
        borderBottomColor: 'gray',
        borderBottomWidth: 2 * s,
        paddingTop: 10 * s,
        paddingBottom: 10 * s,
        backgroundColor: '#fff'
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
        fontSize: 24 * s,
        marginLeft: 20 * s
    },
    twolabel: {
        borderBottomWidth: 4 * s,
        fontSize: 24 * s,
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
    cover1: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#F0F0F0'
    },
    cover2: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    cover3: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    container1: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullScreen: {
        height: 350 * s,
    },
    controls: {
        backgroundColor: 'transparent',
        width: '70%',
        top: -12 * s
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 10 * s,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 10 * s,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingTop: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        fontSize: 26 * s,
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 24 * s,
        color: 'white',
        top: -4 * s
    },
})