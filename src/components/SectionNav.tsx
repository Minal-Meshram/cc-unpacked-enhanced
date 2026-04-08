const sections = [
  { id: "agent-loop", num: "01", label: "The Agent Loop" },
  { id: "architecture", num: "02", label: "Architecture Explorer" },
  { id: "tool-system", num: "03", label: "Tool System" },
  { id: "commands", num: "04", label: "Command Catalog" },
  { id: "hidden-features", num: "05", label: "Hidden Features" },
];

const SectionNav = ({ activeSection }: { activeSection: string }) => {
  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1.5 bg-surface/80 backdrop-blur-sm rounded-xl p-2 border border-border shadow-lg w-14">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`group relative w-10 h-10 flex items-center justify-center rounded-md text-xs transition-colors ${
            activeSection === s.id
              ? "text-primary bg-surface-hover"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span
            className={`absolute left-1 top-2 bottom-2 w-[3px] rounded-full transition-colors ${
              activeSection === s.id ? "bg-primary" : "bg-transparent group-hover:bg-muted-foreground/40"
            }`}
          />
          <span className="font-mono text-[11px]">{s.num}</span>
          <span
            className={`pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-surface/90 border border-border px-3 py-2 text-sm font-serif transition-all ${
              "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
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
