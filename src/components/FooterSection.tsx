const FooterSection = () => {
  return (
    <footer id="footer" className="py-16 px-4 max-w-6xl mx-auto border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div>
  <h3 className="text-2xl font-serif font-bold">
    Student Skill <span className="text-primary italic">Development Map</span>
  </h3>

  <p className="text-sm text-muted-foreground mt-3 max-w-md leading-relaxed">
    A structured roadmap to help developers grow from beginner to advanced by focusing on real-world skills, modern technologies, and industry best practices.
  </p>

  <p className="text-sm text-muted-foreground mt-2 max-w-md leading-relaxed">
    Designed and developed to guide learners through frontend, backend, system design, and beyond.
  </p>

  <p className="text-xs text-muted-foreground mt-3 font-mono">
    Built by Minal • {new Date().toLocaleDateString()}
  </p>
</div>

        <div>
  <p className="text-xs tracking-widest text-muted-foreground mb-2">
    CREATED BY
  </p>

  <h3 className="text-lg font-semibold text-white">
    Minal
  </h3>

  <p className="text-sm text-muted-foreground mt-1">
    Full Stack Developer
  </p>

  <p className="text-xs text-muted-foreground mt-2">
    Building scalable web apps with React, Next.js & Node.js
  </p>
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
