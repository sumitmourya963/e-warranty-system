import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import SuccessNotification from "./Notification/SuccessNotification";
import ErrorNotification from "./Notification/ErrorNotification";
import rapidClaim from "../assets/rapidClaim.png";

function Product({ navigation }) {
  const [notificationVisible, setNotificationVisible] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState("");

  const showNotification = (message, value) => {
    setNotificationMessage(message);
    setNotificationVisible(value);
  };

  const hideNotification = () => {
    setNotificationVisible(false);
  };

  const handleProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://192.168.116.63:4000/api/v1/products"
      );
      showNotification("Products", 1);
    } catch (error) {
      showNotification("Some thing unexpected happen.", 2);
    }
  };

  useEffect(() => {
    fadeInView();
  }, []);

  const fadeInView = () => {
    if (containerRef.current) {
      containerRef.current.fadeIn(1500);
    }
  };

  const containerRef = useRef();

  return (
    <View style={styles.container}>
      {notificationVisible == 1 ? (
        <SuccessNotification
          style={styles.notification}
          message={notificationMessage}
          onClose={hideNotification}
        />
      ) : notificationVisible == 2 ? (
        <ErrorNotification
          style={styles.notification}
          message={notificationMessage}
          onClose={hideNotification}
        />
      ) : (
        ""
      )}
      <View style={styles.productContainer}>
        <text>This product card</text>
      </View>

      </View>
}



const styles  = StyleSheet.create({
  productContainer:{
    height:100,
    width:100
  }

}) 



export default Product;
