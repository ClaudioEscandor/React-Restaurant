import React, {useState, useEffect} from 'react'
import { View } from 'react-native'
import {Text, Button} from "react-native-elements"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {query, collection,where, onSnapshot} from "firebase/firestore"
import {useNavigation} from "@react-navigation/native"
import {size} from "lodash"
import {screen, db} from "../../../utils"
import {styles} from "./BtnReviewForm.styles"


export function BtnReviewForm(props) {

    const {idRestaurant} = props;
    
    const [hasLogged, setHasLogged] = useState(false);
    const [hasReview, setHasReview] = useState(false);
    const navigation = useNavigation();
    const auth = getAuth();

    useEffect(() => {
      onAuthStateChanged(auth, (user) =>{
        setHasLogged(user ? true : false);
      })
    }, []);

    useEffect(() => {
      if(hasLogged){
        const q = query(
          collection(db, "reviews"),
          where("idRestaurant", "==", idRestaurant),
          where("idUser", "==", auth.currentUser.uid)
        );
        onSnapshot(q, (snapShot) => {
          if(size(snapShot.docs) > 0) setHasReview(true);
        });
      }
    }, [hasLogged])
    

    const goToLogin = () =>{
        navigation.navigate(screen.account.tab, {
            screen: screen.account.login,
        });
    };

    const goToReview = () =>{
        navigation.navigate(screen.restaurant.addReviewRestaurant, {
            idRestaurant,
        });
    };

    if(hasLogged && hasReview){
      return (
        <View style={styles.content}>
          <Text style={styles.textSendReview}>Ya has enviado un review a este restaurante</Text>
        </View>
      )
    }
    

  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button title="Escribe una opinion" 
                icon={{type: "material-community", 
                        name:"square-edit-outline", 
                        color: "#00a680",
                }}
                buttonStyle={styles.button}
                titleStyle={styles.btnStyle}
                onPress={goToReview}
            />
      ) : (
        <Text style={styles.text} onPress ={goToLogin}>Para escribir una opinion es necesario estar logeado {" "}
        <Text style={styles.textClick}>pulsa AQUI para iniciar sesion</Text>
        </Text>
      )}
    </View>
  );
}