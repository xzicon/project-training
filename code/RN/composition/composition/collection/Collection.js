import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, FlatList, AsyncStorage, ImageBackground } from 'react-native';
import AnimatedTabs from 'react-native-animated-tabs';
import { Scene, Actions, Tabs } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
const getDeviceHeight = () => Dimensions.get('window').height;
const getDeviceWidth = () => Dimensions.get('window').width;
const getPanelWidth = () => getDeviceWidth() / 1.3;

const panelsCount = 4;

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
let groomdate1 = moment().format('YYYY-MM-DD');
let groomdate2 = moment().subtract(1, 'days').format('YYYY-MM-DD');
let groomdate3 = moment().subtract(2, 'days').format('YYYY-MM-DD');
let groomdate4 = moment().subtract(3, 'days').format('YYYY-MM-DD');
let groomdate5 = moment().subtract(4, 'days').format('YYYY-MM-DD');
let groomdate6 = moment().subtract(5, 'days').format('YYYY-MM-DD');
let groomdate7 = moment().subtract(6, 'days').format('YYYY-MM-DD');
// console.log(groomdate1, groomdate2, groomdate3, groomdate4, groomdate5, groomdate6, groomdate7,'000');
// console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
// console.log(moment().subtract(1, 'days').format('YYYY-MM-DD'))
// 日更合集
class AnimatedTabsExample extends Component {
    constructor() {
        super();
        this.state = {
            activePanel: 0,
            uid: '',
            data: []
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                this.fetchf();
            })
    }
    fetchf = () => {
        fetch('http://116.62.14.0:8402/groom/all')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    data: res.data,
                });
            })
    }
    con=(groom,item ,index)=>{
        const rili = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
        return(
            <View>
                {
            item.groomdate === groom ?
                item.mimage === '' ?
                    <View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                            <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                <Text style={{ fontSize: 26 * s, margin: 10 * s, paddingTop: 20 * s }}>{item.mtitle}</Text>
                                <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                            <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                <Image
                                    style={{ width: "100%", height: 240 * s }}
                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                />
                                <Text style={{ fontSize: 26 * s }}>{item.mtitle}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                : <View></View>
                }
                </View>
        )
    }
    cc=(groom)=>{
        const rili = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
        return(
        <View style={{marginBottom:60*s}}>
            <View style={{backgroundColor:'#FFF',paddingLeft:20*s,paddingRight:20*s,paddingBottom:5*s,paddingTop:5*s,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                <Text style={{marginTop:13*s,marginRight:10*s}}>{groom.substr(groom.indexOf('-')+1,2)[0]==0?rili[groom.substr(groom.indexOf('-')+1,2)[1]-1]:rili[groom.substr(groom.indexOf('-')+1,2)-1]}</Text>
                <ImageBackground style={{width:45*s,height:45*s}} source={require('../../../assets/composition/composition/rili.png')}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:12*s}}>
                        <Text>{groom.substr(groom.indexOf('-',6)+1,2)}</Text>
                        {console.log(groom.slice(8)+'ooo')}
                    </View>
                </ImageBackground>
            </View>
            <FlatList
                style={{ backgroundColor: '#fff', marginBottom: 60 * s ,height:height-250*s}}
                data={this.state.data}
                numColumns={1}
                renderItem={({ item ,index}) => (
                    item.groomdate==groom?
                    this.con(groom,item,index)
                    :
                    <View></View>
                )}
            />
        </View>
        )
    }
    render() {
        const animatedViewStyle = { flex: 1,  };
        // marginTop: getDeviceHeight() / 4
        const imageStyle = { flex: 1, width: getPanelWidth() };
        const tabContentStyle = {
            height: getDeviceHeight() - getDeviceHeight() / 2,
            width: getPanelWidth()
        };
        return (
                
                <View style={animatedViewStyle}>
                    <View style={{backgroundColor:'#FFF', width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon size={35 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 26 * s, marginLeft: width * 0.34 ,marginTop:0}}>日更合集</Text>
                    </View>
                </View>
                    <AnimatedTabs
                        panelWidth={getPanelWidth()}
                        activePanel={this.state.activePanel}
                        onAnimateFinish={activePanel => this.setState({ activePanel })}
                    >
                        {this.cc(groomdate1)}
                        {this.cc(groomdate2)}
                        {this.cc(groomdate3)}
                        {this.cc(groomdate4)}
                        {this.cc(groomdate5)}
                        {this.cc(groomdate6)}
                        {this.cc(groomdate7)}
                    </AnimatedTabs>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.text} onPress={() => this.goToPanel(-1)}>
                            <Text>后一天</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.text} onPress={() => this.goToPanel(1)}>
                            <Text>前一天</Text>
                        </TouchableOpacity>
                    </View>
                </View >
        );
    }

    goToPanel(direction) {
        const nextPanel = this.state.activePanel + direction;
        if (nextPanel >= 0 && nextPanel < panelsCount) {
            this.setState({ activePanel: nextPanel });
        }
    }
}

const styles = StyleSheet.create({
    text: {
        padding: 20*s,
        alignSelf: 'center'
    },
    buttons: {
        flexDirection: 'row',
        backgroundColor:'#FFF'
    }
});

export default AnimatedTabsExample;
