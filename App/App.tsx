import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Register from "./Register";
import Produto from "./Produto";
import Home from "./Home";
import SearchResults from "./SearchResults";
import Carrinho from "./Carrinho";
import CarrinhoItens from "./CarrinhoItens";
import { CartProvider } from "./CartContext";
import LoginPharmacy from "./pharmacy_components/LoginPharmacy";
import RegisterPharmacy from "./pharmacy_components/RegisterPharmacy";

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Produto" component={Produto} options={{ headerShown: false }} />
          <Stack.Screen name="SearchResults" component={SearchResults} options={{ headerShown: false }} />
          <Stack.Screen name="Carrinho" component={Carrinho} options={{ headerShown: false }} />
          <Stack.Screen name="CarrinhoItens" component={CarrinhoItens} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterPharmacy" component={RegisterPharmacy} options={{ headerShown: false }} />
          <Stack.Screen name="LoginPharmacy" component={LoginPharmacy} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}