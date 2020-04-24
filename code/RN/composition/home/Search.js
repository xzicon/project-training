import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Dimensions, 
    TouchableOpacity, FlatList,Image, Modal} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import SearchList from './SearchList';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

export default class Search extends Component {
    constructor(){
        super();
        this.state=({
            textInput:'',
            search:'',
            search_data:[],
            com:false,
            clear:false,//清空输入框
        })
    }
    componentDidMount(){
        setTimeout(()=>{
            this.textInput.focus()
        },20)
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
    _search=()=>{
        let search1 = this.state.search;
        this._clear();
        Actions.searchlist({search:search1});

        // this._close;
        // let com1 = this.state.com;
        // let data = {search:this.state.search};
        // fetch('http://116.62.14.0:8402/search/article', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        //   }).then(res=>res.json())
        //   .then((res)=>{
        //       this.setState({
        //         search_data:res.data,
        //         com:true
        //       })
        //       console.log(res.data)
        //   })
    }
    _close=()=>{
        let com1 = this.state.com;
        this.setState({
            com:!com1
        })
    }
    render() {
        return (
            <View>
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
                            onSubmitEditing={this._search}
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
                {/* 未搜索时的页面 */}
                {
                // !this.state.com?
                <View>
                    <Text>历史搜索</Text>
                    <Text>大家都在搜</Text>
                    <Text>热议话题</Text>
                </View>
            //    :
            //    <SearchList data={this.state.data}/>
            //    <View>
            //       <FlatList
            //                         style={{paddingTop:10*s,paddingBottom:10*s}}
            //                         data={this.state.search_data}
            //                         numColumns={1}
            //                         // ListFooterComponent={ this._renderFooter }
            //                         // onRefresh = {()=>{
            //                         //     this.all()
            //                         // }}
            //                         // refreshing = { this.state.refreshing }
            //                         renderItem={({item})=>(
            //                             <View style={{backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
            //                                        borderRadius:10*s,overflow:'hidden',padding:20*s
            //                             }}>
            //                                 {/* 点击头像个人主页 */}
            //                                 <View style={{flexDirection:'row',alignItems:'center'}}>
            //                                     <TouchableOpacity style={{marginRight:20*s}} onPress={()=>{Actions.personHome({uid:item.uid})}}>
            //                                         <Image style={{width:30,height:30}} 
            //                                         source={{uri:'http://116.62.14.0:8402/images/'+item.uimage}}/>
            //                                     </TouchableOpacity>
            //                                     <View>
            //                                         <Text>{item.uname}</Text>
            //                                         <Text>{item.utime}</Text>
            //                                     </View>
            //                                 </View>
            //                                 {/* 点击详情页 */}
            //                                 {/* <View style={{width:'100%',height:180*s}}> */}
            //                                     <TouchableOpacity style={{}} onPress={()=>{Actions.detailEssay({aid:item.aid})}}>
            //                                             <View style={{alignItems:'center',margin:20*s}}>
            //                                                 <Text style={{fontSize:35*s,}}>{item.atitle}</Text>
            //                                             </View>
            //                                             <Text numberOfLines={3}>{item.acontent}</Text>
            //                                             {/* 查看全文未设置好样式 */}
            //                                             {/* <TouchableOpacity onPress={()=>Actions.detailEssay({aid:item.aid})}><Text>全文</Text></TouchableOpacity> */}
            //                                     </TouchableOpacity>
            //                                 {/* </View> */}
            //                                 {/* 点击素材 */}
            //                                 {/* 接口未获取素材标题 */}
            //                                 {/* 目前改成标签 */}
            //                                 <View style={{marginTop:25*s,flexDirection:'row',justifyContent:'space-between'}}>
            //                                     <Text style={{color:'#4682B4'}}>{item.atag}</Text>
            //                                     <Icon1 name='more-vertical' size={40*s}/>
            //                                 </View>
            //                             </View>
            //                         )}
            //                     />
            //                     </View>
    }
                                {/* <Modal 
                style={styles.container}
                onRequestClose={this._close}
                transparent={false}
                visible={this.state.com}
                > */}
                    {/* </Modal> */}
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
