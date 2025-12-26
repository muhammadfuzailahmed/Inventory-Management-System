import { Alert, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Button from "../../UI/Button/Button"
import Toast from 'react-native-toast-message';

const ChangePassword = ({ navigation, route }) => {
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleChangePassswordBtn = () => {
        if(!oldPassword || !newPassword || !confirmNewPassword) {
            Toast.show({
                type: "error",
                text1: "Fill required fields"
            });
            return;
        }
        Alert.alert("Button Pressed")
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Change Password</Text>
            <View style={styles.horizontalBar}></View>

            <View style={styles.formContainer}>
                <TextInput value={oldPassword} onChangeText={(e) => setOldPassword(e)} style={styles.input} placeholder='Enter Old Password' />
                <TextInput value={newPassword} onChangeText={(e) => setNewPassword(e)} style={styles.input} placeholder='Enter New Password' />
                <TextInput value={confirmNewPassword} onChangeText={(e) => setConfirmNewPassword(e)} style={styles.input} placeholder='Confirm New Password' />
                <Button onPress={handleChangePassswordBtn} title="Change Password"/>
            </View>
        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold"
    },
    horizontalBar: {
        width: "45%",
        backgroundColor: "navy",
        height: 6,
        borderRadius: 50
    },
    formContainer: {
        marginTop: 15,
        width: "90%",
        marginHorizontal: "auto"
    },
    input: {
        borderWidth: 2,
        borderColor: "navy",
        borderRadius: 6,
        width: "100%",
        paddingHorizontal: 8,
        marginBottom: 10
    },
})