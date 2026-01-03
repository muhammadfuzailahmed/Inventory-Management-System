import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EditProduct = ({ product, setModal }) => {

    const handleBackBtn = () => {
        setModal(false);
    }

    return (
        <Modal animationType='slide'>
            <Text onPress={handleBackBtn} style={styles.backBtnContainer}>
                <MaterialIcons name="arrow-back-ios-new" size={28} />
            </Text>
        </Modal>
    )
}

export default EditProduct

const styles = StyleSheet.create({
    backBtnContainer: {
    position: "absolute",
    top: 15,
    left: 10
  }
})