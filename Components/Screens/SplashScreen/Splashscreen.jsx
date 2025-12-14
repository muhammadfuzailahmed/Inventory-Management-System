import { Image, Modal, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import IMS_Logo from "../../Assets/IMS_Logo.png"

const Splashscreen = ({navigation}) => {
  const [showModal, setShowModal]= useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowModal(false)
      navigation.navigate("login")
    }, 3000)
  }, [])

  return (
    <Modal visible={showModal} animationType='slide'>
    <View style={styles.container}>
      <Image style={styles.img} source={IMS_Logo} />
      <Text style={styles.heading}>InventoryPro</Text>
      <ActivityIndicator size='large'/>
    </View>
      </Modal>
  )
}

export default Splashscreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "navy",
    justifyContent: "center",
    alignItems: "center" 
  },
  img: {
    width:"60%",
    height: "25%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "900",
    color: "white",
    marginBottom: 30
  }
})