import React, { Component } from 'react';
import {View } from 'react-native';

import {createAppContainer} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"

import Auth from "./screens/Auth"
import Annonce from "./screens/Annonce"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: "auth"
    }
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Route/>
      </View>
    )
  }
}

const Route = createAppContainer(createStackNavigator({
  Auth, Annonce
}, {
  initialRouteName: "Auth",
  headerMode: "none"
}))
