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
                    this.setState({ tid: res },()=>{this.all()})

                
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
                                <div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">表达</div>
                                <div style=\"margin:0 15px 0 0;padding:2px 2px 2px 2px;float:left;font-size:12px;color:#eeb173;border-style:solid;border-color:#eeb173;border-width:1px;\">`+res.data.gexpress.substring(0,res.data.gexpress.indexOf('：'))+`</div>
                                <div style=\"font-size:15px;height:100%;\">`+res.data.gexpress.substring(res.data.gexpress.indexOf('：')+1)+`</div>
                            </div>` ,
                            gfeature:res.data.gfeature==''?`<div></div>`:
                            `<div style=\"height:60px;margin:15px 15px 0 15px;\">
                                <div style=\"margin:0 15px 0 0;float:left;font-size:15px;height:100%;\">特征</div>
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
                                    +this.state.gcontent
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

            </View>
        )
    }
}
