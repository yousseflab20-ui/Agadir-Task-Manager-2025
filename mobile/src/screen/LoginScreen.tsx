import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }: any) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>

            {/* CENTERED CONTENT */}
            <View style={styles.centerContent}>

                <Text style={styles.title}>Welcome Back!</Text>

                <Text style={styles.subtitle}>
                    Log in to manage your tasks in Agadir.
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry={!passwordVisible}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TaskList")}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Pas encore de compte ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("CreerCompt")}>
                        <Text style={styles.footerLink}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF8F3",
        paddingHorizontal: 25,
    },

    centerContent: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#222",
        textAlign: "center",
    },
    subtitle: {
        textAlign: "center",
        color: "#777",
        marginBottom: 30,
    },

    inputContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 25,
        paddingHorizontal: 15,
        alignItems: "center",
        height: 55,
        marginBottom: 20,
        elevation: 3,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: "#333",
    },

    button: {
        backgroundColor: "#0077B6",
        height: 55,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        elevation: 4,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },
    footerText: {
        color: "#777",
    },
    footerLink: {
        color: "#0077B6",
        fontWeight: "bold",
    },
});