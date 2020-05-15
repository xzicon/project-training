import React, { Component } from 'react'
import { Text, View ,Dimensions,StyleSheet, ScrollView,AsyncStorage, TextInput, Image, TouchableOpacity, ToastAndroid} from 'react-native'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const s = width / 640;

const skilllevel = [
    {
        skilllevel:'初中',
        img:require('../../assets/composition/teacher/selected.png')
    },
    {
        skilllevel:'高中',
        img:require('../../assets/composition/teacher/select.png')
    }
];
const skilltrue = [
    {
        skilltrue:'是',
        img:require('../../assets/composition/teacher/selected.png')
    },
    {
        skilltrue:'否',
        img:require('../../assets/composition/teacher/select.png')
    }
];
const skilltype = [
    {
        skilltype:'记叙文',
        img:require('../../assets/composition/teacher/selected.png')
    },
    {
        skilltype:'议论文',
        img:require('../../assets/composition/teacher/select.png')
    },
    {
        skilltype:'说明文',
        img:require('../../assets/composition/teacher/select.png')
    },
    {
        skilltype:'书信',
        img:require('../../assets/composition/teacher/select.png')
    },
    {
        skilltype:'诗歌',
        img:require('../../assets/composition/teacher/select.png')
    },
];
const options = {
    title: '请选择',
    cancelButtonTitle: "取消",
    takePhotoButtonTitle: "拍照",
    chooseFromLibraryButtonTitle: "选择相册",
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
  };
export default class UpdateSkill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: '',
            sid:this.props.sid,
            skilllevel:'',
            skilltrue:1,
            skilltype:'',
            skilltitle:'',
            skillimage:''
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('tid')
        .then((res) => {
            res === null ?
                this.setState({ tid: '' })
                :
                this.setState({ tid: res },()=>{this.all()})
                console.log(this.state.tid)
                
                
        })
    }
    all=()=>{
        fetch('http://116.62.14.0:8402/skill/detail/' + this.state.sid)
            .then((res) => res.json())
            .then((res) => {
                if(res.status==0){
                    this.setState({ 
                        skill_detail:res.data,
                        skilllevel:res.data.skilllevel,
                        skilltrue:res.data.skilltrue,
                        skilltype:res.data.skilltype,
                        skilltitle:res.data.skilltitle,
                        skillimage:res.data.skillimage
                      })
                }else{
                    console.log('error')
                }
                console.log(res.status);
            })
        
    }
    select=(con,index)=>{
        if(con=='skilllevel'){
            this.setState({
                skilllevel:skilllevel[index].skilllevel,
            })
            skilllevel.forEach((v,k)=>{
                v.img=k==index?require('../../assets/composition/teacher/selected.png'):require('../../assets/composition/teacher/select.png');
            })
        }else if(con=='skilltrue'){
            this.setState({
                skilltrue:skilltrue[index].skilltrue=='是'?1:0,
            })
            skilltrue.forEach((v,k)=>{
                v.img=k==index?require('../../assets/composition/teacher/selected.png'):require('../../assets/composition/teacher/select.png');
            })
        }else if(con=='skilltype'){
            this.setState({
                skilltype:skilltype[index].skilltype,
            })
            skilltype.forEach((v,k)=>{
                v.img=k==index?require('../../assets/composition/teacher/selected.png'):require('../../assets/composition/teacher/select.png');
            })
        }
    }
    nextstep=()=>{
        if(this.state.skilltitle==''){
            ToastAndroid.show('请输入标题',100);
        }else{
            Actions.updateskillcontent({sid:this.state.skill_detail.sid,skillcontent:this.state.skill_detail.skillcontent,tid:this.state.tid,skilllevel:this.state.skilllevel,skilltrue:this.state.skilltrue,skilltype:this.state.skilltype,skilltitle:this.state.skilltitle,skillimage:this.state.skillimage})
        }
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
                        body: formData
                    }).then(res=>res.json())
                    .then(res=>{
                      console.log(res.status);
                      console.log(res.data);
                      this.setState({
                        skillimage:res.data
                      })
                    })
                });
            }
        });
      }
    render() {
        return (
            <View style={styles.container}>
                {/* tab */}
                <View style={{height:90*s,alignItems:'center',backgroundColor:'#F0F0F0',flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:55*s,borderRadius:15*s,width:100*s,margin:10*s}}><Text style={{}} onPress={()=>{Actions.pop()}}>取消</Text></View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize:25*s}}>发布技法</Text>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'red',height:55*s,color:'#FFF',borderRadius:15*s,width:100*s,margin:10*s}}><Text style={{color:'#FFF'}} onPress={()=>{this.nextstep()}}>下一步</Text></View>
                </View>
                {/* 标题 */}
                <TextInput 
                value={this.state.skilltitle}
                autoFocus={true}
                style={{marginLeft:10*s,width:'100%',borderRadius:10*s,height:90*s,fontSize:25*s,marginTop:25*s}}
                placeholder={'请输入标题'}
                autoFocus={true}
                textAlignVertical={'top'}
                onChangeText={(skilltitle)=>{
                    this.setState({
                        skilltitle:skilltitle
                    })
                }}
                />
                {/* 背景图 */}
                <TouchableOpacity onPress={() => { this.takephoto() }}>
                    {
                        this.state.skillimage==''?
                        <Image style={{width:200*s,height:200*s,marginLeft:30*s}} source={require('../../assets/composition/teacher/add.png')}/>
                        :
                        <Image style={{ height:300*s,width:'70%',marginLeft:30*s}}
                        source={{uri:'http://116.62.14.0:8402/images/'+this.state.skillimage}}
                        />
                    }
                    
                </TouchableOpacity>
                <View style={{marginTop:50*s,paddingLeft:'4%'}}>
                    <Text style={{fontSize:15*s,marginBottom:10*s}}>请选择初高中</Text>
                    <View style={{flexDirection:'row',marginBottom:15*s}}>
                        {
                            skilllevel.map((item,index)=>{
                                return(
                                <TouchableOpacity onPress={()=>{this.select('skilllevel',index)}} style={{flexDirection:'row',alignItems:'center',marginRight:20*s}}>
                                    <Image style={{width:23*s,height:23*s,marginRight:5*s}} source={item.img}/>
                                    <Text>{item.skilllevel}</Text>
                                </TouchableOpacity>)
                            })
                        }
                    </View>
                    <Text style={{fontSize:15*s,marginBottom:10*s}}>请选择是否真题</Text>

                    <View style={{flexDirection:'row',marginBottom:15*s}}>
                        {
                            skilltrue.map((item,index)=>{
                                return(
                                <TouchableOpacity onPress={()=>{this.select('skilltrue',index)}} style={{flexDirection:'row',alignItems:'center',marginRight:20*s}}>
                                    <Image style={{width:25*s,height:25*s,marginRight:5*s}} source={item.img}/>
                                    <Text>{item.skilltrue}</Text>
                                </TouchableOpacity>)
                            })
                        }
                    </View>
                    <Text style={{fontSize:15*s,marginBottom:10*s}}>请选择类型</Text>

                    <View style={{flexDirection:'row',marginBottom:15*s}}>
                        {
                            skilltype.map((item,index)=>{
                                return(
                                <TouchableOpacity onPress={()=>{this.select('skilltype',index)}} style={{flexDirection:'row',alignItems:'center',marginRight:20*s}}>
                                    <Image style={{width:25*s,height:25*s,marginRight:5*s}} source={item.img}/>
                                    <Text>{item.skilltype}</Text>
                                </TouchableOpacity>)
                            })
                        }
                    </View>                   
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF'
    },

})