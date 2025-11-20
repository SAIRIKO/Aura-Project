import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, Alert, Modal, ActivityIndicator, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
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
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    //Novos estados para recuperação de senha
    const [forgotModalVisible, setForgotModalVisible] = useState(false);
    const [recoveryMethod, setRecoveryMethod] = useState<"email" | "sms">("email");
    const [recoveryContact, setRecoveryContact] = useState("");
    const [recoveryLoading, setRecoveryLoading] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch(API_BASE_URL + ENDPOINTS.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: identifier.includes("@") ? identifier : undefined,
                    CPF: !identifier.includes("@") ? identifier : undefined,
                    password
                }),
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

    const sendRecoveryRequest = async () => {
        if (!recoveryContact.trim()) {
            Alert.alert("Atenção", "Informe seu email ou telefone para receber o código.");
            return;
        }
        setRecoveryLoading(true);
        try {
            const endpoint = (ENDPOINTS as any)?.FORGOT_PASSWORD ?? "/forgot-password";
            const response = await fetch(API_BASE_URL + endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contact: recoveryContact.trim(), method: recoveryMethod }),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Sucesso", data.message || "Código enviado. Verifique seu canal selecionado.");
                setForgotModalVisible(false);
                setRecoveryContact("");
            } else {
                Alert.alert("Erro", data.error || "Não foi possível solicitar recuperação.");
            }
        } catch (err) {
            Alert.alert("Erro", "Falha na conexão com o servidor");
        } finally {
            setRecoveryLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}>
                <View style={{ backgroundColor: "#FFFFFF", flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
                    {/* Header */}
                    <View style={{ backgroundColor: "#F3F3F3", width: "100%", display: "flex", justifyContent: "flex-start", flexDirection: "row", paddingTop: 50 }}>
                        {/* Logo */}
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Image source={require("./assets/header/logo.png")} style={{ width: 35, height: 35, marginRight: 10, marginLeft: 15, marginTop: 10, marginBottom: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#1A1B4F", margin: 10, fontFamily: "Inter" }}>Aura</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Campos */}
                    <View style={{ width: "100%", marginBottom: 16, marginTop: 20, padding: 25 }}>
                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Email ou CPF</Text>
                        <TextInput
                            value={identifier}
                            onChangeText={setIdentifier}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            style={{
                                backgroundColor: emailFocused ? "#FFFFFF" : "#EAEAEA",
                                borderRadius: 12,
                                padding: 12,
                                fontSize: 16,
                                borderWidth: emailFocused ? 1 : 0,
                                borderColor: emailFocused ? "#E0E0E0" : "transparent",
                                marginBottom: 40,
                            }}
                        />
                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Senha</Text>

                        {/* Container relativo que contém o TextInput e o botão "olho" */}
                        <View style={{ position: "relative", marginBottom: 12 }}>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                style={{
                                    backgroundColor: passwordFocused ? "#FFFFFF" : "#EAEAEA",
                                    borderRadius: 12,
                                    padding: 12,
                                    fontSize: 16,
                                    borderWidth: passwordFocused ? 1 : 0,
                                    borderColor: passwordFocused ? "#E0E0E0" : "transparent",
                                    paddingRight: 60,
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(prev => !prev)}
                                style={{
                                    position: "absolute",
                                    right: 12,
                                    top: 0,
                                    bottom: 0,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingHorizontal: 8,
                                }}
                                accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                <Image
                                    source={
                                        showPassword
                                            ? require("./assets/login/eye.png")
                                            : require("./assets/login/eye-off.png")
                                    }
                                    style={{ width: 24, height: 24, tintColor: "#888" }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Botão Entrar */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#1A1B4F",
                            borderRadius: 100,
                            paddingVertical: 14,
                            width: "70%",
                            alignItems: "center",
                            marginBottom: 30,
                        }}
                        onPress={handleLogin}
                    >
                        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "Inter" }}>Entrar</Text>
                    </TouchableOpacity>

                    {/* Esqueci minha senha */}
                    <TouchableOpacity onPress={() => setForgotModalVisible(true)} style={{ marginBottom: 30 }}>
                        <Text style={{ color: "#1A1B4F", fontSize: 16, fontFamily: "Inter", textDecorationLine: "underline" }}>Esqueci minha senha</Text>
                    </TouchableOpacity>

                    {/* Outros métodos de entrada */}
                    <Text style={{ color: "#666", fontSize: 14, marginBottom: 20, fontFamily: "Inter" }}>Outros métodos de entrada</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "65%", marginBottom: 30 }}>
                        <TouchableOpacity>
                            <Image source={require("./assets/login/google.png")} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("./assets/login/facebook.png")} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("./assets/login/apple.png")} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                    </View>

                    {/* Link para registro */}
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{ color: "#1A1B4F", fontSize: 16, fontFamily: "Inter", marginBottom: 40 }}>
                            Não tem conta?{" "}
                            <Text style={{ textDecorationLine: "underline" }}>
                                Cadastre-se
                            </Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Opções footer */}
                    <View style={{ backgroundColor: "#F3F3F3", width: "100%", alignItems: "flex-start", flex: 1, justifyContent: "flex-end" }}>
                        <TouchableOpacity style={{ width: "100%", marginBottom: 20, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                            <Image source={require("./assets/login/duvida.png")} style={{ width: 35, height: 35 }} />
                            <Text style={{ fontSize: 14, color: "#1A1B4F", width: "40%", textAlign: "center", margin: 10, fontFamily: "Inter" }}>Termos de Serviço</Text>
                            <Image source={require("./assets/login/seta.png")} style={{ width: 30, height: 30, transform: [{ rotate: "90deg" }] }} />
                        </TouchableOpacity>

                        <View
                            style={{
                                width: "100%",
                                marginBottom: 20,
                                height: 1,
                                backgroundColor: "#ccc",
                            }}
                        />

                        <TouchableOpacity style={{ width: "100%", marginBottom: 20, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                            <Image source={require("./assets/login/logoPreta.png")} style={{ width: 30, height: 30 }} />
                            <Text style={{ fontSize: 14, color: "#1A1B4F", width: "40%", textAlign: "center", margin: 10, fontFamily: "Inter" }}>Política de Privacidade</Text>
                            <Image source={require("./assets/login/seta.png")} style={{ width: 30, height: 30, transform: [{ rotate: "90deg" }] }} />
                        </TouchableOpacity>
                    </View>
                </View >
                {/* Modal de recuperação */}
                <Modal
                    visible={forgotModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setForgotModalVisible(false)}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center", padding: 20 }}>
                        <View style={{ width: "100%", backgroundColor: "#fff", borderRadius: 12, padding: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>Recuperar senha</Text>
                            <Text style={{ marginBottom: 8 }}>Escolha como deseja receber o código:</Text>

                            <View style={{ flexDirection: "row", marginBottom: 12 }}>
                                <TouchableOpacity onPress={() => setRecoveryMethod("email")} style={{ marginRight: 16 }}>
                                    <Text style={{ color: recoveryMethod === "email" ? "#1A1B4F" : "#666" }}>
                                        {recoveryMethod === "email" ? "● " : "○ "}Email
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setRecoveryMethod("sms")}>
                                    <Text style={{ color: recoveryMethod === "sms" ? "#1A1B4F" : "#666" }}>
                                        {recoveryMethod === "sms" ? "● " : "○ "}SMS
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={{ marginBottom: 6 }}>{recoveryMethod === "email" ? "Email" : "Telefone"}</Text>
                            <TextInput
                                value={recoveryContact}
                                onChangeText={setRecoveryContact}
                                placeholder={recoveryMethod === "email" ? "seu@email.com" : "DDD + número"}
                                keyboardType={recoveryMethod === "email" ? "email-address" : "phone-pad"}
                                style={{
                                    backgroundColor: "#EAEAEA",
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 16,
                                }}
                            />

                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <TouchableOpacity onPress={() => setForgotModalVisible(false)} style={{ marginRight: 12 }}>
                                    <Text style={{ color: "#666" }}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={sendRecoveryRequest} disabled={recoveryLoading} style={{ backgroundColor: "#1A1B4F", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 }}>
                                    {recoveryLoading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={{ color: "#fff" }}>Enviar código</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}