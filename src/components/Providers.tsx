"use client";

// এটিই সঠিক ইমপোর্ট পাথ
import { HeroUIProvider } from "@heroui/system"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
      <ToastContainer />
    </HeroUIProvider>
  );
}