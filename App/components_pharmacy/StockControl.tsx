import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    Alert,
    StyleSheet,
    ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://aura-project-uowq.onrender.com";

export default function StockControl() {
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Campos obrigatórios
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [activeIngredient, setActiveIngredient] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [descount, setDescount] = useState("");

    async function loadProducts() {
        try {
            const token = await AsyncStorage.getItem("pharmacy_token");
            if (!token) return Alert.alert("Erro", "Token ausente");

            const res = await fetch(`${API_URL}/api/products`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data);
                return Alert.alert("Erro", data.message || "Falha ao carregar produtos");
            }

            setProducts(data);
        } catch (err) {
            console.log(err);
            Alert.alert("Erro", "Falha ao carregar estoque");
        }
    }

    async function createProduct() {
        if (!name || !category || !price || !stock) {
            return Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
        }

        try {
            const token = await AsyncStorage.getItem("pharmacy_token");
            if (!token) return Alert.alert("Erro", "Token ausente");

            const res = await fetch(`${API_URL}/api/products/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    category,
                    activeIngredient,
                    price: Number(price),
                    stock: Number(stock),
                    imageUrl,
                    descount: Number(descount) || 0,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data);
                return Alert.alert("Erro", data.error || "Falha ao criar produto");
            }

            Alert.alert("Sucesso", "Produto criado!");
            setModalVisible(false);
            loadProducts();
        } catch (err) {
            console.log(err);
            Alert.alert("Erro", "Falha ao criar produto");
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>
            <Text style={styles.title}>📦 Controle de Estoque</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
            </TouchableOpacity>

            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text>Categoria: {item.category}</Text>
                        <Text>Preço: R$ {item.price}</Text>
                        <Text>Estoque: {item.stock}</Text>
                    </View>
                )}
            />

            {/* MODAL DE CRIAR PRODUTO */}
            <Modal visible={modalVisible} animationType="slide">
                <ScrollView style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Adicionar Produto</Text>

                    <TextInput placeholder="Nome" style={styles.input} value={name} onChangeText={setName} />
                    <TextInput placeholder="Descrição" style={styles.input} value={description} onChangeText={setDescription} />
                    <TextInput placeholder="Categoria" style={styles.input} value={category} onChangeText={setCategory} />
                    <TextInput placeholder="Ingrediente ativo" style={styles.input} value={activeIngredient} onChangeText={setActiveIngredient} />
                    <TextInput placeholder="Preço" style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice} />
                    <TextInput placeholder="Estoque" style={styles.input} keyboardType="numeric" value={stock} onChangeText={setStock} />
                    <TextInput placeholder="URL da Imagem" style={styles.input} value={imageUrl} onChangeText={setImageUrl} />
                    <TextInput placeholder="Desconto (%)" style={styles.input} keyboardType="numeric" value={descount} onChangeText={setDescount} />

                    <TouchableOpacity style={styles.saveButton} onPress={createProduct}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: "#3B82F6",
        padding: 12,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 20,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    modalContainer: {
        padding: 20,
        marginTop: 50,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        borderRadius: 12,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: "#22C55E",
        padding: 14,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "#ef4444",
        padding: 14,
        borderRadius: 16,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
