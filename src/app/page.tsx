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

  // Show sidebar only after Agent Loop enters the viewport, hide after Footer passes
  useEffect(() => {
    const update = () => {
      const agentEl = document.getElementById("agent-loop");
      const footerEl = document.getElementById("footer");
      if (!agentEl || !footerEl) return;

      const vh = window.innerHeight || 0;
      const start = agentEl.getBoundingClientRect().top <= vh * 0.2;
      const end = footerEl.getBoundingClientRect().top <= -vh * 0.2;
      setShowSidebar(start && !end);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
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
      <div
        className={`relative max-w-7xl mx-auto px-4 lg:px-8 ${
          showSidebar ? "lg:pl-40" : ""
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar column – only visible when agent loop is scrolled into view */}
          {showSidebar && <SectionNav activeSection={activeSection} />}

          {/* Main content column – narrower when sidebar is visible */}
          <div className={`flex-1 ${showSidebar ? "lg:max-w-5xl xl:max-w-5xl" : "mx-auto"}`}>
            {/* Pass ref to AgentLoopSection (needs forwardRef) */}
            <AgentLoopSection ref={agentLoopRef} />
            {/* <ArchitectureSection /> */}
            <section id="architecture">
              <DynamicTreemap />
            </section>
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


