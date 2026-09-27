import Link from "next/link";
import type { Workout } from "../../types/workout";

interface WorkoutCardProps {
    workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {

    return (
        <Link href={`/workout/${workout.id}`}>
              <div className="overflow-hidden rounded-2xl border border-[#222] bg-[#111] transition hover:-translate-y-1 hover:border-[#ccff00]">
                  <img src={workout.image} alt={workout.name} className="h-56 w-full object-cover"/>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2">{workout.muscleGroups.map((muscle) => (
                            <span key={muscle} className="rounded-full bg-[#c2f800] px-3 py-1 text-xs font-bold uppercase text-black">{muscle}</span>
                      ))}
                      </div>

                    <h2 className="mt-4 text-xl font-black uppercase text-white">{workout.name}</h2>
                    <p className="mt-2 text-sm text-gray-500">{workout.equipment}</p>


                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                      <span>◷ {workout.duration} min</span>
                      <span>🔥 {workout.caloriesBurned} kcal</span>
                      <span>* {workout.rating}</span>
                    </div>
                   </div>
            </div>
       </Link>

    );
};

export default WorkoutCard;