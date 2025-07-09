import { NavigationContainer } from "@react-navigation/native";
import EditarScreen from "../screens/EditarScreen";
import GuardarScreen from "../screens/GuardarScreen";
import HomeScreen from "../screens/HomeScreen";
import LeerScreen from "../screens/LeerScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import EliminarScreen from "../screens/EliminarScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Login">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Registro" component={RegistroScreen} />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Drawer" 
        component={MyDrawer} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Guardar" component={GuardarScreen} />
      <Stack.Screen name="Leer" component={LeerScreen} />
      <Stack.Screen name="Editar" component={EditarScreen} />
      <Stack.Screen name="Eliminar" component={EliminarScreen} />
      
    </Stack.Navigator>
  );
}

export default function Navegador() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
