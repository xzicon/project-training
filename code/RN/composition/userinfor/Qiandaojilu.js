import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image  } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'
import { LocaleConfig,Calendar } from 'react-native-calendars';
import moment from 'moment';
import { add } from 'react-native-reanimated';
const { width } = Dimensions.get('window');
const s = width / 640;

// 日历组件 中文替换
LocaleConfig.locales['fr'] = {
    monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['周日.','周一.','周二.','周三.','周四.','周五.','周六.']
};
LocaleConfig.defaultLocale = 'fr';

// 日历组件 标记点的颜色
const vacation = {key:'vacation', color: '#33D9B5', selectedDotColor: '#33D9B5'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};

export default class Qiandaojilu extends Component {
    constructor(props){
        super(props);
        this.state = {
            perMsg: [],//class,point,value
            count: [],//累签allday,连签day,今日是否签isre
            data: [],//个人签到记录
            pvtimes:[],
            list:{}
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/points/personal/' + this.props.uid)
        .then(res=>res.json())
        .then(res=>{
            console.log(res.data);
            this.setState({ perMsg: res.data })
        })
        fetch('http://116.62.14.0:8402/points/count/' + this.props.uid)
        .then(res=>res.json())
        .then(res=>{
            console.log(res.data);
            this.setState({ count: res.data })
        })
        fetch('http://116.62.14.0:8402/points/signrecord/' + this.props.uid)
        .then(res=>res.json())
        .then(res=>{
            console.log(res.data);
            var arr = [];
            for(let i=0;i<res.data.length;i++){
                arr.push(res.data[i].pvtime.split(' ')[0])
            }
            this.setState({ data: res.data,pvtimes:arr },()=>{
                console.log(this.state.pvtimes)
                const list_map = {};
                const arr = this.state.pvtimes;
                //即 var list_map=[];
                for ( var i = 0; i < this.state.pvtimes.length; i++) {
                    
                    list_map[arr[i]] = {selected: true, selectedColor: '#FFC1B5'}
                }
                
                let today = moment().format('YYYY-MM-DD')
                if(list_map[today]!=undefined){
                    list_map[today]={dots: [vacation],selected: true, selectedColor: '#FFC1B5'}
                }
                
                this.setState({
                    list:list_map
                })
            })
        })
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                {/* 标题栏 */}
                <View style={styles.header}>
                    <Icon name='left' style={{position:'absolute',left:'5%'}} size={35 * s} onPress={()=>Actions.pop()}/>
                    <Text style={{fontSize: 30 * s}}>签到记录</Text>
                    <TouchableOpacity style={{position:'absolute',right:30 * s}}>
                        <Text style={{fontSize:25 * s}}>攻略</Text>
                    </TouchableOpacity>
                </View>
                {/* 累计签到 */}
                <View style={{flexDirection:'column',alignItems:'center',height: 170 * s,marginTop: 50 * s}}>
                    <Text style={{fontSize:25 * s}}>{this.props.uname},你已累计签到</Text>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <Text style={{fontSize:50 * s}}>{this.state.count.allday} </Text>
                        <Text>天</Text>
                    </View>
                    <Text>已获得 {this.state.perMsg.value} 经验值 , 当前积分 {this.state.perMsg.point} </Text>
                </View>
                {/* 日历记录 */}
                <View style={{flexDirection:'column',alignItems:'center',width:width,height:600 * s}}>
                    {/* <Text style={{fontSize:28 * s,paddingTop:30 * s}}>{this.state.year} 年 {this.state.month} 月</Text> */}
                        <Calendar
                            monthFormat = { ' yyyy 年 MM 月' }
                            markedDates={this.state.list}
                            markingType={'multi-dot'}
                            style={{width:width * 0.9}}
                        />
                </View>
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
    }
})