import React, {useState} from 'react'
import { View } from 'react-native'
import {useFormik} from "formik";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import Toast from "react-native-toast-message"
import {screen} from "../../../utils"
import {useNavigation} from "@react-navigation/native"
import {Input, Icon, Button} from "react-native-elements"
import {initialValues,validationSchema} from "./LoginForm.data"
import {styles} from "./LoginForm.styles";


export function LoginForm() {
    //validacion para errores en email y password
    const [showPassword, setShowPassword] = useState(false);   
    const navigation = useNavigation(); 

    const formik = useFormik({

        initialValues:initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, formValue.email, formValue.password);

                navigation.navigate(screen.account.account);
                
            } catch (error) {
                Toast.show({
                    type: "error",
                    position:"bottom",
                    text1: "Usuario o contraseña incorrectos"
                });
            }
        }
    });

    const onShowHidenPassword = () => setShowPassword(prevState =>  !prevState);

  return (
    <View style={styles.content}>
      <Input placeholder='Correo electronico' containerStyle={styles.input} 
      rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon}/>
    }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage= {formik.errors.email}
      />

      <Input placeholder='Contraseña' containerStyle={styles.input} secureTextEntry={showPassword ? false : true} 
      rightIcon={<Icon type='material-community' name={showPassword ?  "eye-off-outline" : "eye-outline"} 
      iconStyle={styles.icon} onPress={onShowHidenPassword}/>
    }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage= {formik.errors.password}
      />
      <Button title="Iniciar session" containerStyle={styles.btnContainer} buttonStyle={styles.btn}
        onPress={formik.handleSubmit} loading={formik.isSubmitting}/>
    </View>
  )
}