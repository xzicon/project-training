import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, ToastAndroid, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import RichTextView from './RichTextView'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, scale ,height} = Dimensions.get('window');
const s = width / 640;

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

export default class AddEssay extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      uid: '',
      atitle: '',
      atag: '',
      inputValue: '',
      utime: '',
      aimage: '',
      imageUrl: '',
      flag: '1',
      mid:this.props.mid,
      mtitle:'',
      truetitle:'',
      update:false
    })
  }
  componentDidMount() {
    AsyncStorage.getItem('uid')
      .then((res) => {
        res === null ?
          this.setState({ uid: '' })
          :
          this.setState({ uid: res },()=>{
            if(this.state.mid!=undefined){
              this.getMaterial()

            }
          })
      })
     
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps')
   this.setState({update:nextProps.update,mid:nextProps.mid,mtitle:nextProps.mtitle,truetitle:nextProps.truetitle})
  }

  getMaterial = () => {
    fetch('http://116.62.14.0:8402/material/xiang/' + this.state.mid + '/' + this.state.uid)
        .then((res) => res.json())
        .then((res) => {
            console.log(res.data)
            this.setState({ mtitle: res.data[0].mtitle ,truetitle:res.data[0].truetitle});
        })
  }
  select_material=()=>{
    if(this.state.mid==undefined){
      Actions.materiallist();
    }else if(this.state.update==true){
      Actions.materiallist();
    }
  }
  select_material_ok=(mid,mtitle,truetitle)=>{
    console.log(mid,mtitle,truetitle)
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
                  console.log(res.status);
                  console.log(res.data);
                  this.setState({
                    aimage:res.data
                  })
                
                })
            });
        }
    });
  }
  add1 = (isgrade) => {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    console.log(date);
    console.log(date.getHours())
    // console.log(moment().format('YYYY-MM-DD 00:00:00'));
    // if (this.props.inputValue === '') {
    //   ToastAndroid.show('请输入作文内容', 100)
    // } else if (this.state.props.length >= 2500) {
    //   ToastAndroid.show('作文内容字数超出限制', 100)
    // }
    // else {
      let data = {
        atitle: this.props.atitle,
        atag: this.props.atag,
        acontent: this.props.acontent,
        uid: Number(this.props.uid),
        utime: Y + M + D + h + m,
        aimage: this.props.aimage,
        mid: this.props.mid
      }
      fetch('http://116.62.14.0:8402/aud/addarticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then((res) => {
          console.log(res)
          if (res.status == 0) {
            this.setState({
              aid:res.data
            },()=>{
              if(isgrade==true){
                this.grade(res.data,this.state.select_tid,this.state.uclass,data.atitle,data.acontent,data.uid);
              }else{
                ToastAndroid.show('积分+5,经验值+15', 100);
                Actions.popTo('home');
                setTimeout(()=> {
                    Actions.refresh({refresh:1})
                },100);
              }
            })
          } else {
            ToastAndroid.show('发布失败', 100)
          }

        })
  }
  add = () => {
    if(this.state.atitle == ''){
      ToastAndroid.show('请输入作文标题', 100)
    }
    else if (this.state.inputValue == '') {
      ToastAndroid.show('请输入作文内容', 100)
    } else if (this.state.inputValue.length >= 2500) {
      ToastAndroid.show('作文内容字数超出限制', 100)
    }
    // else if (this.state.inputValue.length < 300) {
    //   ToastAndroid.show('作文内容不足300字', 100)
    // }
    else {
      var date = new Date();
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
      
      
      const data={
        atitle: this.state.atitle,
        atag: this.state.atag,
        acontent: this.state.inputValue,
        uid: this.state.uid,
        aimage: this.state.aimage,
        mid: this.state.mid==undefined?null:this.state.mid,
        utime: Y + M + D + h + m,
      }
      fetch('http://116.62.14.0:8402/aud/addarticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then((res) => {
          console.log(res)
          if (res.status == 0) {
            this.setState({
              aid:res.data
            },()=>{
              this.setState({
                atitle:'',
                inputValue:'',
                aimage:'',
                imageUrl: '',
              },()=>{
                ToastAndroid.show('发布成功，积分+5,经验值+15', 100);
                // Actions.teacher1({atitle: data.atitle,
                //   acontent: data.acontent,
                //   uid: data.uid,
                //   aid:this.state.aid
                //   });
                Actions.popTo('home');
              }
              )}
            )
                
          }
        })
      
      
      
  }
}

  atitle = (atitle) => {
    if (atitle.length >= 25) {
      ToastAndroid.show('标题超出字数限制', 10)
    } else {
      this.setState({ atitle: atitle })
    }
  }

  back = ()=>{
    this.setState({
      atitle:'',
      inputValue:'',
      aimage:'',
      imageUrl: '',
      mid:undefined,
      mtitle:'',
      truetitle:'',
    },()=>{Actions.pop()})
    
  }
  render() {
    return (
      <View style={{ flex: 1 ,backgroundColor:'#FFF'}}>
        <View style={{ height: 80 * s, marginBottom: 5, padding:15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff' }}>
          <View style={{
            width: 60, height: 50 * s,
            
            justifyContent: 'center', alignItems: 'center',
          }}>
            <TouchableOpacity onPress={()=>this.back()}>
              <Image 
              style={{width:30*s,height:30*s}}
              source={require('../../assets/composition/add/x.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{ width: '60%' }}></View>
          <View style={{
            width: 60, height: 50 * s,
            borderWidth: 1, borderColor: 'red', borderRadius: 15 * s,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={()=>{this.add()}}>
              <Text>确认发布</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TextInput
          style={{ width:'98%',marginLeft:'1%',backgroundColor: '#FFF', padding: 10,fontSize:26*s  }}
          placeholder="输入作文标题~"
          placeholderTextColor="gray"
          onChangeText={this.atitle}
          maxLength={50}
          value={this.state.atitle}
        />
       
        <View style={{width:'98%',marginTop:'0.5%',marginLeft:'1%',}}>
          <ScrollView>
            <RichTextView
              style={{ height:300, backgroundColor: '#FFF', marginBottom: 0, paddingBottom: 0 }}
              inputStyle={{ padding: 10 ,fontSize:25*s}}
              placeholder="在此输入作文内容"
              value={this.state.inputValue}
              minHeight={300}
              maxLength={2500}
              onChangeText={(inputValue) => {
                this.setState({ inputValue: inputValue })
              }}
              showCount={true} // 展示剩余文字, 默认为true
            />
          </ScrollView>
        </View>
        <View style={{width:'98%',marginLeft:'1%',
          marginTop:'0.5%',
          paddingLeft:'3%',paddingRight:'3%',
          alignItems: 'center', flexDirection: 'row', backgroundColor: '#FFF',
          borderTopWidth:1/scale,borderBottomWidth:1/scale,
          borderColor:'#F0F0F0',
          height:90*s
        }}>
          <Text style={{ padding: 5 }}>#</Text>
          <TextInput placeholder="标签" placeholderTextColor="#5a6d95"
            style={{fontSize:20*s,color:'#5a6d95'}}
            onChangeText={(atag) => {
              this.setState({ atag: '#' + atag })
            }}
          />
        </View>
        <TouchableOpacity 
        onPress={()=>{this.select_material()}}
        style={{width:'98%',marginLeft:'1%',
          marginTop:'0.5%',
          paddingLeft:'3%',paddingRight:'3%',
          alignItems: 'center', flexDirection: 'row', backgroundColor: '#FFF',
          borderTopWidth:1/scale,borderBottomWidth:1/scale,
          borderColor:'#F0F0F0',
          height:90*s,
          justifyContent:'space-between'
        }}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image 
                style={{width:30*s,height:30*s,marginRight:10*s}}
                source={require('../../assets/composition/add/sucai.png')}/>
            <Text style={{width:width-100*s,color:'#5a6d95'}} numberOfLines={1} ellipsizeMode='middle'>{(this.state.mtitle==''&&this.state.truetitle=='')?'参与素材话题':(this.state.mtitle==''?this.state.truetitle:this.state.mtitle)}</Text>
          </View>
          <Icon name='right' size={28*s} color={'#666'}/>
        </TouchableOpacity>
        <View style={{width:'98%',height:240*s,marginTop:'0.5%',marginLeft:'1%',backgroundColor:'#fff'}}>
          {this.state.aimage===''?
            <TouchableOpacity onPress={() => { this.takephoto() }}>
                <Image style={{width:200*s,height:200*s,margin:'4%'}} source={require('../../assets/composition/essay/pic.png')}/>
            </TouchableOpacity>
            :
            <Image style={{ width: 200*s, height:200*s,margin:'4%'}}
            source={{uri:'http://116.62.14.0:8402/images/'+this.state.aimage}}
            />
          }
        </View>
        
      </View>
    )
  }
}
 