import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native';
import {collection, query, orderBy, onSnapshot, limit} from "firebase/firestore"
import {db} from "../utils"
import {RestaurantRanking} from "../components/Restaurants"
import {map} from "lodash"

export function RankingScreen() {

  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    onSnapshot(q, (snapShot) => {
      setRestaurants(snapShot.docs);
    })
  }, []);
  

  return (
    <ScrollView>
      {map(restaurants, (restaurant, index) =>(
        <RestaurantRanking
          key={index}
          index={index}
          restaurant={restaurant.data()}
        />
      ))}
    </ScrollView>
  )
}