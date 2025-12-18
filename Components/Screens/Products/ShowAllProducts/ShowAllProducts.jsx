import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

const ShowAllProducts = ({navigation, route}) => {
  const {user} = route.params || {};  
  const [items, setItems] = useState([]);

  const handleAddProductBtn = () => {
    navigation.navigate("AddProduct", {user});
  }

useFocusEffect(
  useCallback(() => {
    const fetchProducts = async () => {
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
    };

    fetchProducts();
  }, [])
);



  return (
    <View>
      <View style={styles.addProductBtnContainer}>
      <Text onPress={handleAddProductBtn} style={styles.addProductBtn}>Add Product</Text>
      </View>
      <View style={styles.productContainer}>
      {items.length > 0 ? 
    <FlatList 
        data={items}
        keyExtractor={(p) => p._id.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.productCard}>
              <View style={styles.flex}>
                <Text style={styles.productTitle}>{item.productName}</Text>
                <Text style={styles.productQuantity}>Qty: {item.quantity}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.productCategory}>{item.productCategory}</Text>
                <Text style={styles.productPrice}>Price: Rs.{item.sellingPrice}</Text>
              </View>
          </View>
          )
        }}
        />: 
        <Text>No products found!</Text>  
    }  
      </View>
    </View>
  )
}

export default ShowAllProducts

const styles = StyleSheet.create({
  addProductBtnContainer: {
    backgroundColor: "navy",
    borderRadius: 8,
    position: "absolute",
    top: 40,
    right: 15,
    height: 50
  },
  addProductBtn: {
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: "bold"
  },
  productContainer: {
    width: "95%",
    marginHorizontal: "auto",
    marginTop: 110
  },
  productCard: {
  backgroundColor: "#fff",
  padding: 14,
  marginVertical: 8,
  borderRadius: 10,
  elevation: 5,
},
flex: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginHorizontal: 10
},
productTitle: {
  fontWeight: "800",
  fontSize: 18
},
productQuantity: {
  fontWeight: "bold",
  fontSize: 15
},
productCategory: {
  fontSize: 15,
  color: "gray"
},
productPrice: {
  fontWeight: "bold",
  fontSize: 15
}
})