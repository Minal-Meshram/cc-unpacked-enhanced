const FooterSection = () => {
  return (
    <footer className="py-16 px-4 max-w-6xl mx-auto border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-serif font-bold">
            Claude Code <span className="text-primary italic">Unpacked</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-3 max-w-md leading-relaxed">
            Unofficial. Not affiliated with Anthropic. Based on publicly available source code, so some things might be wrong or outdated. Curation assisted by AI.
          </p>
          <p className="text-xs text-muted-foreground mt-3 font-mono">
            Analysis date: March 31, 2026
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase mb-2">
            Created by
          </p>
          <p className="text-lg font-medium text-foreground">zackautocracy</p>
          <div className="flex gap-3 mt-3 justify-end">
            <a
              href="https://github.com/zackautocracy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://x.com/zackautocracy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="X / Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Analysis based on the Claude Code source shared in{" "}
          <a
            href="https://news.ycombinator.com/item?id=47584540"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            this post
          </a>{" "}
          by @Fried_rice
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
