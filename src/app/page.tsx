"use client";

import { useState, useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import SectionNav from "@/components/SectionNav";
import AgentLoopSection from "@/components/AgentLoopSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ToolSystemSection from "@/components/ToolSystemSection";
import CommandCatalogSection from "@/components/CommandCatalogSection";
import HiddenFeaturesSection from "@/components/HiddenFeaturesSection";
import FooterSection from "@/components/FooterSection";
import DynamicTreemap from '@/components/DynamicTreemap';
// import NivoTreemap from '@/components/NivoTreemap';
import { skillsData } from '@/data/skillData';



const Page = () => {
  const [activeSection, setActiveSection] = useState("agent-loop");
  const [showSidebar, setShowSidebar] = useState(false);
  const agentLoopRef = useRef<HTMLElement>(null);

  // Show sidebar when Agent Loop section is 40% visible
  useEffect(() => {
      console.log('agentLoopRef.current:', agentLoopRef.current);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSidebar(entry.isIntersecting && entry.intersectionRatio >= 0.4);
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (agentLoopRef.current) {
      observer.observe(agentLoopRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Update active section based on scroll position (for sidebar highlighting)
  useEffect(() => {
    const sections = ["agent-loop", "architecture", "tool-system", "commands", "hidden-features"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero – full width, no sidebar */}
      <HeroSection />

      {/* Two‑column layout for content after hero */}
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar column – only visible when agent loop is scrolled into view */}
          {showSidebar && (
            <aside className="lg:w-24 xl:w-32 shrink-0 transition-all duration-300">
              <SectionNav activeSection={activeSection} />
            </aside>
          )}

          {/* Main content column – narrower when sidebar is visible */}
          <div className={`flex-1 ${showSidebar ? "lg:max-w-3xl xl:max-w-4xl" : "mx-auto"}`}>
            {/* Pass ref to AgentLoopSection (needs forwardRef) */}
            <AgentLoopSection ref={agentLoopRef} />
            {/* <ArchitectureSection /> */}
            <DynamicTreemap />
            <ToolSystemSection />
            <CommandCatalogSection />
            <HiddenFeaturesSection />
            
              {/* <NivoTreemap /> */}
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;