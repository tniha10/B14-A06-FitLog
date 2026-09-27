import Link from "next/link";

const NotFound = () => {

    return (

        <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 text-white">

            <div className="text-center">

                <p className="text-sm font-bold tracking-[0.2em] text-[#ccff00]">
                    FITLOG
                </p>

                <h1 className="mt-4 text-7xl font-black">
                    404
                </h1>

                <h2 className="mt-3 text-2xl font-bold">
                    Workout not found
                </h2>

                <p className="mt-3 text-gray-500">
                    The workout you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-block rounded-xl bg-[#ccff00] px-6 py-3 text-sm font-black text-black"
                >
                    Back to workouts
                </Link>

            </div>

        </main>

    );
};

export default NotFound;