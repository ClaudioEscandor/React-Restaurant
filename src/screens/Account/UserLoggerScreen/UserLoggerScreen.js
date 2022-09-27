import React, {useState} from 'react'
import { View } from 'react-native'
import {Button} from "react-native-elements"
import {getAuth, signOut} from "firebase/auth"
import {LoadingModal} from "../../../components"
import {InfoUser, AccountOption} from "../../../components/Account"
import {styles} from "./UserLoggerScreen.styles"


export function UserLoggerScreen() {

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  const logout = async () =>{
      const auth = getAuth();
      await signOut(auth);
  }

  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText}/>

      <AccountOption onReload={onReload}/>

      <Button title="Cerrar sesion" buttonStyle={styles.btnStyles} titleStyle={styles.btnTextStyles} onPress={logout}/>
      <LoadingModal show={loading} text={loadingText}/>
    </View>
  )
}