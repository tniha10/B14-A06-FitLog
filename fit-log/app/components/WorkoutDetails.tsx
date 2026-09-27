"use client";

import Link from "next/link";
import { useState } from "react";
import type { Workout } from "../../types/workout";

interface WorkoutDetailProps {
    workout: Workout;
}

const WorkoutDetail = ({ workout }: WorkoutDetailProps) => {
    const [message, setMessage] = useState("");
    const addToPlan = () => {
        const existingPlan = localStorage.getItem("fitlog-plan");
        const plan: Workout[] = existingPlan? JSON.parse(existingPlan): [];
        const alreadyAdded = plan.some((item) => item.id === workout.id);

        if (alreadyAdded) {
            setMessage("Already added to today's plan");
            return;
        }

        if (plan.length >= 5) {
            setMessage("Today's plan can contain only 5 lifts");
            return;
        }

        plan.push(workout);

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );

        window.dispatchEvent(new Event("planUpdated"));

        setMessage("Added to today's plan");
    };


    const saveForLater = () => {
        const existingSaved = localStorage.getItem("fitlog-saved");
        const saved: Workout[] = existingSaved ? JSON.parse(existingSaved) : [];
        const alreadySaved = saved.some((item) => item.id === workout.id);

        if (alreadySaved) {
            setMessage("Already saved");
            return;
        }

        saved.push(workout);

        localStorage.setItem("fitlog-saved",JSON.stringify(saved));

        window.dispatchEvent(new Event("savedUpdated"));

        setMessage("Saved for later");
    };


    return (
        <main className="min-h-screen bg-[#0a0a0a] px-4 py-8 text-white md:px-8 lg:px-12">
            <div className="mx-auto mb-8 max-w-7xl">
                <Link href="/"className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-[#ccff00]">Back to workouts</Link>
            </div>

            <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="overflow-hidden rounded-2xl border border-[#222] bg-[#111]">
                    <div className="relative h-[400px] w-full sm:h-[500px] lg:h-[650px]">
                        <img src={workout.image} alt={workout.name} className="h-full w-full object-cover"/>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div>
                        <p className="mb-3 text-xs font-bold text-[#ccff00]">{workout.difficulty.toUpperCase()}</p>
                        <h1 className="text-4xl font-black uppercase sm:text-5xl">{workout.name}</h1>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">{workout.description}</p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">{workout.muscleGroups.map((muscle) => (
                        <span key={muscle} className="rounded-full bg-[#c2f800] px-4 py-2 text-xs font-bold uppercase text-black">{muscle}</span>
                   ))}
                    </div>

                    <div className="mt-8 rounded-2xl border border-[#222] bg-[#111] p-5">
                        <div className="divide-y divide-[#222]">
                            <div className="flex items-center justify-between py-4">
                                <span className="text-xs font-bold text-gray-500">EQUIPMENT</span>
                                <span className="text-right text-sm font-medium text-gray-200">{workout.equipment}</span>

                            </div>

                            <div className="flex items-center justify-between py-4">
                                <span className="text-xs font-bold tracking-wide text-gray-500">DIFFICULTY</span>
                                <span className="text-sm font-medium text-gray-200">{workout.difficulty}</span>
                            </div>

                            <div className="flex items-center justify-between py-4">
                                <span className="text-xs font-bold text-gray-500">SETS</span>
                                <span className="text-sm font-medium text-gray-200">{workout.sets}</span>
                            </div>

                            <div className="flex items-center justify-between py-4">
                                <span className="text-xs font-bold tracking-wide text-gray-500">REPS</span>
                                <span className="text-sm font-medium text-gray-200">{workout.reps}</span>
                            </div>

                            <div className="flex items-center justify-between py-4">
                                <span className="text-xs font-bold tracking-wide text-gray-500">DURATION</span>
                                <span className="text-sm font-medium text-gray-200">{workout.duration} min</span>
                            </div>

                            <div className="flex items-center justify-between py-4">
                                <span className="text-xs font-bold tracking-wide text-gray-500">CALORIES</span>
                                <span className="text-sm font-medium text-gray-200">{workout.caloriesBurned} kcal</span>
                            </div>

                            <div className="flex items-center justify-between py-4">
                                <span className="text-xs font-bold text-gray-500">RATING</span>
                                <span className="text-sm font-medium text-gray-200">{workout.rating}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="mb-5 text-sm font-black uppercase">Instructions</h2>
                        <ol className="space-y-3">{workout.instructions.map(
                                (instruction, index) => (
                                    <li key={index} className="flex gap-2 text-sm leading-6 text-gray-400">
                                        <span className="font-bold text-gray-300">{index + 1}.</span>
                                        <p>{instruction}</p>
                                    </li>
                                ))}
                        </ol>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button onClick={addToPlan} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-4 text-sm font-black text-black">Add to today's plan</button>

                        <button onClick={saveForLater} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#444] bg-[#151515] px-5 py-4 text-sm font-black text-white">Save for later</button>
                    </div>

                    {message && (
                        <div className="mt-4 rounded-xl border border-[#333] bg-[#171717] px-4 py-3 text-center text-sm font-medium text-gray-200">{message}</div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default WorkoutDetail;