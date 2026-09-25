const Banner=()=>{
    return(
        <section className="bg-[#111111]">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 px-6 py-16 md:px-10 lg:px-16 lg:py-20">

                {/*Text*/}
                <div className="w-full lg:w-1/2">
                
                   {/*Eyebrow*/}
                   <p className="mb-5 text-sm font-semibold text-[#ccff00]">WORKOUT LIBRARY</p>

                   {/*Heading*/}
                   <h1 className="max-w-2xl text-5xl font-bold text-white sm:text-6xl lg:text-7xl">TRAIN WITH INTENT. LOG <br /> EVERY SET.</h1>

                   {/*Description*/}
                   <p className="mt-6 max-w-xl text-base leading-7 text-[#a3a3a3] md:text-lg">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up. </p>

                   <a href="#library" className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-4 text-sm font-bold tracking-wide text-black transition hover:bg-[#b8e600]">BROWSE WORKOUTS</a>
                   <div className="hidden w-1/2 justify-end lg:flex">
                      <img src="/assets/banner.png" alt="Fitlog Workout" className="w-full max-w-xl object-contain"/>
                   </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;