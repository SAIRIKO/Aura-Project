import { useState } from 'react';
import { Text, View, Image, TextInput, Pressable, ScrollView, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    CarrinhoItens: undefined;
    Cupom: undefined;
    Pagamento: undefined;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  navigation: any;
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

    const [menuVisible, setMenuVisible] = useState(false);
    const onClose = () => setMenuVisible(false);

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
            <Modal
      animationType="slide"
      transparent
      visible={menuVisible}
      onRequestClose={onClose}
    >
      {/* Fundo com blur */}
      <Pressable onPress={onClose} style={{ flex: 1 }}>
        <BlurView
          intensity={20}
          tint="light"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
      </Pressable>

      {/* MENU LATERAL */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '78%',
          backgroundColor: '#fff',
          paddingTop: 60,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header do menu */}
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>
              Boas-vindas!
            </Text>
            <Text style={{ fontSize: 13, color: '#808080', marginBottom: 15 }}>
              Faça seu Login ou Cadastro
            </Text>

            <Pressable
              onPress={() => {
                onClose();
                navigation.navigate('Login');
              }}
              style={{
                width: '100%',
                height: 45,
                backgroundColor: '#1A1B4F',
                borderRadius: 22,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 25,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                Entrar
              </Text>
            </Pressable>
            
            <Pressable
              onPress={() => {
                onClose();
                navigation.navigate('Register');
              }}
              style={{
                width: '100%',
                height: 45,
                backgroundColor: '#F3F3F3',
                borderRadius: 22,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <Text style={{ marginTop: 11 ,color: '#555', marginBottom: 20 }}>
                Cadastrar
              </Text>
            </Pressable>
            
          </View> 

          {/* Opções do menu */}
          {[
            { label: 'Desconto e benefícios', icon: require('../assets/menu/descontos.png') },
            { label: 'Lojas parceiras', icon: require('../assets/menu/lojas.png') },
            { label: 'Ofertas no app', icon: require('../assets/menu/ofertas.png') },
            { label: 'Serviços de saúde (em breve)', icon: require('../assets/menu/saude.png'), disabled: true },

          ].map((item, idx) => (
            <Pressable
              key={idx}
              disabled={item.disabled}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 14,
                opacity: item.disabled ? 0.4 : 1
              }}
            >
              <Image
                source={item.icon}
                style={{ width: 26, height: 26, marginRight: 16 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 15 }}>{item.label}</Text>
            </Pressable>
          ))}

          {/* Categorias */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#a0a0a0', marginBottom: 10, fontSize: 13 }}>Categorias</Text>

            {[
              'Saúde',
              'Vitaminas e suplementos',
              'Beleza',
              'Cosméticos'
            ].map((cat, i) => (
              <Pressable key={i} style={{ paddingVertical: 14 }}>
                <Text style={{ fontSize: 15 }}>{cat}</Text>
              </Pressable>
            ))}
          </View>

          {/* Extra */}
          <View style={{ marginTop: 20 }}>
            {[
              { label: 'Encontre uma farmácia', icon: require('../assets/menu/lojas.png') },
              { label: 'Central de Atendimento', icon: require('../assets/menu/atendimento.png') },
              { label: 'Trabalhe conosco', icon: require('../assets/menu/logo.png') },
            ].map((item, i) => (
              <Pressable
                key={i}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14 }}
              >
                <Image
                  source={item.icon}
                  style={{ width: 22, height: 22, marginRight: 16 }}
                />
                <Text style={{ fontSize: 15 }}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
        </View>
    );
}
