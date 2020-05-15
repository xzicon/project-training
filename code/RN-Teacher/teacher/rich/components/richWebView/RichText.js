/*
 * @Descripttion: 编辑器工具栏
 * @version: 
 * @Author: liyamei
 * @Date: 2019-11-11 18:46:15
 * @LastEditors: liyamei
 * @LastEditTime: 2019-11-14 14:35:46
 */

import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { actions } from './const';
import PropTypes from 'prop-types';


const ScreenWidth = Dimensions.get("window").width;
const defaultActions = [
    
    actions.saveAs//保存

];

function getDefaultIcon() {
    const texts = {};
    
    texts[actions.saveAs] = '\ue6cf';
    return texts;
}


export default class RichText extends Component {


    constructor(props) {
        super(props);
        const actions = this.props.actions ? this.props.actions : defaultActions;
        this.state = {
            editor: undefined,
            selectedItems: [],
            actions,
            data: this.getRows(actions, []),
            selectFontColor: props.iconTint,//字体颜色选中的颜色值
            selectFontSize: 0,//字体颜色选中的颜色值
            selectToolName: '',
            selectHeading:'',//标题选中的值
            selectTextAlign:'',
            selecteHiliteColor:props.iconTint
        };
    }

    


    UNSAFE_componentWillReceiveProps(newProps) {
        const actions = newProps.actions ? newProps.actions : defaultActions;
        this.setState({
            actions,
            data: this.getRows(actions, this.state.selectedItems)
        });
    }

    getRows(actions, selectedItems) {
        //console.log(selectedItems)
        return actions.map((action) => { return { action, selected: selectedItems.includes(action) }; });
    }

    componentDidMount() {
        const editor = this.props.getEditor();
        if (!editor) {
            throw new Error('Toolbar has no editor!');
        } else {
            editor.registerToolbar((selectedItems) => this.setSelectedItems(selectedItems));
            this.setState({ editor });
        }
    }

    setSelectedItems(selectedItems) {
        //console.log(selectedItems)
        if (selectedItems !== this.state.selectedItems) {
            this.setState({
                selectedItems,
                data: this.getRows(this.state.actions, selectedItems)
            });
        }
    }

    /**
     *获取图标
     *
     * @param {*} action
     * @returns
     * @memberof RichToolbar
     */
    _getButtonIcon(action) {
        if (this.props.iconMap && this.props.iconMap[action]) {
            return this.props.iconMap[action];
        } else if (getDefaultIcon()[action]) {
            return getDefaultIcon()[action];
        } else {
            return undefined;
        }
    }

    /**
     *渲染图标
     *
     * @param {*} action
     * @param {*} selected
     * @param {*} icon
     * @returns
     * @memberof RichToolbar
     */
    _getButtonEle(action, selected, icon) {
        const { selectFontColor,selecteHiliteColor } = this.state;
        //console.log(selectFontColor)
        return this.props.renderActionEle ?
            this.props.renderActionEle(action, selected) :
            icon ? <Text
                style={[styles.editorIconfont,
                action == 'fontColor' ? { color: selectFontColor }
                    :action == 'hiliteColor'?{color:selecteHiliteColor}
                    :{ color: selected ? this.props.selectedIconTint : this.props.iconTint },
                ]}
            >{icon}</Text> : null;
    }


    /**
     *默认的工具栏标签渲染
     *
     * @param {*} action
     * @param {*} selected
     * @returns
     * @memberof RichToolbar
     */
    _defaultRenderAction(action, selected, index) {
        const icon = this._getButtonIcon(action);
        const { toolBarBackgroundColor } = this.props;
        const { selectToolName,selecteHiliteColor } = this.state;
        return (
            <View style={styles.toolBarContainer}>
                <TouchableOpacity
                    key={action}
                    style={[
                        styles.editorIconfontContainer,
                        { backgroundColor: selectToolName == action ? '#D3D3D3' : toolBarBackgroundColor },
                        
                    ]}
                    onPress={() => {
                        this.setState({
                            selectToolName: action
                        })
                        this._onPress(action);
                    }}
                >
                    {/* {
                        this._getButtonEle(action, selected, icon)
                    } */}
                    <View style={{}}>
                        <Text>保存</Text>
                    </View>
                    {/* <Image  source={require('../../../../assets/composition/teacher/save.png')} style={{width:'100%',height:'100%'}} /> */}

                </TouchableOpacity>
            </View>
        );
    }

    /**
     *
     *工具栏标签的渲染
     * @param {*} action
     * @param {*} selected
     * @returns
     * @memberof RichToolbar
     */
    _renderAction(item) {
        let { item: { action, selected }, index } = item;
        console.log(item)
        return this.props.renderAction ?
            this.props.renderAction(action, selected, index) :
            this._defaultRenderAction(action, selected, index);
    }

    render() {
        const { toolBarBackgroundColor } = this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.toolBarContainer, { backgroundColor: toolBarBackgroundColor }]}>
                    <FlatList
                        horizontal
                        keyExtractor={(item, index) => item.action + '-' + index}
                        data={this.state.data}
                        alwaysBounceHorizontal={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this._renderAction.bind(this)}
                    />
                </View>
            </View>
        );
    }

    /**
     *
     *工具栏中每个标签的按压事件
     *
     * @param {*} action
     * @memberof RichToolbar
     */
    _onPress(action) {
        switch (action) {
            case actions.saveAs:
                this.state.editor._sendAction(action, "gethtml");
                break;

        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position:"absolute",
        bottom:90,
        right:0,
        left:0,
        marginLeft:'40%',
        marginRight:'40%',
        backgroundColor: '#D3D3D3',
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:25
    },
    toolBarContainer: {
        height: 50,
        backgroundColor: '#D3D3D3',
    },
    editorIconfontContainer: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#D3D3D3',
    },
    editorIconfont: {
        fontFamily: "iconfont",
        fontSize: 24
    },
    toolBarModal: {
        borderTopColor: '#eee',
        borderTopWidth: 0,
        width: ScreenWidth,
    },
    toolBarModalItem:{
        width:25,
        height:25,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        marginRight:17,
        marginTop:20,
        marginBottom:20,
        borderColor:'#eee',
        borderWidth:0
    }
});
