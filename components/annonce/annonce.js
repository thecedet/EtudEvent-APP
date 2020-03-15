import React,{Component} from "react"
import {View, Text, StyleSheet, Image} from "react-native"

export default function Annonce(props) {
  const days = ["Lundi","Mardi","Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
  const month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  const date = new Date(props.data.date)
  return(
    <View style={annonce.container}>
      <Image style={annonce.image} source={{uri:`http://etudevent-api.herokuapp.com/cdn/annonce/${props.data.image || "3.jpg"}`}}/>
      <View style={annonce.imageFiltre}/>
      <Text style={annonce.title}>{props.data.title}</Text>
      <Text style={annonce.date}>{days[date.getDay()-1]} {date.getDate()} {month[date.getMonth()]} {date.getFullYear()} </Text>
    </View>
  )
}

const annonce = StyleSheet.create({
  container: {
    height: 160,
    width: "90%",
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
    justifyContent: "flex-end",
    elevation:10
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "#71256f",
  },
  imageFiltre: {
    backgroundColor: "#71256f",
    height: "100%",
    width: "100%",
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    opacity: .6
  },
  title: {
    color: "white",
    fontSize: 30,
    padding: 15,
    paddingBottom: 0,
    fontFamily: "Helvetica",
  },
  date: {
    color: "white",
    padding: 15,
    fontFamily: "Helvetica",
    paddingTop: 5
  }
})