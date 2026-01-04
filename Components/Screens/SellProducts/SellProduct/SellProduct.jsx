import React, { useCallback } from 'react'
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Modal, ActivityIndicator } from 'react-native';
import Button from '../../../UI/Button/Button';
import Toast from 'react-native-toast-message';
import SellProductInvoice from "../SellProductInvoice/SellProductInvoice"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const SellProduct = ({ navigation, route }) => {
  const { user } = route.params || {};
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const [sellItemObj, setSellItemObj] = useState({});
  const [dataFound, setDataFound] = useState(false);
  const [completeProduct, setCompleteProduct] = useState({});

  function handleBackBtn() {
    setModal(false);
  }

  const handleSellItemBtn = () => {
    if (!productName || !quantity) {
      Toast.show({
        type: "error",
        text1: "Fill all required fields"
      });
      return;
    }
    handleBtn();
  }

  useFocusEffect(
    useCallback(() => {
      fetchProductData();
    })
  )

  const fetchProductData = async () => {
    try {
      const res = await fetch(
        `http://192.168.100.99:5000/products/${user.id}`
      );
      if (!res.ok) {
        const err = await res.text();
        console.log("Backend error:", err);
        return;
      }

      const data = await res.json();
      setItems(data);

    } catch (err) {
      console.log("Fetch error:", err);
    }

    
  }

  const handleBtn = () => {
    const product = items.find(
      item => item.productName.toLowerCase() === productName.toLowerCase()
    );
    
    if (product) {
      if(quantity > product.quantity) {
      Toast.show({
        type: "error",
        text1: "Insufficient quantity"
      });
      return;
    }
    setCompleteProduct(product);
      setSellItemObj({
        productName: productName,
        quantity: quantity
      })
      setDataFound(true);
      setModal(true);
      setProductName("");
      setQuantity(0);
    } else {
      Toast.show({
        type: "error",
        text1: "Item not found"
      })
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>Sell Product</Text>
      <View style={styles.horizontalBar}></View>
      <View style={styles.inputStyles2}>
        <TextInput value={productName} onChangeText={(e) => setProductName(e)} placeholder='Enter Product here' style={styles.input} />
        <TextInput value={quantity} onChangeText={(e) => setQuantity(e)} placeholder='Items to be sold' style={styles.input} />
      </View>
      <Button onPress={handleSellItemBtn} title="Sell Item" />
      <Modal visible={modal} animationType='slide'>
        <Text onPress={handleBackBtn} style={styles.backBtnContainer}>
          <MaterialIcons name="arrow-back-ios-new" size={28} />
        </Text>
        <View style={styles.invoiveHhorizontalBar}></View>
        {dataFound && <SellProductInvoice product={sellItemObj} completeProduct={completeProduct} setModal={setModal} user = {user}/>}
      </Modal>
    </View>
  )
}

export default SellProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textstyle: {
    fontSize: 28,
    fontWeight: "900",
  },

  textstyle2: {
    fontSize: 30,
    marginTop: 30,
    marginLeft: 15,
    fontWeight: "500"
  },

  input: {
    borderWidth: 2,
    borderRadius: 8,
    width: "95%",
    marginHorizontal: "auto",
    padding: 10,
    marginBottom: 10
  },

  inputStyles2: {
    width: "90%",
    marginTop: 10
  },

  horizontalBar: {
    backgroundColor: "navy",
    width: "30%",
    height: 6,
    borderRadius: 25,
    marginBottom: 10
  },
  cancelBtn: {
    position: "absolute",
    width: "40%",
    left: -30,
    top: 10
  },
  backBtnContainer: {
    position: "absolute",
    top: 15,
    left: 10
  },
  invoiveHhorizontalBar: {
        position: "absolute",
        top: 50,
        left: 10,
        width: "95%",
        backgroundColor: "navy",
        height: 3,
        marginHorizontal: "auto"
    }
});