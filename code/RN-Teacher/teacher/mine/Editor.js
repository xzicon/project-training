import React, { Component } from 'react';

import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, StatusBar, AsyncStorage,ToastAndroid,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

const options = {
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const tsex_select = [
    [
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 0,
      },
    ],
  ];
export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tid:'',
            imageUrl: '',
            flag: '1',
            modal_tsex:false,
        };
        /*this.onChange = value => {
            this.setState({
                tsex:value
            });
        };*/
        
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
          .then((res) => {
            res === null ?
              this.setState({ tid: '' })
              :
              this.setState({ tid: res })
              this.mine();
              console.log(this.state.data)
          });
        
        // AsyncStorage.getItem('imgurl').then((res) => {
        //   if (res !== null) {
        //     this.setState({
        //       imageUrl: JSON.parse(res),
        //       flag: '2'
        //     });
        //   }
        // });
    }
    mine = () => {
        fetch('http://116.62.14.0:8402/teacher/personal/' + this.state.tid )
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              data: res.data,
              
            });
            //console.log(this.state.timage);
            console.log(res.data);
          })
      }
    /*_tsex=()=>{
        this.setState({
            modal_tsex:true
        })
    }
    _tsex_false=()=>{
        this.setState({
            modal_tsex:false
        })
    }
    _tsex_change=()=>{
        let data = {
            tsex:Number(this.state.tsex),
            tid:this.state.tid
        }
        fetch('http://116.62.14.0:8402/teacher/modify/tsex',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.status)
            switch(data.status){
                case "0":{
                    this.setState({
                        modal_tsex:false
                    })
                    break;
                }
                case "-2":{
                    ToastAndroid.show("tid错了",100);
                    break;
                }
                default:{
                    break;
                }
            }
        })
        
    }
    tnamehandle=(text)=>{
        this.setState({tname:text})
    }*/

      takephoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            return;
          } else if (response.error) {
            console.log('Error:', response.error);
          } else if (response.customButton) {
            console.log('custom:', response.customButton);
          } else {
            const source = { uri: response.uri };
            this.setState({
              imageUrl: source,
              flag: '2'
            });
            AsyncStorage.setItem('imgurl', JSON.stringify(source), (err) => { });
          }
        });
      }
    render() {
        console.log(this.state.data);
        return (
            <View>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                        <Icon name="left" color="#333" size={40 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.3 }}>基本信息</Text>
                    </View>
                </View>
                

                <View style={{ backgroundColor: "white", width: width * 0.96, marginTop: 15 / scale, marginLeft: '2%', marginRight: '2%' }}>
                    <TouchableOpacity  style={{ width: width * 0.96, height: 70 * s,flexDirection: 'row',alignItems:'center' ,justifyContent:'space-between', backgroundColor: 'white',marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray', }}>
                        <Text style={{width:'20%',fontSize: 26 * s,paddingLeft:'5%'}}>头像：</Text>
                        <View style={{width:'15%',flexDirection: 'row',justifyContent:'space-between',alignItems:'center',marginRight:5}}>
                          <Image
                              source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.data.timage }}
                              style={{ width: 50 * s, height: 50 * s, borderRadius: 70 * s,}}
                          />
                          <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity  style={{ width: width * 0.96, height: 70 * s,flexDirection: 'row',alignItems:'center' ,justifyContent:'space-between', backgroundColor: 'white', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray', }}>
                        <Text style={{width:'20%',fontSize: 26 * s,paddingLeft:'5%'}}>姓名：</Text>
                        <View style={{width:'55%',flexDirection: 'row',justifyContent:'flex-end',alignItems:'center',marginRight:5,overflow:'hidden',}}>
                            <Text style={{fontSize: 26 * s,overflow:'hidden',marginRight:5,}}>{this.state.data.tname}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ }} />
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._tsex} style={{ width: width * 0.96, height: 70 * s,flexDirection: 'row',alignItems:'center' ,justifyContent:'space-between', backgroundColor: 'white', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray', }}>
                        <Text style={{width:'20%',fontSize: 26 * s,paddingLeft:'5%'}}>性别：</Text>
                        <View style={{width:'12%',flexDirection: 'row',justifyContent:'space-between'}}>
                            <Text style={{ fontSize: 26 * s,}}>{this.state.data.tsex}男</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ }} />
                        </View>
                        
                    </TouchableOpacity>
                    {/* <Modal
                    style={styles.container}
                    animationType='silde'
                    onRequestClose={this._tsex_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.modal_tsex}
                >
                    <TouchableOpacity style={styles.cover} 
                    onPress={this._tsex_false}>
                    </TouchableOpacity>
                    <View style={{backgroundColor:'#FFF',position:'absolute',bottom:0,right:0,left:0,flexDirection:'row',padding:20*s,justifyContent:'space-around'}}>
                        <View style={{width:'90%'}}>
                            <TouchableOpacity onPress={this._tsex_change}><Text>确认</Text></TouchableOpacity>
                            <PickerView
                                onChange={this.onChange}
                                value={this.state.tsex}
                                data={tsex_select}
                                cascade={false}
                            />
                        </View>
                        
                    </View>
                </Modal> */}
                    <TouchableOpacity  style={{ width: width * 0.96, height: 70 * s,flexDirection: 'row',alignItems:'center' ,justifyContent:'space-between', backgroundColor: 'white', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray', }}>
                        <Text style={{width:'20%',fontSize: 26 * s,paddingLeft:'5%'}}>学校：</Text>
                        <View style={{width:'55%',flexDirection: 'row',justifyContent:'flex-end',alignItems:'center',marginRight:5,overflow:'hidden',}}>
                            <Text style={{fontSize: 26 * s,overflow:'hidden',marginRight:5,}}>{this.state.data.tschool}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ }} />
                        </View>
                        
                    </TouchableOpacity>

                    <TouchableOpacity  style={{ width: width * 0.96, height: 70 * s,flexDirection: 'row',alignItems:'center' ,justifyContent:'space-between', backgroundColor: 'white', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray', }}>
                        <Text style={{width:'20%',fontSize: 26 * s,paddingLeft:'5%'}}>年级：</Text>
                        <View style={{width:'55%',flexDirection: 'row',justifyContent:'flex-end',alignItems:'center',marginRight:5,overflow:'hidden',}}>
                            <Text style={{fontSize: 26 * s,overflow:'hidden',marginRight:5,}}>{this.state.data.tyear}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ }} />
                        </View>
                        
                    </TouchableOpacity>

                    <TouchableOpacity  style={{ width: width * 0.96, height: 70 * s,flexDirection: 'row',alignItems:'center' ,justifyContent:'space-between', backgroundColor: 'white', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray', }}>
                        <Text style={{width:'20%',fontSize: 26 * s,paddingLeft:'5%'}}>区域：</Text>
                        <View style={{width:'55%',flexDirection: 'row',justifyContent:'flex-end',alignItems:'center',marginRight:5,overflow:'hidden',}}>
                            <Text style={{fontSize: 26 * s,overflow:'hidden',marginRight:5,}}>{this.state.data.tarea}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ }} />
                        </View>
                        
                    </TouchableOpacity>

                    <TouchableOpacity  style={{ width: width * 0.96, height: 70 * s,flexDirection: 'row',alignItems:'center' ,justifyContent:'space-between', backgroundColor: 'white', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray', }}>
                        <Text style={{width:'20%',fontSize: 26 * s,paddingLeft:'5%'}}>教龄：</Text>
                        <View style={{width:'55%',flexDirection: 'row',justifyContent:'flex-end',alignItems:'center',marginRight:5,overflow:'hidden',}}>
                            <Text style={{fontSize: 26 * s,overflow:'hidden',marginRight:5,}}>{this.state.data.tage}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ }} />
                        </View>
                        
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  input:{
      borderBottomColor:'#ccc',
      borderBottomWidth:1,
      width:260,
      marginLeft:10
  },
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