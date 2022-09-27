import React, {useState} from 'react';
import { View,Text } from 'react-native';
import {Image} from "react-native-elements";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {size} from "lodash"

import {styles} from "./Carousel.styles.js"


export function MyCarousel(props) {

    const {arrayImages, width, height, hideDots} = props;
    const [activeDotIndex, setActiveDotIndex] = useState(0);

    const renderItem = ({item}) => (
        <Image source={{uri: item}} style={{height, width}}/>   
    );

    const pagination = () =>{
      return (
        <Pagination 
            dotsLength={size(arrayImages)}
            activeDotIndex={activeDotIndex}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={styles.dotsContainer}
            dotStyle={styles.dot}
        />
      )
    }
  return (
    <View style={styles.content}>
        <Carousel
        layout={"default"}
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
        />

        {!hideDots && pagination()}
    </View>
  );
}