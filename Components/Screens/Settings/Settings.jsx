import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Settings = ({route}) => {
  const {user} = route.params || {};
  return (
    <View style={styles.container}>
      <View style={styles.emailCard}>
        <View style={styles.letterContainer}>
          <Text style={styles.letter}>{user.name[0]}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
        
        <View style={styles.row}></View>

        <View style={styles.accountContainer}>
          <View style={styles.accountCard}>
            <Text>🔒</Text>
            <Text>Change Password</Text>
          </View>
        </View>

    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emailCard: {
    width: "95%",
    height: "10%",
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 15
  },
  letterContainer: {
    backgroundColor: "black",
    borderRadius: "50%"
  },
  letter: {
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 20,
    fontWeight: "bold"
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18
  },
  userEmail: {
    fontSize: 15
  },
  row: {
    width: "95%",
    backgroundColor: "gray",
    height: 2,
    marginVertical: 20
  },
  accountContainer: {
    width: "95%",
    height: "25%",
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 5,
    paddingHorizontal: 10,
    gap: 15
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  }
})