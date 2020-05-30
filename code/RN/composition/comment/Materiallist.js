import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity ,TextInput,Image,StyleSheet,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
const { width, scale } = Dimensions.get('window');
const s = width / 640;
const search = require('../../assets/input_search.png');
export default class Materiallist extends Component {
    constructor(props) {
        super(props);
        this.state = ({
          data:[],
          text:''
        })
      }
    componentDidMount() {
        this.getMaterial()
    }
    getMaterial = () => {
        fetch('http://116.62.14.0:8402/search/getmtitle')
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data[23])
                this.setState({ data: res.data });
            })
      }
      _search = () => {
        let data = { search: this.state.text };
        fetch('http://116.62.14.0:8402/search/getmt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                if (res.status == 0) {
                    this.setState({
                        data: res.data,
                    })
                } else {
                    console.log(res.data)
                }
            })
    }
    _change=(text)=>{
        this.setState({text:text},()=>{
            this._search()
        })
    }
    _select=(mid,mtitle,truetitle)=>{
        console.log(mid,mtitle,truetitle)
        // Actions.pop(this.props.refresh(mid,mtitle,truetitle));
        Actions.popTo('addEssay1');
        setTimeout(()=>{
            Actions.refresh({update:true,mid:mid,mtitle:mtitle,truetitle:truetitle})
        })
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#F0F0F0'}}>
                <View style={{ height: 50 * s, marginBottom: 5, marginTop:5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F0F0F0' }}>
                    <View style={{
                        width: 60, height: 50 * s,
                        
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={()=>{Actions.pop()}}>
                        <Text>取消</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '60%' }}></View>
                   
                </View>
                <View
                style={{
                alignItems: 'center',
                flexDirection: 'row',
                height:65*s,
                marginTop: 14*s,
                paddingVertical: 5,
                width: width - 30,
                marginLeft: 15,
                marginBottom:14*s,
                backgroundColor:'rgba(255,255,255,0.3)',
                borderRadius:35*s,
                backgroundColor:'#e9e9ef'
                }}>
                <Image
                source={search}
                style={{marginLeft: 20*s, width: 30*s, height: 30*s}}
                />
                <TextInput
                returnKeyType="search"//设置键盘样式
                style={{
                    // paddingVertical: 0,
                    marginLeft: 10,
                    width: width - 100,
                    padding:0,
                    marginTop:0
                    // fontSize:15*s
                }}
                // clearButtonMode={'while-editing'}
                onChangeText={(text)=>{this._change(text)}}
                value={this.state.text}
                keyboardType={'default'}
                placeholder={'搜索更多话题'}
                placeholderTextColor = '#8F8F8F'
                onSubmitEditing={()=>{this._search(this.state.text)}}
                />
                </View>
                <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    onPress={()=>{this._select(item.mid,item.mtitle,item.truetitle)}}
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:70*s,padding:10,borderBottomColor:'#e9e9ef',borderBottomWidth:1}}>
                        <Image 
                        style={{width:28*s,height:28*s,marginRight:10*s}}
                        source={require('../../assets/composition/add/sucai.png')}/>
                        <Text style={{width:'90%',color:'#666'}} numberOfLines={1} ellipsizeMode='middle'>{item.mtitle==''?item.truetitle:item.mtitle}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
        )
    }
}
