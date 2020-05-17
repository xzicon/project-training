import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Dimensions, 
    TouchableOpacity, FlatList,Image, Modal, AsyncStorage, ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import SearchList from './SearchList';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
const hot_search=[
    '疫情','高考','中考','勤洗手','疫情','高考','中考','勤洗手','疫情','高考','中考','勤洗手'
]
const hot_topic=[

]

export default class Search extends Component {
    constructor(){
        super();
        
        this.state=({
            textInput:'',
            search:'',
            search_data:[],
            com:false,
            clear:false,//清空输入框
            search_history:''
        })
    }
    componentDidMount(){
        setTimeout(()=>{
            this.textInput.focus()
        },20)
        AsyncStorage.getItem('search')
			.then(res => {
                console.log(res);
                this.setState({
                    search_history:res==null?'':res
                })
                console.log(this.state.search_history)
			})
    }
    inputSearch=(search)=>{
        this.setState({search:search});
        console.log(search)
        if(search!==''){
            this.setState({
                clear:true
            })
        }else{
            this.setState({
                clear:false
            })
        }
    }
    _clear=()=>{
        this.setState({
            clear:false,
            search:''
        })
    }

    _search=(item)=>{
        if(item==''){
            ToastAndroid.show('请输入搜索关键词',100)
        }else{
        let search1 = item;
        // this.state.search_history==''?
        // let str = search1
        // :
        
        // for(let i=0;i<this.state.search_history.split(',').length;i++){
        //     if(this.state.search_history.split(',')[i]==search1){
        //         this.state.search_history[0]=search1;
        //         this.state.search_history.split(',')[i+1]
        //     }else{

        //     }
        // }
        
        let str = search1+','+this.state.search_history
        AsyncStorage.setItem('search',str.toString())
        .then(()=>{
            AsyncStorage.getItem('search')
			.then(res => {
                console.log(res);
                this.setState({
                    search_history:res
                })
                console.log(this.state.search_history)
                console.log(res.split(',').length)
			})
            this._clear();
            Actions.searchlist({search:search1});
        })
        }

    }
    clear_history=()=>{
        AsyncStorage.removeItem('search')
        .then(() => {
            this.setState({
                search_history:''
            })
        });
    }
    _close=()=>{
        let com1 = this.state.com;
        this.setState({
            com:!com1
        })
    }
    render() {
        return (
            <View style={{backgroundColor:'#FFF'}}>
                <View style={{backgroundColor:'#FFF',
                alignItems:'center',flexDirection:'row',justifyContent:'space-around',height:90*s}}>
                    <View style={{
                        width: '80%',
                        height: 60*s,
                        padding:0,
                        paddingLeft:15*s,
                        borderRadius:30*s,
                        backgroundColor:'#F5F5F5',
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                        <Icon name='search1' size={30*s}/>
                        <View style={{width:'80%'}}>
                        <TextInput 
                            value={this.state.search}
                            clearTextOnFocus={true}
                            underlineColorAndroid="transparent"
                            returnKeyType="search"//设置键盘样式
                            onSubmitEditing={()=>{this._search(this.state.search)}}
                            ref={t=>this.textInput=t}//自动启动键盘
                            autoFocus={true}
                            placeholder="请输入要搜索的内容"
                            style={{
                                padding:0,
                                paddingLeft:15*s,
                                backgroundColor:'#F5F5F5'
                            }}
                            onChangeText={this.inputSearch}
                        />
                        </View>
                        {
                            this.state.clear?
                                <TouchableOpacity onPress={this._clear}>
                                <Icon name='close' size={35*s} color='#666666'/>
                                </TouchableOpacity>
                            :
                                <Text></Text>
                        }
                    </View>
                    <TouchableOpacity 
                       onPress={()=>Actions.pop()}>
                        <Text>取消</Text>
                    </TouchableOpacity>
                </View>
               
                <View style={{backgroundColor:'#FFF',padding:20*s}}>
                    <View style={{paddingBottom:20*s}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>历史搜索</Text>
                            <Text onPress={()=>{this.clear_history()}} style={{color:'#666'}}>清除所有历史</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        {this.state.search_history==''?
                        <View></View>
                        :
                        <FlatList
                        data={this.state.search_history.split(',')}
                        numColumns={5}
                        renderItem={({ item }) => (
                            <View>
                                <Text onPress={()=>{this._search(item)}} style={{margin:20*s,paddingLeft:15*s,paddingRight:15*s,paddingBottom:10*s,paddingTop:10*s,borderRadius:20*s,backgroundColor:'#F5F5F5',color:'#666'}}>{item}</Text>
                            </View>
                        )}
                        />
                        }
                        

                        </View>
                    </View>
                    <View >
                        <Text>大家都在搜</Text>
                        <View>
                        <FlatList
                        data={hot_search}
                        numColumns={5}
                        renderItem={({ item }) => (
                            <View>
                                <Text onPress={()=>{this._search(item)}} style={{margin:20*s,paddingLeft:15*s,paddingRight:15*s,paddingBottom:10*s,paddingTop:10*s,borderRadius:20*s,backgroundColor:'#F5F5F5',color:'#666'}}>{item}</Text>
                            </View>
                        )}
                        />
                        </View>
                    </View>
                    
                   
                </View>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cover: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
})
