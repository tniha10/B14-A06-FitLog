"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useFitLog } from "../context/FitLogContext";

const Navbar = () => {
    const pathname = usePathname();
    const { planCount, savedCount } = useFitLog();
    const isWorkoutActive = pathname === "/";
    const isMyPlanActive = pathname === "/my-plan";

    return (
        <nav className="border-b border-white/10 bg-[#08090b] text-white">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/assets/logo.png"alt="FitLog logo" width={32}height={32}priority className="h-8 w-8 object-contain"/>
                    <span className="text-xl font-black tracking-tight">FITLOG</span>
                </Link>
                <div className="hidden items-center gap-2 md:flex">
                    <Link href="/" className={`rounded-full px-5 py-3 text-sm font-bold transition ${isWorkoutActive ? "bg-[#ccff00] text-black" : "text-white hover:bg-white/10"}`}>Workouts</Link>
                    <Link href="/my-plan" className={`rounded-full px-5 py-3 text-sm font-bold transition ${isMyPlanActive ? "bg-[#ccff00] text-black" : "text-white hover:bg-white/10"}`}>My Plan</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/my-plan" className="flex items-center gap-2 text-sm font-medium">
                        <span>Plan</span>
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ccff00] px-2 text-xs font-black text-black">{planCount}</span>
                    </Link>
                    <Link href="/my-plan" className="flex items-center gap-2 text-sm font-medium">
                        <span>Saved</span>
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-white/30 px-2 text-xs font-medium text-white">{savedCount}</span>
                    </Link>
                </div>
            </div>

            <div className="border-t border-white/10 px-6 py-3 md:hidden">
                <div className="flex items-center justify-center gap-2">
                    <Link href="/" className={`rounded-full px-5 py-2 text-sm font-bold ${isWorkoutActive? "bg-[#ccff00] text-black": "text-white"}`}>Workouts</Link>
                    <Link href="/my-plan" className={`rounded-full px-5 py-2 text-sm font-bold ${ isMyPlanActive? "bg-[#ccff00] text-black": "text-white"}`}>My Plan</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;