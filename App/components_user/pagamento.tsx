import { useState, useMemo } from "react";
import { View, Text, Image, Pressable, TextInput, ScrollView, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
import { StackNavigationProp } from "@react-navigation/stack";
import { useCart } from './CartContext';

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    CarrinhoItens: undefined;
    Cupom: undefined;
    Pagamento: undefined;
    Confirmacao: undefined;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  navigation: any;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Pagamento() {
    const navigation = useNavigation<NavigationProp>();

    const [metodo, setMetodo] = useState<"cartao" | "pix" | "boleto" | null>(null);

    // Campos do cartão
    const [numero, setNumero] = useState("");
    const [nome, setNome] = useState("");
    const [validade, setValidade] = useState("");
    const [cvv, setCvv] = useState("");

    const finalizarPagamento = () => {
        if (!metodo) {
            alert("Selecione um método de pagamento.");
            return;
        }

        if (metodo === "cartao" && (!numero || !nome || !validade || !cvv)) {
            alert("Preencha todos os dados do cartão.");
            return;
        }

        navigation.navigate("CarrinhoItens");
    };

    const [menuVisible, setMenuVisible] = useState(false);
    const onClose = () => setMenuVisible(false);    

    const { items } = useCart();

    // Função para garantir que o valor seja tratado como número válido
    const parsePrice = (price: string | undefined): number => {
        const parsed = parseFloat(price || "0");
        return isNaN(parsed) ? 0 : parsed;
    };

    // Cálculo do total sem desconto
    const total = items.reduce((acc, item) => {
      // Se houver um preço válido no item, usamos ele
      const precoItem = item.preco ? parsePrice(item.preco) : 0;
      
      // Verificação de NaN (caso a conversão para número falhe)
      if (isNaN(precoItem)) {
        return acc; // Se o preço não for um número válido, simplesmente não o soma
      }

      return acc + precoItem * item.quantidade;
    }, 0);

    // Desconto do cupom
    const [cupomDesconto, setCupomDesconto] = useState(0);

    const aplicarCupom = (desconto: number) => {
        setCupomDesconto(desconto);
    };

    // Cálculo do valor final (após o desconto do cupom)
    const valorFinal = total - (total * (cupomDesconto / 100));

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* Cabeçalho */}
            <View
                style={{
                    backgroundColor: "#f3f3f3",
                    height: 100,
                    paddingTop: 30,
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    boxShadow: "0px 1px 4px rgba(0,0,0,0.25)",
                }}
            >
                <Pressable
                    onPress={() => navigation.navigate("Home")}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Image
                        source={require("../assets/header/logo.png")}
                        style={{ width: 28, height: 28, marginLeft: 29 }}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            marginLeft: 3,
                            marginTop: 3,
                            fontFamily: "Inter",
                        }}
                    >
                        Aura
                    </Text>
                </Pressable>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Pressable onPress={() => navigation.navigate("CarrinhoItens")}>
                        <Image
                            source={require("../assets/header/cart.png")}
                            style={{ width: 29, height: 24, marginRight: 26 }}
                        />
                    </Pressable>
                    <Pressable onPress={() => setMenuVisible(true)}>
                        <Image 
                            source={require('../assets/header/sidebar.png')}
                            style={{ width: 23, height: 27, marginRight: 27 }}
                        />
                    </Pressable>  
                </View>
            </View>

            {/* Breadcrumb */}
            <View
                style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#f3f3f3",
                    marginTop: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    boxShadow: "0px 1px 4px rgba(0,0,0,0.25)",
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: "Inter",
                        color: "#4F4F4F",
                        marginLeft: 26,
                    }}
                >
                    Início &gt; Carrinho &gt; Cupom &gt;
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "Inter", color: "black" }} >
                    Pagamento
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
                {/* Cálculo do total */}
                <View style={{ marginBottom: 12 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, fontFamily: "Inter", color: "#4F4F4F" }}>
                            Total dos itens:
                        </Text>
                        <Text style={{ fontSize: 16, fontFamily: "Inter", color: "#4F4F4F" }}>
                            R$ {total.toFixed(2)}
                        </Text>
                    </View>
                    {cupomDesconto > 0 && (
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Inter", color: "#4F4F4F" }}>
                                Cupom aplicado:
                            </Text>
                            <Text style={{ fontSize: 16, fontFamily: "Inter", fontWeight: "600", color: "#67C58F" }}>
                                - R$ {(total * (cupomDesconto / 100)).toFixed(2)}
                            </Text>
                        </View>
                    )}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                        <Text style={{ fontSize: 18, fontFamily: "Inter", fontWeight: "600" }}>Valor final:</Text>
                        <Text style={{ fontSize: 18, fontFamily: "Inter", fontWeight: "600" }}>
                            R$ {valorFinal.toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Escolher método de pagamento */}
                <Text
                    style={{
                        fontSize: 18,
                        fontFamily: "Inter",
                        fontWeight: "600",
                        marginBottom: 16,
                    }}
                >
                    Escolher método de pagamento
                </Text>

                {/* Métodos */}
                <View style={{ gap: 16 }}>
                    <Pressable
                        onPress={() => setMetodo("pix")}
                        style={{
                            backgroundColor: metodo === "pix" ? "#E6F7EA" : "#F7F7F7",
                            borderRadius: 12,
                            padding: 16,
                            borderWidth: metodo === "pix" ? 2 : 1,
                            borderColor: metodo === "pix" ? "#67C58F" : "#E0E0E0",
                        }}
                    >
                        <Text style={{ fontSize: 16, fontFamily: "Inter" }}>📱 PIX</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setMetodo("cartao")}
                        style={{
                            backgroundColor: metodo === "cartao" ? "#E6F7EA" : "#F7F7F7",
                            borderRadius: 12,
                            padding: 16,
                            borderWidth: metodo === "cartao" ? 2 : 1,
                            borderColor: metodo === "cartao" ? "#67C58F" : "#E0E0E0",
                        }}
                    >
                        <Text style={{ fontSize: 16, fontFamily: "Inter" }}>
                            💳 Cartão de crédito
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setMetodo("boleto")}
                        style={{
                            backgroundColor: metodo === "boleto" ? "#E6F7EA" : "#F7F7F7",
                            borderRadius: 12,
                            padding: 16,
                            borderWidth: metodo === "boleto" ? 2 : 1,
                            borderColor: metodo === "boleto" ? "#67C58F" : "#E0E0E0",
                        }}
                    >
                        <Text style={{ fontSize: 16, fontFamily: "Inter" }}>📄 Boleto</Text>
                    </Pressable>
                </View>

                {/* Formulário do Cartão */}
                {metodo === "cartao" && (
                    <View
                        style={{
                            backgroundColor: "#F7F7F7",
                            marginTop: 20,
                            padding: 16,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: "#E0E0E0",
                            gap: 12,
                        }}
                    >
                        <TextInput
                            value={numero}
                            onChangeText={setNumero}
                            placeholder="Número do cartão"
                            keyboardType="numeric"
                            style={inputStyle}
                        />

                        <TextInput
                            value={nome}
                            onChangeText={setNome}
                            placeholder="Nome no cartão"
                            style={inputStyle}
                        />

                        <View style={{ flexDirection: "row", gap: 12 }}>
                            <TextInput
                                value={validade}
                                onChangeText={setValidade}
                                placeholder="Validade (MM/AA)"
                                style={[inputStyle, { flex: 1 }]}
                            />
                            <TextInput
                                value={cvv}
                                onChangeText={setCvv}
                                placeholder="CVV"
                                keyboardType="numeric"
                                style={[inputStyle, { flex: 1 }]}
                            />
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Botão inferior */}
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#fff",
                    padding: 24,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: -2 },
                    shadowRadius: 6,
                    elevation: 10,
                }}
            >
                <Pressable
                    onPress={finalizarPagamento}
                    style={{
                        width: "100%",
                        height: 52,
                        backgroundColor: "#1A1B4F",
                        borderRadius: 26,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 16,
                            fontFamily: "Inter",
                            fontWeight: "600",
                        }}
                    >
                        Finalizar pagamento
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

// estilo reutilizável
const inputStyle = {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontFamily: "Inter",
};
