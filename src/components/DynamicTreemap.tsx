'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface TreemapNode {
  name: string;
  value?: number;
  children?: TreemapNode[];
}

type TreemapLayoutNode = d3.HierarchyRectangularNode<TreemapNode>;

// ===================== TOP-LEVEL DATA (short names) =====================
const TOP_LEVEL_DATA: TreemapNode = {
  name: "Student Skill Development Map",
  children: [
    { name: "JS/TS", value: 100 },
    { name: "React", value: 90 },
    { name: "Node/Express", value: 70 },
    { name: "DB & SQL", value: 60 },
    { name: "Git", value: 60 },
    { name: "API", value: 32 },
    { name: "Testing", value: 20 },
    { name: "HTML/CSS", value: 30 },
    { name: "DevOps", value: 10 },
    { name: "Sys Design", value: 9 },
    { name: "DSA", value: 8 },
    { name: "Soft Skills", value: 8 },
    { name: "Cyber", value: 7 },
    { name: "Cloud", value: 6 },
    { name: "Mobile (RN)", value: 5 },
    { name: "Web Perf", value: 4 },
    { name: "AI/ML", value: 5 },
  ],
};

// One-line descriptions for tooltip
const NODE_DESCRIPTIONS: Record<string, string> = {
  "JS/TS": "Core language for web development",
  "React": "Frontend library with hooks & state",
  "Node/Express": "Backend runtime & framework",
  "DB & SQL": "Data persistence (SQL + NoSQL)",
  "Git": "Version control essentials",
  "API": "REST & GraphQL communication",
  "Testing": "Unit, integration & e2e tests",
  "HTML/CSS": "Structure, styling & responsive",
  "DevOps": "Docker, CI/CD, deployment",
  "Sys Design": "Scalable architecture patterns",
  "DSA": "Problem-solving fundamentals",
  "Soft Skills": "Agile, teamwork, communication",
  "Cyber": "Security basics (OWASP, HTTPS)",
  "Cloud": "AWS/Azure compute & storage",
  "Mobile (RN)": "Cross-platform mobile apps",
  "Web Perf": "LCP, CLS, optimizations",
  "AI/ML": "OpenAI, Hugging Face APIs",
};

// ===================== DRILL-DOWN DATA (keys match short names) =====================
const FOLDER_DETAILS: Record<string, TreemapNode> = {
  "JS/TS": {
    name: "JS/TS",
    children: [
      { name: "ES6+ (async)", value: 30 },
      { name: "TypeScript", value: 25 },
      { name: "Closures", value: 15 },
      { name: "Event Loop", value: 15 },
      { name: "Array methods", value: 15 },
    ],
  },
  "React": {
    name: "React",
    children: [
      { name: "Hooks", value: 35 },
      { name: "State (Redux)", value: 25 },
      { name: "Router", value: 15 },
      { name: "Next.js", value: 15 },
      { name: "Perf (memo)", value: 10 },
    ],
  },
  "Node/Express": {
    name: "Node/Express",
    children: [
      { name: "Express routing", value: 30 },
      { name: "JWT auth", value: 25 },
      { name: "File uploads", value: 15 },
      { name: "Error handling", value: 15 },
      { name: "Env vars", value: 15 },
    ],
  },
  "DB & SQL": {
    name: "DB & SQL",
    children: [
      { name: "SQL (JOINs)", value: 40 },
      { name: "MongoDB", value: 25 },
      { name: "ORM (Prisma)", value: 20 },
      { name: "DB design", value: 15 },
    ],
  },
  "Git": {
    name: "Git",
    children: [
      { name: "Basic commands", value: 30 },
      { name: "Branching", value: 30 },
      { name: "Conflicts", value: 20 },
      { name: "GitHub Actions", value: 20 },
    ],
  },
  "API": {
    name: "API",
    children: [
      { name: "REST principles", value: 35 },
      { name: "Swagger", value: 20 },
      { name: "Postman", value: 25 },
      { name: "GraphQL", value: 20 },
    ],
  },
  "Testing": {
    name: "Testing",
    children: [
      { name: "Jest", value: 35 },
      { name: "Integration tests", value: 25 },
      { name: "DevTools", value: 25 },
      { name: "Cypress", value: 15 },
    ],
  },
  "HTML/CSS": {
    name: "HTML/CSS",
    children: [
      { name: "Flexbox/Grid", value: 30 },
      { name: "Responsive", value: 30 },
      { name: "CSS variables", value: 20 },
      { name: "Tailwind", value: 20 },
    ],
  },
  "DevOps": {
    name: "DevOps",
    children: [
      { name: "Docker", value: 40 },
      { name: "CI/CD", value: 30 },
      { name: "Linux basics", value: 20 },
      { name: "Deployment", value: 10 },
    ],
  },
  "Sys Design": {
    name: "Sys Design",
    children: [
      { name: "MVC", value: 30 },
      { name: "Microservices", value: 25 },
      { name: "Load balancing", value: 25 },
      { name: "Message queues", value: 20 },
    ],
  },
  "DSA": {
    name: "DSA",
    children: [
      { name: "Arrays/HashMaps", value: 30 },
      { name: "Recursion/DP", value: 25 },
      { name: "Sorting", value: 25 },
      { name: "Big O", value: 20 },
    ],
  },
  "Soft Skills": {
    name: "Soft Skills",
    children: [
      { name: "Agile/Scrum", value: 30 },
      { name: "Tech writing", value: 25 },
      { name: "Pair programming", value: 25 },
      { name: "Presentations", value: 20 },
    ],
  },
  "Cyber": {
    name: "Cyber",
    children: [
      { name: "HTTPS/SSL", value: 30 },
      { name: "XSS/CSRF", value: 25 },
      { name: "Secrets mgmt", value: 20 },
      { name: "OWASP", value: 15 },
      { name: "Rate limiting", value: 10 },
    ],
  },
  "Cloud": {
    name: "Cloud",
    children: [
      { name: "Virtual machines", value: 30 },
      { name: "Object storage", value: 25 },
      { name: "IAM", value: 20 },
      { name: "Serverless", value: 15 },
      { name: "VPC", value: 10 },
    ],
  },
  "Mobile (RN)": {
    name: "Mobile (RN)",
    children: [
      { name: "Core components", value: 35 },
      { name: "Navigation", value: 25 },
      { name: "Redux Toolkit", value: 20 },
      { name: "Native modules", value: 10 },
      { name: "Publishing", value: 10 },
    ],
  },
  "Web Perf": {
    name: "Web Perf",
    children: [
      { name: "Lighthouse", value: 30 },
      { name: "Image opt", value: 25 },
      { name: "Code splitting", value: 20 },
      { name: "SEO", value: 15 },
      { name: "Caching", value: 10 },
    ],
  },
  "AI/ML": {
    name: "AI/ML",
    children: [
      { name: "OpenAI API", value: 40 },
      { name: "Hugging Face", value: 20 },
      { name: "Prompt engineering", value: 20 },
      { name: "Image gen", value: 10 },
      { name: "RAG pipeline", value: 10 },
    ],
  },
};

export default function DynamicTreemap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentRoot, setCurrentRoot] = useState<TreemapNode | null>(null);
  const [history, setHistory] = useState<TreemapNode[]>([]);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });
  const router = useRouter();

  useEffect(() => {
    setCurrentRoot(TOP_LEVEL_DATA);
  }, []);

  useEffect(() => {
    if (!currentRoot || !svgRef.current) return;

    const width = 950;
    const height = 600;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const root = d3.hierarchy(currentRoot)
      .sum(d => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    d3.treemap<TreemapNode>()
      .size([width, height])
      .padding(2)
      .round(true)(root);

    const leaves = root.leaves() as TreemapLayoutNode[];
    const color = d3.scaleOrdinal(d3.schemeTableau10);

    svg.selectAll('rect')
      .data(leaves)
      .enter()
      .append('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => color(d.data.name))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('cursor', 'pointer')
      .attr('class', 'treemap-rect')
      .on('mouseenter', function(event, d) {
        const nodeName = d.data.name;
        const description = NODE_DESCRIPTIONS[nodeName] || "Click to explore";
        setTooltip({
          visible: true,
          x: event.clientX + 10,
          y: event.clientY - 20,
          text: `${nodeName}: ${description}`,
        });
        d3.select(this)
          .attr('stroke-width', 3)
          .attr('stroke', '#ff0');
      })
      .on('mousemove', function(event) {
        setTooltip(prev => ({
          ...prev,
          x: event.clientX + 10,
          y: event.clientY - 20,
        }));
      })
      .on('mouseleave', function() {
        setTooltip(prev => ({ ...prev, visible: false }));
        d3.select(this)
          .attr('stroke-width', 1.5)
          .attr('stroke', '#fff');
      })
      .on('click', (event, d) => {
        const skillName = d.data.name;
        router.push(`/skills/${encodeURIComponent(skillName)}`);
      });

    svg.selectAll('text')
      .data(leaves)
      .enter()
      .append('text')
      .attr('x', d => d.x0 + 5)
      .attr('y', d => d.y0 + 20)
      .attr('font-size', '12px')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .text(d => {
        const name = d.data.name;
        const rectWidth = d.x1 - d.x0;
        if (rectWidth < 60) return '';
        return `${name}`;
      });
  }, [currentRoot]);

  const goBack = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentRoot(previous);
  };

  if (!currentRoot) return <div>Loading...</div>;

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      width: '100%',
      padding: '20px'
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{ marginBottom: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={goBack}
            disabled={history.length === 0}
            style={{
              padding: '6px 12px',
              backgroundColor: history.length === 0 ? '#ccc' : '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: history.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            ← Back
          </button>
          <span>Current: <strong>{currentRoot.name}</strong> ({currentRoot.value || 0}% priority)</span>
        </div>

        <svg ref={svgRef} width={950} height={600} style={{ border: '1px solid #ccc' }} />

        {tooltip.visible && (
          <div
            style={{
              position: 'fixed',
              left: tooltip.x,
              top: tooltip.y,
              background: 'black',
              color: 'yellow',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              zIndex: 9999,
              pointerEvents: 'none',
              fontFamily: 'sans-serif',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
}