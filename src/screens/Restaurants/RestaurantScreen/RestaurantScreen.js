import React, {useState, useEffect} from 'react'
import { ScrollView, Dimensions } from 'react-native'
import {doc, onSnapshot} from "firebase/firestore"
import {db} from "../../../utils"
import {MyCarousel, Loading} from "../../../components/Shared"
import {Header, Info, BtnReviewForm, Reviews, BtnFavorite} from "../../../components/Restaurant/"
import {styles} from "./RestaurantScreen.styles"


const {width} = Dimensions.get("window")


export function RestaurantScreen(props) {

  const {route} = props;
  const [restaurant, setRestaurant] = useState(null);
  //console.log(restaurant);

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);



  if(!restaurant) return <Loading show text="Cargando restaurantes"/>;
  

  return (
    <ScrollView style={styles.content}>
      <MyCarousel arrayImages={restaurant.images} height={250} width={width}/>
      <Header restaurant={restaurant}/>
      <Info restaurant={restaurant}/>

      <BtnReviewForm idRestaurant={route.params.id}/>
      <Reviews idRestaurant={route.params.id}/>

      <BtnFavorite idRestaurant={route.params.id}/>

    </ScrollView>
  )
}