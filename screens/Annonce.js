import React,{ Component } from "react"
import {View, StyleSheet, ScrollView,ActivityIndicator,TouchableHighlight,AsyncStorage, RefreshControl, StatusBar, Text} from "react-native"

import Annonce from "../components/annonce/annonce"

import * as Font from "expo-font"
import {Notifications} from "expo"

export default class AnnonceScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoading: false,
      annonceLoading: false,
      refreshing: false,
      annonce: [],
      page:0
    }
  }

  refresh() {
    this.setState({annonce: []})
    this.getAnnonce()
  }

  scroll(y,size) {
    console.log(y,size, this.state.page)
    if(y > size* (0.5 * (Math.pow(.5, this.state.page)) ) ) {
      this.setState({page: this.state.page+1})
      this.getAnnonce(10,this.state.page)
    }
  }

  async getAnnonce(show=10, page=0) {
    const request = await fetch(`https://etud-event-api.herokuapp.com/annonce?show=${show}&page=${page}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const response = await request.json()
    this.setState({annonceLoading: true, annonce: this.state.annonce.concat(response.annonce) , refreshing: false})
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Awesome': require('../assets/icomoon.ttf'),
      'Helvetica': require("../assets/Helvetica-Neue-LT-Std-65-Medium.ttf")
    })
    this.setState({fontLoading: true})
    this.getAnnonce()
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

            <View style={style.bar}/>
            <View style={style.header}>
              <Text style={style.text}>Annonces</Text>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                  AsyncStorage.removeItem("@auth:token")
                  this.props.navigation.push("Auth")
                }}
              >
                <Text style={style.icon}>&#xf0c9;</Text>
              </TouchableHighlight>
            </View>


          <View style={{flex:1}}>
            
            <ScrollView 
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refresh()} progressViewOffset={300} />
              }
              //onScroll={oui => console.log(oui.nativeEvent.contentOffset.y, oui.nativeEvent.contentSize.height)}
              onScroll={scroll => this.scroll(scroll.nativeEvent.contentOffset.y, scroll.nativeEvent.contentSize.height)}
            >

              {!this.state.annonceLoading ? <View/> : this.state.annonce.map((annonce,index) => {
                return <Annonce key={index} data={annonce}/>
              })}

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
  },
  bar: {
    backgroundColor: "#71256f",
    height: StatusBar.currentHeight
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    flex: 0.07
  },
  text: {
    color: "black",
    fontSize: 29,
    alignSelf: "center",
    fontFamily: "Helvetica",
  },
  icon: {
    fontFamily: "Awesome",
    color: "black",
    fontSize: 29,
    alignSelf: "center",
  }
})