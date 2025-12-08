import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert
} from "react-native";
import { Plus, Trash2, CheckCircle, Circle } from "lucide-react-native";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../context/TaskContext";

const TaskList = ({ navigation }: any) => {
    const [activeTab, setActiveTab] = useState(1);
    const { tasks, markDone, deleteTask } = useTasks();

    const filteredTasks = tasks.filter(task => {
        if (activeTab === 2) return task.status === "pending";
        if (activeTab === 3) return task.status === "done";
        return true;
    });

    const renderTask = ({ item }: { item: Task }) => (
        <View style={styles.taskCard}>
            <TouchableOpacity
                style={styles.taskLeft}
                onPress={() => markDone(item.id)}
            >
                {item.status === "done" ? (
                    <CheckCircle size={24} color="#4CAF50" />
                ) : (
                    <Circle size={24} color="#999" />
                )}

                <View>
                    <Text
                        style={[
                            styles.taskTitle,
                            item.status === "done" && styles.done
                        ]}
                    >
                        {item.title}
                    </Text>
                    {item.description && (
                        <Text style={styles.desc}>{item.description}</Text>
                    )}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>
                    Alert.alert(
                        "Confirmation",
                        "T7yed had task?",
                        [
                            { text: "Non" },
                            {
                                text: "Oui",
                                style: "destructive",
                                onPress: () => deleteTask(item.id)
                            },
                        ]
                    )
                }
            >
                <Trash2 size={20} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                {["Toutes", "En cours", "Terminées"].map((t, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.tab, activeTab === i + 1 && styles.activeTab]}
                        onPress={() => setActiveTab(i + 1)}
                    >
                        <Text>{t}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={item => item.id.toString()}
                renderItem={renderTask}
                ListEmptyComponent={<Text style={styles.empty}>Aucune tâche</Text>}
            />

            <TouchableOpacity
                style={styles.add}
                onPress={() => navigation.navigate("NewTask")}
            >
                <Plus color="#fff" size={30} />
            </TouchableOpacity>
        </View>
    );
};

export default TaskList;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    tabs: { flexDirection: "row", marginBottom: 10 },
    tab: { flex: 1, padding: 10, alignItems: "center" },
    activeTab: { backgroundColor: "#eee" },
    taskCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 10,
    },
    taskLeft: { flexDirection: "row", gap: 10 },
    taskTitle: { fontWeight: "600", fontSize: 16 },
    done: { textDecorationLine: "line-through", color: "#999" },
    desc: { color: "#666" },
    empty: { textAlign: "center", marginTop: 50 },
    add: {
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: "#006FBF",
        padding: 15,
        borderRadius: 30,
    },
});
