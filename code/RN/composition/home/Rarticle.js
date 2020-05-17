import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import WebView from 'react-native-webview';

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
    .content { font-family: Arial, Helvetica, sans-serif;color: #000033; width: 100%;height: 100%;-webkit-overflow-scrolling: touch;padding-left: 0;padding-right: 0;}
    .pell { height: 100%;}
    .pell-content { outline: 0; overflow-y: auto;padding:4px 5px 0;height: 100%;}
    table {width: 100% !important;}
    table td {width: inherit;}
    table span { font-size: 12px !important; }
    </style>
    </head>
    <body>
    <div class="content"><div id="editor" class="pell" >`,
    
    end:`</div></div></body></html> `
};
const rank=[
    '一类文',
    '二类文',
    '三类文',
    '四类文',
    '五类文',
];
export default class Rarticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: '',
            data: [],
            
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
            .then((res) => {
                res === null ?
                    this.setState({ tid: '' })
                    :
                    this.setState({ tid: res })
                    this.all()
                
            })
    }
    all=()=>{
        fetch('http://116.62.14.0:8402/grade/article/'+this.props.gid)
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({ 
                            data: res.data,
                            acontent:res.data.acontent,
                            gcontent:res.data.gcontent==''?`<div></div>`:
                            `<div style=\"height:60px;margin:15px 15px 0 15px;\">
                                <div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">内容</div>
                                <div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+res.data.gcontent.substring(0,res.data.gcontent.indexOf('：'))+`</div>
                                <div style=\"font-size:15px;height:100%;\">`+res.data.gcontent.substring(res.data.gcontent.indexOf('：')+1)+`</div>
                            </div>` ,
                            gexpress:res.data.gexpress==''?`<div></div>`:
                            `<div style=\"height:60px;margin:15px 15px 0 15px;\">
                                <div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">内容</div>
                                <div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+res.data.gexpress.substring(0,res.data.gexpress.indexOf('：'))+`</div>
                                <div style=\"font-size:15px;height:100%;\">`+res.data.gexpress.substring(res.data.gexpress.indexOf('：')+1)+`</div>
                            </div>` ,
                            gfeature:res.data.gfeature==''?`<div></div>`:
                            `<div style=\"height:60px;margin:15px 15px 0 15px;\">
                                <div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">内容</div>
                                <div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+res.data.gfeature.substring(0,res.data.gfeature.indexOf('：'))+`</div>
                                <div style=\"font-size:15px;height:100%;\">`+res.data.gfeature.substring(res.data.gfeature.indexOf('：')+1)+`</div>
                            </div>` ,
                            gcover:res.data.gcover==''?`<div></div>`:
                            `<div style=\"height:60px;margin:15px 15px 0 15px;\">
                                <div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">卷面</div>
                                <div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+res.data.gcover.substring(0,res.data.gcover.indexOf('：'))+`</div>
                                <div style=\"font-size:15px;height:100%;\">`+res.data.gcover.substring(res.data.gcover.indexOf('：')+1)+`</div>
                            </div>` ,
                            glanguage:res.data.glanguage==''?`<div></div>`:
                            `<div style=\"height:60px;margin:15px 15px 0 15px;\">
                                <div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">语言</div>
                                <div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+res.data.glanguage.substring(0,res.data.glanguage.indexOf('：'))+`</div>
                                <div style=\"font-size:15px;height:100%;\">`+res.data.glanguage.substring(res.data.glanguage.indexOf('：')+1)+`</div>
                            </div>` ,
                            gstructure:res.data.gstructure==''?`<div></div>`:
                            `<div style=\"height:60px;margin:15px 15px 0 15px;\">
                                <div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">结构</div>
                                <div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+res.data.gstructure.substring(0,res.data.gstructure.indexOf('：'))+`</div>
                                <div style=\"font-size:15px;height:100%;\">`+res.data.gstructure.substring(res.data.gstructure.indexOf('：')+1)+`</div>
                            </div>` ,

                        }
                        ,()=>{
                            this.setState({
                                html: `
                                <div style=\"margin: 0 20px 20px 20px; border: none; padding: 0px;background-color:#FFF;\">`
                                    +`<div style=\"position: absolute;right: 30px; top: 20px;text-align: center;"\>`
                                        +`<font style=\"color:red;font-size:20px;\">`+this.state.data.score+`</font>`
                                        +`<img style=\"overflow: hidden;height:20px;\" src="`+`http://116.62.14.0:8402/images/score.png`+`"  alt="分数" />`
                                    +`</div>`
                                    +`<h2 style=\"text-align: center;\">`+this.state.data.atitle+`</h2>`
                                    +`<div style=\"height:50px"\>`
                                        +`<div style=\"text-align: center;font-size:12px;\">`+this.state.data.uname+`&nbsp;&nbsp;|&nbsp;&nbsp;`+`<font style=\"color:#666;font-size:12px;"\>`+this.state.data.invitetime+`</font>`+`&nbsp;&nbsp;|&nbsp;&nbsp;`+this.state.data.gclass+`</div>`
                                    +`</div>`
                                    +`<div>`
                                    +this.state.data.acontent.replace(/\n/g,'<br>')
                                    +`</div>`
                                +`</div>`
                                +`<div style=\"width:100%;height:15px;background-color:#F0F0F0\"></div>`
                                +`<div>`
                                    +`<div style=\"border-left-color:red;border-left-style: solid;border-left-width: 2px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#F0F0F0;\">`
                                        +`<div style=\" margin-left:5px;padding-top:10px;padding-bottom:10px;font-size:15px;\">名师点评</div>`
                                    +`</div>`
                                    +`<div style=\"height:50px;margin:10px 10px 10px 10px;\">`
                                        +`<img style=\"float:left;overflow: hidden;border-radius:25px;height:50px;width:50px;margin:0 10px 0 10px;\" src="`+`http://116.62.14.0:8402/images/`+this.state.data.timage+`"  alt="头像" />`
                                        +`<div style=\"float:left;line-height:50px;\">`+this.state.data.tname+`</div>`
                                        +`<div style=\"float:right;line-height:50px;font-size:13px;color:#666;\">`+this.state.data.gradetime+`</div>`
                                    +`</div>`
                                +`</div>`
                                +`<div style=\"width:100%;height:15px;background-color:#F0F0F0\"></div>`
                                +`<div style=\"width:100%;height:50px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#F0F0F0;\">`
                                    +`<img style=\"float:left;overflow: hidden;height:20px;margin:15px 10px 15px 15px;\" src="`+`http://116.62.14.0:8402/images/pingfen2.png`+`"  alt="" />`
                                    +`<div style=\"font-size:15px;line-height:50px;\">作文评分</div>`
                                +`</div>`
                                +`<div style=\"width:100%;\">`
                                    // // +this.state.data.gcontent==''?`<div></div>`:
                                    // +`<div style=\"height:60px;margin:15px 15px 0 15px;\">
                                    //     <div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">内容</div>
                                    //     <div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+this.state.data.gcontent.substring(0,this.state.data.gcontent.indexOf('：'))+`</div>
                                    //     <div style=\"font-size:15px;height:100%;\">`+this.state.data.gcontent.substring(this.state.data.gcontent.indexOf('：')+1)+`</div>
                                    // </div>`
                                    +this.state.gcontent
                                    // +`<div style=\"height:60px;margin:15px 15px 0 15px;\">`
                                    //     +`<div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">表达</div>`
                                    //     +`<div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+this.state.data.gexpress.substring(0,this.state.data.gexpress.indexOf('：'))+`</div>`
                                    //     +`<div style=\"font-size:15px;height:100%;\">`+this.state.data.gexpress.substring(this.state.data.gexpress.indexOf('：')+1)+`</div>`
                                    // +`</div>`
                                    // +`<div style=\"height:60px;margin:15px 15px 0 15px;\">`
                                    //     +`<div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">特征</div>`
                                    //     +`<div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+this.state.data.gfeature.substring(0,this.state.data.gfeature.indexOf('：'))+`</div>`
                                    //     +`<div style=\"font-size:15px;height:100%;\">`+this.state.data.gfeature.substring(this.state.data.gfeature.indexOf('：')+1)+`</div>`
                                    // +`</div>`
                                    +this.state.gexpress
                                    +this.state.gfeature
                                    +this.state.glanguage
                                    +this.state.gcover
                                    +this.state.gstructure
                                +`</div>`
                                +`<div style=\"width:100%;height:15px;background-color:#F0F0F0\"></div>`
                                +`<div style=\"width:100%;height:50px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#F0F0F0;\">`
                                    +`<img style=\"float:left;overflow: hidden;height:20px;margin:15px 10px 15px 15px;\" src="`+`http://116.62.14.0:8402/images/pingfen.png`+`"  alt="" />`
                                    +`<div style=\"font-size:15px;line-height:50px;\">点评详情</div>`
                                +`</div>`
                                +`<div style=\"width:100%;\">`
                                    // +this.state.data.gcontent==''?`<div></div>`:
                                    +`<div style=\"width:'100%';border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#F0F0F0;\">`
                                        +`<div style=\"margin:10px 15px 10px 15px;font-size:13px;height:100%;color:#666;\">得分点</div>`
                                        +`<div style=\"margin:10px 15px 10px 15px;font-size:15px;\">`
                                            +this.state.data.gscorepoint
                                        +`</div>`                                        
                                    +`</div>`
                                    +`<div style=\"width:'100%';border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#F0F0F0;\">`
                                        +`<div style=\"margin:10px 15px 10px 15px;font-size:13px;height:100%;color:#666;\">失分点</div>`
                                        +`<div style=\"margin:10px 15px 10px 15px;font-size:15px;\">`
                                            +this.state.data.glosepoint
                                        +`</div>`                                        
                                    +`</div>`
                                    +`<div style=\"width:'100%';border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#F0F0F0;\">`
                                        +`<div style=\"margin:10px 15px 10px 15px;font-size:13px;height:100%;color:#666;\">修改建议</div>`
                                        +`<div style=\"margin:10px 15px 10px 15px;font-size:15px;\">`
                                            +this.state.data.gmodityadvice
                                        +`</div>`                                        
                                    +`</div>`
                                +`</div>`
                                +`<div style=\"width:100%;height:15px;background-color:#F0F0F0\"></div>`
                                +`<div style=\"width:100%;height:50px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#F0F0F0;\">`
                                    +`<div style=\"float:left;margin:0 0 0 20px;font-size:15px;line-height:50px;\">作文等级</div>`
                                    +`<div style=\"float:left;margin:0 0 0 20px;font-size:15px;line-height:50px;color:red;\">`+rank[this.state.data.rank-1]+`</div>`
                                +`</div>`
                            }) 
                        });
                        console.log(res.data);
                    })
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{ width: width,paddingRight:width*0.05,paddingLeft:width*0.05, height: 90 * s, backgroundColor: 'white', borderBottomWidth:1/scale,borderBottomColor:'#666',flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon name="left" color="#333" size={40 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 30 * s }}>作文详情</Text>
                    </View>
                    <TouchableOpacity>
                        <Icon name="left" color="#FFF" size={40 * s} />
                    </TouchableOpacity>
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
                    source={{html: htmlContent.start+this.state.html+htmlContent.end}}
                    />
                {/* <ScrollView >
                    <View style={{width:0.94*width,alignItems:'center',backgroundColor:'#FFF',marginTop:10,marginLeft:0.03*width}}>
                        <View style={{width:'100%',marginBottom:10}} >
                            <View style={{width:'100%',paddingTop:10*s}}><Text style={{fontSize:20*s,color:'#666666'}}>{this.state.data.utime}</Text></View>
                            <View style={{margin:3,alignItems:'center',}}><Text style={{fontSize:35*s}}>{this.state.data.atitle}</Text></View>
                            <View style={{margin:5,alignItems:'center',}}><Text style={{fontSize:20*s,color:'gray'}}>作者: &nbsp;&nbsp;{this.state.data.uname}</Text></View>
                            <View style={{ height: 150, width: '95%' ,paddingLeft:'2.5%',overflow:'hidden'}}>                                
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
                                    source={{html:htmlContent.start+this.state.acontent+htmlContent.end}}
                                    />
                            </View>                            
                        </View>

                        
                    </View>
                    
                    <View style={{width:0.94*width,backgroundColor:'white',marginTop:20,marginLeft:0.03*width,marginBottom:'15%'}}>
                        <View style={{width:'100%',borderBottomColor:'gray',borderBottomWidth:2*s}}>
                            <Text style={{width:"100%",fontSize:30*s,color:'#333',padding:5}}>名师点评</Text>
                            <View style={{ width:'100%', flexDirection: 'row', justifyContent: 'center',margin:5}}>
                                <View  style={{ alignItems: 'center', width:'20%'}}>
                                
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.data.timage }} style={{ width: 70 * s, height: 70 * s, borderRadius: 35 * s, }} />
                                </View>
                                <View style={{ width:'45%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 30 * s, }}>{this.state.data.tname}</Text>
                                </View>
                                
                                <View style={{ width:'35%', justifyContent: 'center', alignItems: 'center', padding: 10 * s }}>
                                    <Text style={{ color: 'gray', fontSize: 20 * s, }}>{this.state.data.gradetime}</Text>
                                </View>
                                
                            </View>
                        </View>

                        <View style={{width:'100%',borderBottomColor:'gray',borderBottomWidth:2*s}}>
                            <View style={{width:'100%',flexDirection:'row',paddingTop:3,paddingLeft:10}}><Text style={{fontSize: 28 * s,color:'#333'}}>作文等级: </Text><Text style={{fontSize: 25 * s,color:'red'}}>&nbsp;&nbsp;{this.state.data.rank}</Text></View>
                            <View style={{width:'100%',flexDirection:'row',padding:3,paddingLeft:10 }}><Text style={{fontSize: 28 * s,color:'#333'}}>分数: </Text><Text style={{fontSize: 25 * s,color:'red'}}>&nbsp;&nbsp;{this.state.data.score}</Text></View>
                            <Text style={{width:"100%",fontSize:28*s,color:'#333',paddingLeft:10}}>作文评分 :</Text>
                            <View style={{ width:'100%', flexDirection: 'column', justifyContent: 'center',padding:10,}}>
                                
                                <View style={{width:'94%', justifyContent: 'center',}}>
                                    
                                    <Text style={{width:'100%', fontSize: 25 * s,color:'#333',padding:3}}>内容: &nbsp;&nbsp;{this.state.data.gcontent}</Text>
                                    <Text style={{width:'100%', fontSize: 25 * s,color:'#333',padding:3  }}>语言: &nbsp;&nbsp;{this.state.data.glanguage}</Text>
                                    <Text style={{width:'100%', fontSize: 25 * s,color:'#333',padding:3 }}>结构: &nbsp;&nbsp;{this.state.data.gstructure}</Text>
                                    <Text style={{width:'100%', fontSize: 25 * s,color:'#333',padding:3 }}>卷面: &nbsp;&nbsp;{this.state.data.gcover}</Text>
                                    <Text style={{width:'100%', fontSize: 25 * s,color:'#333',padding:3 }}>表达: &nbsp;&nbsp;{this.state.data.gexpress}</Text>
                                    <Text style={{width:'100%', fontSize: 25 * s,color:'#333',padding:3 }}>特征: &nbsp;&nbsp;{this.state.data.gfeature}</Text>
                                    
                                </View>
                            </View>
                        </View>
                        <View style={{width:'100%',}}>
                            <Text style={{width:"100%",fontSize:28*s,color:'#333',padding:10}}>点评详情</Text>
                            <View style={{ width:'94%', flexDirection: 'column', justifyContent: 'center',marginLeft:'3%'}}>
                                <View style={{width:'100%', justifyContent: 'center',borderBottomColor:'gray',borderBottomWidth:2*s,paddingBottom:'8%'}}>
                                    <Text style={{width:'100%', fontSize: 26 * s,color:'red',paddingBottom:3 }}>得分点</Text>
                                    <Text style={{width:'100%', fontSize: 24 * s,color:'#333',padding:3  }}>{this.state.data.gscorepoint}</Text>
                                    
                                </View>
                                
                                <View style={{width:'100%', justifyContent: 'center',borderBottomColor:'gray',borderBottomWidth:2*s,paddingBottom:'8%'}}>
                                    <Text style={{width:'100%', fontSize: 26 * s,color:'red',paddingBottom:3 }}>失分点</Text>
                                    <Text style={{width:'100%', fontSize: 24 * s,color:'#333',padding:3  }}>{this.state.data.glosepoint}</Text>
                                    
                                </View>

                                <View style={{width:'100%', justifyContent: 'center',paddingBottom:'8%'}}>
                                    <Text style={{width:'100%', fontSize: 26 * s,color:'red',paddingBottom:3 }}>修改建议</Text>
                                    <Text style={{width:'100%', fontSize: 24 * s,color:'#333',padding:3  }}>{this.state.data.gmodityadvice}</Text>
                                    
                                </View>
                            </View>
                            
                            
                        </View>
                    </View>
                </ScrollView> */}
            </View>
        )
    }
}
