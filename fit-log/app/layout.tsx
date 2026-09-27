import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { FitLogProvider } from "./context/FitLogContext";
import Footer from "./components/Footer";

export const metadata: Metadata = {
    title: "FitLog",
    description: "Workout Library",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <FitLogProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </FitLogProvider>
            </body>
        </html>
    );
}