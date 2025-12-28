import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from "../../UI/Button/Button"
import axios from 'axios'
import Toast from 'react-native-toast-message'

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  
  const handleLoginBtn = async () => {
    try {
      setLoader(true);
      let response = await axios.post("http://192.168.100.99:5000/login", {
        email,
        password
      })
        const {user} = response.data;
        setLoader(false);
        Toast.show({
          type: "success",
          text1: "Login successfull!"
          })
          setEmail("");
          setPassword("");
          navigation.replace("bottomTabs", {user});
      
    } catch (error) {
      
      if(error.response) {
        setLoader(false);
        if(error.response.status === 404) {
          Toast.show({
            type: "error",
            text1: "User not found"
          })
        }
        else if(error.response.status === 401){
          Toast.show({
            type: "error",
            text1: "Incorrect username or password"
          })
        }
      }
    }
  }

  const handleCreateAccountBtn = () => {
    navigation.replace("register");
  }

  return (
    <View style={styles.container}>
    {loader
       && 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    }
      <Text style={styles.heading}>Login</Text>
      <View style={styles.horizontalBar}></View>
      <View style={styles.formContainer}>
        <TextInput value={email} onChangeText={(e) => setEmail(e)} style={styles.input} placeholder='Enter Email'/>
        <TextInput value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} style={styles.input} placeholder='Enter Password'/>
        <Button onPress={handleLoginBtn} title="Login"/>
        <View style={styles.flex}>
          <Text>Don't have an account? </Text>
          <Text onPress={handleCreateAccountBtn} style={styles.underline}>Create Account</Text>
        </View>
      </View>
    </View>
  ) 
}

export default Login

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  horizontalBar: {
    width: "15%",
    height: 5,
    backgroundColor: "navy"
  },
formContainer: {
  marginTop: 15,
  width: "90%",
  marginHorizontal: "auto"
},
input: {
  borderWidth: 2,
  borderColor: "navy",
  borderRadius: 6,
  width: "100%",
  paddingHorizontal: 8,
  marginBottom: 10
},
flex: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 15
},
underline: {
  textDecorationLine: "underline",
  fontWeight: "bold"
}
})