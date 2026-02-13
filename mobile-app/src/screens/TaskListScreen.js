import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Button,
    RefreshControl,
    TouchableOpacity,
} from "react-native";

import { fetchTasks } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function TaskListScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const loadTasks = async () => {
        try {
            setError(null);
            const response = await fetchTasks();
            setTasks(response.data.tasks);
        } catch (err) {
            setError("Failed to load tasks");
            console.error(err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            const fetch = async () => {
            setLoading(true);
            await loadTasks();
            setLoading(false);
            };
            fetch();
        }, [])
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadTasks();
        setRefreshing(false);
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading tasks...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ marginBottom: 4 }}>{error}</Text>
                <Button title="Retry" onPress={loadTasks} />
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                
                <Text style={styles.title}>Tasks</Text>

                <TouchableOpacity
                    style={styles.rightContainer}
                    onPress={() => navigation.navigate("CreateTask")}
                    >
                    <Ionicons name="add" size={24} color="#007AFF" />
                    <Text style={styles.rightText}>Create</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={() =>
                            navigation.navigate("TaskDetail", { taskId: item.id })
                        }
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={{
                    paddingTop: 8,
                    flexGrow: 1,
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>No tasks found</Text>
                        <Text style={styles.emptySubtitle}>
                            Tap "Create" to add your first task
                        </Text>
                    </View>
                }
            />

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f6fa",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rightText: {
        marginLeft: 4,
        color: "#007AFF",
        fontSize: 16,
        fontWeight: "500",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },

    emptySubtitle: {
        fontSize: 14,
        color: "#777",
    },
});
