import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const Fotos = () => {
  const [listaFotos, setListaFotos] = useState([]);

  useEffect(() => {
    async function carregarFotos() {
      try {
        const dados = await AsyncStorage.getItem("@fotos");
        const fotos = JSON.parse(dados);
        if (dados != null) {
          setListaFotos(fotos);
        }
      } catch (error) {
        console.log("Deu ruim no carregamento: " + error.message);
      }
    }
    carregarFotos();
    console.log(listaFotos);
  }, []);

  return (
    <View>
      <Text>Fotos</Text>
    </View>
  );
};

export default Fotos;

const styles = StyleSheet.create({});
