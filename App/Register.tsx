import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, Alert } from "react-native";
import { API_BASE_URL, ENDPOINTS } from "./api.config";
import type { StackNavigationProp } from '@react-navigation/stack';
import { register } from "./src/services/api";

type RootStackParamList = {
    Login: undefined;
};

type RegisterProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export default function Register({ navigation }: RegisterProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await register(name, email, password);
            Alert.alert("Registro realizado!");
            navigation.navigate("Login");
        } catch (err: any) {
            Alert.alert("Erro", err.message || "Falha ao registrar");
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
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#1A1B4F", marginBottom: 32, fontFamily: "Inter" }}>Criar conta</Text>
            {/* Campos */}
            <View style={{ width: "100%", marginBottom: 16 }}>
                <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Nome</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
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
            {/* Botão Registrar */}
            <TouchableOpacity
                style={{
                    backgroundColor: "#1A1B4F",
                    borderRadius: 12,
                    paddingVertical: 14,
                    width: "100%",
                    alignItems: "center",
                    marginBottom: 16,
                }}
                onPress={handleRegister}
            >
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "Inter" }}>Registrar</Text>
            </TouchableOpacity>
            {/* Link para login */}
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#1A1B4F", fontSize: 16, fontFamily: "Inter" }}>Já tenho conta</Text>
            </TouchableOpacity>
        </View>
    );
}
