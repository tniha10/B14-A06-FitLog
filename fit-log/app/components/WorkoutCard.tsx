import Link from "next/link";

interface WorkoutCardProps {
  workout: any;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link href={`/workout/${workout.id}`} className="block">
      <div className="group overflow-hidden rounded-xl border border-[#222630] bg-[#15171D] transition-all duration-300 hover:-translate-y-1 hover:border-[#3A3D45] hover:shadow-lg">
        {/* Image */}
        <div className="h-56 overflow-hidden bg-[#202127]">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <div className="mb-3 flex flex-wrap gap-2">
            {Array.isArray(workout.category) ? (
              workout.category.map((category: string) => (
                <span
                  key={category}
                  className="rounded-full bg-[#F5C542] px-3 py-1 text-xs font-bold tracking-wide text-black"
                >
                  {category}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-[#F5C542] px-3 py-1 text-xs font-bold tracking-wide text-black">
                {workout.category}
              </span>
            )}
          </div>

          {/* Workout Name */}
          <h3 className="text-xl font-bold tracking-wide text-white">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="mt-2 text-sm text-gray-400">
            {Array.isArray(workout.equipment)
              ? workout.equipment.join(", ")
              : workout.equipment}
          </p>

          {/* Stats */}
          <div className="mt-5 flex items-center gap-5 border-t border-[#292C33] pt-4 text-sm text-gray-300">
            {/* Duration */}
            <div className="flex items-center gap-2">
              <span className="text-[#F5C542]">◷</span>
              <span>{workout.duration} min</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-2">
              <span className="text-[#F5C542]">🔥</span>
              <span>{workout.calories} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-[#F5C542]">★</span>
              <span>{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;