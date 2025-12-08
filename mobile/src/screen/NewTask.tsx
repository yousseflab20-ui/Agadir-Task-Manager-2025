import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import { useTasks, Task } from "../context/TaskContext";
const NewTask = ({ navigation }: any) => {
    const { createTask } = useTasks();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = () => {
        if (!title.trim()) {
            Alert.alert("Erreur", "Titre obligatoire");
            return;
        }

        createTask({
            title,
            description,
            status: "pending",
            dueDate: new Date().toISOString(),
        });

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nouvelle tâche</Text>

            <TextInput
                style={styles.input}
                placeholder="Titre"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.btnText}>Ajouter</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NewTask;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    input: {
        backgroundColor: "#f2f2f2",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
    },
    btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
