import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const Dashboard = ({ route }) => {
  const { user } = route.params || {};
  const [userData, setUserData] = useState(user);
  const [totalValue, setTotalValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSellAmount, setTotslSellAmount] = useState(0);
  const [loader, setLoader] = useState(true);

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

  useEffect(() => {
    calculateTotalValue();
    calculateTotalProfit();
    calculateTotalExpenses();
    calculateTotalSales();
  }, [userData])

  const calculateTotalValue = () => {
    const total = userData?.inventory?.reduce((sum, t) => {
      return sum + (t.buyingPrice * t.quantity)
    }, 0)
    setTotalValue(total);
  }

  const calculateTotalProfit = () => {
    const total = userData?.inventory?.reduce((sum, t) => {
      return sum + ((t.sellingPrice - t.buyingPrice) * t.quantity)
    }, 0)
        setTotalProfit(total);
  }

  const calculateTotalExpenses = () => {
    const total = userData?.expenseList?.reduce((sum, t) => {
      return sum + t.expenseAmount;
    }, 0)
    setTotalExpenses(total);
  }

  const calculateTotalSales = () => {
    const total = userData?.soldProduct?.reduce((sum, t) => {
      return sum + t.totalSalePrice;
    }, 0)
    setTotslSellAmount(total);
  }

  return loader ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.flexUsername}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoName}>{userData?.name[0]}</Text>
        </View>
        <Text style={styles.greeting}>Hello, {userData?.name}👋</Text>
      </View>
      <Text style={styles.overviewText}>Here's current overview</Text>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardImg}>
            <MaterialIcons name="attach-money" size={30}/>
          </Text>
          <Text style={styles.cardText}>Total Value</Text>
            <Text style={styles.cardTotal}>Rs.{totalValue}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardImg}>
            <Entypo name="area-graph" size={30}/>
          </Text>
          <Text style={styles.cardText}>Total Profit</Text>
          <Text style={styles.cardTotal}>Rs. {totalProfit}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardImg}>
            <MaterialIcons name="shopping-cart" size={30}/>
          </Text>
          <Text style={styles.cardText}>Total Expenses</Text>
          <Text style={styles.cardTotal}>Rs.{totalExpenses}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardImg}>
            <Feather name="activity" size={30}/>
          </Text>
          <Text style={styles.cardText}>Total Sales</Text>
          <Text style={styles.cardTotal}>Rs. {totalSellAmount}</Text>
        </View>
      </View>

    <Text style={styles.lowStock}>Low Stock Items</Text>
    <View style={styles.horizontalBar}></View>

    <View style={styles.lowStockWarningContainer}>
        <FlatList 
        data={userData.inventory}
        keyExtractor={(e) => e._id.toString()}
        renderItem={({item}) => {
          if (item.quantity < 15) {
          return (
            <View style={styles.lowStockCard}>
          <View style={styles.flex}>
            <View>
            <Text style={styles.productTitle}>{item.productName}</Text>
            <Text style={styles.productCategory}>{item.productCategory}</Text>
            </View>
          <Text style={styles.productQuantity}>Left: {item.quantity}</Text>
          </View>
        </View>
          )  
          }
          
        }}
        />
    </View>

    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },  
  container: {
    flex: 1,
    marginTop: 55,
    paddingHorizontal: 10
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold"
  },
  logoContainer: {
    backgroundColor: "black",
    width: "10%",
    borderRadius: "50%",
    padding: 5
  },
  logoName: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    textAlign: "center"
  },
  flexUsername: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  overviewText: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: "500"
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "48%",
    paddingHorizontal: 8,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImg: {
    marginBottom: 5,
  },
  cardText: {
    fontSize: 18,
    marginBottom: 3
  },
  cardTotal: {
    fontSize: 18,
    fontWeight: "bold"
  },
  lowStock:{
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold"
  },
  horizontalBar: {
    width: "50%",
    backgroundColor: "navy",
    height: 5,
    borderRadius: 25,
    marginBottom: 15
  },
  lowStockWarningContainer: {
    marginTop: 0
  },
  lowStockCard: {
    backgroundColor: "#fff",
    padding:14,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 8
  },
  productTitle: {
  fontWeight: "800",
  fontSize: 18
},
productCategory: {
  fontWeight: "bold",
  fontSize: 15,
  color: "gray"
},
productQuantity:{
  fontSize: 18,
  fontWeight: "bold",
  backgroundColor: "red",
  color: "#fff",
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 50
},
flex: {
  flexDirection:"row",
  alignItems: "center",
  justifyContent: "space-between",
  marginHorizontal: 10
}
})