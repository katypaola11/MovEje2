import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ref, remove } from 'firebase/database';
import { db } from '../firebase/Config';


export default function EliminarScreen({navigation}:any) {

    const [cedula, setcedula] = useState("")

function eliminar() {
  Alert.alert(
    "¿Eliminar?",
    `Deseas eliminar : ${cedula}`,
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: () => {
          remove(ref(db, 'estudiante/' + cedula));
          Alert.alert( "Usuario eliminado exitosamente.");
          setcedula("");
        },
        style: "destructive"
      }
    ]
  );
}
  return (
    <View>
      <Text>Eliminar</Text>
     
      <TextInput
      placeholder='ingresar Cedula'
      style={{fontSize:30}}
      onChangeText={(texto)=> setcedula(texto)}
      value={cedula}
      />
      <Button title="Eliminar"  color={'red'} onPress={()=> eliminar()} />
       
    </View>
  )
}

const styles = StyleSheet.create({})