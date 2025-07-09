import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/Config';


export default function LoginScreen({navigation}:any) {
    const [correo, setCorreo] = useState('')
    const [password, setpassword] = useState('')


     function login() {

        signInWithEmailAndPassword(auth, correo, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                navigation.navigate('Home')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

            });

    }


    return (
        <View style={styles.container}>

            <Text style={styles.title}>LoginScreen</Text>

            <TextInput placeholder='Email' style={styles.input} onChangeText={setCorreo} />
            <TextInput placeholder='Password' style={styles.input} onChangeText={setpassword} />

            <TouchableOpacity onPress={() => login()}>
                <Text style={styles.textButton}>Login</Text>
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
        color: 'blue',
        fontSize: 20,
        fontWeight: 'bold',
    },
})