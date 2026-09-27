"use client";

import { useState } from "react";
import Link from "next/link";
import { useFitLog } from "../context/FitLogContext";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
    const {
        plan,
        saved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        isDone,
    } = useFitLog();

    const [activeTab, setActiveTab] =useState<Tab>("plan");
    const [sortBy, setSortBy] = useState<"duration" | "calories">("duration");
    const totalMinutes = plan.reduce((total, workout) =>total + workout.duration,0);
    const totalCalories = plan.reduce((total, workout) =>total + workout.caloriesBurned,0);

    const currentWorkouts =activeTab === "plan"? plan: saved;

    const sortedWorkouts = [...currentWorkouts].sort((a, b) => {if (sortBy === "duration") {
                return a.duration - b.duration;
            }

            return (
                a.caloriesBurned -
                b.caloriesBurned
            );
        }
    );

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="mx-auto max-w-7xl px-6 py-14 md:px-8">
                <div>
                    <p className="text-xs font-black tracking-[0.25em] text-[#ccff00]">FITLOG</p>
                    <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">MY PLAN</h1>
                    <p className="mt-2 text-sm text-gray-500">Cap of five lifts today. Finish them, then load more.</p>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111318]">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <Metric label="Exercises" value={plan.length} highlight/>
                        <Metric label="Minutes" value={totalMinutes}/>
                        <Metric label="Calories" value={totalCalories}/>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-fit rounded-xl border border-white/10 bg-[#111318] p-1">
                        <button onClick={() => setActiveTab("plan")} className={`rounded-lg px-5 py-2 text-xs font-bold transition ${activeTab === "plan"? "bg-[#1d222b] text-white shadow": "text-gray-500 hover:text-white"}`}>Today's Plan</button>
                        <button onClick={() =>setActiveTab("saved")}className={`rounded-lg px-5 py-2 text-xs font-bold transition ${activeTab === "saved"? "bg-[#1d222b] text-white shadow": "text-gray-500 hover:text-white"}`}>Saved</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Sort By</span>
                        <select value={sortBy} onChange={(event) => setSortBy(event.target.value as | "duration"| "calories")}
                            className="rounded-lg border border-white/10 bg-[#111318] px-4 py-2 text-xs font-bold text-white outline-none">
                            <option value="duration">Duration</option>
                            <option value="calories">Calories</option>
                        </select>
                    </div>
                </div>

                <div className="mt-5">
                    {sortedWorkouts.length === 0 ? (<EmptyState />) : (
                        <div className="space-y-3">{sortedWorkouts.map((workout) => (<WorkoutCard key={workout.id} workout={workout}activeTab={activeTab}
                                        done={isDone(workout.id)}
                                        onDone={() =>markAsDone(workout.id)}
                                        onRemove={() => {
                                            if (
                                                activeTab ===
                                                "plan"
                                            ) {
                                                removeFromPlan(
                                                    workout.id
                                                );
                                            } else {
                                                removeFromSaved(
                                                    workout.id
                                                );
                                            }
                                        }}
                                    />
                                )
                            )}

                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function Metric({
    label,
    value,
    highlight = false,
}: {
    label: string;
    value: number;
    highlight?: boolean;
}) {
    return (
        <div className="border-b border-white/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
            <p className="text-[11px] font-medium text-gray-500">{label}</p>
            <p className={`mt-2 text-3xl font-black ${highlight ? "text-[#ccff00]" : "text-white"}`}>{value}</p>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0c0d10] px-6 text-center">
            <h2 className="text-xl font-black uppercase">NOTHING HERE YET</h2>
            <p className="mt-2 text-xs text-gray-500">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-5 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black text-black transition hover:bg-[#bfff00]">Go to workouts</Link>
        </div>
    );
}

function WorkoutCard({
    workout,
    activeTab,
    done,
    onDone,
    onRemove,
}: {
    workout: {
        id: number;
        name: string;
        image: string;
        equipment: string;
        duration: number;
        caloriesBurned: number;
    };
    activeTab: Tab;
    done: boolean;
    onDone: () => void;
    onRemove: () => void;
}) {
    return (
        <div className={`flex flex-col gap-4 rounded-2xl border p-3 transition sm:flex-row sm:items-center ${done ? "border-[#ccff00]/30 bg-[#ccff00]/5" : "border-white/10 bg-[#111318]"}`}>
            <img src={workout.image} alt={workout.name} className="h-24 w-full rounded-xl object-cover sm:h-20 sm:w-32"/>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <h2 className="truncate text-sm font-black uppercase">{workout.name}</h2>
                    {done && (
                        <span className="rounded-full bg-[#ccff00] px-2 py-1 text-[9px] font-black text-black">DONE</span>
                    )}

                </div>
                <p className="mt-1 text-xs text-gray-500">{workout.equipment}</p>
                <div className="mt-3 flex items-center gap-4">
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <span className="text-[#ccff00]">◷</span>{workout.duration} min</span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <span className="text-[#ccff00]">🔥</span>{workout.caloriesBurned} kcal
                    </span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:shrink-0">
                <Link href={`/workout/${workout.id}`} className="rounded-lg border border-white/10 px-3 py-2 text-[11px] font-bold transition hover:bg-white/10">View Details</Link>{activeTab === "plan" && (
                    <button onClick={onDone} className={`rounded-lg px-3 py-2 text-[11px] font-bold ${done? "bg-white/10 text-white": "bg-[#ccff00] text-black"}`}>
                        {done? "Undo": "Done"}
                    </button>
                )}

                <button onClick={onRemove} className="rounded-lg border border-red-500/20 px-3 py-2 text-[11px] font-bold text-red-400 hover:bg-red-500/10">Remove</button>
            </div>
        </div>
    );
}