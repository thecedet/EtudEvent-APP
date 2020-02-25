import React, { Component } from 'react';
import { StyleSheet,View,KeyboardAvoidingView, ActivityIndicator, StatusBar,TouchableHighlight,Text,AsyncStorage } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';

import Header from "../components/auth/header"
import Register from "../components/auth/register"
import Login from "../components/auth/login"

import {Notifications} from "expo"
import * as Permissions from "expo-permissions"


export default class App extends Component {

  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.registerForPushNotification = this.registerForPushNotification.bind(this)

    this.state = {
      loading: false,
      active: "login",
      error: [],
      register: {
        email: "",
        password: ""
      }
    }
  }

  static async getDerivedStateFromProps(props) {
    const token = await AsyncStorage.getItem("@auth:token")
    if(token !== null) props.navigation.push("Annonce")
  }

  async registerForPushNotification(email) {
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if(status !== "granted") {
      alert("No notification permissions!")
      return
    }
  
    let token = await Notifications.getExpoPushTokenAsync()
    console.log(token)
    const request = await fetch("https://etud-event-api.herokuapp.com/notification/register", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email.trim().toLocaleLowerCase(), token})
    })

  }

  async login() {
    let error = new Array()

    if(this.state.login !== undefined) {
      let {emailLogin,passwordLogin} = this.state.login
      this.setState({loading: true})
      const request = await fetch("https://etud-event-api.herokuapp.com/account/connect", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: emailLogin, password: passwordLogin})
      })
      const response = await request.json()
      this.setState({loading: false})
      console.log(response.result)
      if(response.result === "ERR_INVALID_INFO") await error.push({emailLogin: "invalide info"},{passwordLogin: "invalide info"})
      if(response.result === "ERR_CHECKED") await error.push({emailLogin: "compte pas check"})
      if(response.result === "OK") {
        await AsyncStorage.setItem("@auth:token", "connect")
        this.registerForPushNotification(emailLogin)
        this.props.navigation.push("Annonce")
      }
    }else await error.push({emailLogin: "il faut mettre un truc"},{passwordLogin: "il faut mettre un truc"})
    this.setState({error})
  }




  async register() {

    let error = new Array()
    const confirmEmailRegex = new RegExp(/^([\w-]*)\.([a-zA-Z-]+)\d*@(etu)?\.?univ-lorraine\.fr$/gm)
    let {email, password, cpassword, department} = this.state.register

    if(password !== cpassword || password === undefined)  await error.push({password: "pas identique"},{cpassword:"pas identique"})
    if(!confirmEmailRegex.exec(email)) await error.push({email: "email non conforme"})

    if(error.length === 0) {
      this.setState({loading: true})
      const request = await fetch("https://etud-event-api.herokuapp.com/account/create", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email.trim().toLocaleLowerCase(), password, department})
      })
      const response = await request.json()
      this.setState({loading: false})
      if(response.result === "ERR_EMAIL_EXIST") await error.push({email: "email existe"})
      else {
        this.setState({active: "login"}) 
        alert("genial un mail vient d'être envoyé, go le verifier") 
      }
    }
    this.setState({error})
  }




  render() {
    return (
      <View style={{flex:1}}>

        {
          this.state.loading ?
            <View style={style.loadingContainer}>
              <ActivityIndicator size="large" color="violet" />
            </View>
          : <View/>
        }

        <View style={style.statusbar} />
          <KeyboardAvoidingView style={{flex:5,marginBottom: 10}} behavior={"height"}>
            <Header state={this.state.active} active={active => this.setState({active})}/>
            <View style={{flex:3}}>
              {
              this.state.active === "register" ?
                <Register error={this.state.error} value={values => this.setState({register: values})}/>
              : 
                <Login error={this.state.error} value={values => this.setState({login: values})}/>}
            </View>
          </KeyboardAvoidingView>
          <View style={{flex:1}}>
            <GradientButton
              style={{ marginVertical: 8, width: "85%", marginLeft: "7.5%",}}
              textStyle={{ fontSize: 20 }}
              gradientBegin="#742972"
              gradientEnd="#A163A0"
              gradientDirection="diagonal"
              height={60}
              radius={5}
              onPressAction={this.state.active === "login" ? this.login : this.register}
              text={this.state.active === "login" ? "Connexion" : "Inscription"}
            />
          </View>
          {
            this.state.active === "login" ?
              <TouchableHighlight 
                style={{bottom:0, position: "absolute", padding: 15}}
                underlayColor="transparent"
                onPress={() => alert("Oh mon pauvre petit, c'est chiant ça")}
              >
                <Text style={{color: "purple", fontSize: 15}}>Mot de passe oublié ?</Text>
              </TouchableHighlight>
            : <View/>
          }
          


      </View>
      
    )
  }
}


const style = StyleSheet.create({
  loadingContainer: {
    width:"100%",
    height:"100%",
    justifyContent: "center",
    backgroundColor: "black",
    zIndex: 1,
    elevation: 100,
    position: "absolute", 
    opacity: .8
  },
  statusbar: {
    backgroundColor: "black",
    height: StatusBar.currentHeight
  },
}) 