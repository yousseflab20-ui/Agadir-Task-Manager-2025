import { useState, useEffect } from "react";
import api from "../api/axios";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: "pending" | "done";
    dueDate?: string;
}

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await api.get<Task[]>("/tasks");
            setTasks(res.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (task: Omit<Task, "id" | "status">) => {
        await api.post("/tasks", task);
        await fetchTasks();
    };

    const markDone = async (id: number) => {
        await api.patch(`/tasks/${id}`);
        await fetchTasks();
    };

    const deleteTask = async (id: number) => {
        await api.delete(`/tasks/${id}`);
        await fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, error, fetchTasks, createTask, markDone, deleteTask };
}
