import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level:this.props.level,
            title1: '',
            bgcolor: '',
            // update:this.props.update
        }
    }
    componentDidMount() {
        if(this.state.level == 'lv1') {
            this.setState({title1 : '白话八股 lv1',bgcolor: '#9370DB'})
        } else if(this.state.level == 'lv2') {
            this.setState({title1 : '不蔓不枝 lv2',bgcolor: '#ADD8E6'})
        } else if(this.state.level == 'lv3') {
            this.setState({title1 : '行云流水 lv3',bgcolor: '#BA55D3'})
        } else if(this.state.level == 'lv4') {
            this.setState({title1 : '字字珠玑 lv4',bgcolor: '#9ec87e'})
        } else if(this.state.level == 'lv5') {
            this.setState({title1 : '蹙金结绣 lv5',bgcolor: '#48D1CC'})
        } else {
            if(this.state.level==''){
                this.setState({title1 : '',bgcolor: '#F08080'})

            }else{
                this.setState({title1 : '妙笔生花 lv6',bgcolor: '#F08080'})

            }
        } 
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={{flexDirection:'row',backgroundColor:this.state.bgcolor,width: 95*s,height: 25*s,borderRadius:5*s,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:15*s,color:'#fff',lineHeight: 30*s, textAlign:'center'}}>{this.state.title1}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

