"use client";

import { forwardRef, useState } from "react";

const steps = [
  { num: 1, label: "Input", title: "User Input", file: "src/components/TextInput.tsx", desc: "User types a message or pipes input through stdin", detail: "Keyboard input comes from Ink's TextInput component. In non-interactive mode, it reads from piped stdin instead." },
  { num: 2, label: "Message", title: "Message Creation", file: "src/utils/messages.ts", desc: "Input is wrapped into a structured message object", detail: "The raw text is converted into a message with role, content, and metadata fields." },
  { num: 3, label: "History", title: "History Assembly", file: "src/utils/history.ts", desc: "Full conversation history is assembled for context", detail: "Previous messages, tool results, and system prompts are collected and ordered." },
  { num: 4, label: "System", title: "System Prompt", file: "src/utils/system.ts", desc: "System prompt is constructed with tools and permissions", detail: "Dynamic system prompt includes available tools, project context, and user permissions." },
  { num: 5, label: "API", title: "API Call", file: "src/services/api.ts", desc: "Request is sent to the Claude API", detail: "Messages and system prompt are sent to Claude's Messages API with streaming enabled." },
  { num: 6, label: "Tokens", title: "Token Streaming", file: "src/services/stream.ts", desc: "Response tokens stream back in real-time", detail: "Server-sent events deliver tokens incrementally for responsive rendering." },
  { num: 7, label: "Tools?", title: "Tool Detection", file: "src/tools/router.ts", desc: "Check if the response contains tool use blocks", detail: "The response is parsed for tool_use content blocks that need execution." },
  { num: 8, label: "Loop", title: "Agent Loop", file: "src/core/loop.ts", desc: "If tools were used, execute and loop back to API", detail: "Tool results are appended to history and another API call is made. This continues until no more tools are requested." },
  { num: 9, label: "Render", title: "Render Output", file: "src/components/Output.tsx", desc: "Final response is rendered in the terminal", detail: "Markdown is parsed and rendered with syntax highlighting in the terminal UI." },
  { num: 10, label: "Hooks", title: "Post Hooks", file: "src/hooks/post.ts", desc: "Post-response hooks are triggered", detail: "Hooks like auto-compact, memory save, and analytics run after the response." },
  { num: 11, label: "Await", title: "Await Input", file: "src/core/repl.ts", desc: "System waits for the next user input", detail: "The REPL loop returns to the input state, ready for the next message." },
];

const AgentLoopSection = forwardRef<HTMLElement>((props, ref) => {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];

  return (
    <section id="agent-loop" ref={ref} className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-4 text-sm font-mono text-primary/80">
          <span>01</span>
          <span className="hidden md:block h-px flex-1 bg-primary/20" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight font-serif">
          The Agent Loop
        </h2>
        <p className="text-muted-foreground text-lg mt-3 max-w-2xl">
          From keypress to rendered response, step by step through the source.
        </p>
      </div>

      <div className="relative rounded-3xl border border-white/10 bg-zinc-900/60 p-6 md:p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0 2px, transparent 2px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0 2px, transparent 2px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* NEW HORIZONTAL STEPPER WITH CONNECTING LINES */}
        <div className="relative overflow-x-auto pb-2">
          <div className="min-w-[900px] px-2">
            <div className="flex items-center justify-between gap-6 relative">
              {steps.map((item, idx) => {
                const isActive = idx <= activeStep;
                const isLast = idx === steps.length - 1;
                return (
                  <div key={item.num} className="relative flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setActiveStep(idx)}
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
                      aria-label={`Step ${item.num}: ${item.label}`}
                    >
                      {item.num}
                    </button>
                    <div
                      className="mt-2 text-[10px] font-mono tracking-[0.25em] uppercase whitespace-nowrap"
                      style={{ color: isActive ? "#6ee787" : "rgba(198,194,184,0.7)" }}
                    >
                      {item.label}
                    </div>

                    {!isLast && (
                      <div
                        className="absolute top-5 left-full h-px w-10 sm:w-12"
                        style={{
                          backgroundColor:
                            activeStep > idx ? "rgba(110,231,135,0.9)" : "rgba(198,194,184,0.2)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content panels (unchanged) */}
        <div className="relative mt-12 grid md:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6 md:p-7 animate-slide-up">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-primary font-mono text-sm">{String(step.num).padStart(2, "0")}</span>
              <span className="h-px flex-1 bg-primary/20" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">
              {step.title}
            </h3>
            <p className="text-foreground mb-4">{step.desc}</p>
            <p className="text-sm text-muted-foreground">{step.detail}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5 md:p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-muted-foreground">Source</span>
              <span className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded-full">
                {step.file}
              </span>
            </div>
            <div className="bg-background rounded-lg p-4 border border-white/10 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-cat-green">?</span>
                <span className="text-muted-foreground">claude-code</span>
              </div>
              <div className="text-muted-foreground">
                <span className="text-primary">$</span> {step.detail}
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <span className="text-xs text-muted-foreground font-mono">
                {step.num}/{steps.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  Prev
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AgentLoopSection;