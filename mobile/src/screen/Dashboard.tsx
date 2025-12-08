import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Modal,
    Alert
} from "react-native";

// Type dyal Task (temporary - 7ta n7alou l import)
interface Task {
    id: number;
    title: string;
    description?: string;
    status: "pending" | "done";
    dueDate?: string;
}

// Import dyal useTasks - essaye b tariqatayn
let useTasks: any;
try {
    const hookModule = require("../hooks/useTasks");
    useTasks = hookModule.useTasks || hookModule.default;
} catch (error) {
    console.error("Ma 9dertch n-import useTasks:", error);
}

export const Dashboard = () => {
    // Temporary hook ila l import ma khdamch
    const useTasksFallback = () => {
        const [tasks, setTasks] = useState<Task[]>([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        return {
            tasks,
            loading,
            error,
            createTask: async (task: any) => {
                const newTask = { ...task, id: Date.now(), status: "pending" as const };
                setTasks(prev => [...prev, newTask]);
            },
            markDone: async (id: number) => {
                setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "done" as const } : t));
            },
            deleteTask: async (id: number) => {
                setTasks(prev => prev.filter(t => t.id !== id));
            },
            fetchTasks: async () => { },
            updateTask: async () => { },
        };
    };

    const hookToUse = useTasks || useTasksFallback;
    const { tasks, loading, error, markDone, deleteTask, createTask } = hookToUse();
    const [modalVisible, setModalVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const handleCreateTask = async () => {
        if (!newTaskTitle.trim()) {
            Alert.alert("Error", "Title khasso ykon m3ebba!");
            return;
        }

        await createTask({
            title: newTaskTitle,
            description: newTaskDescription,
            status: "pending",
        });

        setNewTaskTitle("");
        setNewTaskDescription("");
        setModalVisible(false);
    };

    const handleMarkDone = async (id: number) => {
        await markDone(id);
    };

    const handleDelete = async (id: number) => {
        Alert.alert(
            "T2akid",
            "Wach bghiti t7yed had l task?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "7yed", onPress: () => deleteTask(id), style: "destructive" }
            ]
        );
    };

    const renderTask = ({ item }: { item: Task }) => (
        <View style={styles.taskCard}>
            <View style={styles.taskContent}>
                <Text style={[
                    styles.taskTitle,
                    item.status === "done" && styles.taskDone
                ]}>
                    {item.title}
                </Text>
                {item.description && (
                    <Text style={styles.taskDescription}>{item.description}</Text>
                )}
                <Text style={styles.taskStatus}>
                    Status: {item.status === "done" ? "✅ Done" : "⏳ Pending"}
                </Text>
            </View>
            <View style={styles.taskActions}>
                {item.status === "pending" && (
                    <TouchableOpacity
                        style={styles.doneButton}
                        onPress={() => handleMarkDone(item.id)}
                    >
                        <Text style={styles.buttonText}>✓ Done</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.buttonText}>🗑️ 7yed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading && tasks.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading tasks...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>❌ Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📋 Agadir Task Manager</Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Zid Task Jdid</Text>
            </TouchableOpacity>

            {tasks.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Ma kayn walou 3ad!</Text>
                    <Text style={styles.emptySubtext}>Zid task l l9owel</Text>
                </View>
            ) : (
                <FlatList
                    data={tasks}
                    renderItem={renderTask}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
            )}

            {/* Modal l zid task */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Task Jdid</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Title dyal task"
                            value={newTaskTitle}
                            onChangeText={setNewTaskTitle}
                        />

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Description (optional)"
                            value={newTaskDescription}
                            onChangeText={setNewTaskDescription}
                            multiline
                            numberOfLines={4}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setModalVisible(false);
                                    setNewTaskTitle("");
                                    setNewTaskDescription("");
                                }}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.createButton]}
                                onPress={handleCreateTask}
                            >
                                <Text style={styles.buttonText}>Créer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        marginTop: 40,
        color: "#333",
    },
    addButton: {
        backgroundColor: "#007AFF",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: "center",
    },
    addButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    listContent: {
        paddingBottom: 20,
    },
    taskCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    taskContent: {
        marginBottom: 12,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    taskDone: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    taskDescription: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    taskStatus: {
        fontSize: 12,
        color: "#999",
    },
    taskActions: {
        flexDirection: "row",
        gap: 8,
    },
    doneButton: {
        backgroundColor: "#34C759",
        padding: 8,
        borderRadius: 6,
        flex: 1,
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#FF3B30",
        padding: 8,
        borderRadius: 6,
        flex: 1,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#666",
    },
    errorText: {
        fontSize: 16,
        color: "#FF3B30",
        marginBottom: 16,
        textAlign: "center",
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 20,
        color: "#999",
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#ccc",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        width: "90%",
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    modalButtons: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
    },
    modalButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#999",
    },
    createButton: {
        backgroundColor: "#007AFF",
    },
});