import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/Config';


export default function RegistroScreen({navigation}:any) {
    const [correo, setCorreo] = useState('')
    const [password, setpasword] = useState('')

    function registrar() {
        
        createUserWithEmailAndPassword(auth, correo, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                navigation.navigate('Login')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>RegistroScreen</Text>
            <TextInput placeholder='Email' style={styles.input} onChangeText={setCorreo} />
            <TextInput placeholder='Password' style={styles.input} onChangeText={setpasword} />


            <TouchableOpacity onPress={() => registrar()} style={styles.button}>
                <Text style={styles.textButton} >Registro</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        margin: 10,
        fontSize: 20,
        borderRadius: 5,
        width: '80%',
    },
    button: {
        backgroundColor: '#043346',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})