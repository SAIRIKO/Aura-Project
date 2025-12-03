import React from "react";
import { View, Text, Pressable, Image } from "react-native";

interface Props {
    navigation: any;
    route: any;
}

export default function PedidoFinalizado({ navigation, route }: Props) {
    const { orderId } = route.params || {};

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 25,
                backgroundColor: "#fff",
            }}
        >

            <Image source={require('../assets/Confirmacao/succsess.png')} style={{ width: 180, height: 180 }} resizeMode="contain"></Image>



            {/* Texto principal */}
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 20,
                }}
            >
                Pedido Realizado!
            </Text>

            <Text
                style={{
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: 10,
                    color: "#555",
                }}
            >
                Seu pedido foi enviado para a farmácia e já está sendo preparado.
            </Text>

            {/* Número do pedido */}
            {orderId && (
                <Text
                    style={{
                        fontSize: 16,
                        marginTop: 15,
                        fontWeight: "bold",
                        color: "#0A7F0A",
                    }}
                >
                    Código do pedido: #{orderId}
                </Text>
            )}

            {/* Botões */}
            <Pressable
                onPress={() => navigation.navigate("AcompanharPedido", { orderId })}
                style={{
                    backgroundColor: "#0AAD0A",
                    width: "100%",
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 40,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        color: "#fff",
                        fontWeight: "bold",
                    }}
                >
                    Acompanhar Pedido
                </Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate("Home")}
                style={{
                    marginTop: 15,
                    padding: 15,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 17,
                        color: "#0AAD0A",
                        fontWeight: "bold",
                    }}
                >
                    Voltar ao Início
                </Text>
            </Pressable>
        </View>
    );
}
