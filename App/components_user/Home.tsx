import { Text, View, ScrollView, Image, Animated, Pressable, TextInput, Modal } from 'react-native';
import { useRef, useState } from 'react';
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
};

type Props = {
  visible: boolean;
  onClose: () => void;
  navigation: any;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Home() {
  const banners = [
    { id: '1', image: require('../assets/banners/banner1.png') },
    { id: '2', image: require('../assets/banners/banner2.png') },
    { id: '3', image: require('../assets/banners/banner3.png') },
    { id: '4', image: require('../assets/banners/banner4.png') },
    { id: '5', image: require('../assets/banners/banner5.png') },
    { id: '6', image: require('../assets/banners/banner6.png') },
  ]

  const produtosComDesconto = [
    { id: '1', nome: 'Lactosil 10.000 FCC Lactase', preco: 'R$ 22,96', unidades: '30un', image: require('../assets/remedios/lactosil.png'), desconto: '-20%', nav: 'Produto', precoOriginal: 'R$ 28,70' },
    { id: '2', nome: 'Cálcio OS-Cal 500mg', preco: 'R$ 54,38', unidades: '60s', image: require('../assets/remedios/oscal.png'), desconto: '-15%', precoOriginal: 'R$ 64,00' },
    { id: '3', nome: 'Dorflex Uno Efervescente', preco: 'R$ 28,99', unidades: '10un', image: require('../assets/remedios/dorflex.png'), desconto: '-10%', precoOriginal: 'R$ 32,21' },
    { id: '4', nome: 'Buscopan Composto Adulto 10mg+250mg', preco: 'R$ 20,87', unidades: '20c', image: require('../assets/remedios/buscopan.png'), desconto: '-23%', precoOriginal: 'R$ 27,13' },
    { id: '5', nome: 'Ibuprofeno 400mg Medley', preco: 'R$ 21,49', unidades: '10cps', image: require('../assets/remedios/ibuprofeno.png'), desconto: '-17%', precoOriginal: 'R$ 25,92' },
    { id: '6', nome: 'Cloridrato Tramadol 37,5mg + Paracetamol 500mg', preco: 'R$ 55,90', unidades: '30c', image: require('../assets/remedios/paracetamol.png'), desconto: '-38%', precoOriginal: 'R$ 89,84' },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  const navigation = useNavigation<NavigationProp>();
  const { items, totalItems } = useCart();
  const cartRoute = items.length ? 'CarrinhoItens' : 'Carrinho';

  const handleBlurSearch = () => {
    searchInputRef.current?.blur();
    setIsSearchFocused(false);
  };

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      navigation.navigate('SearchResults', { searchTerm: searchText.trim() });
      searchInputRef.current?.blur();
      setIsSearchFocused(false);
    }
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const onClose = () => setMenuVisible(false);
  
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 0, height: 'auto' }} >

      {/* Overlay com blur quando a busca está focada */}
      {isSearchFocused && (
        <>
          {/* Blur cobrindo o conteúdo abaixo da barra de pesquisa */}
          <Pressable onPress={handleBlurSearch} style={{ position: 'absolute', top: 190, left: 0, right: 0, bottom: 0, zIndex: 50 }}>
            <BlurView
              intensity={10}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%'
              }}
            />
          </Pressable>
        </>
      )}

      {/* Cabeçalho */}
      <View style={{ backgroundColor: '#f3f3f3', height: 100, paddingTop: 30, width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)', zIndex: 10, position: 'static' }}>
        <Pressable onPress={() => navigation.navigate('Home')} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/header/logo.png')} style={{ width: 28, height: 28, marginLeft: 29 }}></Image>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 3, marginTop: 3, fontFamily: 'Inter' }}>Aura</Text>
        </Pressable>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => navigation.navigate(cartRoute)} style={{ position: 'relative' }}>
            <Image source={require('../assets/header/cart.png')} style={{ width: 29, height: 24, marginRight: 26 }} resizeMode="contain"></Image>
            {totalItems > 0 && (
              <View style={{ position: 'absolute', top: -6, right: 14, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#FF4D4F', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}>
                <Text style={{ fontSize: 10, fontFamily: 'Inter', fontWeight: '600', color: '#fff' }}>
                  {totalItems}
                </Text>
              </View>
            )}
          </Pressable>
          <Pressable onPress={() => setMenuVisible(true)}>
            <Image 
              source={require('../assets/header/sidebar.png')}
              style={{ width: 23, height: 27, marginRight: 27 }}
            />
          </Pressable>        
        </View>
      </View>

      {/* Barra de Pesquisa */}
      <View style={{ backgroundColor: 'transparent', height: 90, width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 100, position: 'relative', elevation: 100 }}>
        <View style={{ backgroundColor: '#F7F7F7', marginTop: 4, width: '87%', height: 50, borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', flexDirection: 'row', alignItems: 'center', elevation: 100 }}>
          <Image source={require('../assets/searchbar/lupa.png')} style={{ width: 30, height: 40, marginLeft: 9, marginTop: 3 }} resizeMode="contain"></Image>
          <TextInput
            ref={searchInputRef}
            style={{ fontSize: 16, fontFamily: 'Inter', marginLeft: 21, marginTop: 4, flex: 1, color: '#000', height: '100%' }}
            placeholder="Buscar produtos ou farmácias"
            placeholderTextColor="rgba(0, 0, 0, 0.25)"
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
        </View>
      </View>

      {/* ScrollView (Abaixo da Header para manter a Header fixa no topo da tela) */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Categorias */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 'auto', height: 61, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 118, height: 36, backgroundColor: '#1A1B4F', marginHorizontal: 16, borderRadius: 20, display: 'flex', flexDirection: 'row' }}>
            <Image source={require('../assets/categories/ofertas.png')} style={{ width: 26, height: 26, marginLeft: 12, marginTop: 6 }} resizeMode="contain"></Image>
            <Text style={{ fontSize: 16, fontFamily: 'Inter', marginLeft: 6, marginTop: 9, color: '#fff' }}>Ofertas</Text>
          </View>
          <View style={{ width: 170, height: 36, backgroundColor: '#1B1B4F', borderRadius: 20, display: 'flex', flexDirection: 'row' }}>
            <Image source={require('../assets/categories/maisbuscados.png')} style={{ width: 27, height: 27, marginLeft: 13, marginTop: 5 }} resizeMode="contain"></Image>
            <Text style={{ fontSize: 16, fontFamily: 'Inter', marginLeft: 1, marginTop: 9, color: '#fff' }}>Mais buscados</Text>
          </View>
          <View style={{ width: 180, height: 36, backgroundColor: '#1C1B4F', marginHorizontal: 16, borderRadius: 20, display: 'flex', flexDirection: 'row' }}>
            <Image source={require('../assets/categories/medicamentos.png')} style={{ width: 27, height: 27, marginLeft: 14, marginTop: 4 }} resizeMode="contain"></Image>
            <Text style={{ fontSize: 16, fontFamily: 'Inter', marginLeft: 7, marginTop: 9, color: '#fff' }}>Medicamentos</Text>
          </View>
        </ScrollView>

        {/* Banners */}
        <View style={{ width: '100%', height: 205, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <Animated.FlatList
            horizontal
            data={banners}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            snapToInterval={325}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{ paddingHorizontal: 50, paddingVertical: 30, gap: 32 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item }) => (
              <View style={{ width: 293, height: 133, backgroundColor: '#F7F7F7', borderRadius: 12, justifyContent: 'space-between', shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 2, height: 4 }, shadowRadius: 4, elevation: 3 }}>
                <Image source={item.image} style={{ width: 293, height: 133, borderRadius: 12 }}></Image>
              </View>
            )}
          />

          {/* PAGINAÇÃO */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {banners.map((_, i) => {
              const inputRange = [
                (i - 1) * 325,
                i * 325,
                (i + 1) * 325,
              ];

              const dotOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={i}
                  style={{ width: 10, height: 10, backgroundColor: 'black', borderRadius: 5, marginHorizontal: 2, opacity: dotOpacity, top: -20 }}
                />
              );
            })}
          </View>
        </View>

        {/* Produtos com Desconto Titulo e Ver tudo*/}
        <View style={{ width: '100%', height: 266, backgroundColor: 'white' }}>
          <View style={{ width: '100%', height: 40, backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Inter', color: 'black', marginLeft: 17, marginTop: 3 }}>Produtos com Desconto</Text>
            <View style={{ width: 100, height: 18, backgroundColor: '#1A1B4F', marginRight: 18, marginTop: 0.5, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 2, height: 3 }, shadowRadius: 2, elevation: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 12, fontFamily: 'Inter', color: 'white', marginLeft: 4 }}>Ver tudo</Text>
            </View>
          </View>
          {/* Produtos com Desconto Cards*/}
          <Animated.FlatList
            horizontal
            data={produtosComDesconto}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            snapToInterval={171}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 6, gap: 30 }}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate('Produto', {
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                unidades: item.unidades,
                image: item.image,
                desconto: item.desconto,
                precoOriginal: item.precoOriginal
              })} style={{ width: 141, height: 201, backgroundColor: '#F7F7F7', borderRadius: 12, padding: 0, shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 2, height: 4 }, shadowRadius: 4, elevation: 3, justifyContent: 'center' }}>
                <Image source={item.image} style={{ width: 97, marginLeft: 22, top: -6 }} resizeMode="contain"></Image>
                <Text style={{ fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F', top: -58, marginLeft: 8, marginRight: 8 }} numberOfLines={2} ellipsizeMode="tail">{item.nome}</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Inter', color: '#4F4F4F', top: -58, marginLeft: 8 }}>{item.unidades}</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F', top: -56, marginLeft: 8 }}>{item.preco}</Text>
                <View style={{ position: 'absolute', width: 38, height: 16, backgroundColor: '#1A1B4F', top: 16, marginLeft: 90, borderRadius: 8 }}>
                  <Text style={{ fontSize: 8, fontFamily: 'Inter', color: 'white', top: 3, marginLeft: 10 }}>{item.desconto}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
        {/* Mais Buscados*/}
        <View style={{ width: '100%', height: 266, backgroundColor: 'white' }}>
          <View style={{ width: '100%', height: 40, backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Inter', color: 'black', marginLeft: 19, marginTop: 3 }}>Mais Buscados</Text>
          </View>
          {/* Mais Buscados Cards*/}
          <Animated.FlatList
            horizontal
            data={produtosComDesconto}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            snapToInterval={171}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 6, gap: 30 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item }) => (
              <View style={{ width: 141, height: 201, backgroundColor: '#F7F7F7', borderRadius: 12, padding: 0, shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 2, height: 4 }, shadowRadius: 4, elevation: 3, justifyContent: 'center' }}>
                <Image source={item.image} style={{ width: 97, marginLeft: 22, top: -6 }} resizeMode="contain"></Image>
                <Text style={{ fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F', top: -58, marginLeft: 8, marginRight: 8 }} numberOfLines={2} ellipsizeMode="tail">{item.nome}</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Inter', color: '#4F4F4F', top: -58, marginLeft: 8 }}>{item.unidades}</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F', top: -56, marginLeft: 8 }}>{item.preco}</Text>
              </View>
            )}
          />
        </View>
        {/* Cosméticos*/}
        <View style={{ width: '100%', height: 266, backgroundColor: 'white' }}>
          <View style={{ width: '100%', height: 40, backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Inter', color: 'black', marginLeft: 19, marginTop: 3 }}>Cosméticos</Text>
          </View>
          {/* Cosméticos Cards*/}
          <Animated.FlatList
            horizontal
            data={produtosComDesconto}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            snapToInterval={171}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 6, gap: 30 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item }) => (
              <View style={{ width: 141, height: 201, backgroundColor: '#F7F7F7', borderRadius: 12, padding: 0, shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 2, height: 4 }, shadowRadius: 4, elevation: 3, justifyContent: 'center' }}>
                <Image source={item.image} style={{ width: 97, marginLeft: 22, top: -6 }} resizeMode="contain"></Image>
                <Text style={{ fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F', top: -58, marginLeft: 8, marginRight: 8 }} numberOfLines={2} ellipsizeMode="tail">{item.nome}</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Inter', color: '#4F4F4F', top: -58, marginLeft: 8 }}>{item.unidades}</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F', top: -56, marginLeft: 8 }}>{item.preco}</Text>
              </View>
            )}
          />
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
      </ScrollView>
    </View>
  );
}