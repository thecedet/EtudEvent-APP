import React,{Component} from "react"
import {View, Text, StyleSheet, Image} from "react-native"

export default class Annonce extends Component {
  constructor(props) {
    super(props)
  } 
  render() {
    return(
      <View style={style.container}>
        <View style={style.containerPhoto}>
          <Image
            style={style.image}
            source={{uri: "https://cdn.discordapp.com/attachments/664893016888049728/668566531512336404/IMG_20200113_123003.jpg"}}
          />
        </View>
        <View style={style.containerText}>
          <Text style={style.title}>{this.props.contenu.title}</Text>
          <Text numberOfLines={2} style={style.text}>{this.props.contenu.data}</Text>
        </View>
        <View style={style.containerOptions}>
          <Text style={style.textOption}>&#xf141;</Text>
        </View>
      </View>
    )
  }
}

const color = "#E89C5B"

const style = StyleSheet.create({
  container: {
    width: "90%",
    height: 120,
    backgroundColor: color,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: color,
    marginTop: 7,
    marginBottom:7,
    elevation: 20,
    opacity: 0.9,
    
  },
  containerPhoto: {
    flex: 2,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderWidth: 2,
    borderColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
  },
  containerText: {
    flex: 6,
    padding: 10,
  },
  containerOptions: {
    flex: 1.5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 2,
    borderColor: "transparent"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 360,
    marginTop: 10
  },
  textOption: {
    fontFamily: "Awesome",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10
  },
  text: {
    color: "white",
    fontSize: 15,
    overflow: "hidden"
  },
  title: {
    fontWeight: "bold",
    color : "white",
    fontSize: 20,
    marginBottom: 10
  }
})