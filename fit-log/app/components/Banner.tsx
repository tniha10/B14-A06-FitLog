const Banner = () => {
    return (
        <section className="bg-[#111111] px-5 py-8">

            <div className="flex items-center justify-between gap-6 rounded-xl border border-[#222620] bg-[#15171D] px-10 py-8">
                <div className="w-1/2">
                    <p className="mb-5 text-xs font-semibold text-[#ccff00]">WORKOUT LIBRARY</p>
                    <h1 className="text-5xl font-bold text-white">TRAIN WITH INTENT. LOG<br />EVERY SET.</h1>
                    <p className="mt-5 max-w-md text-sm text-[#9CA3AF]">FitLog is a dark, no-nonsense gym companion: pick a lift,lock it <br /> into today's plan, and watch the week's work add up.</p>
                    <a href="#library" className="mt-6 inline-block bg-[#ccff00] px-5 py-3 text-xs font-bold text-black">BROWSE WORKOUTS</a>
                </div>

                <div className="w-1/2 text-center">
                    <img src="/assets/banner.png" alt="FitLog Workout" className="mx-auto w-full max-w-xs object-contain"/>
                </div>

            </div>

        </section>
    );
};

export default Banner;