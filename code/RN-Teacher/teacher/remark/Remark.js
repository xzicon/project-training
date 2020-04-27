import React, { Component } from 'react';
import { View, Button, Text, StatusBar, FlatList, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity ,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

// const data =[
//     {
//         aid:58,
//         atitle:"蓦然回首",
//         acontent:"我有两个家，一个家是一辈子的家，而另一个则是暂时的家，这个家叫做班级。我和我那三十几个家人，在那个暂时的家中学习，奋斗。我们之间就好似有一个契约，注定三年以后就会各奔东西。还记得我们第一次见面的时候，女生都是那么安静，男生都是那么温文尔雅。但是，慢慢的，我们熟悉了，可谓是“原形毕露”:从前乖巧的女孩子，一夜之间变成了女汉子，曾经温文尔雅的绅士，瞬间变成了男疯子。",
//         uname:"写作小能手",
//         uimage:"1576828950695.jpg",
//         utime:"2020-04-13 16:40",
//         atag:"#校园"
//     }
// ]

export default class Remark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tid: '',
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
            .then((res) => {
                res === null ?
                    this.setState({ tid: '' })
                    :
                    this.setState({ tid: res })
                    console.log(this.state.tid)
                    fetch('http://116.62.14.0:8402/grade/teacher/' + this.state.tid)
                        .then((res) => res.json())
                        .then((res) => {
                            this.setState({ data: res.data });
                            console.log(res.data);
                        })
                    
            })
    }
    
    render() {
        return (
            <View>
                {this.state.data.length !== 0 ?
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
                                <Text style={{ color: '#333', fontSize: 34 * s,  }}>我的点评</Text>
                        </View>
                        <ScrollView>
                            <View style={{ flex: 1, }}>
                                <View style={{ width: width, marginTop: 10 * s }}>
                                    <FlatList
                                        data={this.state.data}
                                        numColumns={1}
                                        renderItem={({ item }) => (
                                            item.isgrade === 1 ?
                                            <View style={{ width: width * 0.96, height:  220 * s, backgroundColor: 'white', marginLeft: 0.02 * width, marginBottom: 0.02 * width, }}>
                                                <TouchableOpacity onPress={() => Actions.rarticle({ gid: item.gid, })} >
                                                    
                                                    <View style={{ width: width * 0.94, height: '15%', marginTop: '2%', marginLeft: width * 0.02, marginRight: 0.02 * width,flexDirection:'row',justifyContent:'space-between'}}>
                                                        <Text style={{widht:'50%',height:'100%', fontSize: 26 * s, fontWeight: 'bold', color: '#333',}} >{item.atitle}</Text>
                                                        <Text style={{widht:'20%',height:'100%', fontSize: 26 * s, fontWeight: 'bold', color:'red',marginRight:'5%',fontFamily:'华文彩云',fontStyle:'italic',textDecorationLine:'underline',borderBottomWidth:1,borderBottomColor:'red'}}>&nbsp;{item.score}</Text>
                                                    </View>
                                                    <View style={{ width: width * 0.94, height: '45%', marginTop: '1%', marginLeft: width * 0.02, marginRight: 0.02 * width,overflow:"hidden",}}><Text style={{ fontSize: 20 * s, color: '#333' }} >{item.acontent}</Text></View>
                                                    <View style={{ width: width * 0.94, height: '10%', marginTop: '2%', marginLeft: 0.02 * width,}}>
                                                        <Text style={{ fontSize: 18 * s, color: 'gray' }} >{item.uname}</Text>
                                                        
                                                    </View>
                                                    <View style={{ width: width * 0.94, height: '10%', marginLeft: 0.02 * width, marginBottom: '2%'}}>
                                                        <Text style={{ fontSize: 18 * s, color: 'gray' }} >{item.invitetime}</Text>
                                                    </View>
                                                    
                                                </TouchableOpacity>
                                            </View>
                                            :<View></View>
                                        )}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 180 * s }}></View>
                        </ScrollView>
                    </View>
                    :
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
                                <Text style={{ color: '#333', fontSize: 34 * s,  }}>我的点评</Text>
                        </View>
                        <View style={{ width: width, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>你还没有点评哦~</Text>
                        </View>
                    </View>}
            </View>
        )
    }
}
