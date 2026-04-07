import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import SectionNav from "@/components/SectionNav";
import AgentLoopSection from "@/components/AgentLoopSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ToolSystemSection from "@/components/ToolSystemSection";
import CommandCatalogSection from "@/components/CommandCatalogSection";
import HiddenFeaturesSection from "@/components/HiddenFeaturesSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("agent-loop");

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
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SectionNav activeSection={activeSection} />
      <HeroSection />
      <AgentLoopSection />
      <ArchitectureSection />
      <ToolSystemSection />
      <CommandCatalogSection />
      <HiddenFeaturesSection />
      <FooterSection />
    </div>
  );
};

export default Index;
