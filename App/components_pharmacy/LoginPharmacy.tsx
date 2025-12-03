import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    StyleSheet,
} from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pharmacyLogin } from "../src/services/api";

type Props = {
    navigation: StackNavigationProp<any>;
};

export default function LoginPharmacy({ navigation }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        try {
            const data = await pharmacyLogin(email, password);

            if (!data?.token) {
                throw new Error("Token não recebido");
            }

            await AsyncStorage.setItem("pharmacy_token", data.token);

            Alert.alert("Sucesso", "Login realizado!");
            navigation.navigate("StockControl");
        } catch (error: any) {
            Alert.alert("Erro", error?.message || "Falha no login");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>💊</Text>
                </View>
                <Text style={styles.title}>Aura</Text>
                <Text style={styles.subtitle}>
                    Gestão Inteligente de Farmácias
                </Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.formTitle}>Entrar na sua conta</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        placeholder="email@farmacia.com"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.links}>
                <TouchableOpacity>
                    <Text style={styles.linkText}>Esqueci minha senha</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Não tem uma conta?
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("RegisterPharmacy")
                        }
                    >
                        <Text style={styles.registerLink}> Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#E0F2FE",
        flexGrow: 1,
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    logo: {
        width: 64,
        height: 64,
        backgroundColor: "#3B82F6",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    logoText: {
        fontSize: 32,
        color: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1E293B",
    },
    subtitle: {
        color: "#64748B",
        fontSize: 14,
    },
    form: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 15,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        color: "#334155",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 16,
        padding: 12,
    },
    button: {
        backgroundColor: "#3B82F6",
        borderRadius: 16,
        paddingVertical: 12,
        marginTop: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    links: {
        alignItems: "center",
        marginBottom: 20,
    },
    linkText: {
        color: "#64748B",
        marginBottom: 10,
    },
    registerContainer: {
        flexDirection: "row",
    },
    registerText: {
        color: "#64748B",
    },
    registerLink: {
        color: "#3B82F6",
        fontWeight: "bold",
    },
});
