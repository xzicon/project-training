import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

const timeTags = ['高中','初中'];
const typeTags = ['记叙文','议论文','说明文','书信','诗歌'];
export default class Skill extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            time:'高中',
            type:'文体',
            isShow1:false,
            isShow2:false,
            isPress:0,
            refreshing:false
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/skill/list')
        .then(res=>res.json())
        .then(res=>{
            // console.log(res.data);
            this.setState({
                data:res.data
            })
        })
    }
    handleChange1 = () => {
        this.setState({
            isShow1: !this.state.isShow1,
            isShow2: false,
            isPress: 1
        })
    }
    handleChange2 = () => {
        this.setState({
            isShow2: !this.state.isShow2,
            isShow1: false,
            isPress: 2
        })
    }
    handleSelect1 = (item) => {
        this.setState({
            time: item,
            isShow1: false
        })
    }
    handleSelect2 = (item) => {
        this.setState({
            type: item,
            isShow2: false
        })
    }
    handleSelect3 = () => {
        this.setState({
            type: '文体',
            isShow2: false
        })
    }
    all = () => {
        this.setState({
            refreshing:true
        },()=>{
        fetch('http://116.62.14.0:8402/skill/list/')
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data);
                this.setState({ 
                    data: res.data,
                    refreshing:false 
                });
            })
        })
    }
    render() {
        return (
            <View style={{ flex:1 }}>
                {/* 标题栏 */}
                <View style={{height: 90 * s,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:"#fff"}}>
                    <Icon name='left' style={{position:'absolute',left:'5%'}} size={35 * s} onPress={()=> Actions.pop() }/>
                    <Text style={{fontSize: 30 * s}}>技法学习</Text>
                </View>
                {/* 下拉菜单头 */}
                <View style={{height: 70 * s,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'#F0F0F0'}}>
                    <TouchableOpacity activeOpacity={1} style={styles.title} onPress={ () => this.handleChange1() }>
                        <Text style={{fontSize:25 *s}}>{this.state.time}</Text>
                        <Icon name='down' style={{marginLeft:'3%'}} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.title} onPress={ () => this.handleChange2() }>
                        <Text style={{fontSize: 25 * s}}>{this.state.type}</Text>
                        <Icon name='down' style={{marginLeft:'3%'}} />
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={this.state.isPress === 1 ? this.state.isShow1 : (this.state.isPress === 2 ? this.state.isShow2 : '')}
                    style={{flex:1}}
                    transparent={true}
                    ref="modal"
                    animationType='fade'
                >
                    {/* 标题栏 */}
                    <View style={{height: 90 * s,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:"#fff"}}>
                        <Icon name='left' style={{position:'absolute',left:'5%'}} size={35 * s} onPress={()=> Actions.pop() }/>
                        <Text style={{fontSize: 30 * s}}>技法学习</Text>
                    </View>
                    {/* 下拉菜单头 */}
                    <View style={{height: 70 * s,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'#F0F0F0'}}>
                        <TouchableOpacity activeOpacity={1} style={styles.title} onPress={ () => this.handleChange1() }>
                            <Text style={{color: this.state.isPress==1 ? 'red' : 'black',fontSize: 25 * s}}>{this.state.time}</Text>
                            <Icon name={this.state.isPress==1 ? 'up' : 'down'} style={{marginLeft:'3%',color:this.state.isPress==1 ? 'red' : 'black'}} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.title} onPress={ () => this.handleChange2() }>
                            <Text style={{color: this.state.isPress==2 ? 'red' : 'black',fontSize:25 * s}}>{this.state.type}</Text>
                            <Icon name={this.state.isPress==2 ? 'up' : 'down'} style={{marginLeft:'3%',color:this.state.isPress==2 ? 'red' : 'black'}} />
                        </TouchableOpacity>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{this.setState({isShow1:false,isShow2:false})}}>
                        <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                        {   
                            this.state.isPress === 1 ?
                                <View style={styles.modal}>
                                    {
                                        timeTags.map((item,idx)=>(
                                            <TouchableWithoutFeedback onPress={this.handleSelect1.bind(this,item)} key={idx}>
                                                <View style={styles.itemWrap} backgroundColor = {this.state.time == item ? 'red' : ''}>
                                                    <Text style={{color: this.state.time == item ? '#fff' : '',fontSize: 23 * s}}>{item}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        ))
                                    }
                                </View>
                            :
                            this.state.isPress === 2 ?
                                <View style={styles.modal}>
                                    <TouchableWithoutFeedback onPress={() => this.handleSelect3()}>
                                        <View style={styles.itemWrap} backgroundColor = {this.state.type === '文体' ? 'red' : ''}>
                                            <Text style={{color: this.state.type === '文体' ? '#fff' : '',fontSize: 23 * s}}>全部</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    {
                                        typeTags.map((item,idx)=>(
                                            <TouchableWithoutFeedback onPress={this.handleSelect2.bind(this,item)} key={idx}>
                                                <View style={styles.itemWrap} backgroundColor = {this.state.type === item ? 'red' : ''}>
                                                    <Text style={{color: this.state.type === item ? '#fff' : '',fontSize: 23 * s}}>{item}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        ))
                                    }
                            </View> : ''
                        }
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <View>
                    <FlatList
                        data = {this.state.data}
                        numColumns = {1}
                        refreshing = { this.state.refreshing }
                        onRefresh = {()=>{
                            this.all()
                        }}
                        renderItem = {({item})=>(
                            this.state.time == item.skilllevel && this.state.type == '文体' ?
                                <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>Actions.skilldetail({sid:item.sid})}>
                                    <View style={styles.text}>
                                        <Text style={{fontSize: 28 * s,fontWeight:"bold",overflow:'hidden'}}>{item.skilltitle}</Text>
                                        <Text style={{fontSize: 22 * s}}>{item.tname} 发布</Text>
                                    </View>
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + item.skillimage }} style={styles.image}/>
                                </TouchableOpacity>
                            :
                                this.state.time == item.skilllevel && this.state.type == item.skilltype ?
                                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>Actions.skilldetail({sid:item.sid})}>
                                    <View style={styles.text}>
                                        <Text style={{fontSize: 28 * s,fontWeight:"bold",overflow:'hidden'}}>{item.skilltitle}</Text>
                                        <Text style={{fontSize: 22 * s}}>{item.tname} 发布</Text>
                                    </View>
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + item.skillimage }} style={styles.image}/>
                                </TouchableOpacity>
                                : 
                                    <View></View>
                        )}

                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title:{
        width: '50%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    modal:{
        width:width,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        padding:10 * s,
        flexWrap:'wrap'
    },
    itemWrap:{
        width:125 * s,
        height:50 * s,
        marginLeft:23 * s,
        borderWidth:1,
        borderColor:'#e0e0e0',
        borderRadius:25 * s,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20 * s
    },
    box:{
        width:width,
        height:200 * s,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:'3%',
        paddingRight:'3%',
        marginBottom:'2.5%'
    },
    text:{
        width:'70%',
        height:'80%',
        flexDirection:'column',
        marginBottom:'2%',
        paddingTop:15*s,
        paddingBottom:15*s,
        justifyContent:'space-between'
    },
    image:{
        width:'28%',
        height:'80%',
        marginBottom:'2%'
    }
})