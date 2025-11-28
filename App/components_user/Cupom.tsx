import { useState } from 'react';
import { Text, View, Image, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    CarrinhoItens: undefined;
    Cupom: undefined;
    Pagamento: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Cupom() {
    const navigation = useNavigation<NavigationProp>();
    const [cupom, setCupom] = useState('');
    const [desconto, setDesconto] = useState<number | null>(null);

    const validarCupom = () => {
        if (cupom.toLowerCase() === 'aura10') {
            setDesconto(10);
            Alert.alert("Cupom aplicado!", "Você ganhou 10% de desconto.");
        } else {
            setDesconto(null);
            Alert.alert("Cupom inválido", "Este código não existe.");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Cabeçalho */}
            <View
                style={{
                    backgroundColor: '#f3f3f3',
                    height: 100,
                    paddingTop: 30,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    boxShadow: '0px 1px 4px rgba(0,0,0,0.25)',
                    zIndex: 10,
                }}
            >
                <Pressable
                    onPress={() => navigation.navigate('Home')}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Image
                        source={require('../assets/header/logo.png')}
                        style={{ width: 28, height: 28, marginLeft: 29 }}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginLeft: 3,
                            marginTop: 3,
                            fontFamily: 'Inter',
                        }}
                    >
                        Aura
                    </Text>
                </Pressable>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('CarrinhoItens')} style={{ position: 'relative' }}>
                        <Image
                            source={require('../assets/header/cart.png')}
                            style={{ width: 29, height: 24, marginRight: 26 }}
                            resizeMode="contain"
                        />
                    </Pressable>

                    <Image
                        source={require('../assets/header/sidebar.png')}
                        style={{ width: 23, height: 27, marginRight: 27 }}
                    />
                </View>
            </View>

            {/* Breadcrumb */}
            <View
                style={{
                    width: '100%',
                    height: 40,
                    backgroundColor: '#f3f3f3',
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    boxShadow: '0px 1px 4px rgba(0,0,0,0.25)',
                }}
            >
                <Text style={{ fontSize: 14, fontFamily: 'Inter', color: '#4F4F4F', marginLeft: 26 }}>
                    Início &gt;
                </Text>
                <Text style={{ fontSize: 14, fontFamily: 'Inter', color: '#4F4F4F', marginLeft: 5 }}>
                    Carrinho &gt;
                </Text>
                <Text style={{ fontSize: 14, fontFamily: 'Inter', color: 'black' }}> Cupom</Text>
            </View>

            {/* Conteúdo */}
            <ScrollView contentContainerStyle={{ padding: 24 }}>
                <Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600', marginBottom: 16 }}>
                    Inserir código de cupom
                </Text>

                <View
                    style={{
                        backgroundColor: '#F7F7F7',
                        padding: 16,
                        borderRadius: 12,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 1, height: 3 },
                        shadowRadius: 4,
                        elevation: 3,
                        marginBottom: 20,
                    }}
                >
                    <TextInput
                        value={cupom}
                        onChangeText={setCupom}
                        placeholder="Digite o cupom"
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            padding: 12,
                            fontSize: 16,
                            borderWidth: 1,
                            borderColor: '#E0E0E0',
                            fontFamily: 'Inter',
                        }}
                    />

                    <Pressable
                        onPress={validarCupom}
                        style={{
                            marginTop: 16,
                            backgroundColor: '#1A1B4F',
                            height: 48,
                            borderRadius: 24,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Inter', fontWeight: '600' }}>
                            Aplicar cupom
                        </Text>
                    </Pressable>
                </View>

                {desconto !== null && (
                    <View
                        style={{
                            padding: 16,
                            backgroundColor: '#E6F7EA',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#8FD9A8',
                        }}
                    >
                        <Text style={{ fontSize: 16, fontFamily: 'Inter', color: '#1A7F37' }}>
                            ✔ Cupom aplicado: {desconto}% de desconto
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Botão inferior */}
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 12,
                    padding: 24,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: -2 },
                    shadowRadius: 6,
                    elevation: 10,
                }}


            >

                <Pressable
                    onPress={() => navigation.navigate('Pagamento')}
                    style={{
                        width: '100%',
                        height: 52,
                        backgroundColor: '#1A1B4F',
                        borderRadius: 26,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Inter', fontWeight: '600' }}>
                        Continuar
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('CarrinhoItens')}
                    style={{
                        width: '100%',
                        height: 52,
                        backgroundColor: '#fff',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#1A1B4F',
                        borderRadius: 26,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ color: '#1A1B4F', fontSize: 16, fontFamily: 'Inter', fontWeight: '600' }}>
                        Voltar ao carrinho
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
