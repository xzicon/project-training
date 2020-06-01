import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { Actions } from 'react-native-router-flux'
import Accordion from 'react-native-collapsible/Accordion';

const { width } = Dimensions.get('window');
const s = width / 640;
 
export default class Biangeng extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            pvtimes: [],
            activeSections: [0,1]
        };
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/points/record/' + this.props.uid)
        .then(res=>res.json())
        .then(res=>{
            var arr = [];
            for(let i=0;i<res.data.length;i++){
                arr.push(res.data[i].pvtime.split(' ')[0])
            }
            this.setState({ 
                data: res.data,
                pvtimes:Array.from(new Set(arr)) 
            })
            console.log(res.data)
        })
    }
    _renderHeader = section => {
        return (
            <View style={styles.wraper}>
                <Icon1 name='circle' style={{position:'absolute',left:-10 * s,color:'#ADADAD ',backgroundColor:'#fff'}}/>
                <Text style={{fontSize: 28 * s}}>{section}</Text>
                <Icon2 name='chevron-down' size={45 * s}/>
            </View>
        );
    };   
    _renderContent = section => {
        return (
            <View style={{paddingLeft:40 * s,marginBottom:10 * s}}>
            {
                this.state.data.map((item,index)=>(
                    section == item.pvtime.split(' ')[0] ?
                        <View style={{flexDirection:'row'}} key={index}>
                            {
                                item.changereason == '邀请老师点评作文' ? (
                                    <View style={{width:width * 0.7,flexDirection:'row'}}>
                                        <Text numberOfLines={1} style={{fontSize:25 * s}}>{item.pvtime.split(' ')[1]} : </Text>
                                        <Text numberOfLines={10} style={{fontSize:25 * s}}>{item.changereason}, 经验值+{item.valuechange}, 积分-{item.pointchange}</Text>
                                    </View>
                                ):(
                                    <View style={{width:width * 0.7,flexDirection:'row'}}>
                                        <Text numberOfLines={1} style={{fontSize:25 * s}}>{item.pvtime.split(' ')[1]} : </Text>
                                        <Text numberOfLines={10} style={{fontSize:25 * s}}>{item.changereason}, 经验值+{item.valuechange}, 积分+{item.pointchange}</Text>
                                    </View>
                                )
                            }
                        </View>
                    : <Text style={{display:'none'}}></Text>
                ))
            }
            </View>
        );
    };
    _updateSections = activeSections => {
        this.setState({ activeSections });
    };
 
    render() {
        return (
            <View style={{ flex:1,backgroundColor:'#fff' }}>
                {/* 标题栏 */}
                <View style={styles.header}>
                    <Icon name='left' style={{position:'absolute',left:'5%'}} size={35 * s} onPress={()=>Actions.pop()}/>
                    <Text style={{fontSize: 30 * s}}>积分记录</Text>
                </View>
                <ScrollView>
                    <View style={{justifyContent:'center',marginTop:30 * s,marginLeft:width * 0.07,borderLeftWidth:1.2,borderLeftColor:'#ADADAD'}}>
                        <Accordion
                            sections={this.state.pvtimes}
                            underlayColor='#fff'
                            activeSections={this.state.activeSections}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
                        />
                    </View>
                </ScrollView>
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
    wraper:{
        width:200 * s,
        borderWidth: 0,
        height:50 * s,
        paddingLeft:10 * s,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
})