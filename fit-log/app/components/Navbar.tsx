"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const isWorkoutActive = pathname === "/";
    const isMyPlanActive = pathname === "/my-plan";

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#08090b] text-white">
            <div className="mx-auto flex min-h-18 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 md:px-8">

                {/*Logo*/}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/assets/logo.png" alt="FitLog Logo" width={28} height={28} className="object-contain h-7 w-auto"/><span className="text-xl font-extrabold tracking-wider text-white">FITLOG</span>
                </Link>

                {/*Navigation Links*/}
                <div className="order-3 flex w-full items-center justify-center gap-2 sm:order-none sm:w-auto sm:gap-6 md:gap-8">
                    <Link href="/" className={`rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${isWorkoutActive ? "bg-[#1b2b0b] text-[#ccff00]" : "text-white/70 hover:text-white"}`}>Workouts</Link>
                    <Link href="/my-plan" className={`rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${ isMyPlanActive ? "bg-[#1b2b0b] text-[#ccff00]" : "text-white/70 hover:text-white"}`}>My Plan</Link>
                </div>

                {/* Plan and Saved */}
                <div className="flex items-center gap-3 sm:gap-5">
                    <Link href="/my-plan" className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white"><span>Plan</span> <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] text-[11px] font-bold text-black">0</span></Link>
                    <Link href="/my-plan" className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white"> <span>Saved</span> <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-[11px] font-medium text-white/70">0</span></Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;