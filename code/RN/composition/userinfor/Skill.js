import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, FlatList, ScrollView, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;


export default class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    this.skill();
            })
    }
    skill = () => {
        fetch('http://116.62.14.0:8402/skill/tlist/'+this.props.tid)
        .then((res) => res.json())
            .then((res) => {
                console.log('skill')
                console.log(res.data)
                this.setState({
                    data: res.data,
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
            <View style={{ flex: 1, }}>
                {this.state.data.length === 0 ?
                <View style={{marginTop:'3%',marginLeft:'3%'}}>
                    <Text style={{fontSize:23*s}}>该老师还未写任何技法哦~</Text>
                </View>
                :
                <View>
                    <FlatList
                        style={{ marginBottom: 180 * s }}
                        data={this.state.data}
                        numColumns={1}
                        // ListFooterComponent={ this._renderFooter }
                        renderItem={({ item }) => (
                            
                            <TouchableOpacity 
                            onPress={()=>{Actions.skilldetail({sid:item.sid})}}
                            style={{ flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor: '#FFF',height: 200 * s,marginLeft: 10 * s, marginRight: 10 * s, marginTop: 10 * s,padding:20*s}}>
                                <View style={{ width:width-200*s}}>
                                    <TouchableOpacity style={{flexDirection:'column',justifyContent:'space-between', height:'80%',}}>
                                        <Text style={{ fontSize: 26 * s, fontWeight: 'bold', marginBottom:10*s }}>{item.skilltitle}</Text>
                                        <Text numberOfLines={3} style={{fontSize: 20 * s}}>{item.skilltime}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Image 
                                    style={{width:150*s,height:150*s}}
                                    source={{'uri':'http://116.62.14.0:8402/images/'+item.skillimage}}/>
                                </View>
                            </TouchableOpacity>
                            
                        )}
                    />
 
                </View>
                }

            </View>
        )
    }
}
