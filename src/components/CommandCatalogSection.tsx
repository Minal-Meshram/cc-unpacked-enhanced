import { Lock } from "lucide-react";

type Command = {
  name: string;
  locked?: boolean;
};

type CommandGroup = {
  name: string;
  color: string;
  count: number;
  commands: Command[];
};

const commandGroups: CommandGroup[] = [
  {
    name: "SETUP & CONFIG",
    color: "cat-blue",
    count: 12,
    commands: [
      { name: "/init" }, { name: "/login" }, { name: "/logout" }, { name: "/config" },
      { name: "/permissions" }, { name: "/model" }, { name: "/theme" }, { name: "/terminal-setup" },
      { name: "/doctor" }, { name: "/onboarding" }, { name: "/mcp" }, { name: "/hooks" },
    ],
  },
  {
    name: "DAILY WORKFLOW",
    color: "cat-green",
    count: 24,
    commands: [
      { name: "/compact" }, { name: "/memory" }, { name: "/context" }, { name: "/plan" },
      { name: "/resume" }, { name: "/session" }, { name: "/files" }, { name: "/add-dir" },
      { name: "/copy" }, { name: "/export" }, { name: "/summary" }, { name: "/clear" },
      { name: "/brief" }, { name: "/output-style", locked: true }, { name: "/color" },
      { name: "/vim" }, { name: "/keybindings" }, { name: "/skills" }, { name: "/tasks" },
      { name: "/agents" }, { name: "/fast" }, { name: "/effort" }, { name: "/extra-usage" },
      { name: "/rate-limit-options" },
    ],
  },
  {
    name: "CODE REVIEW & GIT",
    color: "cat-purple",
    count: 13,
    commands: [
      { name: "/review" }, { name: "/commit" }, { name: "/commit-push-pr" }, { name: "/diff" },
      { name: "/pr_comments" }, { name: "/branch" }, { name: "/issue" }, { name: "/security-review" },
      { name: "/autofix-pr", locked: true }, { name: "/share" }, { name: "/install-github-app", locked: true },
      { name: "/install-slack-app", locked: true }, { name: "/tag" },
    ],
  },
  {
    name: "DEBUGGING & DIAGNOSTICS",
    color: "cat-orange",
    count: 23,
    commands: [
      { name: "/status" }, { name: "/stats" }, { name: "/cost" }, { name: "/usage" },
      { name: "/version" }, { name: "/feedback" }, { name: "/think-back" }, { name: "/thinkback-play" },
      { name: "/rewind" }, { name: "/ctx_viz" }, { name: "/debug-tool-call" }, { name: "/perf-issue" },
      { name: "/heapdump" }, { name: "/ant-trace" }, { name: "/backfill-sessions", locked: true },
      { name: "/break-cache", locked: true }, { name: "/bridge-kick", locked: true },
      { name: "/mock-limits", locked: true }, { name: "/oauth-refresh", locked: true },
      { name: "/reset-limits", locked: true }, { name: "/env" }, { name: "/bughunter", locked: true },
      { name: "/passes", locked: true },
    ],
  },
  {
    name: "ADVANCED & EXPERIMENTAL",
    color: "cat-pink",
    count: 23,
    commands: [
      { name: "/advisor" }, { name: "/ultraplan", locked: true }, { name: "/remote-control", locked: true },
      { name: "/teleport" }, { name: "/voice", locked: true }, { name: "/desktop", locked: true },
      { name: "/chrome", locked: true }, { name: "/mobile", locked: true }, { name: "/sandbox" },
      { name: "/plugin" }, { name: "/reload-plugins" }, { name: "/web-setup" }, { name: "/remote-env" },
      { name: "/ide" }, { name: "/stickers" }, { name: "/good-claude" }, { name: "/btw" },
      { name: "/upgrade" }, { name: "/release-notes" }, { name: "/privacy-settings" },
      { name: "/help" }, { name: "/exit" }, { name: "/rename" },
    ],
  },
];

const CommandCatalogSection = () => {
  return (
    <section id="commands" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-4">
        <span className="text-primary font-mono text-sm">04</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Command Catalog</h2>
      <p className="text-muted-foreground text-lg mb-12">
A modern data visualization project that transforms complex datasets into an interactive treemap for better insights and user experience.      </p>

      <div className="space-y-10">
        {commandGroups.map((group) => (
          <div key={group.name}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-1 h-5 rounded-full bg-${group.color}`} />
              <h3 className={`text-sm font-semibold tracking-[0.15em] text-${group.color}`}>
                {group.name}
              </h3>
              <span className="text-xs text-muted-foreground bg-surface px-2 py-0.5 rounded-full">
                {group.count}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.commands.map((cmd) => (
                <button
                  key={cmd.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-md text-sm font-mono text-foreground hover:bg-surface-hover hover:text-primary transition-all border border-transparent hover:border-border"
                >
                  {cmd.name}
                  {cmd.locked && <Lock className="w-3 h-3 text-muted-foreground" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-8">
        Click a command to see details and source code
      </p>
    </section>
  );
};

export default CommandCatalogSection;
