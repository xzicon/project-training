import React, { Component } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';


const { width } = Dimensions.get('window');
const s = width / 640;

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            data: [],
            refreshing:false,
            tabs: [
                { title: '全部创作' },
                { title: '未邀请' },
                { title: '未点评' },
                { title: '已点评'},
            ],
            tabs2:[
                {title:'发布成功'},
                {title:'审核不通过'},
            ],
            title:0,
            title0:0
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res },()=>{
                        this.all()
                    })
                
            })
    }
    select=(index)=>{
        this.setState({
            title:index,
            
        })
        
    }
    select2=(index)=>{
        this.setState({
            title0:index,
            
        })
    }
    all=()=>{
        this.setState({
            refreshing:true
        },()=>{
            fetch('http://116.62.14.0:8402/login/article/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ 
                    data: res.data ,
                    refreshing:false
                });
                console.log(res.data);
            })
        })
        
    }
    contanier=(item)=>{
        return(
            <View style={{ width: width, height: 360 * s, backgroundColor: 'white', marginBottom: 10 * s, position: 'relative' }}>
                <TouchableOpacity onPress={() => { Actions.marticle({aid:item.aid,refresh:()=>{this.all()}})}}
                    style={{ width: width * 0.9, marginLeft: width * 0.05, height: 290 * s, borderWidth: 2 * s, borderColor: 'gray', marginTop: 10 * s }}>
                    <View style={{ width: '100%', height: '10%', marginTop: '1%', paddingLeft: '3%', }}><Text style={{ fontSize: 18 * s, color: 'gray' }} >{item.utime}</Text></View>
                    <View style={{ width: '100%', height: '15%', marginTop: '1%', paddingLeft: '3%', alignItems: 'center', }}><Text style={{ fontSize: 34 * s, color: '#333', textAlignVertical: 'center' }} >{item.atitle}</Text></View>
                    <View style={{ width: '100%', height: '50%', marginTop: '1%', paddingLeft: '3%', paddingRight: '3%', overflow: 'hidden' }}><Text style={{ fontSize: 24 * s, color: '#333' }} >{item.acontent}</Text></View>
                    <View style={{ width: '100%', height: '5%', marginTop: '1%', paddingLeft: '3%', }}><Text style={{ fontSize: 18 * s, color: '#333' }} >{item.atag}</Text></View>
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center', marginTop: 14*s}}>
                {
                    item.aaudit==1?
                    <View style={{}}>
                        <Text style={{ fontSize: 24 * s,  width: width * 0.16, textAlign: 'center',borderWidth:1, borderRadius: 14 * s, marginRight: 10*s,color:'green'}}>已发布</Text>
                    </View>
                    :
                    (
                        item.aaudit==0?
                        <View style={{ }}>
                            <Text style={{ fontSize: 24 * s,color: 'yellow', width: width * 0.16, textAlign: 'center', borderWidth:1,borderRadius: 14 * s, marginRight: 10*s }}>未审核</Text>
                        </View>
                        :
                        <View style={{ }}>
                            <Text style={{ fontSize: 24 * s,  width: width * 0.24, textAlign: 'center',borderWidth:1, borderRadius: 14 * s, marginRight: 10*s,color:'red' }}>审核不通过</Text>
                        </View>
                    )
                    
                }
                {
                item.agrade==0?
                <View style={{ }}>
                    <Text style={{ fontSize: 24 * s,color: 'red', width: width * 0.16, textAlign: 'center', borderWidth:1, borderRadius: 14 * s, marginRight: '3%' }}>未邀请</Text>
                </View>
                :(
                    item.agrade==-1?
                    <View style={{ }}>
                        <Text style={{ fontSize: 24 * s, color: 'yellow', width: width * 0.2, textAlign: 'center', borderWidth:1, borderRadius: 14 * s, marginRight: '3%' }}>等待点评</Text>
                    </View>
                    :
                    <View style={{ }}>
                        <Text style={{ fontSize: 24 * s,  color: 'blue', width: width * 0.16, textAlign: 'center', borderWidth:1, borderRadius: 14 * s, marginRight: '3%' }}>已点评</Text>
                    </View>
                )
                
                }
                </View>
                
            </View>
        )
    }
    back=()=>{
        Actions.popTo('userinfor');
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ position:'absolute',left:'5%'}} onPress={() => {this.back()}}>
                        <Icon name='left' style={{}} size={35 * s} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 30 * s}}>我的创作</Text>
                </View>
                <View style={styles.header}>
                    {
                        this.state.tabs.map((item,index)=>{
                            return(
                                <TouchableOpacity 
                                onPress={()=>{this.select(index)}}
                                style={{width:'25%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:this.state.title==index?'#000':'#666'}}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                {/* {
                    this.state.title==0?
                    <View style={styles.header}>
                        {
                            this.state.tabs2.map((item,index)=>{
                                return(
                                    <TouchableOpacity 
                                    onPress={()=>{this.select2(index)}}
                                    style={{width:'50%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:this.state.title0==index?'#000':'#666'}}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    :
                    <View></View>
                } */}
                {this.state.data.length !== 0 ?
                    <View style={{flex:1}}>
                        
                        <FlatList
                            data={this.state.data}
                            numColumns={1}
                            refreshing = { this.state.refreshing }
                            onRefresh = {()=>{
                                this.all()
                            }}
                            renderItem={({ item }) => (
                                (
                                    this.state.title==0?
                                    (
                                        // this.state.title0==0?
                                        // (
                                        //     item.aaudit==1?
                                        //     this.contanier(item)
                                        //     :
                                        //     <View></View>
                                        // ):(
                                            
                                        //     ( 
                                        //         item.aaudit==-1?
                                        //         this.contanier(item):<View></View>
                                        //     )
                                        // )
                                        this.contanier(item)
                                        
                                    
                                    )
                                    :(
                                        this.state.title==1?
                                        (item.agrade==0?
                                            this.contanier(item)
                                            :
                                            <View></View>
                                            )
                                        :
                                        (
                                            this.state.title==2?
                                            (item.agrade==-1?
                                                this.contanier(item)
                                                :
                                                <View></View>
                                                ) 
                                                :
                                                ((item.agrade!=-1&&item.agrade!=0)?
                                                    this.contanier(item)
                                                    :
                                                    <View></View>
                                                    ) 
                                        )
                                    )

                                
                                
                            )
                                
                            )}
                            
                        />

                    </View>
                    :
                    <View>
                        
                        <View style={{ width: width, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>你还没有创作哦~</Text>
                        </View>
                    </View>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        height: 90 * s,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:0.8,
        borderBottomColor:'#e4e4e4',
        backgroundColor:"#fff"
    },
    
    tabStyle:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})
