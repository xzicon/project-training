import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,Dimensions,
    StyleSheet,AsyncStorage,Image, FlatList,ScrollView,
     Modal,TextInput,ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';

import { Button, Drawer, List, WhiteSpace, Switch} from '@ant-design/react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Favorite extends Component {
    constructor(props){
        super(props);
        this.state=({
            favorite:[],
            faid:this.props.faid,
            favoritelist:[],
            look:'',
            edit:false,
            create_modal:false

        })
    }
    componentDidMount(){
        AsyncStorage.getItem('uid')
        .then((res)=>{
            res===null?
            this.setState({look:''})
            :
            this.setState({look:res})

            this._favorite();
            this._favoritelist();
        })
        
    }
    _favorite=()=>{
        fetch('http://116.62.14.0:8402/favorite/favorite/'+this.state.faid)
        .then(res=>res.json())
        .then((res)=>{
            this.setState({
                favorite:res.data,
                favoritename:res.data.favoritename,
                fadescribe:res.data.fadescribe,
                ishide:res.data.fhide==0?true:false,
                faimage:res.data.faimage
            })
            console.log(this.state.favorite.fnum)
        })
    }
    _favoritelist=()=>{
        fetch('http://116.62.14.0:8402/favorite/favoritelist/'+this.state.faid+'/'+this.state.look)
        .then(res=>res.json())
        .then((res)=>{
            this.setState({
                favoritelist:res.data
            })
        })
    }
    _refresh=()=>{
        this._favoritelist()
    }
    // 编辑
    _edit=()=>{
        this.setState({
            edit:true
        })
    }
    _edit_false=()=>{
        this.setState({
            edit:false
        })
    }
    // 编辑收藏夹信息
    create=()=>{
        this.setState({
            create_modal:true,
            edit:false,
            fhide:this.state.ishide
        })
    }
    create_false=()=>{
        this.setState({
            create_modal:false,
            edit:true
        })
    }
    // 删除文件夹
    delete_favorite=()=>{
        console.log(this.state.faid);
        let data = {
            uid:this.state.look,
            faid:this.state.faid
        }
        fetch('http://116.62.14.0:8402/favorite/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json())
          .then((res)=>{
              console.log(res)
              if(res.status==0){
                
                ToastAndroid.show('删除成功',100);
                Actions.pop(this.props.refresh());
              }else{
                ToastAndroid.show('删除失败',100)
              }
          })
    }
    // 修改文件夹
    update_favorite=()=>{
        let data = {
            favoritename:this.state.favoritename,
            fhide:this.state.fhide?0:1,
            faid:this.state.faid
        }
        fetch('http://116.62.14.0:8402/favorite/favoritename', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json())
          .then((res)=>{
              console.log(res)
              if(res.status==0){
                console.log('名称成功')
                this._favorite();
              }else{
                console.log('失败')
              }
          })
          fetch('http://116.62.14.0:8402/favorite/fhide', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json())
          .then((res)=>{
              console.log(res)
              if(res.status==0){
                console.log('公开成功')
                this._favorite();
                this.create_false();
              }else{
                console.log('失败')
              }
          })
          
    }
    onSwitchChange = (value) => {
        this.setState({
          fhide: value,
        })
    };
    render() {
        const itemArr = Array.apply(null, Array(this.state.favoritelist.length+1))
        .map(function(_, i) {
          return i;
        })
        .map((_i, index) => {
          if (index === 0) {
            return (
              <List.Item
                key={index}
                multipleLine
              >
                <View
                  style={{
                    height:90*s,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{fontSize:30*s}}>目录</Text>
                  <TouchableOpacity
                    onPress={() => this.drawer.closeDrawer()}
                  >
                    <Icon name='close' size={40*s}/>
                  </TouchableOpacity>
                </View>
              </List.Item>
            );
          }
          return (
            <List.Item
              key={index}
            >
                <TouchableOpacity
                onPress={()=>{this.state.favoritelist[index-1].istrue == 0?Actions.popular({mid:this.state.favoritelist[index-1].mid}):Actions.paperdetail({mid:this.state.favoritelist[index-1].mid})}}
                // onPress={this.myScrollView.scrollTo({ x: 0, y: this.layoutY, animated: true})}
                 style={{flexDirection:'row',width:'80%',paddingLeft:30*s}}>
                    <Text style={{marginRight:10*s,color:'#666666'}}>{index<10?'0'+index:index}</Text>
                    <Text>{this.state.favoritelist[index-1].istrue == 0?this.state.favoritelist[index-1].mtitle:this.state.favoritelist[index-1].truetitle}</Text>
                </TouchableOpacity>
            </List.Item>
          );
        });
        const sidebar = (
            <ScrollView style={[styles.container]}>
              <List>{itemArr}</List>
            </ScrollView>
          );
        return (
            <Drawer
                sidebar={sidebar}
                position="right"
                open={false}
                drawerRef={el => (this.drawer = el)}
                onOpenChange={this.onOpenChange}
                drawerBackgroundColor="#ccc"
            >
            <View>
                {/* 创建收藏夹 */}
                    <Modal
                        style={styles.con}
                        animationType='silde'
                        onRequestClose={this.create_false}//安卓必须设置
                        transparent={false}
                        visible={this.state.create_modal}
                    >
                        <View style={styles.cover1}
                        >
                            <View style={{paddingLeft:'5%',paddingRight:'5%',backgroundColor:'#FFF',
                            alignItems:'center',flexDirection:'row',justifyContent:'space-between',height:90*s}}>
                    
                                <TouchableOpacity onPress={this.create_false}>
                                    <Icon size={40*s} style={{color:'#000'}} name='left'/>
                                </TouchableOpacity>
                                <View style={{alignItems:'center'}}>
                                    <Text style={{fontSize:28*s}}></Text>  
                                </View>       
                                <TouchableOpacity onPress={()=>{this.update_favorite()}}>
                                    <Text>完成</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{flexDirection:'row',backgroundColor:'#FFF',width:'100%',marginTop:30*s,marginBottom:30*s,height:150*s,alignItems:'center'}}>
                                <Text style={{paddingLeft:30*s}}>更换封面</Text>
                                <Image style={{width:150*s,height:150*s,marginLeft:width*0.5}} source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.faimage }}/>
                            </View>

                            <View style={{flexDirection:'row',backgroundColor:'#FFF',width:'100%',marginTop:30*s,marginBottom:30*s,height:90*s,alignItems:'center'}}>
                                <Text style={{width:'20%',paddingLeft:30*s}}><Text style={{color:'red'}}>*</Text>名称</Text>
                                <TextInput
                                defaultValue={this.state.favoritename}
                                style={{ backgroundColor: '#FFF', padding: 10*s}}
                                placeholder="名称"
                                onChangeText={(favoritename) => {
                                    this.setState({ favoritename:favoritename})
                                }}
                                />
                            </View>
                            <View style={{flexDirection:'row',backgroundColor:'#FFF',width:'100%',marginTop:30*s,marginBottom:30*s,height:150*s}}>
                                <Text style={{width:'20%',paddingLeft:30*s,height:100*s,paddingTop:10*s}}>简介</Text>
                                <TextInput
                                defaultValue={this.state.fadescribe}
                                style={{ height:150*s,backgroundColor: '#FFF', padding: 10*s,height:150*s,width:'80%'}}
                                placeholder="可填写简介"
                                multiline={true}
                                minHeight={150*s} 
                                textAlignVertical={'top'}
                                onChangeText={(fadescribe) => {
                                    this.setState({ fadescribe:fadescribe})
                                }}
                                />
                            </View>
                            <View>
                                <List.Item
                                extra={
                                    <Switch
                                    color
                                    checked={this.state.fhide}
                                    onChange={this.onSwitchChange}
                                    />
                                }
                                >
                                {this.state.fhide ? '公开' : '隐藏'}
                                </List.Item>
                            </View>
                        </View>
                    </Modal>
                <Modal
                style={styles.container1}
                animationType='silde'
                onRequestClose={this._edit_false}//安卓必须设置
                transparent={true}
                visible={this.state.edit}
                >
                    <TouchableOpacity style={styles.cover} 
                    onPress={this._edit_false}>
                    </TouchableOpacity>
                    <View style={{backgroundColor:'#FFF',position:'absolute',bottom:0,right:0,left:0,flexDirection:'column'}}>
                        <View >
                            <TouchableOpacity
                            onPress={this.create}
                            style={{flexDirection:'row',alignItems:'center',height:80*s,width:width,padding:20*s,borderBottomColor:'#F0F0F0',borderBottomWidth:1}}
                            >
                                <Icon size={40*s} style={{color:'#000'}} name='edit'/>
                                <Text style={{marginLeft:20*s}}>编辑信息</Text>
                            </TouchableOpacity>  
                        </View>
                        {/* <View>
                            <TouchableOpacity
                            style={{flexDirection:'row',alignItems:'center',height:80*s,width:width,padding:20*s,borderBottomColor:'#F0F0F0',borderBottomWidth:1}}
                            >
                                <Icon size={40*s} style={{color:'#000'}} 
                                name='switcher'/>
                                <Text style={{marginLeft:20*s}}>批量管理</Text>
                            </TouchableOpacity>  
                        </View> */}
                        <View>
                            <TouchableOpacity
                            onPress={this.delete_favorite}

                            style={{flexDirection:'row',alignItems:'center',height:80*s,width:width,padding:20*s,borderBottomColor:'#F0F0F0',borderBottomWidth:1}}
                            >
                                <Icon size={40*s} style={{color:'#000'}} 
                                name='switcher'/>
                                <Text style={{marginLeft:20*s}}>删除该文件夹</Text>
                            </TouchableOpacity>  
                        </View>
                        {/* <View>
                            <TouchableOpacity
                            style={{flexDirection:'row',alignItems:'center',height:80*s,width:width,padding:20*s,borderBottomColor:'#F0F0F0',borderBottomWidth:1}}
                            >
                                <Icon2 size={40*s} style={{color:'#000'}} name='error-outline'/>
                                <Text style={{marginLeft:20*s}}>举报</Text>
                            </TouchableOpacity>   
                        </View> */}
                        <TouchableOpacity 
                        style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:90*s,width:width}}
                        onPress={this._edit_false}>
                            <Text>取消</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={{paddingLeft:'5%',paddingRight:'5%',backgroundColor:'#FFF',
                alignItems:'center',flexDirection:'row',justifyContent:'space-between',height:90*s}}>
                    {/* 返回 */}
                    <TouchableOpacity style={{width:'15%'}} onPress={()=>{Actions.pop(this.props.refresh())}}>
                        <Icon size={40*s} style={{color:'#000'}} name='left'/>
                    </TouchableOpacity>
                    {/* 目录 */}
                    
                        {this.state.look==this.state.favorite.uid?
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                            style={{marginRight:10*s}}
                            onPress={() => this.drawer && this.drawer.openDrawer()}>
                                <Icon size={40*s} style={{color:'#000'}} name='bars'/>
                            </TouchableOpacity>   
                    
                            <TouchableOpacity onPress={this._edit}>
                                <Icon size={40*s} style={{color:'#000'}} name='ellipsis1'/>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => this.drawer && this.drawer.openDrawer()}>
                            <Icon size={40*s} style={{color:'#000'}} name='bars'/>
                        </TouchableOpacity>   
                        }
                        
                                                
                </View>
                {/* 收藏夹信息 */}
                <View style={{backgroundColor:'#FFF',paddingTop:10*s,paddingLeft:20*s,paddingRight:20*s}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={{padding:10*s}}>
                            <Image style={{width:150*s,height:150*s,marginRight:10*s}} source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.favorite.faimage }}/>
                        </View>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize:25*s}}>{this.state.favorite.favoritename}</Text>
                              {
                                this.state.favorite.fhide==1?
                                <Icon1 name='lock' color='grey' size={25*s}/>
                                :
                                <Text></Text>
                            } 
                            <Text style={{fontSize:20*s,color:'#666666'}}>{this.state.favorite.fnum}个内容</Text>
                            <View style={{flexDirection:'row',alignItems:'center',height:70*s,justifyContent:'center'}}>
                                <Image style={{width:44*s,height:44*s,marginRight:10*s,borderRadius:22*s}} source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.favorite.uimage }}/>
                                <Text style={{fontSize:20*s}}>{this.state.favorite.uname}</Text>
                            </View>
                        </View>
                        
                    </View>
                    <View>
                        
                    {
                        this.state.favorite.fadescribe==''?
                        <View></View>
                        :
                        <View>
                            <Text>描述详情</Text>
                            <Text style={{color:'#666666'}}>{this.state.favorite.fadescribe}</Text>
                        </View>
                    }
                    </View>
                </View>
                {/* 素材列表 */}
                {/* 未实现跳转到指定位置 */}
                {/* <ScrollView ref={(view) => { this.myScrollView = view; }}>
                {
                    this.state.favoritelist.map(data=>(
                        data.mimage===''?
                                <View 
                                onLayout={event=>{this.layoutY = event.nativeEvent.layout.y}}
                                style={{alignItems:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                                height:200*s,borderRadius:10*s,padding:20*s}}>
                                    <TouchableOpacity onPress={()=>{Actions.popular({mid:data.mid})}}>
                                        <Text>{data.mtitle}</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                                height:360*s,borderRadius:10*s,padding:20*s}}>
                                    <TouchableOpacity onPress={()=>{Actions.popular({mid:data.mid})}}>
                                        <Image style={{width:'100%',height:250*s}} source={{uri:'http://116.62.14.0:8402/images/'+data.mimage}}/>
                                        <Text>{data.mtitle}</Text>
                                    </TouchableOpacity>
                                </View>
                    ))
                }
                </ScrollView> */}
                <FlatList
                        style={{marginBottom:270*s}}
                        data={this.state.favoritelist}
                        ListEmptyComponent={() => {
                            // if (error) {
                            //   return (
                            //     <TouchableOpacity
                            //       style={{ flex: 1 }}
                            //       onPress={() => this._refresh()}
                            //       activeOpacity={0.6}>
                            //       <Text style={{ textAlign: 'center' }}>{error} 点击重试</Text>
                            //     </TouchableOpacity>
                            //   )
                            // } else {
                              return <View style={{ height: 150*s, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>暂无数据</Text>
                              </View>
                            // }
                          }}
                        numColumns={1}
                        renderItem={({item})=>(
                           item.istrue==0?(
                                item.mimage===''?

                                <View style={{backgroundColor: '#F4F4F4',alignItems:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                                height:200*s,borderRadius:10*s,padding:20*s}}>
                                    <TouchableOpacity onPress={()=>{Actions.popular({mid:item.mid})}}>
                                        <Text>{item.mtitle}</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                (item.mimage.split('.')[1] === 'mp4' ?
                                <View style={{backgroundColor: '#F4F4F4',alignItems:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                                height:200*s,borderRadius:10*s,padding:20*s}}>
                                    <TouchableOpacity onPress={()=>{Actions.popular({mid:item.mid})}}>
                                        <Text>{item.mtitle}</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{backgroundColor: '#F4F4F4',backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                                height:360*s,borderRadius:10*s,padding:20*s}}>
                                    <TouchableOpacity onPress={()=>{Actions.popular({mid:item.mid})}}>
                                        <Image style={{width:'100%',height:250*s}} source={{uri:'http://116.62.14.0:8402/images/'+item.mimage}}/>
                                        <Text>{item.mtitle}</Text>
                                    </TouchableOpacity>
                                </View>
                                )
                           ):(
                            item.mimage===''?

                            <View style={{backgroundColor: '#F4F4F4',alignItems:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                            height:200*s,borderRadius:10*s,padding:20*s}}>
                                {/* <Text>技法</Text> */}
                                <TouchableOpacity onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                    
                                    <Text>{item.truetitle}</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{backgroundColor: '#F4F4F4',backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                                height:360*s,borderRadius:10*s,padding:20*s}}>
                                    <TouchableOpacity onPress={()=>{Actions.paperdetail({mid:item.mid})}}>
                                        <Image style={{width:'100%',height:250*s}} source={{uri:'http://116.62.14.0:8402/images/'+item.mimage}}/>
                                        <Text>{item.truetitle}</Text>
                                    </TouchableOpacity>
                                </View>
                           )
                        )}
                        />
            </View>
            </Drawer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF'
      },
    container1: {
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
      cover1: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#F0F0F0'
    },
})
