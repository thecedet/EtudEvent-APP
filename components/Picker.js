import React,{Component} from "react"
import {View,Text,StyleSheet,Picker as P} from "react-native"

export default class Picker extends Component {
  constructor(props) {
    super(props)
    this.state = props.state
  }
  render() {
    return(
      <View style={style.container}>
        <Text style={style.label}>{this.props.label}</Text>
        <View style={style.box}>
          <P
            selectedValue={this.state.value}
            style={style.input}
            onValueChange={(value, itemIndex) => {
              this.setState({value})
              this.props.update({[this.props.name]: value})
            }}>
            {this.props.value.map(({label,value},key) => <P.Item key={key} label={label} value={value} />)}
          </P>
        </View>
      </View>
      )
    }
  }
  

const style = StyleSheet.create({
  container: {
  	width: "85%",
    marginLeft: "7.5%",
    paddingBottom: 20,
    paddingVertical: 10
  },
  box: {
  	backgroundColor: "white",
    borderRadius: 5,
    elevation: 5
	},
	input: {
		height: 50,
		borderColor: '#C9C9C9',
		borderWidth: 1,
		borderRadius: 5,
    paddingStart: 15,
    fontSize: 18
  },
  label: {
    fontSize: 20,
    color: "#C9C9C9"
  }
})