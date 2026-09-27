import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#08090b] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">

        {/* Left side - Logo and name */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          <span className="text-lg font-bold tracking-wide">
            FITLOG
          </span>
        </div>

        {/* Right side - Copyright */}
        <p className="text-center text-sm text-gray-400 md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;