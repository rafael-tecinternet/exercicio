import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  Image,
  View,
  Text,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Home = ({ navigation }) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [foto, setFoto] = useState();
  const [titulo, onChangeText] = useState();

  const [informacoes, setInformacoes] = useState();

  const obterTitulo = useEffect(() => {
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }
    verificaPermissoes();
  }, []);

  const acessarCamera = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
    setFoto(image.assets[0].uri);
  };

  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = Location.requestForegroundPermissionsAsync();

      let localizacaoAtual = await Location.getCurrentPositionAsync({});

      setMinhaLocalizacao(localizacaoAtual);
    }
    obterLocalizacao();
  }, []);
  console.log(minhaLocalizacao);
  const regiaoInicial = {
    latitude: -23.533773,
    longitude: -46.65529,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };
  const [localizacao, setLocalizacao] = useState();

  const marcarLocal = () => {
    setLocalizacao({
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      latitude: minhaLocalizacao.coords.latitude,
      longitude: minhaLocalizacao.coords.longitude,
    });
    console.log(localizacao);
  };

  const dados = [foto, titulo, localizacao];
  console.log(dados);

  const salvar = async () => {
    const fotosFavoritas = await AsyncStorage.getItem("@fotos");

    let listaDeFotos = JSON.parse(fotosFavoritas);

    if (!listaDeFotos) {
      listaDeFotos = [];
    }

    listaDeFotos.push(dados);

    await AsyncStorage.setItem("@fotos", JSON.stringify(listaDeFotos));
    Alert.alert("Fotos", "Foto salva com sucesso!");
  };

  const teste = async () => {
    try {
      const dados = await AsyncStorage.getItem("@fotos");
      const fotos = JSON.parse(dados);
      if (dados != null) {
        setInformacoes(fotos);
      }
    } catch (error) {
      console.log("Deu ruim no carregamento: " + error.message);
    }
    console.log(informacoes);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={estilos.titulo}>
        <TextInput
          style={estilos.input}
          onChangeText={onChangeText}
          value={titulo}
          placeholder="Digite um título"
          textAlign="center"
          multiline={true}
        />
      </View>

      <View style={estilos.foto}>
        <Image source={{ uri: foto }} style={estilos.imagem} />
      </View>
      <Button title="Tirar Foto" onPress={acessarCamera} />
      <View style={estilos.viewMapa}>
        <MapView
          onPress={marcarLocal}
          style={estilos.mapa}
          region={localizacao ?? regiaoInicial}
          liteMode={false} //somente android
          mapType="standard"
        >
          {localizacao && (
            <Marker
              coordinate={localizacao}
              title="Aqui"
              onPress={(event) => console.log(event.nativeEvent)}
            />
          )}
        </MapView>
        <Button title="Localizar no mapa" onPress={marcarLocal} />
      </View>
      <View style={estilos.salvar}>
        <Button title="Salvar" onPress={salvar} />
        <Button title="Galeria" onPress={() => navigation.navigate("Fotos")} />
        <Button title="teste" onPress={teste} />
      </View>
    </View>
  );
};

export default Home;

const estilos = StyleSheet.create({
  salvar: {
    marginVertical: 16,
    flexDirection: "row",
    width: 200,
    justifyContent: "space-evenly",
  },
  foto: {
    borderWidth: 1,
    marginVertical: 16,
    backgroundColor: "#888",
  },
  input: {
    borderWidth: 1,
    height: 40,
    width: 300,
    padding: 8,
  },
  imagem: {
    width: 200,
    height: 200,
    marginVertical: 16,
  },
  mapa: {
    width: 200,
    height: 200,
    marginVertical: 16,
  },
  container: {
    flex: 1,
  },
});
