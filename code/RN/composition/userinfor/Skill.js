import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, FlatList, ScrollView, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

// const data=[
//     {
//         tid:'1',
//         taid:'1',
//         ttitle:'teacher shill',
//         tcontent:'自行车v的风格和  微软推你看过',
//         tname:'点评君',
//         ttime:'2020-04-30'
//     }
// ]

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
        
    }
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
                        style={{  }}
                        data={this.state.data}
                        numColumns={1}
                        renderItem={({ item }) => (
                            
                            <View style={{ backgroundColor: '#FFF', marginLeft: 10 * s, marginRight: 10 * s, marginTop: 10 * s, height: 250 * s, overflow: 'hidden', padding: 20 * s , }}>
                                <View style={{ width: '100%', height: 160 * s}}>
                                    <TouchableOpacity >
                                        <Text style={{ fontSize: 26 * s, fontWeight: 'bold', marginBottom:10*s }}>{item.ttitle}</Text>
                                        <Text numberOfLines={3} style={{fontSize: 20 * s}}>{item.tcontent}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={{fontSize: 18 * s, color:'gray'}}>{item.tname}</Text>
                                    <Text style={{fontSize: 18 * s, color:'gray'}}>{item.ttime}</Text>
                                </View>
                            </View>
                            
                        )}
                    />
 
                </View>
                }

            </View>
        )
    }
}
