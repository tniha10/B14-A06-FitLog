"use client";

import { useFitLog } from "../context/FitLogContext";

interface WorkoutDetailsProps {
    workout: {
        id: number;
        name: string;
        image: string;
        muscleGroups: string[];
        equipment: string;
        difficulty: string;
        duration: number;
        caloriesBurned: number;
        sets: number;
        reps: string;
        rating: number;
        description: string;
        instructions: string[];
    };
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
    const { addToPlan, saveForLater, plan, saved } = useFitLog();
    const alreadyInPlan = plan.some((item) => item.id === workout.id);
    const alreadySaved = saved.some((item) => item.id === workout.id);
    return (
        <main className="min-h-screen bg-[#08090b] px-5 py-10 text-white md:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111214]">
                    <img src={workout.image} alt={workout.name} className="h-full min-h-[400px] w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="mb-3 text-sm font-bold tracking-[0.25em] text-[#ccff00]">WORKOUT DETAILS</p>
                    <h1 className="text-4xl font-black uppercase md:text-5xl">{workout.name}</h1>
                    <p className="mt-5 text-base leading-7 text-gray-400">{workout.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {workout.muscleGroups.map((muscle) => (
                            <span key={muscle} className="rounded-full border border-[#ccff00]/30 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]">{muscle}</span>
                        ))}
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
                        <Spec label="Equipment" value={workout.equipment} />
                        <Spec label="Difficulty" value={workout.difficulty}/>
                        <Spec label="Sets" value={String(workout.sets)}/>
                        <Spec label="Reps" value={workout.reps}/>
                        <Spec label="Duration" value={`${workout.duration} min`}/>
                        <Spec label="Calories" value={`${workout.caloriesBurned} kcal`}/>
                        <Spec label="Rating" value={String(workout.rating)}/>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-black">INSTRUCTIONS</h2>
                        <ol className="mt-4 space-y-4">
                            {workout.instructions.map((instruction, index) => (
                                    <li key={index} className="flex gap-4 text-sm leading-6 text-gray-400">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">{index + 1}</span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                        </ol>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button onClick={() => addToPlan(workout)} disabled={alreadyInPlan || plan.length >= 5} className="rounded-xl bg-[#ccff00] px-6 py-4 text-sm font-black text-black transition hover:bg-[#b9eb00] disabled:cursor-not-allowed disabled:opacity-40">
                            {alreadyInPlan ? "Already in today's plan" : plan.length >= 5 ? "Today's plan is full" : "Add to today's plan"}
                        </button>
                        <button onClick={() => saveForLater(workout)} disabled={alreadySaved} className="rounded-xl border border-white/20 px-6 py-4 text-sm font-black text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">
                            {alreadySaved ? "Already saved" : "Save for later"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

function Spec({label, value}: {
    label: string;
    value: string;
}) {
    return (
        <div className="bg-[#111214] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
            <p className="mt-1 text-sm font-bold text-white">{value}</p>
        </div>
    );
}

export default WorkoutDetails;