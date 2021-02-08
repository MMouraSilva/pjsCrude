import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, TextInput, Pressable, LogBox, ScrollView } from 'react-native';
import styles from './styles.js';
import { database } from './src/config/firebase';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default class App extends Component {
  state =  {
    produtos: null,
    produtosFilter: null,
    nome: null,
    descricao: null,
    valor: null,
  }

  function(props) {
    const navigation = useNavigation();
    return <MyBackButton {...props} navigation={navigation} />
  }

  componentDidMount() {
    const { route } = this.props;
    const produto = route.params.produto
    this.read();

    const action = route.params.action;

    if(action == 'update') {
      this.setState({ nome: produto.nome, descricao: produto.descricao, valor: produto.valor })
    }
  }

  create = async () => {
    const nome = this.state.nome;
    const descricao = this.state.descricao;
    const valor = this.state.valor;
    const { navigation } = this.props;

    database.collection('produtos').add({
      nome,
      descricao,
      valor
    });

    this.setState({ nome: null, descricao: null, valor: null })
    navigation.goBack();
  }

  read = async (text) => {
    let filtrado;

    database.collection('produtos').onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id});
      })

      this.setState({ produtos: list })
      input = text;

      filtrado = list.filter(this.acharCorrespondencia);
      this.setState({produtosFilter: filtrado});
    })
  }

  update = async (id) => {
    const { navigation } = this.props;
    const nome = this.state.nome;
    const descricao = this.state.descricao;
    const valor = this.state.valor;
    database.collection('produtos').doc(id).update({
      nome,
      descricao,
      valor
    })
    navigation.goBack();
  }

  delete = async (id) => {
    database.collection('produtos').doc(id).delete()
  }

  acharCorrespondencia(produto) {

    let termo = input;
    var regex = new RegExp(termo, 'gi');

    if(regex.test(produto.nome))
      return true;

    if(regex.test(produto.descricao))
      return true;

    return false;
  }

  render() {
    LogBox.ignoreLogs(['Setting a timer for a long '], ['Can\'t perform a React state']);
    const nome = this.state.nome;
    const descricao = this.state.descricao;
    const valor = this.state.valor;
    const { navigation } = this.props;
    const { route } = this.props;
    const page = route.params.page;

    const produto = route.params.produto;
    const action = route.params.action;

    switch(page){
      case 'inicial':
        return (
          <View style={styles.container}>

            <View style={styles.buttonView}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                    ? '#43515C'
                    : '#2D363D'
                  },
                  styles.button
                ]}
                onPress={() => {
                  navigation.push('App', { page: 'criarAtualizar', action: 'create' })
                }}
              >
                <AntDesign name="plus" size={30} color='#fff'/>
              </Pressable>
            </View>

            <ScrollView>
              <StatusBar style="auto" />
              <View style={styles.titleView}>
                <Text style={styles.title}>Lista de Produtos</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Pesquisar"
                onChangeText={(text) => this.read(text)}
              />
              <ScrollView style={styles.scrollView}>
                {
                  this.state.produtosFilter == null
                  ? null
                  : this.state.produtosFilter.map(produto =>
                      <View style={styles.produtoView} key={produto.id}>
                        <Pressable
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                              ? '#43515C'
                              : '#2D363D'
                            },
                            styles.produtos
                          ]}
                            onPress={() => {
                            navigation.push('App', {
                              page: 'produtoInfo',
                              produto: produto
                            })
                          }}
                        >
                          <Text style={styles.produtoNome}>{produto.nome}</Text>
                          <Text style={styles.produtoDescricao} numberOfLines={1}>{produto.descricao}</Text>
                          <Text style={styles.produtoValor}>R$ {produto.valor}</Text>
                        </Pressable>
                        <Ionicons onPress={() => this.delete(produto.id)} name="trash" size={30} color='#db0000' style={{ marginLeft: '7%' }}/>
                      </View>
                  )
                }
              </ScrollView>
            </ScrollView>
          </View>
        );
      
      case 'criarAtualizar':
        return(
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.titleView}>
                <Text style={styles.title}>
                  {
                    action == 'create' 
                    ? 'Criar Produto'
                    : action == 'update'
                    ? 'Atualizar Produto'
                    : null
                  }
                </Text>
              </View>
              <TextInput style={styles.textInput} placeholder="Nome" value={nome} onChangeText={(text) => this.setState({ nome: text })}/>
              <TextInput style={styles.textInput} placeholder="Descrição" value={descricao} onChangeText={(text) => this.setState({ descricao: text })}/>
              <TextInput style={styles.textInput} placeholder="Valor" value={valor} onChangeText={(text) => this.setState({ valor: text })}/>
              <Pressable
                onPress={() => {
                  if(action == 'create') {
                    this.create()
                  }else if(action == 'update') {
                    this.update(produto.id)
                  }
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                    ? '#43515C'
                    : '#2D363D'
                  },
                  styles.botao
                ]}
              >
                <Text style={styles.botaoText}>
                  {
                    action == 'create'
                    ? 'Criar'
                    : action == 'update'
                    ? 'Atualizar'
                    : null
                  }
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        );

      case 'produtoInfo':
        return(
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.titleView}>
                <Text style={styles.title}>{produto.nome}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.produtoText}>{produto.descricao}</Text>
                <Text style={styles.produtoText}>R$ {produto.valor}</Text>
              </View>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                    ? '#43515C'
                    : '#2D363D'
                  },
                  styles.botao
                ]}
                onPress={() => {
                  navigation.goBack();
                  navigation.push('App', {
                    page: 'criarAtualizar',
                    action: 'update',
                    produto: produto
                  })
                }}
              >
                <Text style={styles.botaoText}>Editar</Text>
              </Pressable>
            </ScrollView>
          </View>
        );
    }
  }
}