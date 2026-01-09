import { FlatList, Image, Modal, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native';
import tick from "../../Assets/tick.png"
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const OrderHistory = ({ navigation }) => {
  const route = useRoute();
  const { user } = route.params || {};
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [saleInvoice, setSaleInvoice] = useState(false);
  const [invoicePageData, setInvoicePageData] = useState({})

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

  const handleInvoiceModal = (item) => {
    setSaleInvoice(true)
    setInvoicePageData(item);
    console.log(item)
  }

  return loader ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      {saleInvoice
        &&
        <Modal animationType='slide'>
          <Text onPress={() => setSaleInvoice(false)} style={styles.close}>
            <FontAwesome name="close" size={25} />
          </Text>

          <Text style={styles.headingText}>InventoryPro</Text>

          <View style={styles.saleSuccessfullCard}>
            <Image style={styles.tickImg} source={tick} />
            <Text style={styles.saleSuccessfullCardText}>The product has been sold successfully.</Text>
          </View>

          <View style={styles.dateTimeContainer}>
            <View style={styles.flex}>
              <Text><FontAwesome name="calendar" size={20} /></Text>
              <Text>{new Date(invoicePageData.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              })}</Text>
            </View>

            <View style={styles.flex}>
              <Text><FontAwesome name="user" size={25} /></Text>
              <Text>ID# {invoicePageData.soldProductId}</Text>
            </View>

          </View>

          <View style={styles.productDetailsContainer}>
            <Text style={styles.productContainerHeading}>Product Details:</Text>

            <View style={styles.productDetailsContainerFlex}>
              <Text style={styles.productInfo}>Product Name:</Text>
              <Text style={styles.productInfo}>{invoicePageData.productName}</Text>
            </View>

            <View style={styles.productDetailsContainerFlex}>
              <Text style={styles.productInfo}>Quantity Sold:</Text>
              <Text style={styles.productInfo}>{invoicePageData.productSold}</Text>
            </View>

            <View style={styles.productDetailsContainerFlex}>
              <Text style={styles.productInfo}>Total Sale Price:</Text>
              <Text style={styles.productInfo}>Rs. {invoicePageData.totalSalePrice}</Text>
            </View>

            <View style={styles.productDetailsContainerFlex}>
              <Text style={styles.productInfo}>Estimated Profit:</Text>
              <Text style={StyleSheet.flatten([styles.productInfo, styles.greenText])}>Rs. {invoicePageData.estimatedProfit}</Text>
            </View>

            <View style={StyleSheet.flatten([styles.productDetailsContainerFlex, styles.mt])}>
              <Text style={styles.productInfo}>Total Amount:</Text>
              <Text style={styles.productInfo}>Rs. {invoicePageData.totalSalePrice * invoicePageData.productSold}</Text>
            </View>

          </View>




        </Modal>
      }
      <Text onPress={handleBackBtn} style={styles.backBtnContainer}>
        <MaterialIcons name="arrow-back-ios-new" size={28} />
      </Text>
      {
        userData?.soldProduct?.length > 0
          ?
          <FlatList
            data={userData.soldProduct}
            keyExtractor={(e) => e._id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => handleInvoiceModal(item)} style={styles.card}>
                  <Text style={styles.productName}>Product name: {item.productName}</Text>
                  <Text style={styles.productName}>Product sold: {item.productSold}</Text>
                  <Text style={styles.productName}>Total price: {item.totalSalePrice}</Text>
                  <Text style={styles.productName}>Estimated profit: {item.estimatedProfit}</Text>
                  <Text style={styles.productName}>Date: {new Date(item.createdAt).toLocaleDateString("en-GB")}</Text>
                </TouchableOpacity>
              )
            }}
          /> :
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
    marginTop: 30,
    flex: 1,
    paddingVertical: 20
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
  },
  close: {
    textAlign: "right",
    marginTop: 10,
    marginRight: 10
  },
  headingText: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    color: "navy"
  },
  saleSuccessfullCard: {
    width: "95%",
    height: "20%",
    backgroundColor: "#e2ddddff",
    marginHorizontal: "auto",
    marginTop: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  tickImg: {
    width: "20%",
    height: "45%",
  },
  saleSuccessfullCardText: {
    marginTop: 10,
    fontWeight: "500",
    fontSize: 15
  },
  dateTimeContainer: {
    padding: 10,
    backgroundColor: "#e2ddddff",
    width: "95%",
    marginHorizontal: "auto",
    borderRadius: 8,
    marginTop: 15
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8
  },
  productDetailsContainer: {
    padding: 10,
    backgroundColor: "#e2ddddff",
    width: "95%",
    marginHorizontal: "auto",
    borderRadius: 8,
    marginTop: 15
  },
  productContainerHeading: {
    fontSize: 19,
    fontWeight: 600,
    marginBottom: 10
  },
  productDetailsContainerFlex: {
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5
  },
  productInfo: {
    fontSize: 18,
    fontWeight: 500
  },
  mt: {
    marginTop: 15
  },
  greenText: {
    color: "green"
  }
})