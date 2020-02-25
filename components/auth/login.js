import React,{ Component } from "react";
import {ScrollView} from "react-native"

import Picker from "../Picker"
import Input from '../Input'

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.updateInput = this.updateInput.bind(this)
    this.error = this.error.bind(this)
    this.state = {}
  } 

  async updateInput(state) {
    await this.setState(state)
    this.props.value(this.state)
  }

  error(name) {
    return this.props.error.filter(value => Object.keys(value) == name)
  }

  render() {
    return(
      <ScrollView> 
        <Input
          placeholder={"Adresse universitaire"}
          update={this.updateInput}
          label={"Mail"}
          name={"emailLogin"}
          error={this.error("emailLogin").length !== 0 ? this.error("emailLogin")[0].emailLogin : undefined}
          state={{value: this.state.email}}
        />
        <Input 
          placeholder={"Mot de passe"}
          secure
          update={this.updateInput}
          label={"Mot de passe"}
          name={"passwordLogin"}
          error={this.error("passwordLogin").length !== 0 ? this.error("passwordLogin")[0].passwordLogin : undefined}
          state={{value: this.state.password}}
        />
      </ScrollView>
    )
  }
}
