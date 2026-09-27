import WorkoutCard from "./WorkoutCard";

const Library = async () => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/fitlog"
  );

  const workouts = await response.json();

  return (
    <section id="library" className="bg-black px-4 py-16">
      <div className="mx-auto max-w-7xl">

        <h2 className="text-4xl font-bold text-white">THE LIBRARY</h2>
        <p className="mt-2 text-gray-400">Twelve lifts covering every major muscle group.</p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{workouts.map((workout: any) => (
            <WorkoutCard key={workout.id} workout={workout}/>))}
        </div>

      </div>
    </section>
  );
};

export default Library;