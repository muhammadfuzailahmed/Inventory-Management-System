import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChangePassword from "./ChangePassword"
import Button from '../../UI/Button/Button';

const Settings = ({route, navigation}) => {
  const {user} = route.params || {};
  
  const handleChangePasswordBtn = () => {
    navigation.navigate("ChangePassword", {user});
  }

  const handleUpdateInfoBtn = () => {
    navigation.navigate("UpdateInfo", {user});
  }

  const handleLogoutBtn = () => {
    navigation.replace("login");
  }

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
          <Text style={styles.label}>ACCOUNT</Text>
          <TouchableOpacity onPress={handleChangePasswordBtn} style={styles.accountCard}>
            <View style={styles.flex}>
              <FontAwesome name="lock" size={23} />
              <Text style={styles.accountCardText}>Change Password</Text>
            </View>
            <View>
                <MaterialIcons name="arrow-forward-ios" size={22} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleUpdateInfoBtn} style={styles.accountCard}>
            <View style={styles.flex}>
              <FontAwesome name="user" size={23} />
              <Text style={styles.accountCardText}>Update Info</Text>
            </View>
            <View>
                <MaterialIcons name="arrow-forward-ios" size={22} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.accountContainer2}>
          <Text style={styles.label}>GENERAL</Text>
          <TouchableOpacity style={styles.accountCard}>
            <View style={styles.flex}>
              <FontAwesome name="lock" size={23} />
              <Text style={styles.accountCardText}>Order History</Text>
            </View>
            <View>
                <MaterialIcons name="arrow-forward-ios" size={22} />
            </View>
          </TouchableOpacity>

          <View style={styles.accountCard}>
            <View style={styles.flex}>
              <FontAwesome name="user" size={23} />
              <Text style={styles.accountCardText}>App Version</Text>
            </View>
            <View>
                <Text style={styles.accountCardText}>v1.1.0</Text>
            </View>
          </View>
        </View>
        <View style={styles.logoutBtnContainer}>
          <Button onPress={handleLogoutBtn} title="Logout"/>
        </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
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
    width: "10%",
    borderRadius: "50%",
    padding: 5
  },
  letter: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    textAlign: "center"
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
  label: {
    fontSize: 19,
    position: "absolute",
    top: -30,
  },
  accountContainer: {
    width: "95%",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 5,
    paddingHorizontal: 10,
    gap: 5,
    marginTop: 35,
    position: "relative"
  },
  accountContainer2: {
    width: "95%",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 5,
    paddingHorizontal: 10,
    gap: 5,
    marginTop: 55,
    position: "relative"
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    padding: 10,
  },
  accountCardText: {
    fontSize: 17
  },
  flex: {
    flexDirection: "row",
    gap: 15
  },
  logoutBtnContainer: {
    width: "100%",
    marginTop: 15
  },

})