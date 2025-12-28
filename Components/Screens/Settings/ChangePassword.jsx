import { Alert, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Button from "../../UI/Button/Button"
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChangePassword = ({ navigation }) => {
    const route = useRoute();
    const { user } = route.params || {};
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleBackBtn = () => {
        navigation.goBack();
    }

    const handleChangePassswordBtn = async () => {
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            Toast.show({
                type: "error",
                text1: "Fill required fields"
            });
            return;
        }
        if (password.length < 8) {
            Toast.show({
                type: "error",
                text1: "Password should be of minimum 8 characters!",
                topOffset: 60
            });
            return;
        }
        if (newPassword !== confirmNewPassword) {
            Toast.show({
                type: "error",
                text1: "Password does not match"
            });
            return;
        }
        let id = user.id;
        await axios.post("http://192.168.100.99:5000/changePassword", {
            id,
            oldPassword,
            newPassword,
            confirmNewPassword
        }).then(() => {
            Toast.show({
                type: "success",
                text1: "Password updated successfully!"
            });
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            navigation.navigate("login");
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    Toast.show({
                        type: "error",
                        text1: "User not found"
                    })
                } else if (error.response.status === 401) {
                    Toast.show({
                        type: "error",
                        text1: "Incorrect password"
                    })
                }
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text onPress={handleBackBtn} style={styles.backBtnContainer}>
                <MaterialIcons name="arrow-back-ios-new" size={28} />
            </Text>
            <View style={styles.horizontalBar}></View>
            <Text style={styles.heading}>Change Password</Text>
            <View style={styles.horizontalBarHeading}></View>

            <View style={styles.formContainer}>
                <TextInput value={oldPassword} onChangeText={(e) => setOldPassword(e)} style={styles.input} placeholder='Enter Old Password' />
                <TextInput value={newPassword} onChangeText={(e) => setNewPassword(e)} style={styles.input} placeholder='Enter New Password' />
                <TextInput value={confirmNewPassword} onChangeText={(e) => setConfirmNewPassword(e)} style={styles.input} placeholder='Confirm New Password' />
                <Button onPress={handleChangePassswordBtn} title="Change Password" />
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
    horizontalBarHeading: {
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
    backBtnContainer: {
        position: "absolute",
        top: 60,
        left: 10
    },
    horizontalBar: {
        position: "absolute",
        top: 95,
        left: 10,
        width: "95%",
        backgroundColor: "navy",
        height: 3,
        marginHorizontal: "auto"
    }
})