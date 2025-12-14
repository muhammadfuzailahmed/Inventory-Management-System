import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Dashboard = ({ route }) => {
  const { user } = route.params || {};
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoName}>{user?.name[0]}</Text>
        </View>
        <Text style={styles.greeting}>Hello, {user?.name}👋</Text>
      </View>
      <Text style={styles.overviewText}>Here's current overview</Text>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardImg}>💲</Text>
          <Text style={styles.cardText}>Total Value</Text>
          <Text style={styles.cardTotal}>$12,500</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardImg}>📈</Text>
          <Text style={styles.cardText}>Total Value</Text>
          <Text style={styles.cardTotal}>$12,500</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardImg}>🛒</Text>
          <Text style={styles.cardText}>Total Value</Text>
          <Text style={styles.cardTotal}>$12,500</Text>
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