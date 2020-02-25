import React,{ Component } from "react";
import {ScrollView} from "react-native"

import Picker from "../Picker"
import Input from '../Input'

export default class Register extends Component {

  constructor(props) {
    super(props)
    this.updateInput = this.updateInput.bind(this)
    this.error = this.error.bind(this)
    this.state = {
      department: "R&T"
    }
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
          name={"email"}
          error={this.error("email").length !== 0 ? this.error("email")[0].email : undefined}
          state={{value: this.state.email}}
        />
        <Input 
          placeholder={"Mot de passe"}
          secure
          update={this.updateInput}
          label={"Mot de passe"}
          name={"password"}
          error={this.error("password").length !== 0 ? this.error("password")[0].password : undefined}
          state={{value: this.state.password}}
        />
        <Input 
          placeholder={"Mot de passe"} 
          secure
          update={this.updateInput} 
          label={"Confirmer le mot de passe"} 
          name={"cpassword"} 
          error={this.error("cpassword").length !== 0 ? this.error("cpassword")[0].cpassword : undefined}
          state={{value: this.state.cpassword}}
        />
        <Picker
          label={"Département"}
          update={this.updateInput}
          name={"department"}
          state={{value: this.state.department}}
          value={[
            {label: "R&T", value: "R&T"},
            {label: "GE2I", value: "GE2I"},
            {label: "GB2A", value: "GB2A"},
            {label: "Genie Civil", value: "Genie Civil"},
          ]}
        />
      </ScrollView>
    )
  }
}
