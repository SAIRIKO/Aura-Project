import { Text, View, Image, Pressable, FlatList, TextInput } from 'react-native';
import { useMemo, useState, useRef } from 'react';
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
type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

export default function SearchResults() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<SearchResultsRouteProp>();
    const { searchTerm } = route.params;
    const { items, totalItems } = useCart();
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

    // Lista de produtos (mesma estrutura da Home)
    const produtosComDesconto = [
        { id: '1', nome: 'Lactosil 10.000 FCC Lactase', preco: 'R$ 22,96', unidades: '30un', image: require('./assets/remedios/lactosil.png'), desconto: '-20%', precoOriginal: 'R$ 28,70' },
        { id: '2', nome: 'Cálcio OS-Cal 500mg', preco: 'R$ 54,38', unidades: '60s', image: require('./assets/remedios/oscal.png'), desconto: '-15%', precoOriginal: 'R$ 64,00' },
        { id: '3', nome: 'Dorflex Uno Efervescente', preco: 'R$ 28,99', unidades: '10un', image: require('./assets/remedios/dorflex.png'), desconto: '-10%', precoOriginal: 'R$ 32,21' },
        { id: '4', nome: 'Buscopan Composto Adulto 10mg+250mg', preco: 'R$ 20,87', unidades: '20c', image: require('./assets/remedios/buscopan.png'), desconto: '-23%', precoOriginal: 'R$ 27,13' },
        { id: '5', nome: 'Ibuprofeno 400mg Medley', preco: 'R$ 21,49', unidades: '10cps', image: require('./assets/remedios/ibuprofeno.png'), desconto: '-17%', precoOriginal: 'R$ 25,92' },
        { id: '6', nome: 'Cloridrato Tramadol 37,5mg + Paracetamol 500mg', preco: 'R$ 55,90', unidades: '30c', image: require('./assets/remedios/paracetamol.png'), desconto: '-38%', precoOriginal: 'R$ 89,84' },
    ];

    // Filtrar produtos baseado no termo de busca
    const produtosFiltrados = useMemo(() => {
        if (!searchTerm.trim()) {
            return [];
        }
        return produtosComDesconto.filter(produto =>
            produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, produtosComDesconto]);
    const renderHeader = () => (
        <>
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
            <View style={{ width: '120%', height: 40, backgroundColor: '#f3f3f3', marginTop: 12, display: 'flex', flexDirection: 'row', alignItems: 'center', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)', left: -17 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Inter', color: '#4F4F4F', marginLeft: 26 }}>Início &gt;</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Inter', color: '#4F4F4F' }}> Busca &gt;</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Inter', color: 'Black' }}> {searchTerm}</Text>
            </View>

            {/* Título dos Resultados */}
            <View style={{ width: '100%', backgroundColor: 'white', marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Inter', color: 'black', marginLeft: 17, marginTop: 10, marginBottom: 20 }}>
                    Resultados para "{searchTerm}"
                </Text>
            </View>
        </>
    );

    const renderEmpty = () => (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontFamily: 'Inter', color: '#4F4F4F' }}>
                Nenhum produto encontrado
            </Text>
        </View>
    );

    const renderItem = ({ item }: { item: typeof produtosComDesconto[0] }) => (
        <Pressable
            onPress={() => navigation.navigate('Produto', {
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                unidades: item.unidades,
                image: item.image,
                desconto: item.desconto,
                precoOriginal: item.precoOriginal
            })}
            style={{
                width: '48%',
                alignSelf: 'center',
                height: 201,
                backgroundColor: '#F7F7F7',
                borderRadius: 12,
                padding: 0,
                shadowColor: '#000',
                shadowOpacity: 0.25,
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 4,
                elevation: 3,
                justifyContent: 'center',
                marginBottom: 16
            }}
        >
            <Image source={item.image} style={{ width: 97, marginLeft: 22, top: -6 }} resizeMode="contain"></Image>
            <Text style={{ fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F', top: -58, marginLeft: 8, marginRight: 8 }} numberOfLines={2} ellipsizeMode="tail">{item.nome}</Text>
            <Text style={{ fontSize: 10, fontFamily: 'Inter', color: '#4F4F4F', top: -58, marginLeft: 8 }}>{item.unidades}</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: '#1A1B4F', top: -56, marginLeft: 8 }}>{item.preco}</Text>
            <View style={{ position: 'absolute', width: 38, height: 16, backgroundColor: '#1A1B4F', top: 16, marginLeft: 90, borderRadius: 8 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Inter', color: 'white', top: 3, marginLeft: 10 }}>{item.desconto}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
            <View style={{ backgroundColor: '#f3f3f3', height: 100, paddingTop: 30, width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)', zIndex: 10 }}>
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
            </View>

            {/* FlatList com header e resultados */}
            <FlatList
                data={produtosFiltrados}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmpty}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16, paddingTop: 0 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};