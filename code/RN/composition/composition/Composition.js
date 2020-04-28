import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, TextInput,AsyncStorage, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from "react-native-vector-icons//AntDesign";
import { Scene, Actions, Tabs } from 'react-native-router-flux';

import Container from './Container';

const { width ,scale} = Dimensions.get('window');
const s = width / 640;

export default class Composition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: [],
            data2: [],
            data3: [],
            data4: [],
            data5: [],
            usort_false:false,
            onecolor: 'red',
            oneborderBottomColor: '#ffdf41',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            threecolor: '#000',
            threeborderBottomColor: '#fff',
            fourcolor: '#000',
            fourborderBottomColor: '#fff',
            fivecolor: '#000',
            fiveborderBottomColor: '#fff',
            sixcolor: '#000',
            sixborderBottomColor: '#fff',
            flag: 1
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
        .then((res)=>{
            res===null?
            this.setState({uid:''})
            :
            this.setState({uid:res})
            this._usort();
        })
        
    }
    _usort=()=>{
        fetch('http://116.62.14.0:8402/usort/msid/'+this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                res.data.length>0?
                this.setState({
                    data1: res.data[0],
                    data2: res.data[1],
                    data3: res.data[2],
                    data4: res.data[3],
                    data5: res.data[4]
                })
                :
                this.setState({
                    usort_false:true
                })
                //console.log(res.data);
            })
    }
    Change1 = () => {
        console.log(1);
        this.setState({
            onecolor: 'red',
            oneborderBottomColor: '#ffdf41',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            threecolor: '#000',
            threeborderBottomColor: '#fff',
            fourcolor: '#000',
            fourborderBottomColor: '#fff',
            fivecolor: '#000',
            fiveborderBottomColor: '#fff',
            sixcolor: '#000',
            sixborderBottomColor: '#fff',
            flag : 1
        })
        
    }
    Change2 = () => {
        this.setState({
            onecolor: '#000',
            oneborderBottomColor: '#fff',
            twocolor: 'red',
            twoborderBottomColor: '#ffdf41',
            threecolor: '#000',
            threeborderBottomColor: '#fff',
            fourcolor: '#000',
            fourborderBottomColor: '#fff',
            fivecolor: '#000',
            fiveborderBottomColor: '#fff',
            sixcolor: '#000',
            sixborderBottomColor: '#fff',
            flag : 2
        })
    }
    Change3 = () => {
        this.setState({
            onecolor: '#000',
            oneborderBottomColor: '#fff',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            threecolor: 'red',
            threeborderBottomColor: '#ffdf41',
            fourcolor: '#000',
            fourborderBottomColor: '#fff',
            fivecolor: '#000',
            fiveborderBottomColor: '#fff',
            sixcolor: '#000',
            sixborderBottomColor: '#fff',
            flag : 3
        })
    }
    Change4 = () => {
        this.setState({
            onecolor: '#000',
            oneborderBottomColor: '#fff',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            threecolor: '#000',
            threeborderBottomColor: '#fff',
            fourcolor: 'red',
            fourborderBottomColor: '#ffdf41',
            fivecolor: '#000',
            fiveborderBottomColor: '#fff',
            sixcolor: '#000',
            sixborderBottomColor: '#fff',
            flag : 4
        })
    }
    Change5 = () => {
        this.setState({
            onecolor: '#000',
            oneborderBottomColor: '#fff',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            threecolor: '#000',
            threeborderBottomColor: '#fff',
            fourcolor: '#000',
            fourborderBottomColor: '#fff',
            fivecolor: 'red',
            fiveborderBottomColor: '#ffdf41',
            sixcolor: '#000',
            sixborderBottomColor: '#fff',
            flag : 5
        })
    }
    Change6 = () => {
        this.setState({
            onecolor: '#000',
            oneborderBottomColor: '#fff',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            threecolor: '#000',
            threeborderBottomColor: '#fff',
            fourcolor: '#000',
            fourborderBottomColor: '#fff',
            fivecolor: '#000',
            fiveborderBottomColor: '#fff',
            sixcolor: 'red',
            sixborderBottomColor: '#ffdf41',
            flag : 6
        })
    }

    render() {
        // console.log(this.state.flag);
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f5f9' }}>
                {/* header标题栏 */}
                <View style={styles.header}>
                    <View style={{width:'10%',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => Actions.source()}>
                            <Image
                                source={require('../../assets/composition/composition/all.png')}
                                style={{ width: 40 * s, height: 40 * s }}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* 搜索 */}
                    <View style={{backgroundColor:'#FFF',
                    alignItems:'center',flexDirection:'row',justifyContent:'center',height:90*s,width:'60%'}}>
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:60*s,width:'100%',borderRadius:30*s,backgroundColor:'#F5F5F5'}} 
                        onPress={()=>{Actions.searchEssay()}}>
                            <Text style={{color:'#666666'}}>请输入要搜索的内容</Text>
                            <Icon1 style={{paddingLeft:10*s}} name='search1' size={30*s} color='#666666'/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text onPress={() => { Actions.seleced() }} style={{ color: 'red', fontSize: 28*s }}>修改标签</Text>
                    </View>
                </View>
                {/* label 标签页*/}
                {
                        this.state.usort_false?
                        <View style={styles.label1}>
                        <TouchableOpacity>
                            <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]} onPress={this.Change1}>推荐</Text>
                        </TouchableOpacity>
                        </View>
                        :

                    
                <View style={styles.label}>
                    <TouchableOpacity>
                        <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]} onPress={this.Change1}>推荐</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]} onPress={this.Change2}>{this.state.data1.msname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.threelabel, { color: this.state.threecolor }, { borderBottomColor: this.state.threeborderBottomColor }]} onPress={this.Change3}>{this.state.data2.msname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.fourlabel, { color: this.state.fourcolor }, { borderBottomColor: this.state.fourborderBottomColor }]} onPress={this.Change4}>{this.state.data3.msname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.fivelabel, { color: this.state.fivecolor }, { borderBottomColor: this.state.fiveborderBottomColor }]} onPress={this.Change5}>{this.state.data4.msname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.sixlabel, { color: this.state.sixcolor }, { borderBottomColor: this.state.sixborderBottomColor }]} onPress={this.Change6}>{this.state.data5.msname}</Text>
                    </TouchableOpacity>
                </View>
                }
                {/* container */}
                <View>
                    <Container flag={this.state.flag} msid={[this.state.data1.msid,this.state.data2.msid,this.state.data3.msid,this.state.data4.msid,this.state.data5.msid]} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 90 * s,
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        backgroundColor:'#FFF',
        justifyContent: 'space-around'
    },
    search: {
        width: 400 * s,
        height: 50 * s,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        width: width,
        height: 60 * s,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    label1: {
        width: width,
        height: 60 * s,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    onelabel: {
        borderBottomWidth: 4,
        fontSize: 33*s
    },
    twolabel: {
        borderBottomWidth: 4,
        fontSize: 33*s
    },
    threelabel: {
        borderBottomWidth: 4,
        fontSize: 33*s
    },
    fourlabel: {
        borderBottomWidth: 4,
        fontSize: 33*s
    },
    fivelabel: {
        borderBottomWidth: 4,
        fontSize: 33*s
    },
    sixlabel: {
        borderBottomWidth: 4,
        fontSize: 33*s
    }
})