import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ref, onValue } from "firebase/database";
import { db } from '../firebase/Config';

export default function LeerScreen() {

    const [datos, setdatos] = useState([])

    function leer() {

        const dato = ref(db, 'estudiantes/');
        onValue(dato, (snapshot) => {
            const data = snapshot.val();
            if (data) {

                const arreglo = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setdatos(arreglo as any);
            } else {
                setdatos([]);
            }
        });
    }

    useEffect(() => {
        leer();
    }, []);

    type Usuario = {
        cedula: string;
        nombreCompleto: string;
        carrera: String;
        horario: string;
        notaFinal: string;
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Clientes</Text>

            <FlatList
                data={datos}
                renderItem={({ item }: { item: Usuario }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.cedula}</Text>
                        <Text style={styles.info}>{item.nombreCompleto}</Text>
                        <Text style={styles.info}>Carrera: {item.carrera}</Text>
                        <Text style={styles.info}>Horario: {item.horario}</Text>
                        <Text style={styles.info}>NotaFinal: {item.notaFinal}</Text>
                        
                       

                        
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    info: {
        fontSize: 14,
        marginBottom: 3,
    },
});