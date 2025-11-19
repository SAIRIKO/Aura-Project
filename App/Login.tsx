import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL, ENDPOINTS } from "./api.config";
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    Register: undefined;
};

type LoginProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function Login({ navigation }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch(API_BASE_URL + ENDPOINTS.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                await AsyncStorage.setItem("token", data.token);
                Alert.alert("Login realizado!");
                navigation.navigate("Home");
            } else {
                Alert.alert("Erro", data.error || "Credenciais inválidas");
            }
        } catch (err) {
            Alert.alert("Erro", "Falha na conexão com o servidor");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F3F3F3", justifyContent: "center", alignItems: "center", padding: 24 }}>
            {/* Menu hambúrguer */}
            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: 40,
                    right: 24,
                    zIndex: 10,
                }}
            >
                <Image source={require("./assets/header/sidebar.png")} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
            {/* Logo */}
            <Image source={require("./assets/header/logo.png")} style={{ width: 64, height: 64, marginBottom: 24 }} />
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#1A1B4F", marginBottom: 32, fontFamily: "Inter" }}>Entrar</Text>
            {/* Campos */}
            <View style={{ width: "100%", marginBottom: 16 }}>
                <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        padding: 12,
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: "#E0E0E0",
                        marginBottom: 12,
                    }}
                />
                <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Senha</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        padding: 12,
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: "#E0E0E0",
                        marginBottom: 12,
                    }}
                />
            </View>
            {/* Botão Entrar */}
            <TouchableOpacity
                style={{
                    backgroundColor: "#1A1B4F",
                    borderRadius: 12,
                    paddingVertical: 14,
                    width: "100%",
                    alignItems: "center",
                    marginBottom: 16,
                }}
                onPress={handleLogin}
            >
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "Inter" }}>Entrar</Text>
            </TouchableOpacity>
            {/* Link para registro */}
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ color: "#1A1B4F", fontSize: 16, fontFamily: "Inter" }}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    );
}
