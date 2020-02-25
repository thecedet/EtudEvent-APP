import React,{Component} from "react"
import {View,Text, TextInput,StyleSheet} from "react-native"

export default class Input extends Component {
    constructor(props) {
      super(props)
      this.state = props.state
    }

    titi() {
      console.log("fdffgd")
    }

    static getDerivedStateFromProps(props,state) {
      if(props.error && !state.error) return {value: undefined, error: true}
      else return state
    }

    render() {
      return(
        <View style={style.container}>
          <Text style={[style.label, this.props.error ? style.errorText : ""]}>{this.props.label}</Text>
          <View style={style.box}>
            <TextInput
              secureTextEntry={this.props.secure || false}
              style={[style.input, this.props.error ? style.errorBox : ""]}
              onChangeText={value => {
                this.setState({value})
                this.props.update({[this.props.name]: value})
              }}
              value={this.state.value}
              placeholder={this.props.error || this.props.placeholder}
              placeholderTextColor={this.props.error ? "#e74c3c" : undefined} 
            />
          </View>
        </View>
      )
    }
  }
  

const style = StyleSheet.create({
  container: {
  	width: "85%",
    marginLeft: "7.5%",
    paddingTop: 20
  },
  box: {
  	backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
	},
	input: {
		height: 60,
		borderColor: '#C9C9C9',
		borderWidth: 1,
		borderRadius: 5,
    paddingStart: 15,
    fontSize: 18
  },
  label: {
    fontSize: 20,
    color: "#C9C9C9"
  },
  errorBox: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c'
  }
})