import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';

import { ref, set } from "firebase/database";
import { db } from '../firebase/Config';

export default function GuardarScreen() {
    const [cedula, setcedula] = useState('');
    const [nombreCompleto, setnombreCompleto] = useState('');
    const [carrera, setcarrera] = useState('');
    const [horario, sethorario] = useState('');
    const [estado, setestado] = useState('Aprobado');
    const [fechaEntrega, setfechaEntrega] = useState(new Date().toLocaleDateString());


    const [notaFinal, setnotaFinal] = useState('');

    function guardar() {

        set(ref(db, 'estudiantes/' + cedula), {
            perfil: {
                nombre: nombreCompleto,
                email: nombreCompleto.toLowerCase() + "@estudiante.com",

            },
            academico: {
                carrera: carrera,
                horario: horario,
                calificaciones: {
                    notaFinal: notaFinal,
                    estado: estado,
                    fechaEntrega: fechaEntrega,
                }
            },
        })

        Alert.alert("El estudiante ha sido registrado exitosamente.");

        setcarrera("");
        setcedula("");
        setnombreCompleto("");
        sethorario("");
        setestado("Aprobado");
        setnotaFinal("");
        setfechaEntrega(new Date().toLocaleDateString());
    }



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar Estudiante</Text>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Cédula *</Text>
                    <TextInput
                        style={styles.input}
                        value={cedula}
                        onChangeText={setcedula}
                        placeholder="Ingrese la cédula (10 dígitos)"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        maxLength={10}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre Completo </Text>
                    <TextInput
                        style={styles.input}
                        value={nombreCompleto}
                        onChangeText={setnombreCompleto}
                        placeholder="Ingrese el nombre completo"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Carrera </Text>
                    <TextInput
                        style={styles.input}
                        value={carrera}
                        onChangeText={setcarrera}
                        placeholder="Ingrese la carrera"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Horario </Text>
                    <TextInput
                        style={styles.input}
                        value={horario}
                        onChangeText={sethorario}
                        placeholder="Ej: Lunes a Viernes 8:00-12:00"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Estado</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setestado(estado === 'Aprobado' ? 'Reprobado' : 'Aprobado')}
                    >
                        <Text style={{ color: estado === 'Aprobado' ? 'green' : 'red', fontSize: 16 }}>
                            {estado}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nota Final </Text>
                    <TextInput
                        style={styles.input}
                        value={notaFinal}
                        onChangeText={setnotaFinal}
                        placeholder="Ingrese la nota (0-100)"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Fecha de Entrega </Text>
                    <TextInput
                        style={styles.input}
                        value={fechaEntrega}
                        onChangeText={setfechaEntrega}
                        placeholder="Fecha de entrega (DD/MM/YYYY)"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={() => guardar()}

                    >
                        <Text style={styles.buttonText}>💾 Guardar</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});