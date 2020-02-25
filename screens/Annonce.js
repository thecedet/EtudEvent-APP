import React,{ Component } from "react"
import {View, StyleSheet, ScrollView,ActivityIndicator,TouchableHighlight} from "react-native"

import Header from "../components/annonce/header"
import Annonce from "../components/annonce/annonce"

import * as Font from "expo-font"
import {Notifications} from "expo"

export default class AnnonceScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fontLoading: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Awesome': require('../assets/icomoon.ttf'),
    })
    const request = await fetch("https://etud-event-api.herokuapp.com/annonce?show=20", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const response = await request.json()

    this.setState({fontLoading: true, annonce: response.result})

    this.listener = Notifications.addListener(this.listen)

  }

  listen = ({origin, data}) => {
    console.log("cool data", origin, data)
  }

  render() {
    return (
      !this.state.fontLoading ? (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="violet" />
        </View>
      ) : (
        <View style={{flex:1}}>
          <TouchableHighlight><Header/></TouchableHighlight>

          <View style={{flex:1}}>
            
            <ScrollView>
              <View style={style.scroll}>
                {this.state.annonce.map(item => {
                  return <Annonce key={item.uid} contenu={item}/>
                })}
              </View>
            </ScrollView>
          </View>

        </View>
      )
    )
  }
}


const style = StyleSheet.create({
  scroll: {
    width: "100%",
    maxHeight: "50%",
    alignItems: "center"
  },
  loadingContainer: {
    width:"100%",
    height:"100%",
    justifyContent: "center",
    position: "absolute", 
    opacity: .8
  }
})