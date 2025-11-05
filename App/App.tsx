import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getMensagem } from "./src/services/api";

export default function App() {
  const [mensagem, setMensagem] = useState("Carregando...");

  useEffect(() => {
    getMensagem().then(setMensagem);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{mensagem}</Text>
    </View>
  );
}
