"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

interface Workout {
    id: number;
    name: string;
    image: string;
    equipment: string;
    duration: number;
    caloriesBurned: number;
    description?: string;
}

interface FitLogContextType {
    plan: Workout[];
    saved: Workout[];

    planCount: number;
    savedCount: number;

    addToPlan: (workout: Workout) => void;
    saveForLater: (workout: Workout) => void;

    removeFromPlan: (id: number) => void;
    removeFromSaved: (id: number) => void;

    markAsDone: (id: number) => void;
    isDone: (id: number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({children}: {children: ReactNode;}) {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [completed, setCompleted] = useState<number[]>([]);

    const [toast, setToast] = useState<string | null>(null);
    useEffect(() => {
        const storedPlan = localStorage.getItem("fitlog-plan");
        const storedSaved = localStorage.getItem("fitlog-saved");
        const storedCompleted = localStorage.getItem("fitlog-completed");

        if (storedPlan) {
            setPlan(JSON.parse(storedPlan));
        }

        if (storedSaved) {
            setSaved(JSON.parse(storedSaved));
        }

        if (storedCompleted) {
            setCompleted(JSON.parse(storedCompleted));
        }
    }, []);

    useEffect(() => {localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }, [plan]);

    useEffect(() => {localStorage.setItem("fitlog-saved",JSON.stringify(saved));
    }, [saved]);

    useEffect(() => {localStorage.setItem("fitlog-completed",JSON.stringify(completed));
    }, [completed]);

    const showToast = (message: string) => {
        setToast(message);

        setTimeout(() => {
            setToast(null);
        }, 2500);
    };

    const addToPlan = (workout: Workout) => {
        if (plan.some((item) => item.id === workout.id)) {
            return;
        }

        if (plan.length >= 5) {
            return;
        }

        setPlan((currentPlan) => [
            ...currentPlan,
            workout,
        ]);

        showToast("Added to today's plan");
    };

    const saveForLater = (workout: Workout) => {
        if (saved.some((item) => item.id === workout.id)) {
            return;
        }

        setSaved((currentSaved) => [
            ...currentSaved,
            workout,
        ]);

        showToast("Saved for later");
    };

    const removeFromPlan = (id: number) => {
        setPlan((currentPlan) =>
            currentPlan.filter(
                (workout) => workout.id !== id
            )
        );
    };

    const removeFromSaved = (id: number) => {
        setSaved((currentSaved) =>
            currentSaved.filter(
                (workout) => workout.id !== id
            )
        );
    };

    const markAsDone = (id: number) => {
        setCompleted((currentCompleted) => {
            if (currentCompleted.includes(id)) {
                return currentCompleted.filter(
                    (item) => item !== id
                );
            }

            return [...currentCompleted, id];
        });
    };

    const isDone = (id: number) => {
        return completed.includes(id);
    };

    const value = {
        plan,
        saved,

        planCount: plan.length,
        savedCount: saved.length,

        addToPlan,
        saveForLater,

        removeFromPlan,
        removeFromSaved,

        markAsDone,
        isDone,
    };

    return (
        <FitLogContext.Provider value={value}>{children}
            {toast && (
                <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
                    <div className="flex items-center gap-3 rounded-xl border border-[#ccff00]/40 bg-[#111318] px-6 py-4 text-sm font-bold text-white shadow-2xl">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ccff00] font-black text-black">✓</span>
                        <span>{toast}</span>
                    </div>
                </div>
            )}
        </FitLogContext.Provider>
    );
}

export function useFitLog() {
    const context = useContext(FitLogContext);

    if (!context) {
        throw new Error(
            "useFitLog must be used inside FitLogProvider"
        );
    }
    return context;
}