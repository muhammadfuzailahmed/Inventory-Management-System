import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../../UI/Button/Button'

const SellProductInvoice = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>
        {/* This is a dummy text for showing items user chose on previous page */}
        Selected Product: Wireless Mouse
      </Text>
      <View style={styles.infoBlock}>
        <Text style={styles.textstyle3}>Current Stock: 15</Text>
        <Text style={styles.textstyle3}>Item Sold: 5</Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.cont2label1}>Live Calc Area</Text>
        <Text style={styles.cont2label2}>Total Sale Price: </Text>
        <Text style={styles.cont2label3}>Estimated Profit: </Text>
      </View>
        <Button title="Complete Sale"/>
    </View>
  )
}

export default SellProductInvoice

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40
  },
  infoBlock: {
    width: "100%",
    alignItems: "center",
    marginTop: 20
  },
  container2: {
    backgroundColor: "#D3D3D3",
    width: "90%",
    height: "28%",
    marginTop: 30,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderRadius: 8
  },
  textstyle: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 20
  },

  textstyle3: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 20,

  },

  textstyle2: {
    fontSize: 30,
    marginTop: 30,
    marginLeft: 15,
    fontWeight: "500"
  },
  inputStyles: {
    borderWidth: 2,
    borderRadius: 15,
    width: "90%",
    height: 50,
    flex: 1,
    padding: 10,
  },
  inputStyles2: {
    width: "90%",
    flexDirection: "row",
    marginTop: 10
  },
  buttonStyles: {
    marginTop: 10
  },
  cont2label1: {
    color: "black",
    fontWeight: "900",
    textAlign: "center",
    fontSize: 21
  },
  cont2label2: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: "500"
  },
  cont2label3: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "500"
  }
});
