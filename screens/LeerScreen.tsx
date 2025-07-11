import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { set, ref, onValue } from "firebase/database";
import { db } from '../firebase/Config';

export default function LeerScreen() {


    const [datos, setdatos] = useState([])

    function leer() {
    const dato = ref(db, 'estudiantes/');
    onValue(dato, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const arreglo = Object.keys(data)
                .map(key => {
                    const estudiante = data[key];
                    const perfil = estudiante.perfil || {};
                    const academico = estudiante.academico || {};
                    const calificaciones = academico.calificaciones || {};

                    return {
                        id: key,
                        cedula: key,
                        nombreCompleto: perfil.nombre || 'Nombre no disponible',
                        carrera: academico.carrera || 'Carrera no disponible',
                        horario: academico.horario || 'Horario no disponible',
                        notaFinal: calificaciones.notaFinal || 'N/A',
                        estado: calificaciones.estado || 'N/A',
                        fechaEntrega: calificaciones.fechaEntrega || '1970-01-01T00:00:00Z',
                    };
                })
                .filter(item => item !== null);

   
            const ordenado = arreglo.sort((a, b) =>
                new Date(a.fechaEntrega).getTime() - new Date(b.fechaEntrega).getTime()
            );

            setdatos(ordenado as any);
        } else {
            setdatos([]);
        }
    });
}


    function actualizarEstado(cedula: string, nuevoEstado: 'Aprobado' | 'Reprobado') {
        const estudianteRef = ref(db, `estudiantes/${cedula}/academico/calificaciones/estado`);
        set(estudianteRef, nuevoEstado)
            .then(() => {
                Alert.alert("Estado actualizado exitosamente");
            })
            .catch((error) => {
                Alert.alert("Error al actualizar", error.message);
            });
    }


    function toggleEstado(cedula: string, estadoActual: 'Aprobado' | 'Reprobado') {
        const nuevoEstado = estadoActual === 'Aprobado' ? 'Reprobado' : 'Aprobado';
        actualizarEstado(cedula, nuevoEstado);
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
        estado: 'Aprobado' | 'Reprobado';
        fechaEntrega: string;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estudiantes ingresados</Text>

            <FlatList
                data={datos}
                renderItem={({ item }: { item: Usuario }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.cedula}</Text>
                        <Text style={styles.info}>{item.nombreCompleto}</Text>
                        <Text style={styles.info}>Carrera: {item.carrera}</Text>
                        <Text style={styles.info}>Horario: {item.horario}</Text>
                        <Text style={styles.info}>NotaFinal: {item.notaFinal}</Text>
                        <Text style={styles.info}>Fecha de Entrega: {new Date(item.fechaEntrega).toLocaleDateString()}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.info}>Estado: </Text>
                            <TouchableOpacity
                                onPress={() => toggleEstado(item.cedula, item.estado)}
                                style={{
                                    backgroundColor: item.estado === 'Aprobado' ? '#e8f5e8' : '#ffeaea',
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 5,
                                    marginLeft: 5
                                }}
                            >
                                <Text style={{
                                    color: item.estado === 'Aprobado' ? 'green' : 'red',
                                    fontWeight: 'bold'
                                }}>
                                    {item.estado === 'Aprobado' ? '✅ Aprobado' : '❌ Reprobado'}
                                </Text>


                            </TouchableOpacity>
                        </View>
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