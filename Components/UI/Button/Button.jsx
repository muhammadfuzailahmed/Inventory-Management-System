import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Button = ({title}) => {
  return (
    <View style={styles.btnContainer}>
      <Text style={styles.btnText}>{title}</Text>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 6,
    backgroundColor: "navy",
    width: "50%",
    marginHorizontal: "auto"
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 8,
    textAlign: "center"
  }
})