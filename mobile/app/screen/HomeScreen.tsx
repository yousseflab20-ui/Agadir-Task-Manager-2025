/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    Dimensions,
    Platform,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('window').height;

function HomeScren(props: any) {
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#FCF8F3' }]}>
            <StatusBar hidden={true} />

            <View style={styles.centerContent}>
                <View style={styles.iconContainer}>

                    {/* <Image
                        source={require("./assets/téléchargement (3).jpeg")}
                    /> */}
                </View>

                <Text style={styles.title}>Agadir Task Manager</Text>
                <Text style={styles.subtitle}>
                    Gérez vos tâches quotidiennes, avec simplicité.
                </Text>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.ButtonSC} onPress={() => props.navigation.navigate("LoginScreen")}>
                    <Text style={styles.TextSC}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonCM} onPress={() => props.navigation.navigate("CreerCompt")}>
                    <Text style={styles.TextCM}>Créer un compte</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: windowHeight * 0.18,
    },
    iconContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginBottom: 30,

        ...Platform.select({
            android: {
                elevation: 5,
            },
        }),
    },
    checkIcon: {
        width: 60,
        height: 60,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        width: '60%',
    },

    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    ButtonSC: {
        width: '100%',
        padding: 18,
        backgroundColor: '#0077B6',
        borderRadius: 15,
        marginBottom: 15,
    },
    TextSC: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        fontFamily: 'Poppins-Regular',
    },
    ButtonCM: {
        width: '100%',
        padding: 18,
        backgroundColor: 'transparent',
        borderRadius: 15,
        borderColor: '#F4A261',
        borderWidth: 1.5,
    },
    TextCM: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#F4A261',
    },
});

export default HomeScren;