import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    navigation: any;
    route: any;
}

export default function AcompanharPedido({ navigation, route }: Props) {
    const { orderId } = route.params;
    const [status, setStatus] = useState<string>("recebido");
    const [loading, setLoading] = useState(true);

    // Simula atualização automática (polling a cada 8s)
    useEffect(() => {
        setLoading(false);

        const interval = setInterval(() => {
            atualizarStatus();
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    function atualizarStatus() {
        setStatus((prev) => {
            if (prev === "recebido") return "preparando";
            if (prev === "preparando") return "a_caminho";
            if (prev === "a_caminho") return "entregue";
            return "entregue";
        });
    }

    const statusLabels: any = {
        recebido: "Pedido recebido",
        preparando: "Preparando pedido",
        a_caminho: "Pedido a caminho",
        entregue: "Pedido entregue",
    };

    function StatusItem({
        label,
        ativo,
        isLast,
    }: {
        label: string;
        ativo: boolean;
        isLast?: boolean;
    }) {
        return (
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View style={{ alignItems: "center" }}>
                    <Ionicons
                        name={ativo ? "checkmark-circle" : "ellipse-outline"}
                        size={28}
                        color={ativo ? "#0AAD0A" : "#aaa"}
                    />
                    {!isLast && (
                        <View
                            style={{
                                width: 2,
                                height: 40,
                                backgroundColor: ativo ? "#0AAD0A" : "#ccc",
                                marginTop: 2,
                            }}
                        />
                    )}
                </View>

                <Text
                    style={{
                        fontSize: 18,
                        marginLeft: 12,
                        marginTop: 4,
                        color: ativo ? "#0AAD0A" : "#444",
                        fontWeight: ativo ? "bold" : "normal",
                    }}
                >
                    {label}
                </Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#0AAD0A" />
            </View>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                padding: 25,
                backgroundColor: "#fff",
                marginTop: 50,
            }}
        >
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                Acompanhar Pedido
            </Text>

            <Text
                style={{
                    fontSize: 16,
                    marginTop: 5,
                    color: "#555",
                }}
            >
                Pedido #{orderId}
            </Text>

            <View style={{ marginTop: 30 }}>
                <StatusItem
                    label="Pedido recebido"
                    ativo={["recebido", "preparando", "a_caminho", "entregue"].includes(
                        status
                    )}
                />

                <StatusItem
                    label="Preparando pedido"
                    ativo={["preparando", "a_caminho", "entregue"].includes(status)}
                />

                <StatusItem
                    label="Pedido a caminho"
                    ativo={["a_caminho", "entregue"].includes(status)}
                />

                <StatusItem
                    label="Pedido entregue"
                    ativo={status === "entregue"}
                    isLast
                />
            </View>

            {/* Se ainda não chegou */}
            {status !== "entregue" && (
                <Text
                    style={{
                        fontSize: 16,
                        marginTop: 40,
                        color: "#777",
                        textAlign: "center",
                    }}
                >
                    Atualizando automaticamente...
                </Text>
            )}

            {/* Botão Voltar */}
            <Pressable
                onPress={() => navigation.navigate("Home")}
                style={{
                    marginTop: 50,
                    padding: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#0AAD0A",
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
                    Voltar ao início
                </Text>
            </Pressable>
        </View>
    );
}
