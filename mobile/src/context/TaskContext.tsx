import React, { createContext, useContext, useState } from "react";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: "pending" | "done";
    dueDate?: string;
}

interface TaskContextType {
    tasks: Task[];
    createTask: (task: Omit<Task, "id">) => void;
    markDone: (id: number) => void;
    deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const createTask = (task: Omit<Task, "id">) => {
        setTasks(prev => [
            ...prev,
            { ...task, id: Date.now() }
        ]);
    };

    const markDone = (id: number) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === id ? { ...t, status: "done" } : t
            )
        );
    };

    const deleteTask = (id: number) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, createTask, markDone, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used inside TaskProvider");
    }
    return context;
};
