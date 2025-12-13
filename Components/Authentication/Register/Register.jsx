import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Button from "../../UI/Button/Button"

const Register = ({navigation}) => {
  const [name, setName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [CNIC, setCNIC] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleCreateAccountBtn = () => {
    navigation.replace("login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <View style={styles.horizontalBar}></View>
      <View style={styles.formContainer}>
        <TextInput value={name} onChangeText={(e) => setName(e)} style={styles.input} placeholder='Enter name'/>
        <TextInput value={businessName} onChangeText={(e) => setBusinessName(e)} style={styles.input} placeholder='Enter Business name'/>
        <TextInput value={CNIC} onChangeText={(e) => setCNIC(e)} style={styles.input} placeholder='Enter CNIC'/>
        <TextInput value={email} onChangeText={(e) => setEmail(e)} style={styles.input} placeholder='Enter Email'/>
        <TextInput value={password} onChangeText={(e) => setPassword(e)} style={styles.input} placeholder='Enter Password'/>
        <Button title="Register" />
        <View style={styles.flex}>
                  <Text>Already have an account? </Text>
                  <Text onPress={handleCreateAccountBtn} style={styles.underline}>Login now</Text>
                </View>
      </View>
    </View>
  )
}

export default Register

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