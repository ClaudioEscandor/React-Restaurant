import React from 'react'
import { View} from 'react-native'
import {Image} from "react-native-elements"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {RegisterForm} from "../../../components/Auth"
import {style} from "./RegisterScreen.styles"


export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")} style={style.image}/>
      <View style={style.content}>
          <RegisterForm/>
      </View>
    </KeyboardAwareScrollView>
  )
}