import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignupScreen({ navigation }: any) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="#000" />
                    <Text style={styles.headerText}>Agadir Task Manager 2025</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Créez votre compte</Text>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Nom complet</Text>
                    <TextInput
                        placeholder="Entrez votre nom complet"
                        style={styles.input}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Entrez votre adresse email"
                        style={styles.input}
                        keyboardType="email-address"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Créez un mot de passe"
                            style={styles.passwordInput}
                            secureTextEntry={!showPassword}
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={20}
                                color="#777"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btnText}>Créer un compte</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text>Vous avez déjà un compte? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 14,
        fontWeight: "600",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 25,
    },
    fieldContainer: {
        marginBottom: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 15,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        justifyContent: "space-between",
    },
    passwordInput: {
        flex: 1,
        fontSize: 15,
    },
    button: {
        backgroundColor: "#006FBF",
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },
    loginText: {
        color: "#006FBF",
        fontWeight: "700",
    },
});
