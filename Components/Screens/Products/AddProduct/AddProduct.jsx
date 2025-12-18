import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '../../../UI/Button/Button'

const AddProduct = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.product}>Add New Product </Text>
      <View style={styles.horizontalBar}></View>
      <View style={styles.addProdoctForm}>
        <TextInput style={styles.input} placeholder='Product Name' />
        <TextInput style={styles.input} placeholder='category' />
        <View style={styles.formFlex}>
          <TextInput style={styles.flexInput} placeholder='Buying price' />
          <TextInput style={styles.flexInput} placeholder='Selling price' />
        </View>
        <TextInput style={styles.input} placeholder='Quality' />
        <TextInput style={styles.input} placeholder='Description' /></View>
        <Button title="Add Product"/>
    </View>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  product: {
    textAlign: "center",
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold'
  },
  horizontalBar: {
    width: "50%",
    backgroundColor: "navy",
    height: 5,
    borderRadius: 25
  },
  addProdoctForm: {
    marginTop: 15,
    width: "90%",
    marginHorizontal: "auto"
  },
  input: {
    width: "100%",
    borderWidth: 2,
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  flexInput: {
    width: "45%",
    borderWidth: 2,
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  formFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  productbutton: {
    width: 350,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 10,
    height: 50,
    fontSize: 30,
    backgroundColor: '#005bd1ff',
    paddingTop: 7,
    paddingLeft: 90
  },
  saveexptext: {

    fontSize: 24,
    color: '#ffffffff'
  }

})