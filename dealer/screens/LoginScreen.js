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

function LoginScreen({ navigation }) {
  const [gst, setGst] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [notificationVisible, setNotificationVisible] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState("");

  const showNotification = (message, value) => {
    setNotificationMessage(message);
    setNotificationVisible(value);
  };

  const hideNotification = () => {
    setNotificationVisible(false);
  };

  const handleLogin = async () => {
    console.log("1");
    try {
      const { data } = await axios.post(
        "http://192.168.0.176:4000/api/v1/login",
        {
          gst,
          password,
          role: "dealer",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("2");
      showNotification("User Logged In successfully.", 1);
      console.log("2");
      console.log("Dealer logged in succefully");
    } catch (error) {
      showNotification("Wrong GST or Password.", 2);
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

      <Animatable.View
        ref={containerRef}
        style={styles.formContainer}
        animation="fadeIn"
        duration={1500}
        delay={500}
      >
        <Image source={rapidClaim} style={styles.image} resizeMode="cover" />
        <Text style={styles.headerText}>Rapid Claim</Text>
        <Text style={styles.sloganText}>
          Warranty Redefined: Simple, Central, Secure.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="GST No."
          value={gst}
          onChangeText={(text) => setGst(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  notification: {
    position: "absolute",
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    position: "relative",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
    marginTop: -100,
  },
  headerText: {
    fontSize: 25,
    color: "#15a6d1",

    marginBottom: 5,
    fontWeight: "bold",
  },
  sloganText: {
    fontSize: 14,
    color: "#15a6d1",
    marginBottom: 40,
  },

  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: "#15a6d1",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerBtn: {
    color: "#15a6d1",
    marginLeft: 160,
    marginTop: 20,
  },
});

export default LoginScreen;
