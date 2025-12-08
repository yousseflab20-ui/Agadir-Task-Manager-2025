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
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.get<Task[]>("/tasks");
            setTasks(res.data);
        } catch (err: any) {
            setError(err.message || "Error fetching tasks");
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (task: Partial<Task>) => {
        try {
            await api.post("/tasks", task);
            await fetchTasks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const updateTask = async (id: number, task: Partial<Task>) => {
        try {
            await api.put(`/tasks/${id}`, task);
            await fetchTasks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await api.delete(`/tasks/${id}`);
            await fetchTasks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const markDone = async (id: number) => {
        try {
            await api.patch(`/tasks/${id}/done`);
            await fetchTasks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask, markDone };
}