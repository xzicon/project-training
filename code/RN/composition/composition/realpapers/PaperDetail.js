import React, { Component } from 'react'
import { ActivityIndicator, Text, TextInput, View, Animated, Dimensions, StyleSheet, Image, TouchableNativeFeedback, AsyncStorage, Modal, TouchableOpacity, FlatList,ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Word from '../../composition/Word'
import Tword from '../Tword';
import {Radio,WhiteSpace,List, Switch} from '@ant-design/react-native'
const RadioItem = Radio.RadioItem;
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

export default class PaperDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoad:false,
            uid:'',  
            mid:this.props.mid,
            favorite_modal:false,//弹出收藏夹选项
            fadeIn_favorite: new Animated.Value(0),//
            flist:[],//收藏夹列表
            create_modal:false,//创建收藏夹蒙罩
            ishide:true,//公开还是隐藏
            paused: true,
            resizeMode: 'contain',
            data: [],
            truetitle:[],
            setFontModal: false,
            setFontModal1: false,
            color1: 'red',
            color2: '#000'
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('uid')
        .then(res=>{
            console.log(this.state.uid)
            res === null ?
                this.setState({ uid:'' })
                :
                this.setState({ uid: res })
            this.all();
        })  
    }

    //获取真题解析详情
    all = () => {
        fetch('http://116.62.14.0:8402/material/xiang/'+this.props.mid+'/' + this.state.uid)
        .then(res=>res.json())
        .then(res=>{
            console.log(res.data)
            this.setState({
                isLoad:true,
                data:res.data,
                truetitle:res.data[0].truetitle
            })
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
                    this.all();
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
    _source = () => {
        this.setState({
            setFontModal: true,
        })
    }
    _source_false = () => {
        this.setState({
            setFontModal: false,
        })
    }
    _source1 = () => {
        this.setState({
            setFontModal1: true,
            setFontModal: false,
        })
    }
    _source1_false = () => {
        this.setState({
            setFontModal1: false,
        })
    }
    comset = (ffont) => {
        if (!ffont) {
            this.setState({
                color2: 'red',
                color1: '#000',
                setFontModal1: false,
            })
        } else {
            this.setState({
                color1: 'red',
                color2: '#000',
                setFontModal1: false,
            })
        }
        this.all();
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
    // 收藏 ————————不能取消收藏和修改收藏
    _iscollection=(_iscc,is_checked)=>{
        console.log(_iscc+'aaaaaaa',is_checked+'bbbbbb')
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
                            this.all();
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
                            this.all();
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
        }
    // 收藏 ————————————可以收藏没问题 但样式不会变
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
                        this.all();
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
        if(this.state.isLoad){
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
                                                        <Image style={{width:30*s,height:30*s}} source={require('../../../assets/composition/composition/checked.png')}/>
                                                    </View>
                                                    :
                                                    <View style={{width:30*s,height:30*s,}}>
                                                        <Image style={{width:30*s,height:30*s}} source={require('../../../assets/composition/composition/check.png')}/>
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
                    {/* 标题栏 */}
                    <View style={styles.header}>
                        <TouchableOpacity style={{ marginLeft:15*s, marginRight:15*s }} onPress={()=>{Actions.pop()}}>
                            <Icon name='left' size={35*s}/>
                        </TouchableOpacity>
                        <View style={{ width:'40%',alignItems:'center',justifyContent:'center',flexDirection:'row' }}>
                            <Text style={{fontSize:30*s}} numberOfLines={1} ellipsizeMode="tail" >{this.state.truetitle}</Text>
                        </View>
                        <Icon onPress={() => this._source()} style={{ marginLeft:15*s, marginRight:15*s }} name='ellipsis1' size={40*s}/>
                    </View>

                    {/* 字体大小设置的悬浮框 */}
                    <Modal
                        animationType='silde'
                        onRequestClose={this._source_false}//安卓必须设置
                        transparent={true}
                        visible={this.state.setFontModal}
                        autoFocus={true}
                    >
                        <TouchableOpacity style={styles.cover2}
                            onPress={this._source_false}>
                        </TouchableOpacity>
                        <View style={{ width: '36%', backgroundColor: '#fff', position: 'absolute', top: 50 * s, right: 30*s, borderColor: 'gray', borderWidth: s }}>
                            <TouchableOpacity onPress={this._source1} style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: s, alignItems: 'center', padding: 20 * s }}>
                                <Image source={require('../../../assets/composition/composition/font.png')} style={{ width: 26 * s, height: 26 * s }} />
                                <View><Text style={{ color: '#000', fontSize: 20 * s, marginTop: 6 * s, marginLeft: 14 * s }}>字体设置</Text></View>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/* 字体设置模块 */}
                    <Modal
                        style={styles.container1}
                        animationType='silde'
                        onRequestClose={this._source1_false}//安卓必须设置
                        transparent={true}
                        visible={this.state.setFontModal1}
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

                    {/* 真题解析的内容 */}
                    <FlatList
                        data={this.state.data}
                        numColumns={1}
                        renderItem={({item}) => (
                            <View>
                                <View style={{ width: width, height:350 * s }}>
                                    <Image source={require('../../../assets/composition/composition/zhenti1.png')} style={{ width:'100%', height:'100%' }}/>
                                </View>
                                <View style={styles.container}>
                                    <Text style={{ fontSize: 36 * s,fontWeight:'bold',textAlign:'center' }}>{item.truetitle}</Text>
                                    <Text style={{ fontSize: 22 * s,textAlign:'center',margin: 10 * s }}>{item.truelocal}</Text>
                                    <Text style={{ fontSize: 25 * s,margin: 10 * s }}>{item.truetitledetails}</Text>
                                    <View style={styles.tab}>
                                        <Icon2 name='navigate' style={{ lineHeight:35 * s,color:'red' }} size={30 * s}/>
                                        <Text style={{ fontSize: 25 * s,margin: 10 * s,fontWeight:'bold',color:'red' }}>题目解析</Text>
                                    </View>
                                    <Text style={{ fontSize: 25 * s, margin: 10 * s }}>{item.truetitlework}</Text>
                                    {
                                        item.trueangle == '' ? <Text></Text> :
                                        <View>
                                            <View style={styles.tab}>
                                                <Icon2 name='navigate' style={{ lineHeight:35 *s,color:'red' }} size={30 * s}/>
                                                <Text style={{ fontSize: 25 * s,margin: 10 * s,fontWeight:'bold',color:'red' }}>写作角度</Text>
                                            </View>
                                            <Text style={{ fontSize: 25 * s, margin: 10 * s }}>{item.trueangle}</Text>
                                        </View>
                                    }
                                    <View style={styles.tab}>
                                        <Icon2 name='navigate' style={{ color: 'red' }} size={30 * s}/>
                                        <Text style={{ fontSize: 25 * s,margin: 10 * s,fontWeight:'bold',color:'red' }}>精彩练笔</Text>
                                    </View>

                                    <Tword mid={item.mid}/>
                                </View>
                            </View>
                        )}
                    />

                    {/* 收藏、练笔、分享 悬浮 */}
                    <View>
                        {
                            this.state.data.map(item => (
                                <View style={styles.footer}>
                                    <TouchableOpacity style={{ width: '15%', alignItems: 'center' }} onPress={()=>this.favorite(item.look)}>
                                        {
                                            item.look == null ?
                                            <Image
                                                style={{ width: 40 * s, height: 40 * s }}
                                                source={require('../../../assets/composition/composition/collection0.png')}
                                            />
                                            :
                                            <Image
                                                style={{ width: 40 * s, height: 40 * s }}
                                                source={require('../../../assets/composition/composition/collection.png')}
                                            />
                                        }
                                        {
                                            item.look == null ?
                                            <Text style={{ fontSize: 18 * s }}>收藏&nbsp;&nbsp;{item.mcollect}</Text>
                                            : <Text style={{ fontSize: 18 * s }}>已收藏&nbsp;&nbsp;{item.mcollect}</Text>
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '15%', alignItems: 'center' }} onPress={() => { Actions.addEssaywrite({ mid: item.mid }) }}>
                                        <Image
                                            style={{ width: 40 * s, height: 40 * s }}
                                            source={require('../../../assets/composition/composition/write0.png')}
                                        />
                                        <Text style={{ fontSize: 18 * s }}>练笔</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '15%' }}>
                                        <Icon name='sharealt' size={40 * s} />
                                        <Text style={{ fontSize: 18 * s }}>分享</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                </View>
            )
        }else{
            return(
                <View style={{flex:1,backgroundColor:'#FFF'}}>
                    <View style={{flexDirection:'row',height:80*s,borderBottomColor:'#F0F0F0',borderBottomWidth:1,alignItems:'center',justifyContent:'space-between'}}>
                        <TouchableOpacity style={{marginLeft:15*s,marginRight:15*s}} onPress={()=>{Actions.pop()}}><Icon name='left' size={35*s}/></TouchableOpacity>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{width:'40%',fontSize:30*s}}></Text>
                        <Icon style={{marginLeft:15*s,marginRight:15*s}} name='ellipsis1' size={40*s}/>
                    </View>
                    <View>
                        <ActivityIndicator size='large' color='red'/>
                    </View>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    header:{
        width:width,
        height: 90 * s,
        backgroundColor:'#fff',
        flexDirection: 'row',
        borderBottomColor:'#F0F0F0',
        borderBottomWidth: 1,
        alignItems:'center',
        justifyContent:'space-between'
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
    container:{
        width:width,
        padding:'2%',
        backgroundColor:'#fff',
        flexDirection:'column'
    },
    footer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: width,
        height: 90 * s
    },
    tab:{
        width:width,
        height:35 * s,
        flexDirection:'row',
        alignItems:'center',
        marginTop:30 * s
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
})