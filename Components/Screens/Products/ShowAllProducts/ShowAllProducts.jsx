import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import AddProduct from '../AddProduct/AddProduct';
import Feather from 'react-native-vector-icons/Feather';
import EditProduct from "../EditProduct/EditProduct"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const ShowAllProducts = ({ navigation, route }) => {
  const { user } = route.params || {};
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [updateInfoProduct, setUpdateInfoProduct] = useState({});
  const [searchContainer, setSearchContainer] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [search, setSearch] = useState("");
  const [searchProduct, setSearchProduct] = useState();
  const [searchContainerLoader, setSearchContainerLoader] = useState(false);

  const handleAddProductBtn = () => {
    setShowModal(true);
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `http://192.168.100.99:5000/products/${user.id}`
      );
      setLoader(false);
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

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleEditProductBtn = (item) => {
    console.log(item);
    setShowEditProductModal(true);
    setUpdateInfoProduct(item);
  }

  const handleSearchInput = () => {
    setSearchContainer(true);
  }

  const handleSearchContainerCloseBtn = () => {
    setSearchContainer(false);
    setSearchResult(false);
    setSearch("");
  }

  const handleSearchBtn = async () => {
    if(!search) {
      Toast.show({
        type: 'error',
        text1: "Cannot search empty field"
      });
      return;
    }
    setSearchContainerLoader(true);
    try {
      const response = await axios.post("http://192.168.100.99:5000/searchProduct", {
        search,
        id: user.id
      })
      
      setSearchProduct(response.data.product);
      setSearchContainerLoader(false);
      setSearchResult(true);
    } catch (error) {
      let status = error.response?.status;
      
      if(status === 404) {
        Toast.show({
          type: "error",
          text1: "Produt not found!"
        })
      }
    }
  }

  return loader ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) :
    (
      <View>
        <View style={styles.addProductBtnContainer}>
          <Text onPress={handleAddProductBtn} style={styles.addProductBtn}>Add Product</Text>
        </View>
        {
          searchContainer 
          &&
        <View style={styles.searchProductContainer}>
          <Text onPress={handleSearchContainerCloseBtn} style={styles.searchProductCloseBtn}>
            <AntDesign name="close" size={28}/>
          </Text>
          {searchResult 
          &&
          <View style={styles.searchProductInnerContainer}>
          {searchContainerLoader 
          ? 
          <ActivityIndicator size="large"/>
          : 
            <View style={styles.productCard}>
                    <View style={styles.flex}>
                      <View>
                        <Text style={styles.productTitle}>{searchProduct.productName}</Text>
                        <Text style={styles.productCategory}>{searchProduct.productCategory}</Text>
                      </View>

                      <View style={styles.cardInnerFlex}>

                        <View>
                          <Text style={styles.productQuantity}>Qty: {searchProduct.quantity}</Text>
                          <Text style={styles.productPrice}>Price: Rs. {searchProduct.sellingPrice}</Text>
                        </View>
                        {/* <View style={styles.productCardVerticalBar}></View> */}
                        {/* <Text onPress={() => handleEditProductBtn(item)}><Feather name="edit" size={23} /></Text> */}
                      </View>

                    </View>
                  </View>
          }
          
            </View>          
          }
        </View>
        }


      <View style={styles.searchContainer}>
          <TextInput value={search} onChangeText={(e) => setSearch(e)} onPress={handleSearchInput} style={styles.input} placeholder='Search Product'/>
          <Text onPress={handleSearchBtn} style={styles.searchBtn}><Feather name="search" size={30}/></Text>
      </View>
        <View style={styles.productContainer}>
          {items.length > 0 ?
            <FlatList
              data={items}
              keyExtractor={(p) => p._id.toString()}
              renderItem={({ item }) => {
                return (
                  <View style={styles.productCard}>
                    <View style={styles.flex}>
                      <View>
                        <Text style={styles.productTitle}>{item.productName}</Text>
                        <Text style={styles.productCategory}>{item.productCategory}</Text>
                      </View>

                      <View style={styles.cardInnerFlex}>

                        <View>
                          <Text style={styles.productQuantity}>Qty: {item.quantity}</Text>
                          <Text style={styles.productPrice}>Price: Rs.{item.sellingPrice}</Text>
                        </View>
                        <View style={styles.productCardVerticalBar}></View>
                        <Text onPress={() => handleEditProductBtn(item)}><Feather name="edit" size={23} /></Text>
                      </View>

                    </View>
                  </View>
                )
              }}
            /> :
            <Text>No products found!</Text>
          }
        </View>
        {showModal && <AddProduct setModal={setShowModal} fetchData={fetchProducts} user={user} />}
        {showEditProductModal && <EditProduct product={updateInfoProduct} setModal={setShowEditProductModal} user={user} fetchData={fetchProducts} />}
      </View>
    )
}

export default ShowAllProducts

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    marginTop: 10,
    zIndex: -1
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    paddingLeft: 8,
    width: "100%",
  },
  btn: {
    position: "absolute",
    right: -25,
    width: 100
  },
  productCard: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 5,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  productTitle: {
    fontWeight: "800",
    fontSize: 18
  },
  productQuantity: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right"
  },
  productCategory: {
    fontSize: 15,
    color: "gray"
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right"
  },
  cardRight: {
    width: "30%"
  },
  productCardVerticalBar: {
    height: "100%",
    width: 3,
    backgroundColor: "black"
  },
  cardInnerFlex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: "100%"
  },
  searchContainer: {
    width: "95%",
    marginHorizontal: "auto",
    marginTop: "25%",
    flexDirection: "row",
  },
  searchBtn: {
    position:"absolute",
    right: 10,
    top: 7
  },
  searchProductContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    marginTop: "38%",
    height: "100%"
  },
  searchProductCloseBtn: {
    position: "absolute",
    right: 10,
    top: 5,
  },
  searchProductInnerContainer: {
    width: "95%",
    marginHorizontal: "auto",
    marginTop: 40
  }
})