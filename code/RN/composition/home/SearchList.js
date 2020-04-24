import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Dimensions, 
    TouchableOpacity, FlatList,Image, Modal} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

export default class SearchList extends Component {
    constructor(props){
        super(props);
        this.state=({
            search_data:[],
            search_material_data:[],
            com:false,
            value:this.props.search,
            editable:false,
            clear:true,
            tab:true
        })
    }
    componentDidMount(){
        setTimeout(()=>{
            if(this.state.tab){
                this._search();
            }
        },20)
    }
    _search=()=>{
        // this._close;
        // let com1 = this.state.com;
        let data = {search:this.state.value};
        fetch('http://116.62.14.0:8402/search/article', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json())
          .then((res)=>{
            //   Actions.searchlist({data:res.data})
              this.setState({
                search_data:res.data,
                com:true
              })
              console.log(res.data)
          })
    }
    _search_material=()=>{
        let data = {search:this.state.value};
        fetch('http://116.62.14.0:8402/search/material', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json())
          .then((res)=>{
            //   Actions.searchlist({data:res.data})
              this.setState({
                search_material_data:res.data,
                com:true
              })
              console.log(res.data)
          })
    }
    inputSearch=(search)=>{
        this.setState({value:search});
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
            value:''
        })
    }
    _change=()=>{
        if(this.state.tab){
            this.setState({
                tab:false
            })
            this._search_material()
        }else{
            this.setState({
                tab:true
            })
            this._search()
        }
        
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#FFF',alignItems:'center',flexDirection:'row',justifyContent:'space-around',height:90*s}}>
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
                        {/* <TextInput 
                            underlineColorAndroid="transparent"
                            returnKeyType="search"//设置键盘样式
                            onSubmitEditing={this._search}
                            ref={input=>this.input=input}//自动启动键盘
                            value={this.props.search}
                            placeholder="请输入要搜索的内容"
                            style={{
                                padding:0,
                                paddingLeft:15*s,
                                backgroundColor:'#F5F5F5'
                            }}
                            onChangeText={this.inputSearch}
                        /> */}
                        <View style={{width:'80%'}}>
                        {/* {this.state.editable? */}
	                            <TextInput
                                    placeholder="请输入要搜索的内容"
                                    style={{padding:0,paddingLeft:10*s}}
	                                //  ref={input => this.input = input}
	                                 value={this.state.value}
                                    //  autoFocus={true}
                                     returnKeyType="search"//设置键盘样式
                                    onSubmitEditing={this._search}
	                                 underlineColorAndroid="transparent"
	                                 onChangeText={this.inputSearch}
                                 /> 
                                 
                                 {/* <TouchableOpacity onPress={()=>{this.setState({editable:!this.state.editable})}}> */}
                                    {/* <Text style={{padding:0,paddingLeft:10*s}}>{this.state.value}</Text> */}
                                    
                                    {/* <TextInput
                                        style={{padding:0,paddingLeft:10*s}}
                                        editable={false}
                                        value={this.state.value}
                                        underlineColorAndroid="transparent"                            
                                    />
                                 </TouchableOpacity> */}
                                 
                        
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
                       onPress={()=>{Actions.pop()}}>
                        <Text>取消</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View>
                        {
                            this.state.tab?
                            <View style={{height:80*s,backgroundColor:'#FFF',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                <Text style={{color:'red'}}>作文</Text>
                                <TouchableOpacity onPress={this._change}>
                                    <Text>素材</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{height:80*s,backgroundColor:'#FFF',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                <TouchableOpacity onPress={this._change}>
                                    <Text>作文</Text>
                                </TouchableOpacity>
                                <Text style={{color:'red'}}>素材</Text>
                            </View>
                        }
                        
                    </View>
                    {
                        this.state.tab?
                        <FlatList
                        style={{paddingTop:10*s,paddingBottom:10*s}}
                        data={this.state.search_data}
                        numColumns={1}
                                    // ListFooterComponent={ this._renderFooter }
                                    // onRefresh = {()=>{
                                    //     this.all()
                                    // }}
                                    // refreshing = { this.state.refreshing }
                        renderItem={({item})=>(
                            <View style={{backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                                                   borderRadius:10*s,overflow:'hidden',padding:20*s
                                        }}>
                                            {/* 点击头像个人主页 */}
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <TouchableOpacity style={{marginRight:20*s}} onPress={()=>{Actions.personHome({uid:item.uid})}}>
                                        <Image style={{width:30,height:30}} 
                                                    source={{uri:'http://116.62.14.0:8402/images/'+item.uimage}}/>
                                    </TouchableOpacity>
                                    <View>
                                        <Text>{item.uname}</Text>
                                        <Text>{item.utime}</Text>
                                    </View>
                                </View>
                                            {/* 点击详情页 */}
                                            {/* <View style={{width:'100%',height:180*s}}> */}
                                <TouchableOpacity style={{}} onPress={()=>{Actions.detailEssay({aid:item.aid})}}>
                                    <View style={{alignItems:'center',margin:20*s}}>
                                        <Text style={{fontSize:35*s,}}>{item.atitle}</Text>
                                    </View>
                                    <Text numberOfLines={3}>{item.acontent}</Text>
                                                        {/* 查看全文未设置好样式 */}
                                                        {/* <TouchableOpacity onPress={()=>Actions.detailEssay({aid:item.aid})}><Text>全文</Text></TouchableOpacity> */}
                                </TouchableOpacity>
                                            {/* </View> */}
                                            {/* 点击素材 */}
                                            {/* 接口未获取素材标题 */}
                                            {/* 目前改成标签 */}
                                <View style={{marginTop:25*s,flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{color:'#4682B4'}}>{item.atag}</Text>
                                    <Icon name='more-vertical' size={40*s}/>
                                </View>
                            </View>
                            )}
                        />
                        :
                        <FlatList
                        style={{paddingTop:10*s,paddingBottom:10*s}}
                        data={this.state.search_material_data}
                        numColumns={1}
                                    // ListFooterComponent={ this._renderFooter }
                                    // onRefresh = {()=>{
                                    //     this.all()
                                    // }}
                                    // refreshing = { this.state.refreshing }
                        renderItem={({item})=>(
                            <View style={{backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                                                   borderRadius:10*s,overflow:'hidden',padding:20*s
                                        }}>
                                            {/* 点击头像个人主页 */}
                                
                                            {/* 点击详情页 */}
                                            {/* <View style={{width:'100%',height:180*s}}> */}
                                <TouchableOpacity style={{}} onPress={()=>{Actions.popular({mid:item.mid})}}>
                                    <View style={{alignItems:'center',margin:20*s}}>
                                        <Text style={{fontSize:35*s,}}>{item.mtitle}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            )}
                        />
                    }

                </View>
    
            </View>
        )
    }
}
