import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

export type Task = {
    id: number;
    title: string;
    description?: string;
    status: "pending" | "done";
    dueDate?: string;
};

type TaskContextType = {
    tasks: Task[];
    createTask: (task: Omit<Task, "id">) => void;
    deleteTask: (id: number) => void;
    markDone: (id: number) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const createTask = (task: Omit<Task, "id">) => {
        setTasks(prev => [
            ...prev,
            { id: Date.now(), ...task },
        ]);
    };

    const deleteTask = (id: number) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const markDone = (id: number) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === id
                    ? { ...t, status: "done" }
                    : t
            )
        );
    };

    return (
        <TaskContext.Provider
            value={{ tasks, createTask, deleteTask, markDone }}
        >
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
