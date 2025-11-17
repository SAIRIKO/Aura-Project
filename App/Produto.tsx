import { Text, View, ScrollView, Image, Animated, Pressable, TextInput } from 'react-native';
import { useRef, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { useCart } from './CartContext';

type RootStackParamList = {
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

type NavigationProp = StackNavigationProp<RootStackParamList>;
type ProdutoRouteProp = RouteProp<RootStackParamList, 'Produto'>;

export default function Produto() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ProdutoRouteProp>();
    const { id, nome, preco, unidades, image, desconto, precoOriginal } = route.params;
    const { addItem, items, totalItems } = useCart();
    const cartRoute = items.length ? 'CarrinhoItens' : 'Carrinho';

    const [searchText, setSearchText] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = useRef<TextInput>(null);

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
                    <Image source={require('./assets/header/logo.png')} style={{ width: 28, height: 28, marginLeft: 29 }}></Image>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 3, marginTop: 3, fontFamily: 'Inter' }}>Aura</Text>
                </Pressable>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.navigate(cartRoute)} style={{ position: 'relative' }}>
                        <Image source={require('./assets/header/cart.png')} style={{ width: 29, height: 24, marginRight: 26 }} resizeMode="contain"></Image>
                        {totalItems > 0 && (
                            <View style={{ position: 'absolute', top: -6, right: 14, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#FF4D4F', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}>
                                <Text style={{ fontSize: 10, fontFamily: 'Inter', fontWeight: '600', color: '#fff' }}>
                                    {totalItems}
                                </Text>
                            </View>
                        )}
                    </Pressable>
                    <Image source={require('./assets/header/sidebar.png')} style={{ width: 23, height: 27, marginRight: 27 }}></Image>
                </View>
            </View >

            {/* ScrollView (Abaixo da Header para manter a Header fixa no topo da tela) */}
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Imagem de Referência */}
                <Image source={require('./assets/ph.png')} style={{ width: '100%', height: undefined, aspectRatio: 802 / 2953, opacity: 0, zIndex: 10, top: -81, position: 'absolute' }} resizeMode="contain" />

                {/* Barra de Pesquisa */}
                <View style={{ backgroundColor: 'transparent', height: 90, width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 100, position: 'relative', elevation: 100 }}>
                    <View style={{ backgroundColor: '#F7F7F7', marginTop: 4, width: '87%', height: 50, borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', flexDirection: 'row', alignItems: 'center', elevation: 100 }}>
                        <Image source={require('./assets/searchbar/lupa.png')} style={{ width: 30, height: 40, marginLeft: 9, marginTop: 3 }} resizeMode="contain"></Image>
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

                {/* Breadcrumbs */}
                <View style={{ width: '100%', height: 40, backgroundColor: '#f3f3f3', marginTop: 12, display: 'flex', flexDirection: 'row', alignItems: 'center', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Inter', color: '#4F4F4F', marginLeft: 26 }}>Início &gt;</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Inter', color: 'Black' }}> {nome.split(' ')[0]}</Text>
                </View>

                {/* Nome do Produto e Quantidade de comprimidos */}
                <View style={{ marginTop: 22, marginLeft: 29, marginRight: 26 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '600', color: 'black' }}>{nome}</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Inter', color: '#4F4F4F', marginTop: 15 }}>{nome.split(' ')[0]} - {unidades}</Text>
                </View>

                {/* Imagem do Produto */}
                <View style={{ width: '100%', height: 250, backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={image} style={{ width: 196, height: 196, marginTop: 29 }} resizeMode="contain"></Image>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: 'white', height: 40 }}>
                    <Text style={{ marginLeft: 30, marginBottom: 7, color: '#4F4F4F' }}>Vendido e enviado por </Text>
                    <Text style={{ marginBottom: 7, color: 'black', fontWeight: 'bold' }}>Farmácia</Text>
                </View>

                {/* Preço do Produto */}

                {/* Container de Posição */}
                <View style={{ width: '100%', height: 220, backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {/* Container de Preço */}
                    <View style={{ backgroundColor: '#f3f3f3', width: '84%', height: 190, borderRadius: 12, marginTop: 9, display: 'flex', flexDirection: 'column', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                        {/* Container que organiza o preço e o dropdown */}
                        <View style={{ width: '100%', height: '65%', display: 'flex', flexDirection: 'row' }}>
                            {/* Container de Preço */}
                            <View style={{ width: '65%', height: '65%' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 22, marginTop: 21, width: '100%' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '400', color: '#4f4f4f', fontStyle: 'italic', textDecorationLine: 'line-through' }}>{precoOriginal}</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '400', color: '#0C9010', fontStyle: 'italic', marginLeft: 12 }}>{desconto}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 22, width: '100%', height: 42 }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'Inter', fontWeight: '600', color: 'black' }}>{preco}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 22, width: '100%', height: 46 }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500', color: 'black', textDecorationLine: 'underline' }}>Formas de pagamento</Text>
                                </View>
                            </View>
                            {/* Container de Dropdown */}
                            <View style={{ width: '35%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 80, height: 52, backgroundColor: 'white', borderRadius: 15, borderWidth: 2, borderColor: '#E0E0E0', marginBottom: 25, marginLeft: 3, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'Inter', fontWeight: '400', color: 'black', marginLeft: 10 }}>1</Text>
                                    <Image source={require('./assets/dropdownarrow.png')} style={{ width: 15, height: 15, marginLeft: 16 }}></Image>
                                </View>
                            </View>
                        </View>
                        {/* Container de Comprar */}
                        <View style={{ width: '100%', height: '35%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Pressable
                                onPress={() => {
                                    addItem({ id, nome, preco, unidades, image, desconto, precoOriginal });
                                    navigation.navigate('CarrinhoItens');
                                }}
                                style={{ width: '90%', height: '57%', backgroundColor: '#1A1B4F', marginTop: 6, borderRadius: 19, shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 2, height: 3 }, shadowRadius: 2, elevation: 2, justifyContent: 'center' }}
                            >
                                <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '500', color: 'white', textAlign: 'center' }}>Adicionar ao carrinho</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                {/* CEP e Formas de Entrega */}

                <View style={{ width: '100%', height: 165, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '600', color: 'black', marginLeft: 29, marginTop: 14 }}>
                        Consultar formas de entrega
                    </Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '400', color: '#808080', marginLeft: 31, marginTop: 20 }}>
                        Insira seu CEP
                    </Text>
                    <View style={{ backgroundColor: '#f3f3f3', width: '84%', height: 46, borderRadius: 12, marginTop: 4, display: 'flex', flexDirection: 'column', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)', marginLeft: 31 }}>
                    </View>
                    <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '400', color: '#808080', marginLeft: 32, marginTop: 11 }}>
                        Ex. 00000-00
                    </Text>
                </View>

                {/* Marca e Quantidade*/}
                <View style={{ width: '100%', height: 170, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
                    <View style={{ backgroundColor: '#f3f3f3', width: '84%', height: 140, borderRadius: 12, marginTop: 18, display: 'flex', flexDirection: 'column', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)', marginLeft: 31 }}>
                        <View style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('./assets/produto/marca.png')} style={{ width: 27, height: 27, marginLeft: 19, marginTop: 22, opacity: 0.75 }}></Image>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '400', color: 'black', marginLeft: 13, marginTop: 23, opacity: 0.75 }}>Marca</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: 'black', marginLeft: 0, marginTop: 23, opacity: 0.75 }}> {nome.split(' ')[0]}</Text>
                        </View>
                        <View style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <Image source={require('./assets/produto/quantidade.png')} style={{ width: 27, height: 27, marginLeft: 19, marginTop: 17, opacity: 0.75 }}></Image>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '400', color: 'black', marginLeft: 13, marginTop: 23, opacity: 0.75 }}>Quantidade</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: 'black', marginLeft: 0, marginTop: 23, opacity: 0.75 }}> {unidades}</Text>
                        </View>
                    </View>
                </View>

                {/* Descrição do Produto */}
                <View style={{ width: '100%', height: 170, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
                    <View style={{ backgroundColor: '#f3f3f3', width: '84%', height: 140, borderRadius: 12, marginTop: 18, display: 'flex', flexDirection: 'column', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)', marginLeft: 31 }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: 'black', marginLeft: 18, marginTop: 17 }}>Descriçao do produto</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: 'black', marginLeft: 18, marginTop: 17 }}>O que é</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}