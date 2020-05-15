import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import WebView from 'react-native-webview';
export default class Remark extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }
  onChange = () => {
    this.setState(preState => ({ visible: !preState.visible }))
  }

  render() {
    const { visible } = this.state
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#CCCCFF'
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: '#E3C07B', height: 50, width: 100 }}
          onPress={this.onChange}
        >
          <Text>Show WebView</Text>
        </TouchableOpacity>
        {visible ? (
          <View style={{ height: 150, width: 150 }}>
            <WebView
              source={{ uri: 'https://github.com/facebook/react-native' }}
              scalesPageToFit={true}
            />
          </View>
        ) : null}
      </View>
    )
  }
}

