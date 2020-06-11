import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon, Button } from '@ant-design/react-native';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

const {width,scale} = Dimensions.get('window');
const s = width / 640;

const options = {
    title: '请选择',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    // quality: 0.8,
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "选择相册",
            // allowsEditing: true,
            // noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
  };

export default class Tidentify extends Component {
    constructor(props) {
        super(props);
        this.state = ({
          tid: '',
          imageUrl:'',
          tshow: '',
          tidentityfront:'',
          tidentityback:'',
          flag: '1' 
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
          .then((res) => {
            res === null ?
              this.setState({ tid: '1' })
              :
              this.setState({ tid: res })

            //   fetch('http://116.62.14.0:8402/teacher/personal/' + this.state.tid )
            //         .then((res) => res.json())
            //         .then((res) => {
            //             this.setState({ data: res.data });
            //             console.log(res.data);
            //         })
          })
          
    }
    takephoto = (e) => {
        var formData = new FormData();
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                const file={uri: response.uri, type: response.type, name: response.fileName};
                formData.append('image', file);
                this.setState({
                    imageUrl: source.uri,
                }, () => {
                    fetch('http://116.62.14.0:8402/upload', {
                        method: 'POST',
                        // mode:"cors",          
                        body: formData
                    }).then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                    // console.log(res.status);
                    // console.log(res.data);
                    this.setState({
                        tshow:res.data
                    })
                    })
                });
            }
        });
        
    }
    takephoto2 = (e) => {
        var formData = new FormData();
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                const file={uri: response.uri, type: response.type, name: response.fileName};
                formData.append('image', file);
                this.setState({
                    imageUrl: source.uri,
                }, () => {
                    fetch('http://116.62.14.0:8402/upload', {
                        method: 'POST',
                        // mode:"cors",          
                        body: formData
                    }).then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                    // console.log(res.status);
                    // console.log(res.data);
                    this.setState({
                        tidentityfront:res.data
                    })
                    })
                });
            }
        });
        
    }
    takephoto3 = (e) => {
        var formData = new FormData();
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                const file={uri: response.uri, type: response.type, name: response.fileName};
                formData.append('image', file);
                this.setState({
                    imageUrl: source.uri,
                }, () => {
                    fetch('http://116.62.14.0:8402/upload', {
                        method: 'POST',
                        // mode:"cors",          
                        body: formData
                    }).then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                    // console.log(res.status);
                    // console.log(res.data);
                    this.setState({
                        tidentityback:res.data
                    })
                    })
                });
            }
        });
    }
    push = ()=>{
        let data = {
            tid: this.state.tid,
            tshow:this.state.tshow,
            tidentityfront:this.state.tidentityfront,
            tidentityback:this.state.tidentityback
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/teacher/tshow/ispass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                switch (data.status) {
                    case "0": {
                        console.log(data.data);
                        ToastAndroid.showWithGravity('提交认证成功!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        Actions.pop();
                        break;
                    }
                    default: {
                        console.log(data.data);
                        break;
                    }
                }
            })
    }
    render() {
        
        return (
            <ScrollView style={{backgroundColor:'#fff'}}>
                
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                        <Icon name="left" color="#333" size={40 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 30 * s, left: width * 0.3 }}>师资认证</Text>
                    </View>
                </View>
                <Text style={{marginLeft:'5%',fontSize:22*s}}>请提交您的以下证件，确保真实性，头像及文字清晰可见</Text>
                <TouchableOpacity onPress={() => { this.takephoto() }} style={{height:240*s,backgroundColor:'#fff',marginTop:'2%'}}>
                    {this.state.tshow === ''?
                    <Image  source={require('../../assets/composition/mine/jiaoshizigezheng.png')} style={{width:'100%',height:'100%'}} />
                    :<Image style={{ width: '80%', height:'100%',marginLeft:'10%'}} source={{uri:'http://116.62.14.0:8402/images/'+this.state.tshow}}/>
                    }
                        
                </TouchableOpacity>
                <View style={{width:'100%',height:30*s,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                    <Text style={{fontSize:20*s}}>上传教师资格证</Text>
                </View>
                <TouchableOpacity onPress={() => { this.takephoto2() }}  style={{height:240*s,backgroundColor:'#fff',marginTop:'2%'}}>
                    {this.state.tidentityfront ===''?
                    <Image  source={require('../../assets/composition/mine/jiaoshizigezheng.png')} style={{width:'100%',height:'100%'}} />
                    :<Image style={{ width: '80%', height:'100%',marginLeft:'10%'}} source={{uri:'http://116.62.14.0:8402/images/'+this.state.tidentityfront }}/>
                    }
                </TouchableOpacity>
                <View style={{width:'100%',height:30*s,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                    <Text style={{fontSize:20*s}}>上传身份证正面</Text>
                </View>
                <TouchableOpacity onPress={() => { this.takephoto3() }} style={{height:240*s,backgroundColor:'#fff',marginTop:'2%'}}>
                {this.state.tidentityback ===''?
                    <Image  source={require('../../assets/composition/mine/jiaoshizigezheng.png')} style={{width:'100%',height:'100%'}} />
                    :<Image style={{ width: '80%', height:'100%',marginLeft:'10%'}} source={{uri:'http://116.62.14.0:8402/images/'+this.state.tidentityback }}/>
                    }
                </TouchableOpacity>
                <View style={{width:'100%',height:30*s,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                    <Text style={{fontSize:20*s}}>上传身份证背面</Text>
                </View>
                {this.state.tshow===''|| tidentityfront==='' || tidentityback===''?
                <TouchableOpacity onPress={() => {ToastAndroid.showWithGravity('图片不能为空!', ToastAndroid.SHORT, ToastAndroid.CENTER);}} style={{width:'100%',height:100*s,backgroundColor:'#fff',justifyContent: 'center',alignItems: 'center',marginTop:'3%'}}>
                    <View style={{width:'70%',height:'70%',alignItems:'center',justifyContent:'center',backgroundColor:'blue',borderRadius:30*s}}>
                        <Text style={{fontSize:26*s,color:'#fff'}}>提交</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => { this.push() }} style={{width:'100%',height:100*s,backgroundColor:'#fff',justifyContent: 'center',alignItems: 'center',marginTop:'3%'}}>
                    <View style={{width:'70%',height:'70%',alignItems:'center',justifyContent:'center',backgroundColor:'blue',borderRadius:30*s}}>
                        <Text style={{fontSize:26*s,color:'#fff'}}>提交</Text>
                    </View>
                </TouchableOpacity>
                }
                
            </ScrollView>
        )
    }
}
