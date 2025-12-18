import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ShowAllProducts = ({navigation}) => {
  
  const handleAddProductBtn = () => {
    navigation.navigate("AddProduct");
  }
  
  return (
    <View>
      <View style={styles.addProductBtnContainer}>
      <Text onPress={handleAddProductBtn} style={styles.addProductBtn}>btn</Text>
      </View>
    </View>
  )
}

export default ShowAllProducts

const styles = StyleSheet.create({
  addProductBtnContainer: {
    backgroundColor: "navy",
    position: "absolute",
    top: 90,
    right: 15,
    width: 100,
    height: 50
  },
  addProductBtn: {
    color: "#fff"
  }
})