import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";

const NewTask = (props: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;

        setShowDatePicker(false);

        setDate(currentDate);
    };

    const handleAddTask = () => {
        if (!title.trim()) {
            Alert.alert("Erreur", "Veuillez entrer un titre pour la tâche.");
            return;
        }
        console.log("Nouvelle Tâche:", { title, description, date: date.toISOString() });

        Alert.alert("Succès", `Tâche "${title}" ajoutée avec succès!`);

        setTitle('');
        setDescription('');
        setDate(new Date());
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.scrollContent}>

                <View style={styles.formCard}>

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Ajouter une Tâche</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("TaskList")}>
                            <Text style={styles.cancelText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Titre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Préparer l'examen de maths"
                        placeholderTextColor="#999"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Description (Optionnel)</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="e.g., Réviser les chapitres 3 et 4..."
                        placeholderTextColor="#999"
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                    />

                    <Text style={styles.label}>Date Limite</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleAddTask}
                        disabled={!title.trim()}
                    >
                        <Text style={styles.buttonText}>Ajouter la Tâche</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f2f5",
        justifyContent: "center",
    },
    scrollContent: {
        alignItems: "center",
        paddingBottom: 60,
    },

    formCard: {
        width: '90%',
        maxWidth: 450,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 8,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#333",
    },
    cancelText: {
        color: "#dc3545",
        fontSize: 16,
        fontWeight: "600",
    },

    label: {
        marginBottom: 8,
        fontSize: 15,
        fontWeight: "600",
        color: "#555",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 18,
        backgroundColor: "#f9f9f9",
        fontSize: 16,
        color: "#333",
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    dateInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 18,
        backgroundColor: "#f9f9f9",
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default NewTask;