import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Button from '../../UI/Button/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native';


const OrderHistory = ({navigation}) => {
  const route = useRoute();
  const {user} = route.params || {};
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(true);
  const handleBackBtn = () => {
    navigation.goBack();
  };

  useFocusEffect(
  useCallback(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://192.168.100.99:5000/user/${user.id}`);
        const data = await res.json();
        setLoader(false);
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user?.id) fetchUser();
  }, [user?.id])
);


  return loader ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large"/>
    </View>
  ) : (
    <View style={styles.container}>
      <Text onPress={handleBackBtn} style={styles.backBtnContainer}>
        <MaterialIcons name="arrow-back-ios-new" size={28} />
      </Text>
      {
      userData?.soldProduct?.length > 0 
      ?
      <FlatList 
        data={userData.soldProduct}
        keyExtractor={(e) => e._id.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.card}>
            <Text style={styles.productName}>Product name: {item.productName}</Text>
            <Text style={styles.productName}>Product sold: {item.productSold}</Text>
            <Text style={styles.productName}>Total price: {item.totalSalePrice}</Text>
            <Text style={styles.productName}>Estimated profit: {item.estimatedProfit}</Text>
            <Text style={styles.productName}>Date: {new Date(item.createdAt).toLocaleDateString("en-GB")}</Text>
        </View>
          )
        }}
        />: 
        <Text style={styles.noProductFound}>No orders found!</Text>
      }
        
    </View>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    marginTop: 60,
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    width: "95%",
    elevation: 5,
    marginVertical: 8,
    borderRadius: 8,
    marginHorizontal: "auto",
    padding: 10
  },
  productName: {
    fontSize: 16,
    fontWeight: "500"
  },
  backBtnContainer: {
    marginLeft: 5,
    marginBottom: 10
  },
  noProductFound: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500"
  }
})