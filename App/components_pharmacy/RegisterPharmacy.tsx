import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { registerPharmacy } from "../src/services/api";

export default function RegisterScreen({ navigation }: any) {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        pharmacyname: "",
        pharmacyemail: "",
        cnpj: "",
        cnpjRaw: "",
        pharmacyphone: "",
        phoneRaw: "",
        address: "",
        city: "",
        state: "",
        cep: "",
        cepRaw: "",
        responsiblename: "",
        responsiblecrf: "",
        responsibleemail: "",
        responsiblephone: "",
        password: "",
        confirmPassword: "",
        approval: "pending",
        imageurl: null,
        owner_id: null,
    });


    const [errors, setErrors] = useState<any>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // ----- CNPJ -----
    const handleCnpjChange = (text: string) => {
        const numeric = text.replace(/\D/g, "");
        let formatted = numeric;

        if (numeric.length > 2) formatted = numeric.slice(0, 2) + "." + numeric.slice(2);
        if (numeric.length > 5) formatted = formatted.slice(0, 6) + "." + formatted.slice(6);
        if (numeric.length > 8) formatted = formatted.slice(0, 10) + "/" + formatted.slice(10);
        if (numeric.length > 12) formatted = formatted.slice(0, 15) + "-" + formatted.slice(15, 17);

        handleInputChange("cnpj", formatted);
        handleInputChange("cnpjRaw", numeric);
    };

    // ----- UF -----
    const validStates = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
        "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
        "SP", "SE", "TO"
    ];

    const handleStateChange = (text: string) => {
        const value = text.toUpperCase().slice(0, 2);
        handleInputChange("state", value);

        if (value.length === 2 && !validStates.includes(value)) {
            setErrors((prev: any) => ({ ...prev, state: "UF inválida" }));
        } else {
            setErrors((prev: any) => ({ ...prev, state: undefined }));
        }
    };

    // ----- CEP -----
    const handleCepChange = (text: string) => {
        const numeric = text.replace(/\D/g, "");
        let formatted = numeric;
        if (numeric.length > 5) {
            formatted = numeric.slice(0, 5) + "-" + numeric.slice(5, 8);
        }
        handleInputChange("cep", formatted);
        handleInputChange("cepRaw", numeric);
    };

    // ----- Telefone -----
    const handlePhoneChange = (text: string) => {
        const numeric = text.replace(/\D/g, "");
        let formatted = numeric;
        if (numeric.length > 2) {
            formatted = "(" + numeric.slice(0, 2) + ") " + numeric.slice(2);
        }
        if (numeric.length > 7) {
            formatted = "(" + numeric.slice(0, 2) + ") " + numeric.slice(2, 7) + "-" + numeric.slice(7, 11);
        }
        handleInputChange("pharmacyphone", formatted);
        handleInputChange("pharmacyphoneRaw", numeric);
    };

    // ----- Validação -----
    const validateStep = () => {
        const newErrors: any = {};

        if (step === 1) {
            if (!formData.pharmacyname) newErrors.pharmacyname = "Obrigatório";
            if (!formData.pharmacyemail || !formData.pharmacyemail.includes("@"))
                newErrors.pharmacyemail = "E-mail inválido";
            if (!formData.cnpj) newErrors.cnpj = "Obrigatório";
        }
        if (step === 2) {
            if (!formData.address) newErrors.address = "Obrigatório";
            if (!formData.city) newErrors.city = "Obrigatório";
            if (!formData.state) newErrors.state = "Obrigatório";
            if (!formData.cep) newErrors.cep = "Obrigatório";
        }
        if (step === 3) {
            if (!formData.responsiblename) newErrors.responsiblename = "Obrigatório";
            if (!formData.responsiblecrf) newErrors.responsiblecrf = "Obrigatório";
            if (!formData.responsibleemail || !formData.responsibleemail.includes("@"))
                newErrors.responsibleemail = "E-mail inválido";
            if (!formData.responsiblephone) newErrors.responsiblephone = "Obrigatório";
            if (!formData.password || formData.password.length < 6)
                newErrors.password = "Senha deve ter ao menos 6 caracteres";
            if (formData.confirmPassword !== formData.password)
                newErrors.confirmPassword = "As senhas não coincidem";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        if (step < 3) setStep(step + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else navigation.goBack();
    };

    // ----- Submissão -----
    const handleSubmit = async () => {
        try {
            await registerPharmacy({
                pharmacyname: formData.pharmacyname,
                cnpj: formData.cnpjRaw,
                pharmacyphone: formData.phoneRaw,
                pharmacyemail: formData.pharmacyemail,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                cep: formData.cepRaw,
                responsiblename: formData.responsiblename,
                responsiblecrf: formData.responsiblecrf,
                responsibleemail: formData.responsibleemail,
                responsiblephone: formData.responsiblephone,
                password: formData.password,
                imageurl: formData.imageurl ?? null,
                owner_id: formData.owner_id ?? null,
                approval: "pending",
            });

            Alert.alert("Sucesso", "Cadastro realizado!");
            navigation.navigate("Login");

        } catch (e: any) {
            Alert.alert("Erro", e?.message || "Erro ao cadastrar");
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.card}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 30, justifyContent: "space-between" }}>
                            <View style={{ backgroundColor: "#c1d4fc9a", width: 60, height: 60, borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                                <Image source={require("../assets/login/farmacia.png")} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ marginLeft: 15, width: 250 }}>
                                <Text style={{ fontSize: 16, color: "#000000ff", marginBottom: 6, fontWeight: 'bold' }}>Dados da Farmácia</Text>
                                <Text style={{ fontSize: 16, color: "#000000a0", marginBottom: 6 }}>Informações básicas do estabelecimento</Text>
                            </View>
                        </View>

                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Nome da Farmácia</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            autoCapitalize="words"
                            value={formData.pharmacyname}
                            onChangeText={(text) => handleInputChange("pharmacyname", text)}
                        />
                        {errors.pharmacyname && <Text style={styles.error}>{errors.pharmacyname}</Text>}

                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="E-mail Profissional"
                            value={formData.pharmacyemail}
                            onChangeText={(text) => handleInputChange("pharmacyemail", text)}
                        />
                        {errors.pharmacyemail && (<Text style={styles.error}>{errors.pharmacyemail}</Text>)}

                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>CNPJ</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="cnpj"
                            value={formData.cnpj}
                            keyboardType="numeric"
                            onChangeText={handleCnpjChange}
                        />
                        {errors.cnpj && <Text style={styles.error}>{errors.cnpj}</Text>}
                    </View >
                );
            case 2:
                return (
                    <View style={styles.card}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 30, justifyContent: "space-between" }}>
                            <View style={{ backgroundColor: "#c1fccb9a", width: 60, height: 60, borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                                <Image source={require("../assets/login/localizacao.png")} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ marginLeft: 15, width: 250 }}>
                                <Text style={{ fontSize: 16, color: "#000000ff", marginBottom: 6, fontWeight: 'bold' }}>Endereço</Text>
                                <Text style={{ fontSize: 16, color: "#000000a0", marginBottom: 6 }}>Localização do estabelecimento</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>CEP</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="CEP"
                            value={formData.cep}
                            onChangeText={handleCepChange}
                            maxLength={9}
                        />
                        {errors.cep && <Text style={styles.error}>{errors.cep}</Text>}

                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>Endereço Completo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Endereço"
                            value={formData.address}
                            onChangeText={(v) => handleInputChange("address", v)}
                        />
                        {errors.address && <Text style={styles.error}>{errors.address}</Text>}

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>Cidade</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Cidade"
                                    value={formData.city}
                                    onChangeText={(v) => handleInputChange("city", v)}
                                />
                                {errors.city && <Text style={styles.error}>{errors.city}</Text>}
                            </View>
                            <View style={{ marginLeft: 10, flex: 1 }}>
                                <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>UF</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="UF"
                                    value={formData.state}
                                    onChangeText={handleStateChange}
                                    maxLength={2}
                                />
                                {errors.state && <Text style={styles.error}>{errors.state}</Text>}
                            </View>
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.card}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 30, justifyContent: "space-between" }}>
                            <View style={{ backgroundColor: "#fbc1fc9a", width: 60, height: 60, borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                                <Image source={require("../assets/login/user.png")} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ marginLeft: 15, flex: 1 }}>
                                <Text style={{ fontSize: 16, color: "#000000ff", marginBottom: 6, fontWeight: 'bold' }}>Responsável e Acesso</Text>
                                <Text style={{ fontSize: 16, color: "#000000a0", marginBottom: 6 }}>Farmacêutico responsável e credenciais</Text>
                            </View>
                        </View>

                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6 }}>Nome do Responsável</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Completo"
                            autoCapitalize="words"
                            value={formData.responsiblename}
                            onChangeText={(v) => handleInputChange("responsiblename", v)}
                        /> {/* Estou com probelma aqui, não consigo escrever nada, o teclado aparece mas quando clica os caracteres não aparecem */}
                        {errors.responsiblename && <Text style={styles.error}>{errors.responsiblename}</Text>}

                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>CRF (Conselho Regional de farmácia)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="CRF-DF 123456"
                            value={formData.responsiblecrf}
                            onChangeText={(v) => handleInputChange("responsiblecrf", v)}
                        />
                        {errors.responsiblecrf && <Text style={styles.error}>{errors.responsiblecrf}</Text>}

                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>E-mail do Responsável</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="E-mail do Responsável"
                            value={formData.responsibleemail}
                            onChangeText={(v) => handleInputChange("responsibleemail", v)}
                        />
                        {errors.responsibleemail && <Text style={styles.error}>{errors.responsibleemail}</Text>}

                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>Telefone do Responsável</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                            placeholder="(00) 00000-0000"
                            value={formData.pharmacyphone}
                            onChangeText={(v) => handleInputChange("pharmacyphone", v)}
                        />
                        {errors.pharmacyphone && <Text style={styles.error}>{errors.pharmacyphone}</Text>}

                        {/* Senha */}
                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(v) => handleInputChange("password", v)}
                        />
                        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        {/* Confirmar Senha */}
                        <Text style={{ fontSize: 16, color: "#1A1B4F", marginBottom: 6, marginTop: 20 }}>Confirmar Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirme a senha"
                            secureTextEntry
                            value={formData.confirmPassword}
                            onChangeText={(v) => handleInputChange("confirmPassword", v)}
                        />
                        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
                    </View>
                );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ backgroundColor: "#F3F3F3", width: "100%", display: "flex", justifyContent: "flex-start", flexDirection: "row", paddingTop: 50 }}>
                    {/* Logo */}
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={require("../assets/header/logo.png")} style={{ width: 35, height: 35, marginRight: 10, marginLeft: 15, marginTop: 10, marginBottom: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#1A1B4F", margin: 10, fontFamily: "Inter" }}>Aura</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Cadastro da Farmácia</Text>
                {renderStep()}

                <View style={styles.buttonRow}>
                    {step > 1 && (
                        <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleBack}>
                            <Text style={[styles.buttonText, styles.buttonTextOutline]}>Voltar</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>{step === 3 ? "Finalizar" : "Próximo"}</Text>
                    </TouchableOpacity>
                </View>

                {/* Já tem uma conta */}
                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 30 }}>
                    <Text style={{ fontSize: 14, color: "#1A1B4F", fontFamily: "Inter" }}>Já tem uma conta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("LoginPharmacy")}>
                        <Text style={{ fontSize: 14, color: "#3B82F6", fontFamily: "Inter", fontWeight: "bold" }}> Entrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1E293B",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    card: {
        width: "100%",
        marginBottom: 16,
        marginTop: 20,
        padding: 25
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        backgroundColor: "#F8FAFC",
    },
    error: {
        color: "#DC2626",
        marginBottom: 10,
        fontSize: 13,
    },
    buttonRow: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        backgroundColor: "#1A1B4F",
        borderRadius: 100,
        paddingVertical: 14,
        width: "90%",
        alignItems: "center",
        marginBottom: 30,
    },
    buttonOutline: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#3B82F6",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    buttonTextOutline: {
        color: "#3B82F6",
    },
});
