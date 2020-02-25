import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Header extends Component {

  render() {
    return(
      <View>
        <View style={style.subHeader} />
        <View style={style.header}>
          <Text style={style.text}>&#xe900;</Text>
          <Text style={style.title}>Annonce</Text>
          <Text style={style.text}>&#xf0c9;</Text>
          </View>
      </View>
    )
  }
}




const style = StyleSheet.create({
  subHeader: {
    backgroundColor: "#B251EA",
    height: 30
  },
  header: {
    backgroundColor: "#B251EA",
    flexDirection: "row",
    justifyContent:'space-between',
    padding: 18,
  },
  text: {
    color: "white",
    fontSize: 30,
    fontFamily: "Awesome",
    transform: [{rotateY: "180deg"}]
  },
  title: {
    color: "white",
    fontSize: 29
  }
});