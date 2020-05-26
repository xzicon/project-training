import React, { Component } from 'react';
import { View, Button, Text, StatusBar, FlatList, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity ,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
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

export default class Remark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tid: '',
            refreshing:false
        }
    }
    componentDidMount() {
        this.all()
    }
    
    all = () => {
        this.setState({
            refreshing:true
        },()=>{
            fetch('http://116.62.14.0:8402/grade/overteacher/' + this.props.tid)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        data: res.data,
                        refreshing:false
                    })
                })
        })
    }
    _renderFooter = () => (
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:50*s}}>
            <Text>
               到底了~
            </Text>
        </View>
    )
    render() {
        return (
            <View>
                {this.state.data.length !== 0 ? 
                    <View>

                        <FlatList
                            style={{ marginBottom: 180 * s }}
                            data={this.state.data}
                            numColumns={1}
                            refreshing = { this.state.refreshing }
                            onRefresh = {()=>{
                                this.all()
                            }}
                            ListFooterComponent={ this._renderFooter }
                            renderItem={({ item }) => (
                                item.isgrade === 1 ?
                                <View style={{ backgroundColor: '#FFF', marginLeft: 10 * s, marginRight: 10 * s, marginTop: 10 * s, height: 250 * s, overflow: 'hidden', padding: 20 * s }}>
                                        <View style={{ width: '100%', height: 160 * s }}>
                                            <TouchableOpacity onPress={() => { Actions.detailEssay({ aid: item.aid, }) }}>
                                                
                                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15*s}}>
                                                    <Text style={{ fontSize: 26 * s, fontWeight: 'bold', marginBottom: 10 * s }}>{item.atitle}</Text>
                                                    <Text style={{widht:'20%',height:'100%', fontSize: 26 * s, fontWeight: 'bold', color:'red',marginRight:'5%',fontFamily:'华文彩云',fontStyle:'italic',textDecorationLine:'underline',borderBottomWidth:1,borderBottomColor:'red'}}>&nbsp;{item.score}</Text>
                                                </View>
                                                <View style={{ height: 80*s, width:  '100%',overflow:'hidden'}}>                                
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
                                                        source={{html:htmlContent.start+`<div  style=\"font-size:15px;\">`+item.acontent+`</div>`+htmlContent.end}}
                                                        />
                                                </View>   
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 18 * s, color: 'gray' }}>{item.uname}</Text>
                                            <Text style={{ fontSize: 18 * s, color: 'gray' }}>{item.gradetime}</Text>
                                        </View>
                                    </View>  
                                :
                                <View></View>
                            )}
                        />
                        
                    </View>
                    :
                    <View>
                        
                        <View style={{ width: width, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>该老师还没有点评哦~</Text>
                        </View>
                    </View>}
            </View>
        )
    }
}
