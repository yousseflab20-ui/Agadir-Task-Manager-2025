import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
const SignupScreen = (props: any) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                {/* <RollerCoaster
                    size={96}
                    absoluteStrokeWidth={true}
                /> */}
                <Text style={styles.backArrow}>{'<'}</Text>
                <Text style={styles.appTitle} onPress={() => props.navigation.navigate("LoginScreen")}>Agadir Task Manager 2025</Text>
            </View>

            <Text style={styles.mainHeading}>Créez votre compte</Text>

            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nom complet</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Entrez votre nom complet"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Entrez votre adresse email"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <View style={styles.passwordField}>
                        <TextInput
                            style={styles.input}
                            placeholder="Créez un mot de passe"
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.passwordToggle}>
                            <Text style={{ fontSize: 18 }}>&#128065;</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.createAccountBtn}>
                    <Text style={styles.buttonText}>Créer un compte</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.loginPrompt}>
                <Text style={styles.promptText}>Vous avez déjà un compte? </Text>
                <TouchableOpacity onPress={() => console.log('Se connecter clicked')}>
                    <Text style={styles.loginLink} onPress={() => props.navigation.navigate("LoginScreen")}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF8F3',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    backArrow: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 15,
    },
    appTitle: {
        fontSize: 20,
        color: '#555',
        fontWeight: "bold"
    },
    mainHeading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#333',
        marginBottom: 40,
    },
    formGroup: {
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        flex: 1,
    },
    passwordField: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordToggle: {
        position: 'absolute',
        right: 15,
        padding: 5,
    },
    createAccountBtn: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    loginPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    promptText: {
        fontSize: 16,
        color: '#666',
    },
    loginLink: {
        color: '#007bff',
        fontWeight: '600',
        fontSize: 16,
    },
    form: {

    }
});

export default SignupScreen;