import { StyleSheet, Text, View, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'
import Button from '../../../UI/Button/Button';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const AddExpense = ({user, showModal, refreshExpenses}) => {
  const [title, setTile] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleCancelBtn = () => {
    showModal(false);
    refreshExpenses();
  }

  const handleAddExpenseBtn = async () => {
    if (!title || !category || !amount) {
      Toast.show({
        type: "error",
        text1: "Fill all required fields"
      })
      return;
    };
    let id = user.id;
    let reponse = await axios.post("http://192.168.100.99:5000/addExpense", {
      title,
      category,
      amount,
      id
    }).then(() => {
      showModal(false);
      refreshExpenses();
      Toast.show({
        type: "success",
        text1: "Expense Added Successfully!"
      });

      setTile("");
      setCategory("");
      setAmount("");
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
            text1: "Can't add expense!"
          })
        }
      }
    })

  }


  return (
    <Modal animationType='slide'>
    <View style={styles.container}>
      <View style={styles.cancelBtnContainer}>
        <Button onPress={handleCancelBtn} title="Back"/>
      </View>
      <Text style={styles.expense}>Add Expense</Text>
      <View style={styles.horizontalBar}></View>
      <View style={styles.addExpenseForm}>
        <TextInput value={title} onChangeText={(e) => setTile(e)} style={styles.input} placeholder='Title' />
        <TextInput value={category} onChangeText={(e) => setCategory(e)} style={styles.input} placeholder='Category' />
        <TextInput value={amount} onChangeText={(e) => setAmount(e)} style={styles.input} placeholder='Amount' />
        {/* <TextInput value={date} onChangeText={(e) => setDate(e)} style={styles.input} placeholder='Data' /> */}
      </View>
      <Button onPress={handleAddExpenseBtn} title="Add Expense" />
    </View>
    </Modal>
  )
}

export default AddExpense

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
  expense: {
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
  addExpenseForm: {
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
  }
})