import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, Alert, Modal, FlatList, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { register } from "./src/services/api";

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
};
type RegisterProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Login', 'Home'>;
};

type Gender = 'male' | 'female' | 'other' | 'not_informed' | '';

export default function Register({ navigation }: RegisterProps) {
    const [CPF, setCPF] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState<Gender>('');
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("CONSUMER");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const genders: { label: string; value: Gender }[] = [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Outro', value: 'other' },
        { label: 'Prefiro não informar', value: 'not_informed' },
    ];

    const handleRegister = async () => {
        try {
            const Name = name.trim();
            const Email = email.trim();
            const Password = password.trim();
            const cleanCpf = cleanCPF(CPF);
            const Birth = birthToISO(birth);
            const Gender = gender.trim();
            const Phone = phone.replace(/\D/g, "");
            const Role = "CONSUMER";

            if (!Name || !Email || !Password || !CPF || !Birth || !Gender || !Phone) {
                Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
                return;
            }

            if (Password !== confirmPassword) {
                Alert.alert("Erro", "As senhas não coincidem.");
                return;
            }

            const response = await register(
                Name,
                cleanCpf,
                Email,
                Password,
                Birth,
                Gender,
                Phone,
                Role
            );

            console.log("Backend response:", response);
            Alert.alert("Registro realizado!");
            navigation.navigate("Login");
        } catch (err: any) {
            console.log("Erro ao registrar:", err);

            let message = "Falha ao registrar";
            if (err instanceof Object) message = JSON.stringify(err);
            else if (err.message) message = err.message;
            Alert.alert("Erro", message);
        }
    };

    const cleanCPF = (cpf: string) => cpf.replace(/\D/g, "");

    const formatCPF = (value: string) => {
        const clean = value.replace(/\D/g, "");
        if (clean.length <= 3) return clean;
        if (clean.length <= 6) return `${clean.slice(0, 3)}.${clean.slice(3)}`;
        if (clean.length <= 9) return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6)}`;
        return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9, 11)}`;
    };

    const formatBirth = (value: string) => {
        const clean = value.replace(/\D/g, "");
        if (clean.length > 2 && clean.length <= 4) return `${clean.slice(0, 2)}/${clean.slice(2)}`;
        if (clean.length > 4) return `${clean.slice(0, 2)}/${clean.slice(2, 4)}/${clean.slice(4, 8)}`;
        return clean;
    };

    const birthToISO = (birth: string) => {
        const [day, month, year] = birth.split("/");
        if (!day || !month || !year) return null;
        return `${year}-${month}-${day}`;
    };

    const formatPhone = (value: string) => {
        const clean = value.replace(/\D/g, "");
        if (clean.length === 0) return "";
        if (clean.length <= 2) return `(${clean}`;
        if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
        return `(${clean.slice(0, 2)}) ${clean.slice(2, clean.length - 4)}-${clean.slice(-4)}`;
    };

    const passwordsMismatch = confirmPassword !== "" && password !== confirmPassword;

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

                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#1A1B4F", marginTop: 20, fontFamily: "Inter" }} >Registrar</Text>

                    {/* Campos */}
                    <View style={{ width: "100%", marginBottom: 16, padding: 25 }}>
                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>CPF</Text>
                        <TextInput
                            value={String(CPF)}
                            onChangeText={(text) => setCPF(formatCPF(text))}
                            keyboardType="numeric"
                            maxLength={14}
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
                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Nome Completo</Text>
                        <TextInput
                            value={String(name)}
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
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, }}>Data de Nascimento</Text>
                                <TextInput
                                    value={String(birth)}
                                    onChangeText={(text) => setBirth(formatBirth(text))}
                                    keyboardType="numeric"
                                    maxLength={10}
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
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Gênero</Text>
                                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 12, backgroundColor: '#fff', marginBottom: 12 }} onPress={() => setModalVisible(true)}>
                                    <Text>{genders.find(g => g.value === gender)?.label || 'Selecione'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Telefone</Text>
                        <TextInput
                            value={String(phone)}
                            onChangeText={(text) => setPhone(formatPhone(text))}
                            keyboardType="phone-pad"
                            maxLength={15}
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
                            value={String(email)}
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
                        {/* Senha */}
                        <View style={{ position: "relative", marginBottom: 20 }}>
                            <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Senha</Text>
                            <TextInput
                                value={String(password)}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 12,
                                    padding: 12,
                                    fontSize: 16,
                                    borderWidth: 1,
                                    borderColor: "#E0E0E0",
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(prev => !prev)}
                                style={{
                                    position: "absolute",
                                    right: 12,
                                    top: 38,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingHorizontal: 8,
                                    height: 40,
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

                        {/* Confirmar Senha */}
                        <View style={{ position: "relative" }}>
                            <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Confirmar Senha</Text>
                            <TextInput
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 12,
                                    padding: 12,
                                    fontSize: 16,
                                    borderWidth: 1,
                                    borderColor: passwordsMismatch ? "red" : "#E0E0E0",
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(prev => !prev)}
                                style={{
                                    position: "absolute",
                                    right: 12,
                                    top: 38,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingHorizontal: 8,
                                    height: 40,
                                }}
                                accessibilityLabel={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                <Image
                                    source={
                                        showConfirmPassword
                                            ? require("./assets/login/eye.png")
                                            : require("./assets/login/eye-off.png")
                                    }
                                    style={{ width: 24, height: 24, tintColor: "#888" }}
                                />
                            </TouchableOpacity>
                        </View>

                        {passwordsMismatch && (
                            <Text style={{ color: "red", marginTop: 8 }}>
                                As senhas não coincidem.
                            </Text>
                        )}
                    </View>
                    {/* Botão Registrar */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#1A1B4F",
                            borderRadius: 100,
                            paddingVertical: 14,
                            width: "70%",
                            alignItems: "center",
                            marginBottom: 30,
                        }}
                        onPress={handleRegister}
                    >
                        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "Inter" }}>Registrar</Text>
                    </TouchableOpacity>
                    {/* Link para login */}
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginBottom: 30 }}>
                        <Text style={{ color: "#1A1B4F", fontSize: 16, fontFamily: "Inter" }}>Já tenho conta</Text>
                    </TouchableOpacity>
                    {/* Opções footer */}
                    <View style={{ backgroundColor: "#F3F3F3", width: "100%", alignItems: "flex-start", flex: 1, }}>
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

                    {/* Modal Gênero */}
                    <Modal
                        visible={modalVisible}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', paddingHorizontal: 40 }}
                            onPress={() => setModalVisible(false)}
                            activeOpacity={1}
                        >
                            <View style={{ backgroundColor: '#fff', borderRadius: 12, maxHeight: 250 }}>
                                <FlatList
                                    data={genders}
                                    keyExtractor={item => item.value}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ddd' }}
                                            onPress={() => {
                                                setGender(item.value);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback >
    );
}
