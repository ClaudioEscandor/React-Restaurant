import React, {useState,useEffect} from 'react';
import { View } from 'react-native';
import {Button} from "react-native-elements"
import * as Location from "expo-location";
import MapView from 'react-native-maps';
import Toast from "react-native-toast-message";
import {Modal} from "../../../Shared/Modal";
import {styles} from "./MapForm.styles"



export function MapForm(props) {

    const {show, close, formik} = props;
    const [location, setLocation] = useState({
        latitude: 0.001,
        longitude: 0.001,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    useEffect(() => {
        (async () => {

            const {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== "granted"){
                Toast.show({
                    type:"info",
                    position:"bottom",
                    text1:"Tiens que ir ajustes de la app y activar la localizacion",
                });
                return;
            }

            const locationTemp = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: locationTemp.coords.latitude,
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            });      
        })();     
    }, []);

    const saveLocation = () =>{
        formik.setFieldValue("location", location);
        close();
    }
    

  return (
    <Modal show={show} close={close}>
        
        <MapView initialRegion={location} showsUserLocation={true} style={styles.mapStyles} onRegionChange={(locationTemp) => setLocation(locationTemp)}>
        <MapView.Marker draggable coordinate={location}/>
        </MapView>
        <View style={styles.mapActions}>
            <Button title='Guardar' 
                    containerStyle={styles.btnMapContainerSave} 
                    buttonStyle={styles.btnMapSave}
                    onPress={saveLocation}
            />
            <Button title='Cerrar' 
                    containerStyle={styles.btnMapContainerCancel} 
                    buttonStyle={styles.btnMapCancel}
                    onPress={close}
            />
        </View>
      
    </Modal>
  )
}