import React, { Component } from 'react'
import { Text, View, ScrollView,Dimensions, Modal,ToastAndroid,TouchableOpacity ,ActivityIndicator, Image, StyleSheet} from 'react-native'
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const {width,scale} = Dimensions.get('window');
const s = width / 640;
const htmlContent=
   { start:
    `<!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
    <style>
    * {outline: 0px solid transparent;-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-touch-callout: none;}
    html, body { margin: 0; padding: 0;font-family: Arial, Helvetica, sans-serif; font-size:1em;}
    body { overflow-y: hidden; -webkit-overflow-scrolling: touch;height: 100%;background-color: #FFF;}
    img {max-width: 98%;margin-left:auto;margin-right:auto;display: block;}
    .content {  font-family: Arial, Helvetica, sans-serif;color: #000033; width: 100%;height: 100%;-webkit-overflow-scrolling: touch;padding-left: 0;padding-right: 0;}
    .pell { height: 100%;}
    .pell-content { outline: 0; overflow-y: auto;padding:4px 5px 0;height: 100%;}
    table {width: 100% !important;}
    table td {width: inherit;}
    table span { font-size: 12px !important; }
    </style>
    </head>
    <body>
    <div class="content"><div id="editor" class="pell">`,
    
    end:`</div></div></body></html> `
};
export default class SkillDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sid:this.props.sid,
            tid: '',
            skill_detail:[],
            title:'',
            progress: 0,
            isLoad:false,
            show_modal:true,
            sou:false,
            sou1:false,
            color1: 'red',
            color2: '#000',

        }
    }
    componentDidMount() {
        this.all();
    }
    all=()=>{
        fetch('http://116.62.14.0:8402/skill/detail/' + this.state.sid)
            .then((res) => res.json())
            .then((res) => {
                if(res.status==0){
                    setTimeout(()=>{
                    this.setState({ 
                        isLoad:true,
                        skill_detail: res.data,
                        title:res.data.skillimage==''?`<h1 style=\"text-align: center;\">`+res.data.skilltitle+`</h1>`:`<img style=\"width:100%;overflow: hidden;height:225px\" src="`+`http://116.62.14.0:8402/images/`+res.data.skillimage+`"  alt="`+res.data.skilltitle+`" />
                        <h1 style=\"text-align: center;\">`+res.data.skilltitle+`</h1>
                        `,
                        content:this.state.color1=='red'?`<div style=\"margin: 0 20px 0 20px; border: none; padding: 0px\">`+res.data.skillcontent+`</div>`:`<div style=\"margin: 0 20px 0 20px; border: none; padding: 0px;font-size:25px;\">`+res.data.skillcontent+`</div>`
                     })
                    },200);
                }else{
                    console.log('error')
                }
                console.log(res.data);
            })
    }
    show=()=>{
        this.setState({
            show_modal:true
        })
    }
    noshow=()=>{
    
        this.setState({
            show_modal:false
        })
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
    update=()=>{
        this.setState({
            sou:false
        },()=>{
            Actions.updateskill({sid:this.state.skill_detail.sid})
        })
    }
    delete=(sid)=>{
        let data = {
            sid:sid
        };
        fetch('http://116.62.14.0:8402/skill/deleteskill',{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then((res) => {
                console.log(res.status);
                if(res.status==0){
                    this.setState({
                        sou1:false
                    },()=>{
                        ToastAndroid.show('删除技法成功',100);
                        Actions.pop(this.props.refresh());
                    })
                }else{
                    console.log(res.data);
                }
            })
    }
    render() {
        if(this.state.isLoad){
        return (
            <View style={{flex:1,backgroundColor:'#FFF'}}>
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
                    <View style={{ width: '36%', backgroundColor: '#fff', position: 'absolute', top: 80 * s, right: 0, borderColor: 'gray', borderWidth: s }}>
                        <TouchableOpacity onPress={()=>{this.update()}} style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: s, alignItems: 'center', padding: 20 * s }}>
                            <Image source={require('../../assets/composition/teacher/update.png')} style={{ width: 26 * s, height: 26 * s }} />
                            <View><Text style={{ color: 'red', fontSize: 20 * s, marginTop: 6 * s, marginLeft: 14 * s }} >修改</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._source1} style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: s, alignItems: 'center', padding: 20 * s }}>
                            <Image source={require('../../assets/composition/teacher/delete.png')} style={{ width: 26 * s, height: 26 * s }} />
                            <View><Text style={{ color: 'red', fontSize: 20 * s, marginTop: 6 * s, marginLeft: 14 * s }} >删除</Text></View>
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
                    <View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, left: 0, right: 0 ,height:250*s}}>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <View style={{height:'70%',flexDirection:'row',alignItems:'center'}}><Text style={{fontSize:30*s}}>确认删除吗？</Text></View>
                            <View style={{height:'30%',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                <View style={{borderTopWidth:1,borderLeftWidth:0.5,borderColor:'#666666',height:'100%',width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{color:'red'}} onPress={()=>{this.delete(this.state.skill_detail.sid)}}>确认</Text>
                                </View>
                                <View style={{borderTopWidth:1,borderLeftWidth:0.5,borderColor:'#666666',height:'100%',width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <Text onPress={()=>{this._source1_false()}}>取消</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* tab */}
                <View style={{flexDirection:'row',height:90*s,borderBottomColor:'#F0F0F0',borderBottomWidth:1,alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{marginLeft:15*s,marginRight:15*s}} onPress={()=>{Actions.pop()}}><Icon name='left' size={35*s}/></TouchableOpacity>
                    <View style={{width:'40%',alignItems:'center',justifyContent:'center',flexDirection:'row'}}><Text style={{fontSize:30*s}} numberOfLines={1} ellipsizeMode="tail" >{this.state.skill_detail.skilltitle}</Text></View>
                    <Icon onPress={() => this._source()} style={{marginLeft:15*s,marginRight:15*s}} name='ellipsis1' size={40*s}/>
                </View>
                    <WebView
                    style={{}}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={false}
                    useWebKit={true}
                    scrollEnabled={false}
                    hideKeyboardAccessoryView={true}
                    keyboardDisplayRequiresUserAction={false}
                    originWhitelist={["*"]}
                    dataDetectorTypes={'none'}
                    domStorageEnabled={false}
                    bounces={false}
                    javaScriptEnabled={true}
                    source={{html: htmlContent.start+this.state.title+this.state.content+htmlContent.end}}
                    />
                    {
                        this.state.show_modal?
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#F0F0F0',height:90*s,borderTopLeftRadius:40*s,borderBottomLeftRadius:40*s,position:'absolute',top:900*s,right:0}}>
                            {/* 链接到教师个人主页 */}
                            <TouchableOpacity>
                            <Image 
                            style={{marginLeft:10*s,width:70*s,height:70*s,borderRadius:35*s}}
                            source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.skill_detail.timage }}/>
                            </TouchableOpacity>
                            <Text>{this.state.skill_detail.tname}</Text>
                            <TouchableOpacity style={{marginLeft:5*s,marginRight:5*s}} onPress={()=>{this.noshow()}}><Icon name='right' color={'#666'} size={25*s}/></TouchableOpacity>
                        </View>
                        :
                        <View style={{width:30*s,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#F0F0F0',height:90*s,borderTopLeftRadius:40*s,borderBottomLeftRadius:40*s,position:'absolute',top:900*s,right:0}}>
                            <TouchableOpacity style={{marginLeft:5*s,marginRight:2*s}} onPress={()=>{this.show()}}><Icon name='left' color={'#666'} size={25*s}/></TouchableOpacity>
                        </View>
                    }
                    
            </View>
        )
        }else{
            return(
            <View style={{flex:1,backgroundColor:'#FFF'}}>
                <View style={{flexDirection:'row',height:90*s,borderBottomColor:'#F0F0F0',borderBottomWidth:1,alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{marginLeft:15*s,marginRight:15*s}} onPress={()=>{Actions.pop()}}><Icon name='left' size={35*s}/></TouchableOpacity>
                    <View style={{width:'40%',alignItems:'center',justifyContent:'center',flexDirection:'row'}}><Text style={{fontSize:30*s}} numberOfLines={1} ellipsizeMode="tail" >{this.state.skill_detail.skilltitle}</Text></View>
                    <Icon onPress={() => this._source()} style={{marginLeft:15*s,marginRight:15*s}} name='ellipsis1' size={40*s}/>
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
})
