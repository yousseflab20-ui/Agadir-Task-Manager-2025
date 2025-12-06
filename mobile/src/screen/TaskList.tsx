import { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const TaskList = () => {
    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        { id: 1, label: "Toutes" },
        { id: 2, label: "En cours" },
        { id: 3, label: "Terminées" },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="menu" size={24} color="#333" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Mes Tâches</Text>

                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="notifications-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* TABS */}
            <View style={styles.tabsContainer}>
                <View style={styles.tabsWrapper}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id)}
                            style={[
                                styles.tab,
                                activeTab === tab.id && styles.activeTab
                            ]}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === tab.id && styles.activeTabText
                            ]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* CONTENT */}
            <View style={styles.content}>
                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        Contenu de l'onglet{" "}
                        <Text style={styles.contentBold}>
                            {tabs.find((t) => t.id === activeTab)?.label}
                        </Text>
                    </Text>
                    <Text style={styles.contentSubtext}>
                        ID de l'onglet actif: {activeTab}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TaskList;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    tabsContainer: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    tabsWrapper: {
        flexDirection: "row",
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    activeTab: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#666",
    },
    activeTabText: {
        color: "#006FBF",
        fontWeight: "600",
    },
    content: {
        flex: 1,
        padding: 16,
    },
    contentCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    contentText: {
        fontSize: 15,
        color: "#666",
    },
    contentBold: {
        fontWeight: "600",
        color: "#333",
    },
    contentSubtext: {
        fontSize: 13,
        color: "#999",
        marginTop: 8,
    },
});