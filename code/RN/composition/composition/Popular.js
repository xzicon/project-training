import React, { Component } from 'react'
import { Text, View, Animated,Easing,AsyncStorage, ScrollView, Modal, TouchableOpacity, StyleSheet, Dimensions, NavigationBar, ToastAndroid, FlatList, Image, TextInput, TouchableHighlight, TouchableWithoutFeedback,
    TouchableNativeFeedback
 } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';

import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
// import HTML from 'react-native-render-html';
import Word from './Word';
import {Radio,WhiteSpace,List, Switch} from '@ant-design/react-native'
const RadioItem = Radio.RadioItem;
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
            favorite_modal:false,//弹出收藏夹选项
            fadeIn_favorite: new Animated.Value(0),//
            flist:[],//收藏夹列表
            mid:this.props.mid,
            create_modal:false,//创建收藏夹蒙罩
            ishide:true,//公开还是隐藏
        
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
    // 收藏夹功能
    favoritelist=(create)=>{
        fetch('http://116.62.14.0:8402/favorite/mlist/' + this.state.uid+'/'+this.state.mid)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ flist: res.data});
            console.log(this.state.flist[0].iscollect);
            if(!create){
                this.state.flist.forEach((item,index) => {//k,v位置是反的哦
                    item.iscollect!==null?
                    this.setState({
                        is_checked:item.iscollect,
                        delete_col:item.iscollect
                    })
                    :
                    console.log(item.iscollect);
                    console.log(index);
                })
            } 
        })
    }
    // 弹出来收藏夹列表
    favorite=(look)=>{
        this.setState({
            favorite_modal:true,
            _iscc:look==null?false:true,
        })
        this.favoritelist(false);
    }
    // 不显示收藏夹列表
    favorite_false=()=>{
        this.setState({
            favorite_modal:false
        })
    }
    // 收藏
    _iscollection=(_iscc,is_checked)=>{
        if(_iscc){
            if(is_checked==null){
            // 取消
                let data = {
                    uid: this.state.uid,
                    mid: this.props.mid,
                    faid:this.state.delete_col
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
            }else{
            // 修改
            let data = {
                uid: this.state.uid,
                mid: this.props.mid,
                faid:this.state.is_checked
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
        }else{
            let data = {
                uid: this.state.uid,
                mid: this.props.mid,
                faid:this.state.is_checked
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
            // 收藏
        }
    }
    collection=()=>{
        let data = {
            uid: this.state.uid,
            mid: this.props.mid,
            faid:this.state.faid
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
    checked=(faid)=>{
        this.state.is_checked==faid
        ?
        this.setState({
            is_checked:null
        })
        :
        this.setState({
            is_checked:faid
        })
        console.log('faid'+faid);
    }

    // 创建收藏夹
    create=()=>{
        this.setState({
            create_modal:true,
            favorite_modal:false
        })
        console.log(this.state.create_modal)
    }
    create_false=()=>{
        this.setState({
            create_modal:false,
            favorite_modal:true
        })
    }
    onSwitchChange = (value) => {
        this.setState({
          ishide: value,
        })
    };
    create_favorite=(favoritename,fhide)=>{
        let data = {
            uid: this.state.uid,
            favoritename: favoritename,
            fhide:fhide?0:1,
            fadescribe:this.state.fadescribe,
            faimage:'collectlist.png'
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
    render() {
        console.log(this.state.paused);
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
                        <View style={{paddingLeft:'5%',paddingRight:'5%',backgroundColor:'#FFF',
                alignItems:'center',flexDirection:'row',justifyContent:'space-between',height:90*s}}>
                
                            <TouchableOpacity onPress={this.create_false}>
                                <Icon size={40*s} style={{color:'#000'}} name='left'/>
                            </TouchableOpacity>
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontSize:28*s}}>创建</Text>  
                            </View>       
                            <TouchableOpacity onPress={()=>{this.create_favorite(this.state.favoritename,this.state.ishide)}}>
                                <Text>完成</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',backgroundColor:'#FFF',width:'100%',marginTop:30*s,marginBottom:30*s,height:90*s,alignItems:'center'}}>
                            <Text style={{width:'20%',paddingLeft:30*s}}><Text style={{color:'red'}}>*</Text>名称</Text>
                            <TextInput
                            style={{ backgroundColor: '#FFF', padding: 10*s}}
                            placeholder="名称"
                            onChangeText={(favoritename) => {
                                this.setState({ favoritename:favoritename})
                            }}
                            />
                        </View>
                        <View style={{flexDirection:'row',backgroundColor:'#FFF',width:'100%',marginTop:30*s,marginBottom:30*s,height:150*s}}>
                            <Text style={{width:'20%',paddingLeft:30*s,height:100*s,paddingTop:10*s}}>简介</Text>
                            <TextInput
                            style={{ height:150*s,backgroundColor: '#FFF', padding: 10*s,height:150*s,width:'80%'}}
                            placeholder="可填写简介"
                            multiline={true}
                            minHeight={150*s} 
                            textAlignVertical={'top'}
                            onChangeText={(fadescribe) => {
                                this.setState({ fadescribe:fadescribe})
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
                    <View style={{ backgroundColor: '#FFF', position: 'absolute', bottom: 0, right: 0, left: 0,height:height*0.5}}>
                        <View style={{padding:15*s,height:80*s,width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name='bars' size={40*s} color={'grey'}/>
                                <Text>选择收藏夹</Text>
                            </View>
                            <TouchableOpacity
                            onPress={this.create}
                            // onLongPress={()=> {alert('长按效果')}}
                               //默认是false，如果是true表示关闭该组件的触摸功能
                            
                            >
                                <Text style={{color:'#666666'}}>+新建收藏夹</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={this.state.flist}
                            numColumns={1}
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableNativeFeedback
                                    style={{width:'100%'}}
                                    // activeOpacity={0.2}
                                    // underlayColor={'grey'}
                                    background={TouchableNativeFeedback.SelectableBackground()}
                                    onPress={()=>{this.checked(item.faid)}}
                                    >
                                            <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#FFF',height:150*s,borderRadius:10*s,padding:20*s}}>
                                                <View style={{flexDirection:'row',width:'90%'}}>
                                                    <Image style={{width:120*s,height:120*s,marginRight:10*s}} source={{ uri: 'http://116.62.14.0:8402/images/' + item.faimage }}/>
                                                    <View style={{height:120*s,flexDirection:'column',justifyContent:'space-evenly'}}>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <Text style={{fontSize:25*s,marginRight:10*s}}>{item.favoritename}</Text>

                                                            {
                                                                item.fhide==1?
                                                                <Icon1 name='lock' color='grey' size={25*s}/>
                                                                :
                                                                <Text></Text>
                                                            } 
                                                        </View>
                                                        <Text style={{color:'grey',fontSize:20*s}}>{item.fnum==null?'0个内容':item.fnum+`个内容`}</Text>     
                                                    </View> 
                                                </View>
                                                {
                                                    this.state.is_checked==item.faid || (item.iscollect==this.state.is_checked && item.iscollect!==null && item.iscollect==item.faid)?
                                                    <View style={{width:30*s,height:30*s,}}>
                                                        <Image style={{width:30*s,height:30*s}} source={require('../../assets/composition/composition/checked.png')}/>
                                                    </View>
                                                    :
                                                    <View style={{width:30*s,height:30*s,}}>
                                                        <Image style={{width:30*s,height:30*s}} source={require('../../assets/composition/composition/check.png')}/>
                                                    </View>
                                                }
                                            </View>
                                </TouchableNativeFeedback>
                                </View>
                            )}
                        />
                        <TouchableOpacity style={{height:70*s,flexDirection:'row',alignItems:'center',justifyContent:'center',borderTopWidth:1,borderColor:'#F0F0F0'}} onPress={()=>{this._iscollection(this.state._iscc,this.state.is_checked)}}>
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
                                <TouchableOpacity style={{ width: '15%', alignItems: 'center' }} onPress={()=>this.favorite(item.look)}>
                                    {item.look == null ?
                                        <Image
                                            style={{ width: 40 * s, height: 40 * s }}
                                            source={require('../../assets/composition/composition/collection0.png')}
                                        />
                                        // <Icon name='staro' size={40 * s} />
                                        :
                                        // <Icon name='star' color='red' size={40 * s} />
                                        <Image
                                            style={{ width: 40 * s, height: 40 * s }}
                                            source={require('../../assets/composition/composition/collection.png')}
                                        />
                                    }
                                    {item.look == null ?
                                        <Text style={{ fontSize: 18 * s }}>收藏&nbsp;&nbsp;{item.mcollect}</Text>
                                        : <Text style={{ fontSize: 18 * s }}>已收藏&nbsp;&nbsp;{item.mcollect}</Text>}
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '15%', alignItems: 'center' }} onPress={() => { Actions.addEssaywrite({ mid: item.mid }) }}>
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
    cover1: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#F0F0F0'
    },
})