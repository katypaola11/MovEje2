import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export default function HomeScreen({navigation}: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CRUD </Text>
      
      <View style={styles.cardContainer}>

        <TouchableOpacity style={[styles.card, styles.createCard]} onPress={()=> navigation.navigate("Guardar") }>
          <Text style={styles.cardIcon}>➕</Text>
          <Text style={styles.cardTitle}>Create</Text>
          <Text style={styles.cardDescription}>Añade nuevos registros a la base de datos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.readCard]} onPress={()=> navigation.navigate("Leer") }>
          <Text style={styles.cardIcon}>👀</Text>
          <Text style={styles.cardTitle}>Read</Text>
          <Text style={styles.cardDescription}>Consulta datos desde Firebase</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.updateCard]} onPress={()=> navigation.navigate("Editar") }>
          <Text style={styles.cardIcon}>🔄</Text>
          <Text style={styles.cardTitle}>Update</Text>
          <Text style={styles.cardDescription}>Modifica registros existentes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.deleteCard]} onPress={()=> navigation.navigate("Eliminar") }>
          <Text style={styles.cardIcon}>❌</Text>
          <Text style={styles.cardTitle}>Delete</Text>
          <Text style={styles.cardDescription}>Elimina datos de la colección</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e0e5ec',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2c3e50',
    marginTop: 30,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 420,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#e0e5ec',
    borderRadius: 16,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#ffffff',
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#d1d9e6',
  },
  createCard: {
    backgroundColor: '#d1f5d3',
  },
  readCard: {
    backgroundColor: '#d0e9ff',
  },
  updateCard: {
    backgroundColor: '#fff4d1',
  },
  deleteCard: {
    backgroundColor: '#ffd4d2',
  },
  cardIcon: {
    fontSize: 34,
    marginBottom: 15,
    color: '#34495e',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#4a4a4a',
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
});
