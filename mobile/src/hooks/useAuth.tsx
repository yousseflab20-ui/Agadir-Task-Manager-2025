import { useState } from "react";
import api from "../api/axios";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const res = await api.post("/auth/login", { email, password });

            // Token + user
            const { token, user } = res.data;
            // ممكن تخزن token ف AsyncStorage
            console.log("Logged in user:", user, "Token:", token);
            return { user, token };
        } catch (err: any) {
            console.log("Login error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Login failed");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};
