import { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { useCart } from './CartContext';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Produto: {
    id: string;
    nome: string;
    preco: string;
    unidades: string;
    image: any;
    desconto: string;
    precoOriginal: string;
  };
  SearchResults: {
    searchTerm: string;
  };
  Carrinho: undefined;
  CarrinhoItens: undefined;
  Cupom: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  visible: boolean;
  onClose: () => void;
  navigation: any;
};

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const parsePrice = (price: string) => {
  const sanitized = price.replace(/[R$\s.]/g, '').replace(',', '.');
  const parsed = parseFloat(sanitized);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export default function CarrinhoItens() {
  const navigation = useNavigation<NavigationProp>();
  const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();

  useEffect(() => {
    if (!items.length) {
      navigation.replace('Carrinho');
    }
  }, [items.length, navigation]);

  const subtotal = items.reduce((acc, item) => acc + parsePrice(item.preco) * item.quantidade, 0);

  const handleDecrease = (id: string, currentQuantity: number) => {
    const nextValue = currentQuantity - 1;
    updateQuantity(id, nextValue < 1 ? 1 : nextValue);
  };

  const handleIncrease = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
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
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
          zIndex: 10,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Image source={require('../assets/header/logo.png')} style={{ width: 28, height: 28, marginLeft: 29 }} />
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 3, marginTop: 3, fontFamily: 'Inter' }}>
            Aura
          </Text>
        </Pressable>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => navigation.navigate('CarrinhoItens')} style={{ position: 'relative' }}>
            <Image
              source={require('../assets/header/cart.png')}
              style={{ width: 29, height: 24, marginRight: 26 }}
              resizeMode="contain"
            />
            {totalItems > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: -6,
                  right: 14,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: '#FF4D4F',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 4,
                }}
              >
                <Text style={{ fontSize: 10, fontFamily: 'Inter', fontWeight: '600', color: '#fff' }}>
                  {totalItems}
                </Text>
              </View>
            )}
          </Pressable>
          <View>
            <Pressable onPress={() => setMenuVisible(true)}>
              <Image
                source={require('../assets/header/sidebar.png')}
                style={{ width: 23, height: 27, marginRight: 27 }}
              />
            </Pressable>
          </View>
        </View>
      </View>
      {/* Breadcrumbs */}
      <View
        style={{
          width: '100%',
          height: 40,
          backgroundColor: '#f3f3f3',
          marginTop: 12,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Text style={{ fontSize: 14, fontFamily: 'Inter', color: '#4F4F4F', marginLeft: 26 }}>Início &gt;</Text>
        <Text style={{ fontSize: 14, fontFamily: 'Inter', color: 'Black' }}> Carrinho</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
        {items.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              backgroundColor: '#F7F7F7',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { width: 1, height: 3 },
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Image source={item.image} style={{ width: 78, height: 78, marginRight: 12 }} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F' }}>{item.nome}</Text>
              <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#4F4F4F', marginTop: 4 }}>{item.unidades}</Text>
              <Text style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F', marginTop: 8 }}>
                {item.preco}
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Pressable onPress={() => handleDecrease(item.id, item.quantidade)}>
                    <Text style={{ fontSize: 18, color: '#1A1B4F', width: 20, textAlign: 'center' }}>-</Text>
                  </Pressable>
                  <Text style={{ fontSize: 16, marginHorizontal: 12 }}>{item.quantidade}</Text>
                  <Pressable onPress={() => handleIncrease(item.id, item.quantidade)}>
                    <Text style={{ fontSize: 18, color: '#1A1B4F', width: 20, textAlign: 'center' }}>+</Text>
                  </Pressable>
                </View>

                <Pressable onPress={() => removeItem(item.id)} style={{ marginLeft: 24 }}>
                  <Text style={{ fontSize: 14, color: '#B00020', fontFamily: 'Inter' }}>Remover</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Resumo */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          padding: 24,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 6,
          elevation: 10,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Inter', color: '#4F4F4F' }}>Subtotal</Text>
          <Text style={{ fontSize: 16, fontFamily: 'Inter', color: '#1A1B4F' }}>{formatCurrency(subtotal)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F' }}>Total</Text>
          <Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F' }}>
            {formatCurrency(subtotal)}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Cupom")}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 26,
            backgroundColor: '#1A1B4F',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '600', color: '#fff' }}>Finalizar compra</Text>
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
    </View >
  );
}

