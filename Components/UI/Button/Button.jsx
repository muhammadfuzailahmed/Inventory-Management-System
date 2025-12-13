import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Button = ({title, onPress}) => {
  return (
    <View style={styles.btnContainer}>
      <Text onPress={onPress} style={styles.btnText}>{title}</Text>
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