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
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Eye, EyeOff } from "lucide-react-native";
import api from "../api/axios";
import { tokenStorage } from "../utils/tokenStorage";
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Validation
        if (!email || !password) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        if (!email.includes('@')) {
            setError("Email invalide");
            return;
        }

        try {
            setLoading(true);
            setError("");

            console.log("📤 Attempting login with:", email);

            const res = await api.post("/auth/login", {
                email: email.trim().toLowerCase(),
                password
            });

            console.log("✅ Login successful");

            // Check response
            if (!res.data || !res.data.token) {
                throw new Error("Invalid server response");
            }

            const { token, user } = res.data;

            // Save token & user
            await tokenStorage.setToken(token);
            await tokenStorage.setUser(user);

            console.log("✅ Token and user saved");

            // ✅ FIXED: Use reset instead of replace to avoid navigation errors
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'TaskList',
                            params: { user }
                        }
                    ],
                })
            );

        } catch (err: any) {
            console.error("❌ Login error:", err);

            let errorMessage = "Erreur de connexion";

            if (err.response) {
                errorMessage = err.response.data?.message ||
                    `Erreur ${err.response.status}`;
                console.log("Server error:", errorMessage);
            } else if (err.request) {
                errorMessage = "Impossible de contacter le serveur. Vérifiez que le backend est démarré!";
                console.log("🚨 Backend not responding!");
            } else {
                errorMessage = err.message;
            }

            setError(errorMessage);
            Alert.alert("Erreur", errorMessage);
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
                            Connectez-vous pour gérer vos tâches
                        </Text>

                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="exemple@email.com"
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
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator color="#fff" />
                                        <Text style={styles.loadingText}>Connexion...</Text>
                                    </View>
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
    container: { flex: 1, backgroundColor: "#FCF8F3" },
    keyboardView: { flex: 1 },
    scrollContent: { flexGrow: 1 },
    centerContent: { flex: 1, justifyContent: "center", paddingHorizontal: 25 },
    title: { fontSize: 28, fontWeight: "bold", color: "#222", textAlign: "center", marginBottom: 8 },
    subtitle: { textAlign: "center", color: "#777", fontSize: 15, marginBottom: 40 },
    form: { width: "100%" },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 8 },
    input: { height: 55, backgroundColor: "white", borderRadius: 12, paddingHorizontal: 15, fontSize: 15, color: "#333", elevation: 2 },
    passwordContainer: { position: "relative" },
    passwordInput: { paddingRight: 50 },
    eyeButton: { position: "absolute", right: 15, top: 17, padding: 5 },
    errorContainer: { backgroundColor: "#FEE", borderColor: "#FCC", borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 15 },
    errorText: { color: "#C00", fontSize: 13, textAlign: "center" },
    button: { backgroundColor: "#0077B6", height: 55, borderRadius: 12, justifyContent: "center", alignItems: "center", marginTop: 10, elevation: 3 },
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
    loadingContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
    loadingText: { color: "white", fontSize: 14 },
    footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
    footerText: { color: "#777", fontSize: 14 },
    footerLink: { color: "#0077B6", fontWeight: "bold", fontSize: 14 },
});