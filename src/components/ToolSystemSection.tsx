"use client";

import React from "react";

const toolGroups = [
  {
    title: "File Operations",
    count: 6,
    accent: "text-amber-400",
    tools: ["FileRead", "FileEdit", "FileWrite", "Glob", "Grep", "NotebookEdit"],
  },
  {
    title: "Execution",
    count: 3,
    accent: "text-orange-400",
    tools: ["Bash", "PowerShell", "REPL"],
  },
  {
    title: "Search & Fetch",
    count: 4,
    accent: "text-sky-400",
    tools: ["WebBrowser", "WebFetch", "WebSearch", "ToolSearch"],
  },
  {
    title: "Agents & Tasks",
    count: 11,
    accent: "text-emerald-400",
    tools: [
      "Agent",
      "SendMessage",
      "TaskCreate",
      "TaskGet",
      "TaskList",
      "TaskUpdate",
      "TaskStop",
      "TaskOutput",
      "TeamCreate",
      "TeamDelete",
      "Run",
    ],
  },
  {
    title: "Planning",
    count: 5,
    accent: "text-violet-400",
    tools: ["EnterPlanMode", "ExitPlanMode", "EnterWorktree", "ExitWorktree", "VerifyPlan"],
    locked: ["VerifyPlan"],
  },
  {
    title: "MCP",
    count: 4,
    accent: "text-indigo-300",
    tools: ["Mcp", "ListMcpResources", "ReadMcpResource", "McpAuth"],
  },
  {
    title: "System",
    count: 11,
    accent: "text-teal-300",
    tools: [
      "AskUserQuestion",
      "TodoWrite",
      "Skill",
      "Config",
      "RemoteTrigger",
      "CronCreate",
      "CronDelete",
      "CronList",
      "Spin",
      "Snip",
      "Workflow",
    ],
    locked: ["RemoteTrigger", "CronCreate", "CronDelete", "CronList", "Spin", "Snip", "Workflow"],
  },
  {
    title: "Experimental",
    count: 8,
    accent: "text-yellow-300",
    tools: ["Sleep", "SendUserMessage", "StructuredOutput", "LSP", "SendUserFile", "PushNotification", "Monitor", "SubscribePR"],
    locked: ["StructuredOutput", "LSP", "SendUserFile", "PushNotification", "Monitor", "SubscribePR"],
  },
];

const ToolSystemSection = () => {
  return (
    <section id="tool-system" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-4 text-sm font-mono text-primary/80">
          <span>03</span>
          <span className="hidden md:block h-px flex-1 bg-primary/20" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">Tool System</h2>
        <p className="text-muted-foreground text-lg mt-3 max-w-2xl">
          Every built-in tool can call, sorted by what it does.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 gap-6">
          {toolGroups.map((group) => (
            <div key={group.title} className="flex min-w-0 flex-col gap-3">
              <div>
                <div
                  className={`max-w-full break-words text-[11px] font-mono uppercase tracking-[0.25em] ${group.accent}`}
                >
                  {group.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{group.count} tools</div>
              </div>

              <div className="flex flex-col gap-2">
                {group.tools.map((tool) => {
                  const isLocked = group.locked?.includes(tool);
                  return (
                    <div
                      key={tool}
                      className={`flex min-w-0 items-start justify-between gap-2 rounded-lg border px-3 py-2 text-xs font-mono bg-zinc-950/40 transition-colors ${
                        isLocked
                          ? "border-white/5 text-muted-foreground/60"
                          : "border-white/10 text-foreground"
                      }`}
                    >
                      <span className="min-w-0 flex-1 break-all leading-tight" title={tool}>
                        {tool}
                      </span>
                      {isLocked ? <span className="shrink-0 text-[10px]">lock</span> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolSystemSection;
