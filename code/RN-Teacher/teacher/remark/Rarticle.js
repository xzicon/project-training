import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const {width,scale} = Dimensions.get('window');
const s = width / 640;


export default class Rarticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            data: [],
            comments:[],//名师点评
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })

                fetch('http://116.62.14.0:8402/article/testxiang/'+this.props.aid+'/'+this.state.uid)
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({ data: res.data,comments:res.data.comments[0] });
                        console.log(res.data);
                        console.log(res.data.comments);
                    })
            })
    }
    render() {
        return (
            <View>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                        <Icon name="left" color="#333" size={40 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 30 * s, left: width * 0.3 }}>作文详情</Text>
                    </View>
                </View>
                <ScrollView >
                    {/* 作文 */}
                    <View style={{width:0.94*width,alignItems:'center',backgroundColor:'#FFF',marginTop:10,marginLeft:0.03*width}}>
                        <View style={{}} >
                            <View style={{width:'100%',paddingTop:10*s}}><Text style={{fontSize:20*s,color:'#666666'}}>{this.state.data.utime}</Text></View>
                            <View style={{margin:3,alignItems:'center',}}><Text style={{fontSize:35*s}}>{this.state.data.atitle}</Text></View>
                            <View style={{margin:5,alignItems:'center',}}><Text style={{fontSize:20*s,color:'gray'}}>作者: &nbsp;&nbsp;{this.state.data.uname}</Text></View>
                            <Text style={{fontSize:23*s,color:'#333'}}>{this.state.data.acontent}</Text>
                            {/* 标签 */}
                            <View style={{width:'100%',flexDirection:'row',padding:10/scale}}>
                                <Text style={{color:'#4682B4',fontSize:25*s}}>{this.state.data.atag}</Text>
                            </View>
                            {/* 图片 */}
                            {
                                this.state.data.aimage===''?
                                <View></View>
                                :
                                <Image style={{width:'100%',height:200}} source={{uri:'http://116.62.14.0:8402/images/'+this.state.data.aimage}}/>
                            }
                            {/* 链接素材 */}
                            {
                                this.state.data.mtitle==null?
                                <View></View>
                                :
                                <TouchableOpacity onPress={()=>{Actions.popular({mid:this.state.data.mid})}} style={{width:'100%',justifyContent:'flex-end',flexDirection:'row',marginTop:10*s}}>
                                    <View style={{width:'100%',backgroundColor:'#4682B4',borderRadius:15/scale,padding:10/scale,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                                        <View style={{width:'10%',flexDirection:'row',justifyContent:'center'}}>
                                            <Icon2 name='tags' size={28*s} color='#FFF' />
                                        </View>
                                        <Text style={{fontSize:20*s,color:'#FFF',width:'90%'}}>{this.state.data.mtitle}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            
                        </View>

                        
                    </View>
                    
                    <View style={{width:0.94*width,backgroundColor:'white',marginTop:20,marginLeft:0.03*width,marginBottom:'15%'}}>
                        <View style={{width:'100%',borderBottomColor:'gray',borderBottomWidth:2*s}}>
                            <Text style={{width:"100%",fontSize:30*s,color:'#333',padding:5}}>名师点评</Text>
                            <View style={{ width:'100%', flexDirection: 'row', justifyContent: 'center',margin:5}}>
                                <View  style={{ alignItems: 'center', width:'20%'}}>
                                
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.comments.uimage }} style={{ width: 70 * s, height: 70 * s, borderRadius: 35 * s, }} />
                                </View>
                                <View style={{ width:'45%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 30 * s, }}>{this.state.comments.uname}</Text>
                                </View>
                                
                                <View style={{ width:'35%', justifyContent: 'center', alignItems: 'center', padding: 10 * s }}>
                                    <Text style={{ color: 'gray', fontSize: 20 * s, }}>{this.state.comments.actime}</Text>
                                </View>
                                
                            </View>
                        </View>

                        <View style={{width:'100%',borderBottomColor:'gray',borderBottomWidth:2*s}}>
                            <Text style={{width:"100%",fontSize:28*s,color:'#333',padding:10}}>作文评分</Text>
                            <View style={{ width:'100%', flexDirection: 'row', justifyContent: 'center',margin:5}}>
                                <View style={{width:'94%', justifyContent: 'center',}}>
                                    <View style={{width:'100%',flexDirection:'row',padding:3 }}><Text style={{fontSize: 25 * s,color:'#333'}}>作文等级: </Text><Text style={{fontSize: 25 * s,color:'red'}}>&nbsp;&nbsp;一类文</Text></View>
                                    <View style={{width:'100%',flexDirection:'row',padding:3 }}><Text style={{fontSize: 25 * s,color:'#333'}}>分数: </Text><Text style={{fontSize: 25 * s,color:'red'}}>&nbsp;&nbsp;42</Text></View>
                                    <Text style={{width:'100%', fontSize: 25 * s,color:'#333',padding:3 }}>内容: &nbsp;&nbsp;{this.state.comments.accontent}</Text>
                                    <Text style={{width:'100%', fontSize: 25 * s,color:'#333',padding:3  }}>语言: &nbsp;&nbsp;{this.state.comments.accontent}</Text>
                                    <Text style={{width:'100%', fontSize: 25 * s,color:'#333',padding:3 }}>卷面: &nbsp;&nbsp;{this.state.comments.accontent}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width:'100%',}}>
                            <Text style={{width:"100%",fontSize:28*s,color:'#333',padding:10}}>点评详情</Text>
                            <View style={{ width:'94%', flexDirection: 'column', justifyContent: 'center',marginLeft:'3%'}}>
                                <View style={{width:'100%', justifyContent: 'center',borderBottomColor:'gray',borderBottomWidth:2*s,paddingBottom:'8%'}}>
                                    <Text style={{width:'100%', fontSize: 26 * s,color:'red',paddingBottom:3 }}>得分点</Text>
                                    <Text style={{width:'100%', fontSize: 24 * s,color:'#333',padding:3  }}>{this.state.comments.accontent}</Text>
                                    
                                </View>
                                
                                <View style={{width:'100%', justifyContent: 'center',borderBottomColor:'gray',borderBottomWidth:2*s,paddingBottom:'8%'}}>
                                    <Text style={{width:'100%', fontSize: 26 * s,color:'red',paddingBottom:3 }}>失分点</Text>
                                    <Text style={{width:'100%', fontSize: 24 * s,color:'#333',padding:3  }}>{this.state.comments.accontent}</Text>
                                    
                                </View>

                                <View style={{width:'100%', justifyContent: 'center',paddingBottom:'8%'}}>
                                    <Text style={{width:'100%', fontSize: 26 * s,color:'red',paddingBottom:3 }}>修改建议</Text>
                                    <Text style={{width:'100%', fontSize: 24 * s,color:'#333',padding:3  }}>{this.state.comments.accontent}</Text>
                                    
                                </View>
                            </View>
                            
                            
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
