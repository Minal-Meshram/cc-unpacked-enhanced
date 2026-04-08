"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

const stats = [
  { value: 1900, suffix: "+", label: "FILES ANALYZED" },
  { value: 519, suffix: "K+", label: "LINES PROCESSED" },
  { value: 53, suffix: "+", label: "TOOLS INTEGRATED" },
  { value: 95, suffix: "+", label: "COMMANDS EXECUTED" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      <span className="text-[0.6em] font-sans font-normal">{suffix}</span>
    </span>
  );
}

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">

      {/* 🔥 Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">
        <span className="text-text-bright">AI Code Flow Visualizer</span>
        <br />
        <span className="text-primary">From Prompt → Execution</span>
      </h1>

      {/* 🔗 Buttons */}
      <div className="flex gap-3 mb-8 flex-wrap justify-center">
        <a
          href="https://deepwiki.com/zackautocracy/claude-code"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-zinc-900/60 text-sm text-foreground hover:bg-white/5 transition-colors"
        >
          <span className="text-cat-blue">?</span> Learn Architecture
        </a>

        <a
          href="https://news.ycombinator.com/item?id=47597085"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-zinc-900/60 text-sm text-primary hover:bg-primary/10 transition-colors"
        >
          <span className="font-bold">Y</span> Trending in Dev Community
        </a>
      </div>

      {/* 🧠 Description */}
      <p className="max-w-2xl text-lg text-muted-foreground mb-2">
        Understand how modern AI coding agents actually work behind the scenes
      </p>

      <p className="max-w-2xl text-lg mb-12">
        <span className="text-text-bright font-medium">
          Explore agent loops, tool integrations, execution pipelines, and multi-agent systems
        </span>
        <span className="text-muted-foreground">
          {" "}— simplified for students and developers.
        </span>
      </p>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-16">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl md:text-5xl font-serif font-bold text-primary">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-xs tracking-[0.2em] text-muted-foreground mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* 👇 CTA */}
      <a
        href="#agent-loop"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary/40 text-sm tracking-[0.15em] uppercase text-primary hover:bg-primary/10 transition-colors"
      >
        Explore System Flow <ArrowDown className="w-4 h-4" />
      </a>
    </section>
  );
};

export default HeroSection;