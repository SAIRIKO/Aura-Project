import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components_user/Login";
import Register from "./components_user/Register";
import Produto from "./components_user/Produto";
import Home from "./components_user/Home";
import SearchResults from "./components_user/SearchResults";
import Carrinho from "./components_user/Carrinho";
import CarrinhoItens from "./components_user/CarrinhoItens";
import { CartProvider } from "./components_user/CartContext";
import Cupom from "./components_user/Cupom";
import LoginPharmacy from "./components_pharmacy/LoginPharmacy";
import RegisterPharmacy from "./components_pharmacy/RegisterPharmacy";
import Pagamento from "./components_user/pagamento";

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" id={undefined}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Produto" component={Produto} options={{ headerShown: false }} />
          <Stack.Screen name="SearchResults" component={SearchResults} options={{ headerShown: false }} />
          <Stack.Screen name="Carrinho" component={Carrinho} options={{ headerShown: false }} />
          <Stack.Screen name="CarrinhoItens" component={CarrinhoItens} options={{ headerShown: false }} />
          <Stack.Screen name="Cupom" component={Cupom} options={{ headerShown: false }} />
          <Stack.Screen name="Pagamento" component={Pagamento} options={{ headerShown: false }} />

          <Stack.Screen name="RegisterPharmacy" component={RegisterPharmacy} options={{ headerShown: false }} />
          <Stack.Screen name="LoginPharmacy" component={LoginPharmacy} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}