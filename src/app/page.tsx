"use client";

import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";

// 3D Avatar and Loading screen removed as per user request

const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Resume = dynamic(() => import("@/components/sections/Resume"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  const { scrollTo } = useSmoothScroll();

  const handleNavigate = (href: string) => {
    scrollTo(href);
  };

  return (
    <>

      {/* Fixed Navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Scrollable page content (sits under canvas) */}
      <main>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Projects />
        <Resume />
        <Contact />
      </main>
    </>
  );
}
