import React,{ Component } from "react";
import {StyleSheet, View, TouchableHighlight, Image, Text} from "react-native"


export default class Header extends Component {

  constructor(props) {
    super(props)
  } 



  render() {
    return(
      <View style={style.header}>
        <View style={style.image}>
          <Image
            source={require("../../assets/icon.png")}
            style={{width:100, height:100}}
          />
        </View>
        <View style={style.navigation}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.props.active("login")}
            style={style.login}
          >
            <Text style={[style.registerText, this.props.state !== "register" ? style.activeText : ""]}>Connexion</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor="transparent"
            onPress={() => this.props.active("register")}
            style={style.register}
          >
            <Text style={[style.registerText, this.props.state !== "login" ? style.activeText : ""]}>Inscription</Text>
            </TouchableHighlight>
        </View>
        <View style={style.layer}>
            <View style={[style.bar,  this.props.state === "login" ? "" : style.barRight]}></View>
        </View>
      </View>
    )
  }
}


const style = StyleSheet.create({
  header: {
    flex:1.7,
    backgroundColor: "white",
    elevation: 6,
    alignItems: 'center',
    zIndex: 0,
  },
  image: {
    flex:1,
    justifyContent: "center"
  },
  navigation: {
    height: "30%",
    flexDirection: "row",
  },
  login: {
    width:"50%",
    justifyContent: "center",
  },
  register: {
    width:"50%",
    justifyContent: "center",
  },
  registerText: {
    textAlign: "center",
    fontSize: 23,
    color: "gray",
    fontWeight: "bold"
  },
  loginText: {
    textAlign: "center",
    color: "gray"
  },
  activeText: {
    color: "black"
  },
  layer: {
    height:5,
    width:"100%",
  },
  bar: {
    height: "100%",
    width:"50%",
    backgroundColor: "#71256F"
  },
  barRight: {
    marginLeft: "50%"
  }
})