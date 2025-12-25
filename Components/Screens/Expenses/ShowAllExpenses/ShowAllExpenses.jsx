import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import Button from '../../../UI/Button/Button'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import AddExpense from '../AddExpense/AddExpense'

const ShowAllExpenses = ({navigation, route}) => {
  const {user} = route.params || {};

  const [expenses, setExpenses] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);

  function handleAddExpenseBtn() {
    setShowModal(true);
  }

  const fetchExpenses = async () => {
  try {
    setLoader(true);
    const res = await fetch(
      `http://192.168.100.99:5000/expenses/${user.id}`
    );
    const data = await res.json();
    setExpenses(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoader(false);
  }
};


  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [])
  );
  

  return loader ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large'/>
      </View> ):
      (
        <View>
      <View style={styles.addProductBtnContainer}>
      <Button onPress={handleAddExpenseBtn} title="Add Expense"/>
      </View>
      <View style={styles.expenseContainer}>
            {expenses.length > 0 ? 
          <FlatList 
              data={expenses}
              keyExtractor={(e) => e._id.toString()}
              renderItem={({item}) => {
                return (
                  <View style={styles.expenseCard}>
                    <View style={styles.flex}>
                      <View>
                      <Text style={styles.expenseTitle}>{item.expenseTitle}</Text>
                      <View style={styles.cardFlex}>
                      <Text style={styles.expenseCategory}>{item.expenseCategory}</Text>
                      <Text>•</Text>
                      <Text style={styles.expenseDate}>{new Date(item.createdAt).toLocaleDateString("en-GB")}</Text>
                      </View>
                      </View>
                    <View>
                      <Text style={styles.expenseAmount}>Rs.{item.expenseAmount}</Text>
                    </View>
                    </View>
                    
                </View>
                )
              }}
              />: 
              <Text>No expenses found!</Text>  
          }  
            </View>
            {showModal && <AddExpense user={user} showModal={setShowModal} refreshExpenses={fetchExpenses}/>}
    </View>
      )
}

export default ShowAllExpenses

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  addProductBtnContainer: {
    position: "absolute",
    top: 40,
    right: -55,
    width: "70%"
  },
  expenseContainer: {
    width: "95%",
    marginHorizontal: "auto",
    marginTop: 110
  },
  // input: {
  //   borderWidth: 2,
  //   borderColor: "black",
  //   borderRadius: 6,
  //   paddingLeft: 8,
  //   width: "100%"
  // },
  // btn: {
  //   position: "absolute",
  //   right: -25,
  //   width: 100
  // },
  expenseCard: {
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
cardFlex: {
  flexDirection: "row",
  alignItems: "center",
  gap: 5
},
expenseTitle: {
  fontWeight: "800",
  fontSize: 18
},
expenseCategory: {
  fontWeight: "bold",
  fontSize: 15,
  color: "gray"
},
expenseAmount: {
  fontSize: 15,
  fontSize: 17,
  fontWeight: "bold"
},
expenseDate: {
  fontWeight: "bold",
  fontSize: 15,
  color: "gray"
}
})