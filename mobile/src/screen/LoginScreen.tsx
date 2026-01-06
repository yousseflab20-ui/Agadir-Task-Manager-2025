import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Eye, EyeOff } from "lucide-react-native";
import api from "../api/axios";
import { tokenStorage } from "../utils/tokenStorage";

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await api.post("/auth/login", { email, password });
            const { token, user } = res.data;

            // Save token
            await tokenStorage.setToken(token);

            console.log("Logged in user:", user, "Token:", token);
            navigation.replace("TaskList", { user });
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.centerContent}>
                        <Text style={styles.title}>Bienvenue!</Text>
                        <Text style={styles.subtitle}>
                            Connectez-vous pour gérer vos tâches à Agadir
                        </Text>

                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Entrez votre email"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                    editable={!loading}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Mot de passe</Text>
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={[styles.input, styles.passwordInput]}
                                        placeholder="Entrez votre mot de passe"
                                        placeholderTextColor="#999"
                                        secureTextEntry={!passwordVisible}
                                        value={password}
                                        onChangeText={setPassword}
                                        editable={!loading}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeButton}
                                        onPress={() => setPasswordVisible(!passwordVisible)}
                                    >
                                        {passwordVisible ? (
                                            <EyeOff size={20} color="#0077B6" />
                                        ) : (
                                            <Eye size={20} color="#999" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {error !== "" && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            )}

                            <TouchableOpacity
                                style={[styles.button, loading && styles.buttonDisabled]}
                                onPress={handleLogin}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Se connecter</Text>
                                )}
                            </TouchableOpacity>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Pas encore de compte ? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                    <Text style={styles.footerLink}>Créer un compte</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF8F3",
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#222",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        textAlign: "center",
        color: "#777",
        fontSize: 15,
        marginBottom: 40,
    },
    form: {
        width: "100%",
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        height: 55,
        backgroundColor: "white",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#333",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    passwordContainer: {
        position: "relative",
    },
    passwordInput: {
        paddingRight: 50,
    },
    eyeButton: {
        position: "absolute",
        right: 15,
        top: 17,
        padding: 5,
    },
    errorContainer: {
        backgroundColor: "#FEE",
        borderColor: "#FCC",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },
    errorText: {
        color: "#C00",
        fontSize: 13,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#0077B6",
        height: 55,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        elevation: 3,
        shadowColor: "#0077B6",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    footerText: {
        color: "#777",
        fontSize: 14,
    },
    footerLink: {
        color: "#0077B6",
        fontWeight: "bold",
        fontSize: 14,
    },
});