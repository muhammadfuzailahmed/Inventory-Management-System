import { Alert, Modal, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../../UI/Button/Button';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const EditProduct = ({ product, setModal, user, fetchData }) => {
    const [productName, setProductName] = useState(product.productName);
    const [productCategory, setProductCategory] = useState(product.productCategory);
    const [buyingPrice, setBuyingPrice] = useState(String(product.buyingPrice));
    const [sellingPrice, setSellingPrice] = useState(String(product.sellingPrice));
    const [quantity, setQuantity] = useState(String(product.quantity));
    const [productDescription, setProductDescription] = useState(product.productDescription);
    const [loader, setLoader] = useState(false);

    const handleBackBtn = () => {
        setModal(false);
        fetchData();
    };

    const handleUpdateProductInfoBtn = async () => {
        if (!productName || !productCategory || !buyingPrice || !sellingPrice || !quantity || !productDescription) {
            // Toast.show({
            //     type: "error",
            //     text1: "Fill all required fields!"
            // });
            Alert.alert("Fill all required Fields")
            return;
        }
        setLoader(true);
        await axios.post("http://192.168.100.99:5000/updateProductInfo", {
            id: user.id,
            productId: product.productId,
            productName,
            productCategory,
            buyingPrice,
            sellingPrice,
            quantity,
            productDescription
        }).then(() => {
            setLoader(false);
            setModal(false);
            Toast.show({
                type: "success",
                text1: "Info updated successfully!"
            });
            fetchData();
            return;
        }).catch(() => {
            setLoader(false);
            setModal(false);
            Toast.show({
                type: "error",
                text1: "Error updating info!"
            });
            fetchData();
            return;
        })

    }

    return (
        <Modal animationType="slide">
            <View style={styles.container}>
            {loader && 
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large'/>
            </View>
            }
                <Text onPress={handleBackBtn} style={styles.backBtnContainer}>
                    <MaterialIcons name="arrow-back-ios-new" size={28} />
                </Text>
                <Text style={styles.product}>Update Product Info</Text>
                <View style={styles.horizontalBar}></View>
                <View style={styles.addProdoctForm}>
                    <TextInput
                        value={productName}
                        onChangeText={e => setProductName(e)}
                        style={styles.input}
                        placeholder="Product Name"
                    />
                    <TextInput
                        value={productCategory}
                        onChangeText={e => setProductCategory(e)}
                        style={styles.input}
                        placeholder="category"
                    />
                    <View style={styles.formFlex}>
                        <TextInput
                            value={buyingPrice}
                            onChangeText={e => setBuyingPrice(e)}
                            style={styles.flexInput}
                            placeholder="Buying price"
                        />
                        <TextInput
                            value={sellingPrice}
                            onChangeText={e => setSellingPrice(e)}
                            style={styles.flexInput}
                            placeholder="Selling price"
                        />
                    </View>
                    <TextInput
                        value={quantity}
                        onChangeText={e => setQuantity(e)}
                        style={styles.input}
                        placeholder="Quantity"
                    />
                    <TextInput
                        value={productDescription}
                        onChangeText={e => setProductDescription(e)}
                        style={styles.input}
                        placeholder="Description"
                    />
                </View>
                <Button onPress={handleUpdateProductInfoBtn} title="Update Product Info" />
            </View>
        </Modal>
    );
};

export default EditProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingContainer: {
        position: "absolute"
    },
    backBtnContainer: {
        position: 'absolute',
        top: 15,
        left: 10,
    },
    product: {
        textAlign: 'center',
        color: '#000',
        fontSize: 32,
        fontWeight: 'bold',
    },
    horizontalBar: {
        width: '55%',
        backgroundColor: 'navy',
        height: 5,
        borderRadius: 25,
    },
    addProdoctForm: {
        marginTop: 15,
        width: '90%',
        marginHorizontal: 'auto',
    },
    input: {
        width: '100%',
        borderWidth: 2,
        marginBottom: 12,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    flexInput: {
        width: '45%',
        borderWidth: 2,
        marginBottom: 12,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    formFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
