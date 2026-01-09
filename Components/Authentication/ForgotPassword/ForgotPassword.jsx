import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Button from '../../UI/Button/Button'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const ForgotPassword = ({ navigation }) => {
    const [isVerified, setIsVerified] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loader, setLoader] = useState(false)

    const handleVerifyEmailBtn = async () => {
        if (!email) {
            Toast.show({
                type: "error",
                text1: "Email is required!"
            });
            return;
        } else if (!email.includes("@") && !email.includes(".com")) {
            Toast.show({
                type: "error",
                text1: "Please enter valid Email!"
            });
            return;
        }
        setLoader(true);
        await axios.post("http://192.168.100.99:5000/forgotPassword", {
            email,
            password
        }).then(() => {
            setLoader(false);
            setIsVerified(true);
        }).catch((error) => {
            setLoader(false)
            if (error.response) {
                if (error.response.status === 404) {
                    Toast.show({
                        type: "error",
                        text1: error.response.data.message,
                        topOffset: 60
                    });
                }
            }
        }).finally(() => {
        setLoader(false); 
    });
    }

    const handleForgotPasssPageCloseBtn = () => {
        navigation.goBack();
    }

    const handleChangePasswordBtn = async () => {

        if (!password || !confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Fill required fields!"
            });
            return;
        } else if (password !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Password does not match"
            });
            return;
        } else if (password.length < 8) {
            Toast.show({
                type: "error",
                text1: "Password should be of minimum 8 characters!"
            });
            return;
        }
        setLoader(true);
        await axios.post("http://192.168.100.99:5000/forgotPassword", {
            email,
            password
        }).then(() => {
            setLoader(false);
            setIsVerified(true);
        }).catch((error) => {
            setLoader(false)
            if (error.response) {
                if (error.response.status === 404) {
                    Toast.show({
                        type: "error",
                        text1: error.response.data.message,
                        topOffset: 60
                    });
                }
            }
        }).finally(() => {
        setLoader(false); 
    });
        Toast.show({
            type: "success",
            text1: "Password Changed Successfully!"
        });
        navigation.navigate("login")
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <View style={styles.container}>
            {
                loader
                &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' />
                </View>
            }
            <Text onPress={handleForgotPasssPageCloseBtn} style={styles.close}>
                <MaterialIcons name="arrow-back-ios-new" size={28} />
            </Text>
            <Text style={styles.heading}>Forgot Password</Text>
            <View style={styles.forgotPassHorizontalBar}></View>
            <View style={styles.formContainer}>
                {isVerified ?
                    <>
                        <TextInput value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} style={styles.input} placeholder='Enter New Password' />
                        <TextInput value={confirmPassword} onChangeText={(e) => setConfirmPassword(e)} secureTextEntry={true} style={styles.input} placeholder='Confirm Password' />
                        <Button onPress={handleChangePasswordBtn} title="Change Password" />
                    </>
                    :
                    <>
                        <TextInput value={email} onChangeText={(e) => setEmail(e)} style={styles.input} placeholder='Enter Email' />
                        <Button onPress={handleVerifyEmailBtn} title="Verify Email" />
                    </>
                }
            </View>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    loadingContainer: {
        position: "absolute"
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
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
    forgotPassHorizontalBar: {
        width: "45%",
        height: 5,
        backgroundColor: "navy"
    },
    close: {
        position: "absolute",
        left: 10,
        top: 60
    },

})