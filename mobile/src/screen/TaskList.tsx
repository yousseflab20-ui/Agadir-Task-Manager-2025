import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";
import { Plus, Trash2, CheckCircle, Circle } from "lucide-react-native";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../context/TaskContext";

type TabType = "all" | "pending" | "done";

const TABS: { key: TabType; label: string }[] = [
    { key: "all", label: "Toutes" },
    { key: "pending", label: "En cours" },
    { key: "done", label: "Terminées" },
];

const TaskList = ({ navigation }: any) => {
    const { tasks, markDone, deleteTask } = useTasks();
    const [activeTab, setActiveTab] = useState<TabType>("all");

    // ✅ Filter tasks (optimized)
    const filteredTasks = useMemo(() => {
        if (activeTab === "pending")
            return tasks.filter(t => t.status === "pending");
        if (activeTab === "done")
            return tasks.filter(t => t.status === "done");
        return tasks;
    }, [tasks, activeTab]);

    const renderTask = ({ item }: { item: Task }) => (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.left}
                onPress={() => markDone(item.id)}
                activeOpacity={0.7}
            >
                {item.status === "done" ? (
                    <CheckCircle size={26} color="#2ecc71" />
                ) : (
                    <Circle size={26} color="#b0b0b0" />
                )}

                <View style={{ flex: 1 }}>
                    <Text
                        style={[
                            styles.title,
                            item.status === "done" && styles.done,
                        ]}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>

                    {!!item.description && (
                        <Text style={styles.desc} numberOfLines={2}>
                            {item.description}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>
                    Alert.alert("Confirmation", "T7yed had task?", [
                        { text: "Non", style: "cancel" },
                        {
                            text: "Oui",
                            style: "destructive",
                            onPress: () => deleteTask(item.id),
                        },
                    ])
                }
            >
                <Trash2 size={20} color="#ff5252" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* ✅ Tabs */}
            <View style={styles.tabs}>
                {TABS.map(tab => (
                    <TouchableOpacity
                        key={tab.key}
                        style={[
                            styles.tab,
                            activeTab === tab.key && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab(tab.key)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab.key && styles.activeTabText,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ✅ List */}
            <FlatList
                data={filteredTasks}
                keyExtractor={item => item.id.toString()}
                renderItem={renderTask}
                contentContainerStyle={
                    filteredTasks.length === 0 && styles.emptyContainer
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Aucune tâche 😴</Text>
                }
            />

            {/* ✅ Floating Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("NewTask")}
                activeOpacity={0.9}
            >
                <Plus size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default TaskList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f6fa",
    },

    /* Tabs */
    tabs: {
        flexDirection: "row",
        backgroundColor: "#eaeaea",
        borderRadius: 12,
        marginBottom: 15,
        overflow: "hidden",
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
    },
    activeTab: {
        backgroundColor: "#006FBF",
    },
    tabText: {
        color: "#555",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#fff",
        fontWeight: "700",
    },

    /* Card */
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 2,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },
    done: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    desc: {
        marginTop: 2,
        fontSize: 13,
        color: "#777",
    },

    /* Empty */
    emptyContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
    },

    /* FAB */
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        backgroundColor: "#006FBF",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
});
