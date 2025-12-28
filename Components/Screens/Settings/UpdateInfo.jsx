import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Button from '../../UI/Button/Button';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UpdateInfo = ({ navigation }) => {
    const route = useRoute();
    const { user } = route.params || {};

    const [updateInfo, setUpdateInfo] = useState(false);
    const [loginCard, setLoginCard] = useState(false);
    const [name, setName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [CNIC, setCNIC] = useState("");
    const [email, setEmail] = useState("");

    const handleUpdateInfoBtn = () => {
        setUpdateInfo(true);
    }

    const handleBackBtn = () => {
        navigation.goBack();
    }

    const handleSaveInfoBtn = async () => {
        if (!name || !businessName || !CNIC || !email) {
            Toast.show({
                type: "error",
                text1: "Fill required fields"
            });
            return;
        }
        const id = user.id;
        await axios.post("http://192.168.100.99:5000/updateInfo", {
            id,
            name,
            businessName,
            CNIC,
            email
        }).then(() => {
            Toast.show({
                type: "success",
                text1: "Info updated successfully!",
            });
            setLoginCard(true);
            return;
        }).catch(() => {
            Toast.show({
                type: "error",
                text1: "Error updating info"
            });
        })

    }

    const handleCloseBtn = () => {
        setLoginCard(false);
    }

    const handleLoginCardBtn = () => {
        navigation.navigate("login");
    }

    return (
        <View style={styles.container}>
            <Text onPress={handleBackBtn} style={styles.backBtnContainer}>
                <MaterialIcons name="arrow-back-ios-new" size={28} />
            </Text>
            <View style={styles.horizontalBar}></View>
            <Text style={styles.heading}>Update Info</Text>
            <View style={styles.horizontalBarHeading}></View>

            {updateInfo ?
                <View style={styles.formContainer}>
                    <TextInput value={name} onChangeText={(e) => setName(e)} style={styles.input} placeholder='Enter name' />
                    <TextInput value={businessName} onChangeText={(e) => setBusinessName(e)} style={styles.input} placeholder='Enter Business name' />
                    <TextInput value={CNIC} onChangeText={(e) => setCNIC(e)} style={styles.input} placeholder='Confirm CNIC' />
                    <TextInput value={email} onChangeText={(e) => setEmail(e)} style={styles.input} placeholder='Confirm email' />
                    <Button onPress={handleSaveInfoBtn} title="Save Info" />
                </View>
                :
                <View style={styles.formContainer}>
                    <TextInput value={user?.name} style={styles.input} placeholder='Enter name' />
                    <TextInput value={user?.businessName} style={styles.input} placeholder='Enter Business name' />
                    <TextInput value={user?.CNIC} style={styles.input} placeholder='Confirm CNIC' />
                    <TextInput value={user?.email} style={styles.input} placeholder='Confirm email' />
                    <Button onPress={handleUpdateInfoBtn} title="Update Info" />
                </View>}
            {loginCard
                &&
                <View style={styles.loginCard}>
                    <View style={styles.closeBtn}>
                        <Text onPress={handleCloseBtn}>
                            <FontAwesome name="close" size={25} />
                        </Text>
                    </View>
                    <Text style={styles.loginCardText}>Please login to see updated info</Text>
                    <Button onPress={handleLoginCardBtn} title="Login now" />
                </View>}
        </View>
    )
}

export default UpdateInfo

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
    loginCard: {
        width: "90%",
        height: "30%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        position: "absolute",
        elevation: 5,
        borderRadius: 8
    },
    closeBtn: {
        position: "absolute",
        right: 15,
        top: 10,
    },
    loginCardText: {
        fontWeight: "bold",
        fontSize: 17
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