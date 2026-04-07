"use client";

import React from "react";

// Define the learning priorities
// Higher level = more important (level 1 is most critical)
const learningData = [
  {
    level: 1,
    title: "React",
    subtitle: "Core UI Library",
    description: "Claude Code's entire terminal UI is built with React + Ink. You must understand components, hooks, and state to navigate the source.",
    color: "#61dafb",
    bgColor: "bg-cyan-950/40",
  },
  {
    level: 2,
    title: "Node.js",
    subtitle: "Runtime Environment",
    description: "The whole CLI runs on Node.js. Know async/await, file system, child processes, and event loops.",
    color: "#8bc34a",
    bgColor: "bg-green-950/40",
  },
  {
    level: 3,
    title: "TypeScript",
    subtitle: "Language & Types",
    description: "The codebase is 100% TypeScript. Learn interfaces, generics, and strict typing to follow the logic.",
    color: "#3178c6",
    bgColor: "bg-blue-950/40",
  },
  {
    level: 4,
    title: "Git & GitHub",
    subtitle: "Version Control",
    description: "Understanding PRs, branching, and the repo structure is essential for contributing or modifying.",
    color: "#f05033",
    bgColor: "bg-orange-950/40",
  },
  {
    level: 5,
    title: "Java (JVM)",
    subtitle: "Optional / Legacy",
    description: "Some internal tooling and MCP servers use Java. Not required for UI or agent core, but good to know.",
    color: "#b07219",
    bgColor: "bg-red-950/40",
  },
];

// const agentLoopSteps = [
//   { step: 1, label: "Input" },
//   { step: 2, label: "Message" },
//   { step: 3, label: "History" },
//   { step: 4, label: "System" },
//   { step: 5, label: "API" },
//   { step: 6, label: "Tokens" },
//   { step: 7, label: "Tools?" },
//   { step: 8, label: "Loop" },
//   { step: 9, label: "Render" },
//   { step: 10, label: "Hooks" },
//   { step: 11, label: "Await" },
// ];

type TreeNodeData = {
  name: string;
  importance: number;
  color: string;
  description: string;
  children: TreeNodeData[];
};

// Define the tree data - root is most important, children decrease in priority
const importanceTree: TreeNodeData = {
  name: "React",
  importance: 5,
  color: "#61dafb",
  description: "Core UI library - start here",
  children: [
    {
      name: "Node.js",
      importance: 4,
      color: "#8bc34a",
      description: "Runtime environment",
      children: [
        {
          name: "TypeScript",
          importance: 3,
          color: "#3178c6",
          description: "Type system & tooling",
          children: [
            {
              name: "Git & GitHub",
              importance: 2,
              color: "#f05033",
              description: "Version control & collaboration",
              children: [
                {
                  name: "Java (JVM)",
                  importance: 1,
                  color: "#b07219",
                  description: "Optional / legacy tools",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Recursive tree node component
const TreeNode = ({ node, level = 0 }: { node: TreeNodeData; level?: number }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isLast = level === 4; // arbitrary max depth

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative z-10">
        <div
          className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg transition-transform hover:scale-105"
          style={{
            backgroundColor: node.color,
            boxShadow: `0 0 0 3px ${node.color}40, 0 4px 12px rgba(0,0,0,0.3)`,
          }}
        >
          <span className="text-sm text-center px-1">{node.name}</span>
          <span className="text-[10px] opacity-80 mt-1">* {node.importance}/5</span>
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
          {node.description}
        </div>
      </div>

      {hasChildren && !isLast && (
        <>
          <div className="relative w-px h-8 bg-muted-foreground/30 my-2" />

          <div className="flex flex-wrap justify-center gap-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-muted-foreground/30" style={{ width: "100%", top: "-4px" }} />
            {node.children.map((child) => (
              <div key={child.name} className="relative">
                <div className="absolute top-0 left-1/2 w-px h-4 bg-muted-foreground/30 transform -translate-x-1/2" style={{ top: "-20px" }} />
                <TreeNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ImportanceTreeDiagram = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-primary font-mono text-sm border border-primary/30 px-3 py-1 rounded-full">
          Priority Tree
        </span>
        <h2 className="text-4xl font-serif font-bold mt-4">
          Learning Importance{" "}
          <span className="text-primary italic">Hierarchy</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mt-3">
          Start at the root (most important) and follow the branches down. Each level decreases in priority.
        </p>
      </div>

      <div className="overflow-x-auto pb-8">
        <div className="min-w-[800px] flex justify-center">
          <TreeNode node={importanceTree} />
        </div>
      </div>

      <div className="mt-12 p-4 rounded-lg bg-muted/20 border border-border text-center text-sm">
        <strong>How to read:</strong> The root (React) is the most critical to learn. Each child is less important, but still valuable. Leaves are optional or nice-to-have.
      </div>
    </section>
  );
};

const AgentLoopStepper = () => {
  const [activeStep, setActiveStep] = React.useState(1);

  return (
    <div className="relative mt-12 rounded-3xl border border-muted/30 bg-muted/10 px-4 py-8 sm:px-6">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none rounded-3xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0 1px, transparent 1px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* <div className="relative overflow-x-auto">
        <div className="min-w-[900px] px-2">
          <div className="flex items-center justify-between gap-6 relative">
            {agentLoopSteps.map((item, idx) => {
              const isActive = item.step <= activeStep;
              const isLast = idx === agentLoopSteps.length - 1;
              return (
                <div key={item.step} className="relative flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setActiveStep(item.step)}
                    className="relative z-10 w-11 h-11 rounded-full border text-sm font-semibold transition-transform hover:-translate-y-0.5"
                    style={{
                      color: isActive ? "#6ee787" : "rgba(198,194,184,0.75)",
                      borderColor: isActive ? "#6ee787" : "rgba(198,194,184,0.35)",
                      boxShadow: isActive
                        ? "0 0 0 4px rgba(110,231,135,0.22), 0 10px 26px rgba(110,231,135,0.25)"
                        : "0 0 0 2px rgba(255,255,255,0.02)",
                      backgroundColor: isActive ? "rgba(110,231,135,0.12)" : "rgba(255,255,255,0.02)",
                    }}
                    aria-pressed={isActive}
                    aria-label={`Step ${item.step}: ${item.label}`}
                  >
                    {item.step}
                  </button>
                  <div
                    className="mt-2 text-[10px] font-mono tracking-[0.25em] uppercase"
                    style={{ color: isActive ? "#6ee787" : "rgba(198,194,184,0.7)" }}
                  >
                    {item.label}
                  </div>

                  {!isLast && (
                    <div
                      className="absolute top-5 left-full h-px w-10 sm:w-12"
                      style={{
                        backgroundColor:
                          activeStep > item.step ? "rgba(110,231,135,0.9)" : "rgba(198,194,184,0.2)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
};

const PriorityPyramid = () => {
  return (
    <>
      <section id="architecture" className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-mono text-sm border border-primary/30 px-3 py-1 rounded-full">
            Student Guide
          </span>
          <h2 className="text-4xl font-serif font-bold mt-4">
            Learning Priority{" "}
            <span className="text-primary italic">Pyramid</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-3">
            What to learn first, second, and third - if you want to understand Claude Code deeply.
          </p>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl border border-primary/10 bg-muted/30 p-6 sm:p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-60 pointer-events-none">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0 2px, transparent 2px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06) 0 2px, transparent 2px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative grid grid-cols-5 items-end gap-3 sm:gap-4 lg:gap-5 mt-2">
              {learningData.map((item, idx) => {
                const height = 64 + idx * 26;
                return (
                  <div key={item.level} className="relative flex items-end justify-center">
                    <div
                      className="relative w-full max-w-[130px] rounded-t-2xl rounded-b-lg shadow-lg transition-transform duration-300 hover:-translate-y-1"
                      style={{ height: `${height}px`, backgroundColor: item.color }}
                    >
                      <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 text-xs font-bold flex items-center justify-center shadow"
                        style={{ borderColor: item.color, color: item.color }}
                      >
                        {String(item.level).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="absolute left-1/2 -translate-x-1/2 bottom-[120px] sm:bottom-[150px] md:bottom-[165px]">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-foreground/90 drop-shadow"
                >
                  <circle cx="9" cy="5" r="2.2" fill="currentColor" />
                  <path
                    d="M7 21v-4.2l2.6-2.6 2.4 2.4V21h2v-4.8l-2.9-2.9 1.2-2.2 3.5 2v-2.3l-3.6-2.2-1-2.3c-.2-.5-.7-.8-1.2-.8H8.2c-.5 0-1 .3-1.2.8L5.4 9.6 3 11v2.3l3-1.7 1.2 2.2-2.6 2.6V21h2.4z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10 items-stretch">
              {learningData.map((item) => (
                <div key={`${item.level}-detail`} className="rounded-xl border border-primary/10 bg-background/70 p-4 shadow-sm h-full flex flex-col">
                  <div className="text-xs font-mono text-muted-foreground">Step {String(item.level).padStart(2, "0")}</div>
                  <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold" style={{ color: item.color }}>
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-mono text-muted-foreground bg-muted/70 px-2 py-0.5 rounded-full">
                      {item.subtitle}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-sm">
            <span className="font-semibold">Pro tip for students:</span> Start from level 1 (React) and work your way down.
            Each level builds on the previous one. Don't jump to Java before you understand the core UI loop.
          </p>
        </div>
      </section>

      <AgentLoopStepper />

      <ImportanceTreeDiagram />
    </>
  );
};

export default PriorityPyramid;
