import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback, 
    Modal, StyleSheet, ScrollView, Image, ActivityIndicator, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign'
const { width, scale, height } = Dimensions.get('window')
const s = width / 640;

const tags = ['高中','初中'];
const yearTags = ['2019','2018','2017','2016'];
const paperTags = ['全国I卷组','全国II卷组','全国III卷组','北京卷组','浙江卷组','江苏卷组','上海卷组','天津卷组'];
const areaTags = ['广东','黑龙江','湖北','河南','重庆','江苏','浙江','湖南','北京','天津','上海','河北','山西','辽宁',
'吉林','安徽','福建','江西','山东','广西','海南','四川','贵州','云南','陕西','甘肃','青海','内蒙古','宁夏','新疆','西藏'];
export default class Realpaper extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            showTypeModal: false,
            showYearModal: false,
            showPaperModal: false,
            showAreaModal: false,
            type: '高中',
            year: '年份',
            area: '地区',
            paper: '试卷',
            isPress: 0,
            isLoad: false,
            refreshing:false
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/true/list')
        .then(res=>res.json())
        .then(res=>{
            console.log(res.data);
            this.setState({
                data:res.data
            })
        })
    }
    all = () => {
        this.setState({
            refreshing:true
        },()=>{
        fetch('http://116.62.14.0:8402/true/list/')
            .then((res) => res.json())
            .then((res) => {
                if(res.status==0){
                    this.setState({ data: res.data,refreshing:false });
                }else{
                    console.log('error')
                }
                console.log(res.data);
            })
        })
    }
    handleChange1 = () => {
        this.setState({
            showTypeModal: !this.state.showTypeModal,
            showYearModal: false,
            showPaperModal: false,
            showAreaModal: false,
            isPress: 1
        })
    }
    handleChange2 = () => {
        this.setState({
            showYearModal: !this.state.showYearModal,
            showTypeModal: false,
            showPaperModal: false,
            showAreaModal: false,
            isPress: 2
        })
    }
    handleChange3 = () => {
        this.setState({
            showPaperModal: !this.state.showPaperModal,
            showTypeModal: false,
            showYearModal: false,
            showAreaModal: false,
            isPress: 3
        })
    }
    handleChange4 = () => {
        this.setState({
            showAreaModal: !this.state.showAreaModal,
            showTypeModal: false,
            showYearModal: false,
            showPaperModal: false,
            isPress: 4
        })
    }
    handleSelect1 = (item) => {
        this.setState({
            type: item,
            showTypeModal: false
        })
    }
    handleSelect2 = (item) => {
        this.setState({
            year: item,
            showYearModal: false
        })
    }
    handleSelect3 = (item) => {
        this.setState({
            paper: item,
            showPaperModal: false
        })
    }
    handleSelect4 = (item) => {
        this.setState({
            area: item,
            showAreaModal: false
        })
    }
    render() {
        return (
            <View>
                {/* 标题栏 */}
                <View style={{height: 90 * s,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:"#fff"}}>
                    <Icon name='left' style={{position:'absolute',left:'5%'}} size={35 * s} onPress={()=>Actions.pop()}/>
                    <Text style={{fontSize: 30 * s}}>真题解析</Text>
                </View>
                {/* 下拉菜单头 */}
                <View style={{height: 70 * s,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'#F0F0F0'}}>
                    <TouchableOpacity activeOpacity={1} style={styles.title} onPress={()=>{this.handleChange1()}}>
                        <Text style={{fontSize:25 * s}}>{this.state.type}</Text>
                        <Icon name='down' style={{marginLeft:'3%'}} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.title} onPress={()=>{this.handleChange2()}}>
                        <Text style={{fontSize:25 * s}}>{this.state.year}</Text>
                        <Icon name='down' style={{marginLeft:'3%'}} />
                    </TouchableOpacity>
                    {
                        this.state.type == '高中' ?
                        <TouchableOpacity activeOpacity={1} style={styles.title} onPress={()=>{this.handleChange3()}}>
                            <Text style={{fontSize:25 * s}}>{this.state.paper}</Text>
                            <Icon name='down' style={{marginLeft:'3%'}} />
                        </TouchableOpacity> :
                        <TouchableOpacity activeOpacity={1} style={styles.title} onPress={()=>{this.handleChange4()}}>
                            <Text style={{fontSize:25 * s}}>{this.state.area}</Text>
                            <Icon name='down' style={{marginLeft:'3%'}} />
                        </TouchableOpacity>
                    }
                </View>
                <Modal
                    visible={this.state.isPress==1 ? this.state.showTypeModal : 
                        this.state.isPress==2 ? this.state.showYearModal : this.state.isPress==3 ? this.state.showPaperModal :
                        this.state.isPress==4 ? this.state.showAreaModal : ''
                    }
                    style={{flex:1}}
                    transparent={true}
                    ref="modal"
                    animationType='fade'
                >
                    {/* 标题栏 */}
                    <View style={{height: 90 * s,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:"#fff"}}>
                        <Icon name='left' style={{position:'absolute',left:'5%'}} size={35 * s} onPress={()=>Actions.pop()}/>
                        <Text style={{fontSize: 30 * s}}>真题解析</Text>
                    </View>
                    {/* 下拉菜单头 */}
                    <View style={{height: 70 * s,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'#F0F0F0'}}>
                        <TouchableOpacity activeOpacity={1} style={styles.title} onPress={()=>{this.handleChange1()}}>
                            <Text style={{color:this.state.isPress==1 ? 'red' : 'black', fontSize:25 * s}}>{this.state.type}</Text>
                            <Icon name={this.state.isPress==1 ? 'up' : 'down'} style={{marginLeft:'3%',color:this.state.isPress==1 ? 'red' : 'black'}} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.title} onPress={()=>{this.handleChange2()}}>
                            <Text style={{color:this.state.isPress==2 ? 'red' : 'black', fontSize:25 * s}}>{this.state.year}</Text>
                            <Icon name={this.state.isPress==2 ? 'up' : 'down'} style={{marginLeft:'3%',color:this.state.isPress==2 ? 'red' : 'black'}} />
                        </TouchableOpacity>
                        {
                            this.state.type == '高中' ?
                            <TouchableOpacity activeOpacity={1} style={styles.title} onPress={()=>{this.handleChange3()}}>
                                <Text style={{color:this.state.isPress==3 ? 'red' : 'black', fontSize:25 * s}}>{this.state.paper}</Text>
                                <Icon name={this.state.isPress==3 ? 'up' : 'down'} style={{marginLeft:'3%',color:this.state.isPress==3 ? 'red' : 'black'}} />
                            </TouchableOpacity> :
                            <TouchableOpacity activeOpacity={1} style={styles.title} onPress={()=>{this.handleChange4()}}>
                                <Text style={{color:this.state.isPress==4 ? 'red' : 'black', fontSize:25 * s}}>{this.state.area}</Text>
                                <Icon name={this.state.isPress==4 ? 'up' : 'down'} style={{marginLeft:'3%',color:this.state.isPress==4 ? 'red' : 'black'}} />
                            </TouchableOpacity>
                        }
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{this.setState({showYearModal:false,showAreaModal:false,showPaperModal:false,showTypeModal:false})}}>
                        <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                            {
                                this.state.isPress==1 ? 
                                <View style={styles.modal}>
                                    {
                                        tags.map((item,idx)=>(
                                            <TouchableWithoutFeedback onPress={this.handleSelect1.bind(this,item)} key={idx}>
                                                <View style={styles.itemWrap} backgroundColor = {this.state.type == item ? 'red' : ''}>
                                                    <Text style={{color: this.state.type == item ? '#fff' : '',fontSize: 23 * s}}>{item}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        ))
                                    }
                                </View> : this.state.isPress==2 ?
                                <View style={styles.modal}>
                                    <TouchableWithoutFeedback onPress={() => this.setState({year: '年份',showYearModal: false})}>
                                        <View style={styles.itemWrap} backgroundColor = {this.state.year == '年份' ? 'red' : ''}>
                                            <Text style={{color: this.state.year == '年份' ? '#fff' : 'black',fontSize: 23 * s}}>全部</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    {
                                        yearTags.map((item,idx)=>(
                                            <TouchableWithoutFeedback onPress={this.handleSelect2.bind(this,item)} key={idx}>
                                                <View style={styles.itemWrap} backgroundColor = {this.state.year == item ? 'red' : ''}>
                                                    <Text style={{color: this.state.year == item ? '#fff' : '',fontSize: 23 * s}}>{item}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        ))
                                    }
                                </View> : this.state.isPress==3 ?
                                <View style={styles.modal}>
                                    <TouchableWithoutFeedback onPress={() => this.setState({paper: '试卷',showPaperModal: false})}>
                                        <View style={styles.itemWrap} backgroundColor = {this.state.paper == '试卷' ? 'red' : ''}>
                                            <Text style={{color: this.state.paper == '试卷' ? '#fff' : '',fontSize: 23 * s}}>全部</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    {
                                        paperTags.map((item,idx)=>(
                                            <TouchableWithoutFeedback onPress={this.handleSelect3.bind(this,item)} key={idx}>
                                                <View style={styles.itemWrap} backgroundColor = {this.state.paper == item ? 'red' : ''}>
                                                    <Text style={{color: this.state.paper == item ? '#fff' : '',fontSize: 23 * s}}>{item}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        ))
                                    }
                                </View> :
                                <View style={styles.modal}>
                                    <TouchableWithoutFeedback onPress={() => this.setState({area: '地区',showAreaModal: false})}>
                                        <View style={styles.itemWrap} backgroundColor = {this.state.area == '地区' ? 'red' : ''}>
                                            <Text style={{color: this.state.area == '地区' ? '#fff' : '',fontSize: 23 * s}}>全部</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    {
                                        areaTags.map((item,idx)=>(
                                            <TouchableWithoutFeedback onPress={this.handleSelect4.bind(this,item)} key={idx}>
                                                <View style={styles.itemWrap} backgroundColor = {this.state.area == item ? 'red' : ''}>
                                                    <Text style={{color: this.state.area == item ? '#fff' : '',fontSize: 23 * s}}>{item}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        ))
                                    }
                                </View>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <ScrollView>
                    <FlatList
                        data = {this.state.data}
                        numColumns = {1}
                        refreshing = { this.state.refreshing }
                        onRefresh = {()=>{
                            this.all()
                        }}
                        renderItem = {({item})=>(
                            this.state.type == '高中' ?
                            // 高中
                                this.state.type == item.truelevel && this.state.year == '年份' && this.state.paper == '试卷' ?
                                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                        <View style={styles.text}>
                                            <Text style={{fontSize: 28 * s,fontWeight:"bold"}}>{item.truetitle}</Text>
                                            <Text style={{fontSize: 22 * s,marginTop: - 50 * s,lineHeight:32 * s}}>
                                                {item.truetitledetails.split('。')[1].slice(0,32)}
                                                <Text style={{fontSize:20 * s,color:'#7B7B7B'}}> ...全文</Text>
                                            </Text>
                                            <Text style={{fontSize: 25 * s,marginTop: 20 *s}}>{item.truelocal}</Text>
                                        </View>
                                        <Image source={require('../../../assets/composition/composition/zhenti1.png')} style={styles.image}/>
                                    </TouchableOpacity> 
                                :
                                    this.state.type == item.truelevel && this.state.year == '年份' && this.state.paper == item.truearea ?
                                        <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                            <View style={styles.text}>
                                                <Text style={{fontSize: 28 * s,fontWeight:"bold"}}>{item.truetitle}</Text>
                                                <Text style={{fontSize: 22 * s,marginTop: - 50 * s,lineHeight:32 * s}}>
                                                    {item.truetitledetails.split('。')[1].slice(0,32)}
                                                    <Text style={{fontSize:20 * s,color:'#7B7B7B'}}> ...全文</Text>
                                                </Text>
                                                <Text style={{fontSize: 25 * s,marginTop: 20 *s}}>{item.truelocal}</Text>
                                            </View>
                                        <Image source={require('../../../assets/composition/composition/zhenti1.png')} style={styles.image}/>
                                    </TouchableOpacity>
                                :
                                this.state.type == item.truelevel && this.state.year == item.trueyear && this.state.paper == '试卷' ?
                                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                        <View style={styles.text}>
                                            <Text style={{fontSize: 28 * s,fontWeight:"bold"}}>{item.truetitle}</Text>
                                            <Text style={{fontSize: 22 * s,marginTop: - 50 * s,lineHeight:32 * s}}>
                                                {item.truetitledetails.split('。')[1].slice(0,32)}
                                                <Text style={{fontSize:20 * s,color:'#7B7B7B'}}> ...全文</Text>
                                            </Text>
                                            <Text style={{fontSize: 25 * s,marginTop: 20 *s}}>{item.truelocal}</Text>
                                        </View>
                                        <Image source={require('../../../assets/composition/composition/zhenti1.png')} style={styles.image}/>
                                    </TouchableOpacity> 
                                :
                                this.state.type == item.truelevel && this.state.year == item.trueyear && this.state.paper == item.truearea ?
                                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                        <View style={styles.text}>
                                            <Text style={{fontSize: 28 * s,fontWeight:"bold"}}>{item.truetitle}</Text>
                                            <Text style={{fontSize: 22 * s,marginTop: - 50 * s,lineHeight:32 * s}}>
                                                {item.truetitledetails.split('。')[1].slice(0,32)}
                                                <Text style={{fontSize:20 * s,color:'#7B7B7B'}}> ...全文</Text>
                                            </Text>
                                            <Text style={{fontSize: 25 * s,marginTop: 20 *s}}>{item.truelocal}</Text>
                                        </View>
                                        <Image source={require('../../../assets/composition/composition/zhenti1.png')} style={styles.image}/>
                                    </TouchableOpacity> 
                                :
                                <View></View>
                            :
                            // 初中
                                this.state.type == item.truelevel && this.state.year == '年份' && this.state.area == '地区' ?
                                <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                    <View style={styles.text}>
                                        <Text style={{fontSize: 28 * s,fontWeight:"bold"}}>{item.truetitle}</Text>
                                        <Text style={{fontSize: 22 * s,marginTop: - 50 * s,lineHeight:32 * s}}>
                                            {item.truetitledetails.split('。')[1].slice(0,32)}
                                            <Text style={{fontSize:20 * s,color:'#46A3FF'}}> ...全文</Text>
                                        </Text>
                                        <Text style={{fontSize: 25 * s,marginTop: 20 *s}}>{item.truelocal}</Text>
                                    </View>
                                    <Image source={require('../../../assets/composition/composition/zhenti1.png')} style={styles.image}/>
                                </TouchableOpacity> 
                            :
                                this.state.type == item.truelevel && this.state.year == '年份' && this.state.area == item.truearea ?
                                <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                    <View style={styles.text}>
                                        <Text style={{fontSize: 28 * s,fontWeight:"bold"}}>{item.truetitle}</Text>
                                        <Text style={{fontSize: 22 * s,marginTop: - 50 * s,lineHeight:32 * s}}>
                                            {item.truetitledetails.split('。')[1].slice(0,32)}
                                            <Text style={{fontSize:20 * s,color:'#7B7B7B'}}> ...全文</Text>
                                        </Text>
                                        <Text style={{fontSize: 25 * s,marginTop: 20 *s}}>{item.truelocal}</Text>
                                    </View>
                                    <Image source={require('../../../assets/composition/composition/zhenti1.png')} style={styles.image}/>
                                </TouchableOpacity> 
                            :
                                this.state.type == item.truelevel && this.state.year == item.trueyear && this.state.area == '地区' ?
                                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                        <View style={styles.text}>
                                            <Text style={{fontSize: 28 * s,fontWeight:"bold"}}>{item.truetitle}</Text>
                                            <Text style={{fontSize: 22 * s,marginTop: - 50 * s,lineHeight:32 * s}}>
                                                {item.truetitledetails.split('。')[1].slice(0,32)}
                                                <Text style={{fontSize:20 * s,color:'#7B7B7B'}}> ...全文</Text>
                                            </Text>
                                            <Text style={{fontSize: 25 * s,marginTop: 20 *s}}>{item.truelocal}</Text>
                                        </View>
                                        <Image source={require('../../../assets/composition/composition/zhenti1.png')} style={styles.image}/>
                                    </TouchableOpacity> 
                                :
                                this.state.type == item.truelevel && this.state.year == item.trueyear && this.state.area == item.truearea ?
                                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                        <View style={styles.text}>
                                            <Text style={{fontSize: 28 * s,fontWeight:"bold"}}>{item.truetitle}</Text>
                                            <Text style={{fontSize: 22 * s,marginTop: - 50 * s,lineHeight:32 * s}}>
                                                {item.truetitledetails.split('。')[1].slice(0,32)}
                                                <Text style={{fontSize:20 * s,color:'#7B7B7B'}}> ...全文</Text>
                                            </Text>
                                            <Text style={{fontSize: 25 * s,marginTop: 20 *s}}>{item.truelocal}</Text>
                                        </View>
                                        <Image source={require('../../../assets/composition/composition/zhenti1.png')} style={styles.image}/>
                                    </TouchableOpacity>
                                :
                                <View></View>
                        )}
                    />
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title:{
        width: '33%',
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
        marginBottom:'2%'
    },
    image:{
        width:'28%',
        height:'80%',
        marginBottom:'2%'
    }
})