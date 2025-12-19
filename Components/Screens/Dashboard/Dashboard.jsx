import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ route }) => {
  const { user } = route.params || {};
  const [userData, setUserData] = useState(user);
  const [totalValue, setTotalValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useFocusEffect(
  useCallback(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://192.168.100.99:5000/user/${user.id}`);
        const data = await res.json();
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

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoName}>{userData?.name[0]}</Text>
        </View>
        <Text style={styles.greeting}>Hello, {userData?.name}👋</Text>
      </View>
      <Text style={styles.overviewText}>Here's current overview</Text>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardImg}>💲</Text>
          <Text style={styles.cardText}>Total Value</Text>
            <Text style={styles.cardTotal}>Rs.{totalValue}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardImg}>📈</Text>
          <Text style={styles.cardText}>Total Profit</Text>
          <Text style={styles.cardTotal}>Rs. {totalProfit}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardImg}>🛒</Text>
          <Text style={styles.cardText}>Total Expenses</Text>
          <Text style={styles.cardTotal}>Rs.{totalExpenses}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardImg}>👜</Text>
          <Text style={styles.cardText}>Total Value</Text>
          <Text style={styles.cardTotal}>$12,500</Text>
        </View>
      </View>

    <Text style={styles.lowStock}>Low Stock Warning</Text>
    <View style={styles.horizontalBar}></View>

    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
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
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  overviewText: {
    marginTop: 5,
    fontSize: 17
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
    fontSize: 24,
    marginBottom: 5
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
  }
})