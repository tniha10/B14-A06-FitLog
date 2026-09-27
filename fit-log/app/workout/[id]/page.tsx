import { notFound } from "next/navigation";
import { getWorkoutById } from "../../../lib/api";
import WorkoutDetail from "../../components/WorkoutDetails";

interface WorkoutPageProps {
    params: Promise<{
        id: string;
    }>;
}

const WorkoutPage = async ({ params }: WorkoutPageProps) => {

    const { id } = await params;

    const workout = await getWorkoutById(id);

    if (!workout) {
        notFound();
    }

    return (
        <WorkoutDetail workout={workout} />
    );
};

export default WorkoutPage;