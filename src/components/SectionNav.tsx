import { useState } from "react";

const sections = [
  { id: "agent-loop", num: "01", label: "The Agent Loop" },
  { id: "architecture", num: "02", label: "Learning Priority Pyramid" },
  { id: "tool-system", num: "03", label: "Tool System" },
  { id: "commands", num: "04", label: "Command Catalog" },
  { id: "hidden-features", num: "05", label: "Hidden Features" },
];

const SectionNav = ({ activeSection }: { activeSection: string }) => {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-1 bg-surface/80 backdrop-blur-sm rounded-lg p-2 border border-border">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={() => setOpenLabel((prev) => (prev === s.id ? null : s.id))}
          className={`group relative w-10 h-10 flex items-center justify-center rounded text-xs transition-colors ${
            activeSection === s.id
              ? "text-primary border-l-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="font-mono text-[11px]">{s.num}</span>
          <span
            className={`pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-surface/90 border border-border px-3 py-2 text-sm font-serif transition-all ${
              openLabel === s.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            {s.label}
          </span>
        </a>
      ))}
    </nav>
  );
};

export default SectionNav;
