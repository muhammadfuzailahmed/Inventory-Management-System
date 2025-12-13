import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IMS_Logo from "../../Assets/IMS_Logo.png"

const Splashscreen = () => {
  return (
    <Modal animationType='slide'>
    <View style={styles.container}>
      <Image style={styles.img} source={IMS_Logo} />
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
    height: "30%"
  }
})