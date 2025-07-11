import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { remove, ref } from 'firebase/database'; 
import { db } from '../firebase/Config';

export default function EliminarEstudiante() {
  const [cedula, setcedula] = useState("");

  function eliminar() {
    Alert.alert(
      "¿Eliminar?",
      `¿Deseas eliminar al estudiante con cédula: ${cedula}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            remove(ref(db, 'estudiantes/' + cedula))
              .then(() => {
                Alert.alert("Usuario eliminado exitosamente.");
                setcedula("");
              })
              .catch((error) => {
                Alert.alert("Error al eliminar", error.message);
              });
          },
          style: "destructive"
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar</Text>

      <TextInput
        placeholder='Ingrese cédula'
        style={styles.input}
        onChangeText={setcedula}
        value={cedula}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button
          title="🗑️ Eliminar"
          color={'red'}
          onPress={eliminar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#888',
    marginBottom: 30,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
