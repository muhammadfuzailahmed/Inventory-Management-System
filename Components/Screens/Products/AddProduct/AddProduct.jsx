import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import Button from '../../../UI/Button/Button'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddProduct = ({ setModal, route, fetchData, user }) => {

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [isShown, setIsShown] = useState(true);

  const handleBackBtn = () => {
    setModal(false);
    fetchData();
  }

  const handleAddProductBtn = async () => {
    if (!productName || !productCategory || !buyingPrice || !sellingPrice || !quantity || !productDescription) {
      Toast.show({
        type: "error",
        text1: "Fill all required fields"
      })
      return;
    };
    const id = user.id;
    let reponse = await axios.post("http://192.168.100.99:5000/addProduct", {
      productName,
      productCategory,
      buyingPrice,
      sellingPrice,
      quantity,
      productDescription,
      id
    }).then(() => {
      setModal(false);
      fetchData();
      Toast.show({
        type: "success",
        text1: "Product Added Successfully!"
      });

      setProductName("");
      setProductCategory("");
      setBuyingPrice("");
      setSellingPrice("");
      setQuantity("");
      setProductDescription("");

    }).catch((error) => {
      if (error.response) {
        if (error.reponse.status = 404) {
          Toast.show({
            type: "error",
            text1: "User not found"
          });
        } else if (error.response.status = 401) {
          Toast.show({
            type: "error",
            text1: "Product not found"
          })
        }
      }
    })

  }


  return (
    <Modal animationType='slide'>
      <View style={styles.container}>
        <Text onPress={handleBackBtn} style={styles.backBtnContainer}>
          <MaterialIcons name="arrow-back-ios-new" size={28} />
        </Text>
        <Text style={styles.product}>Add New Product </Text>
        <View style={styles.horizontalBar}></View>
        <View style={styles.addProdoctForm}>
          <TextInput value={productName} onChangeText={(e) => setProductName(e)} style={styles.input} placeholder='Product Name' />
          <TextInput value={productCategory} onChangeText={(e) => setProductCategory(e)} style={styles.input} placeholder='category' />
          <View style={styles.formFlex}>
            <TextInput value={buyingPrice} onChangeText={(e) => setBuyingPrice(e)} style={styles.flexInput} placeholder='Buying price' />
            <TextInput value={sellingPrice} onChangeText={(e) => setSellingPrice(e)} style={styles.flexInput} placeholder='Selling price' />
          </View>
          <TextInput value={quantity} onChangeText={(e) => setQuantity(e)} style={styles.input} placeholder='Quantity' />
          <TextInput value={productDescription} onChangeText={(e) => setProductDescription(e)} style={styles.input} placeholder='Description' /></View>
        <Button onPress={handleAddProductBtn} title="Add Product" />
      </View>
    </Modal>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelBtnContainer: {
    position: "absolute",
    left: -25,
    top: 10,
    width: "40%",
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
  },
  backBtnContainer: {
    position: "absolute",
    top: 15,
    left: 10
  }
})