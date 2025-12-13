import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Button from "../../UI/Button/Button"

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccountBtn = () => {
    navigation.replace("register");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.horizontalBar}></View>
      <View style={styles.formContainer}>
        <TextInput value={email} onChangeText={(e) => setEmail(e)} style={styles.input} placeholder='Enter Email'/>
        <TextInput value={password} onChangeText={(e) => setPassword(e)} style={styles.input} placeholder='Enter Password'/>
        <Button title="Login"/>
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