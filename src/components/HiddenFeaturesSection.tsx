import { ExternalLink } from "lucide-react";

const features = [
  {
    name: "Buddy",
    desc: "A virtual pet that lives in your terminal. Species and rarity are derived from your account ID.",
    wikiQuery: "how-does-the-buddy-feature-wor",
  },
  {
    name: "Kairos",
    desc: "Persistent mode with memory consolidation between sessions and autonomous background actions.",
    wikiQuery: "how-does-the-kairos-feature-wo",
  },
  {
    name: "UltraPlan",
    desc: "Long planning sessions on Opus-class models, up to 30-minute execution windows.",
    wikiQuery: "how-does-the-ultraplan-feature",
  },
  {
    name: "Coordinator Mode",
    desc: "A lead agent breaks tasks apart, spawns parallel workers in isolated git worktrees, collects results.",
    wikiQuery: "how-does-the-coordinator-mode",
  },
  {
    name: "Bridge",
    desc: "Control Claude Code from your phone or a browser. Full remote session with permission approvals.",
    wikiQuery: "how-does-the-bridge-feature-wo",
  },
  {
    name: "Daemon Mode",
    desc: "Run sessions in the background with --bg. Uses tmux under the hood.",
    wikiQuery: "how-does-the-daemon-mode-featu",
  },
  {
    name: "UDS Inbox",
    desc: "Sessions talk to each other over Unix domain sockets.",
    wikiQuery: "how-does-the-uds-inbox-feature",
  },
  {
    name: "Auto-Dream",
    desc: "Between sessions, the AI reviews what happened and organizes what it learned.",
    wikiQuery: "how-does-the-autodream-feature",
  },
];

const HiddenFeaturesSection = () => {
  return (
    <section id="hidden-features" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-4">
        <span className="text-primary font-mono text-sm">05</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Hidden Features</h2>
      <p className="text-muted-foreground text-lg mb-12">
        Stuff that's in the code but not shipped yet. Feature-flagged, env-gated, or just commented out.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="bg-surface border border-border rounded-xl p-6 hover:border-primary/30 transition-all group cursor-pointer relative"
          >
            <a
              href={`https://deepwiki.com/search/${feature.wikiQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </a>
            <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors mb-2">
              {feature.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-8">
        Click a feature to explore
      </p>
    </section>
  );
};

export default HiddenFeaturesSection;
