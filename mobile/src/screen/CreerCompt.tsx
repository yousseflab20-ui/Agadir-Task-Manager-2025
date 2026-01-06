import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import api from "../api/axios";
import { tokenStorage } from "../utils/tokenStorage";

const SignupScreen = (props: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await api.post("/auth/register", { name, email, password });
            const { token, user } = res.data;

            // Save token
            await tokenStorage.setToken(token);

            console.log("Registered user:", user, "Token:", token);
            props.navigation.replace("TaskList", { user });
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur d'inscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={styles.backButton}
                    >
                        <ArrowLeft size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.appTitle}>Agadir Task Manager 2025</Text>
                </View>

                <Text style={styles.mainHeading}>Créez votre compte</Text>

                <View style={styles.form}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nom complet</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez votre nom complet"
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={setName}
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez votre adresse email"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <View style={styles.passwordField}>
                            <TextInput
                                style={[styles.input, styles.passwordInput]}
                                placeholder="Créez un mot de passe (min. 6 caractères)"
                                placeholderTextColor="#999"
                                secureTextEntry={!passwordVisible}
                                value={password}
                                onChangeText={setPassword}
                                editable={!loading}
                            />
                            <TouchableOpacity
                                style={styles.passwordToggle}
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
                        style={[styles.createAccountBtn, loading && styles.buttonDisabled]}
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Créer un compte</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Vous avez déjà un compte ? </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                            <Text style={styles.footerLink}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF8F3",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    backButton: {
        padding: 5,
    },
    appTitle: {
        fontSize: 18,
        color: "#555",
        fontWeight: "bold",
        marginLeft: 10,
    },
    mainHeading: {
        fontSize: 28,
        fontWeight: "700",
        color: "#333",
        marginBottom: 30,
    },
    form: {
        marginBottom: 50,
    },
    formGroup: {
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
        borderColor: "#e0e0e0",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        backgroundColor: "#fff",
        color: "#333",
    },
    passwordField: {
        position: "relative",
    },
    passwordInput: {
        paddingRight: 50,
    },
    passwordToggle: {
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
    createAccountBtn: {
        backgroundColor: "#0077B6",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
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
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
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

export default SignupScreen;