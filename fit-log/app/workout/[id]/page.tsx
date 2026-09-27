import WorkoutDetails from "@/app/components/WorkoutDetails";

interface WorkoutPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function WorkoutPage({params}: WorkoutPageProps) {
    const { id } = await params;
    const response = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#08090b] text-white">
                <div className="text-center">
                    <p className="text-sm font-bold text-[#ccff00]">FITLOG</p>
                    <h1 className="mt-2 text-5xl font-black">404</h1>
                    <p className="mt-2 text-gray-400">Workout not found</p>
                </div>
            </main>
        );
    }
    const workout = await response.json();

    return <WorkoutDetails workout={workout} />;
}