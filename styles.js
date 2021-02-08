import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#23a3de',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 8,
        margin: 20,
        height: 40,
        width: width - 120
    },

    produtos: {
        borderColor: '#000',
        borderWidth: 1,
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: '5%',
        width: '70%'
    },

    produtoNome: {
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '3%',
    },

    produtoDescricao: {
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: '3%',
        marginTop: '3%',
        marginRight: '3%'
    },

    produtoValor: {
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: '3%',
        marginTop: '3%',
        marginRight: '3%',
        marginBottom: '3%'
    },

    scrollView: {
        borderWidth: 1,
        borderColor: '#000',
        width: width - 80,
        marginTop: '10%',
        backgroundColor: '#fff'
    },

    produtoView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    
    button: {
        position: 'absolute',
        width: 55,
        height: 55,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 50,
        right: 20,
        zIndex: 500,
        shadowColor: '#2D363D',
        shadowOpacity: 0.3,
        shadowRadius: 45,
        shadowOffset: { width: 1, height: 13 },
        elevation: 8
    },

    buttonView: {
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
        right: 0
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
    
    titleView: {
        alignItems: 'center',
        marginTop: '10%'
    },

    botao: {
        margin: 20,
        height: '12%',
        width: width - 120,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    botaoText: {
        color: '#fff',
        fontWeight: 'bold'
    },

    produtoText: {
        color: '#fff',
        fontSize: 20,
        marginTop: '3%'
    },

    content: {
        marginTop: '20%',
        marginBottom: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles;