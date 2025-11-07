import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export default function App() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', marginTop: 50 }}>
      <Image source={require('./assets/ph.png')} style={{ width: '100%', height: undefined, aspectRatio: 402 / 1061, opacity: 0.5, zIndex: 10, position: 'absolute' }} resizeMode="contain" />
      {/* Header */}
      <View style={{ backgroundColor: '#f3f3f3', height: 79, width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)', zIndex: 9 }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('./assets/header/logo.png')} style={{ width: 28, height: 28, marginLeft: 29 }}></Image>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 3, marginTop: 3, fontFamily: 'Inter' }}>Aura</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('./assets/header/cart.png')} style={{ width: 29, height: 24, marginRight: 26 }} resizeMode="contain"></Image>
          <Image source={require('./assets/header/sidebar.png')} style={{ width: 23, height: 27, marginRight: 27 }}></Image>
        </View>
      </View>

      {/* Search Bar */}
      <View style={{ backgroundColor: '#FFF', height: 90, width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ backgroundColor: '#F7F7F7', marginTop: 4, width: '87%', height: 50, borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('./assets/searchbar/lupa.png')} style={{ width: 30, height: 40, marginLeft: 9, marginTop: 3 }} resizeMode="contain"></Image>
          <Text style={{ fontSize: 16, fontFamily: 'Inter', marginLeft: 21, marginTop: 4, opacity: 0.25 }}>Buscar produtos ou farmácias</Text>
        </View>
      </View>
    </ScrollView>
  );
}