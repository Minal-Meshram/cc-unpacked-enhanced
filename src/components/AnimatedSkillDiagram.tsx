'use client';

import { useState, useEffect, useRef } from 'react';
import { skillsData, type SkillData, type Topic } from '@/data/skillData';

interface AnimatedNode {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  difficulty: string;
  progress: number;
  connections: string[];
}

export default function AnimatedSkillDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [nodes, setNodes] = useState<AnimatedNode[]>([]);
  const [completedTopics, setCompletedTopics] = useState<Map<string, Set<string>>>(new Map());

  // Load progress from localStorage
  useEffect(() => {
    const allProgress: Map<string, Set<string>> = new Map();
    Object.keys(skillsData).forEach(skillKey => {
      const stored = localStorage.getItem(`progress_${skillsData[skillKey].title}`);
      if (stored) {
        allProgress.set(skillKey, new Set(JSON.parse(stored)));
      } else {
        allProgress.set(skillKey, new Set());
      }
    });
    setCompletedTopics(allProgress);
  }, []);

  // Calculate node positions and connections
  useEffect(() => {
    const calculateNodes = () => {
      const skillList = Object.entries(skillsData);
      const centerX = 400;
      const centerY = 300;
      const radius = 200;
      
      const newNodes: AnimatedNode[] = skillList.map(([key, skill], index) => {
        const angle = (index / skillList.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Calculate progress based on completed topics
        const skillProgress = completedTopics.get(key);
        const totalTopics = skill.sections.reduce((sum, s) => sum + s.topics.length, 0);
        const completedCount = skillProgress?.size || 0;
        const progressPercent = totalTopics === 0 ? 0 : (completedCount / totalTopics) * 100;
        
        // Color based on difficulty/progress
        let color;
        if (progressPercent >= 80) color = '#10b981'; // Green - Mastered
        else if (progressPercent >= 50) color = '#3b82f6'; // Blue - Progressing
        else if (progressPercent >= 20) color = '#f59e0b'; // Orange - Started
        else color = '#ef4444'; // Red - Not Started
        
        return {
          id: key,
          name: skill.title,
          x, y,
          radius: 30 + (progressPercent / 100) * 20,
          color,
          difficulty: getSkillDifficulty(skill),
          progress: progressPercent,
          connections: getConnections(key, skillList)
        };
      });
      
      setNodes(newNodes);
    };
    
    calculateNodes();
  }, [completedTopics]);

  const getSkillDifficulty = (skill: SkillData): string => {
    const hasPro = skill.sections.some(s => s.priority.includes('Pro'));
    const hasAdvanced = skill.sections.some(s => s.priority.includes('Advanced'));
    if (hasPro) return 'Pro';
    if (hasAdvanced) return 'Advanced';
    return 'Intermediate';
  };

  const getConnections = (key: string, skillList: [string, SkillData][]): string[] => {
    const connections: string[] = [];
    const currentSkill = skillsData[key];
    
    // Define relationship logic
    skillList.forEach(([otherKey, otherSkill]) => {
      if (otherKey === key) return;
      
      // Connect related skills
      if (
        (key === 'JS/TS' && (otherKey === 'React' || otherKey === 'Node/Express')) ||
        (key === 'React' && (otherKey === 'JS/TS' || otherKey === 'Mobile (RN)')) ||
        (key === 'Node/Express' && (otherKey === 'JS/TS' || otherKey === 'API' || otherKey === 'DB & SQL')) ||
        (key === 'API' && (otherKey === 'Node/Express' || otherKey === 'Testing')) ||
        (key === 'DB & SQL' && (otherKey === 'Node/Express' || otherKey === 'Sys Design')) ||
        (key === 'Git' && (otherKey === 'DevOps')) ||
        (key === 'DevOps' && (otherKey === 'Git' || otherKey === 'Cloud'))
      ) {
        connections.push(otherKey);
      }
    });
    
    return connections;
  };

  // Animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const animate = () => {
      time += 0.02;
      setAnimationFrame(time);
      drawCanvas(ctx, time);
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [nodes, selectedSkill, hoveredSkill]);

  const drawCanvas = (ctx: CanvasRenderingContext2D, time: number) => {
    // Clear canvas
    ctx.clearRect(0, 0, 800, 600);
    
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Draw connections
    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId);
        if (targetNode) {
          // Animated dashed line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          
          const dashLength = 10;
          const dashOffset = (time * 50) % (dashLength * 2);
          ctx.setLineDash([dashLength, dashLength]);
          ctx.lineWidth = 2;
          
          // Gradient stroke based on progress
          const strokeGradient = ctx.createLinearGradient(node.x, node.y, targetNode.x, targetNode.y);
          strokeGradient.addColorStop(0, node.color);
          strokeGradient.addColorStop(1, targetNode.color);
          ctx.strokeStyle = strokeGradient;
          ctx.stroke();
          
          // Draw animated particles on connections
          const particleCount = 3;
          for (let i = 0; i < particleCount; i++) {
            const t = (time * 0.5 + i / particleCount) % 1;
            const px = node.x + (targetNode.x - node.x) * t;
            const py = node.y + (targetNode.y - node.y) * t;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(time * 5 + i) * 0.3})`;
            ctx.fill();
          }
        }
      });
    });
    
    // Reset line dash
    ctx.setLineDash([]);
    
    // Draw nodes
    nodes.forEach(node => {
      const isSelected = selectedSkill === node.id;
      const isHovered = hoveredSkill === node.id;
      
      // Pulsing animation for selected/hovered nodes
      const pulseScale = isSelected || isHovered ? 1 + Math.sin(time * 10) * 0.05 : 1;
      const radius = node.radius * pulseScale;
      
      // Shadow
      ctx.shadowBlur = isSelected || isHovered ? 20 : 10;
      ctx.shadowColor = node.color;
      
      // Draw outer glow
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 5, 0, Math.PI * 2);
      ctx.fillStyle = `${node.color}20`;
      ctx.fill();
      
      // Draw main circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      
      // Radial gradient for 3D effect
      const radialGradient = ctx.createRadialGradient(
        node.x - radius * 0.3, node.y - radius * 0.3, radius * 0.2,
        node.x, node.y, radius
      );
      radialGradient.addColorStop(0, node.color);
      radialGradient.addColorStop(1, `${node.color}99`);
      ctx.fillStyle = radialGradient;
      ctx.fill();
      
      // Draw progress ring
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 3, 0, (Math.PI * 2 * node.progress) / 100);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.min(14, radius / 3)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Wrap text if needed
      const words = node.name.split(' ');
      if (words.length > 1 && radius < 40) {
        ctx.fillText(words[0], node.x, node.y - 8);
        ctx.fillText(words[1], node.x, node.y + 8);
      } else {
        ctx.fillText(node.name, node.x, node.y);
      }
      
      // Draw progress percentage
      ctx.font = '10px Arial';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`${Math.round(node.progress)}%`, node.x, node.y + radius + 15);
      
      // Draw difficulty badge
      const badgeColors: Record<string, string> = {
        'Beginner': '#22c55e',
        'Intermediate': '#f59e0b',
        'Advanced': '#ef4444',
        'Pro': '#8b5cf6'
      };
      ctx.beginPath();
      ctx.rect(node.x - 15, node.y - radius - 10, 30, 16);
      ctx.fillStyle = badgeColors[node.difficulty] || '#64748b';
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Arial';
      ctx.fillText(node.difficulty, node.x, node.y - radius - 2);
    });
    
    // Reset shadow
    ctx.shadowBlur = 0;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const clickedNode = nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= node.radius;
    });
    
    if (clickedNode) {
      setSelectedSkill(clickedNode.id);
      // You can navigate to skill page or show details
      console.log('Selected skill:', clickedNode.name);
    } else {
      setSelectedSkill(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const hovered = nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= node.radius;
    });
    
    setHoveredSkill(hovered?.id || null);
  };

  // Get overall statistics
  const totalProgress = nodes.length > 0 
    ? nodes.reduce((sum, node) => sum + node.progress, 0) / nodes.length 
    : 0;

  const masteredSkills = nodes.filter(node => node.progress >= 80).length;
  const inProgressSkills = nodes.filter(node => node.progress >= 20 && node.progress < 80).length;
  const notStartedSkills = nodes.filter(node => node.progress < 20).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">
            🎯 Skill Development Ecosystem
          </h1>
          <p className="text-slate-300">Interactive animated diagram showing your learning journey</p>
        </div>
        
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{Math.round(totalProgress)}%</div>
            <div className="text-slate-300 text-sm">Overall Progress</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400">{masteredSkills}</div>
            <div className="text-slate-300 text-sm">Mastered Skills</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{inProgressSkills}</div>
            <div className="text-slate-300 text-sm">In Progress</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-400">{notStartedSkills}</div>
            <div className="text-slate-300 text-sm">Not Started</div>
          </div>
        </div>
        
        {/* Canvas Diagram */}
        <div className="bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            className="w-full h-auto rounded-lg cursor-pointer"
            style={{ background: 'transparent' }}
          />
        </div>
        
        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-slate-300 text-sm">Mastered (80%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-slate-300 text-sm">Progressing (50-80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-slate-300 text-sm">Started (20-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-slate-300 text-sm">Not Started (&lt;20%)</span>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-6 text-center text-slate-400 text-sm">
          💡 Click on any skill node to view details • Hover to see animations • Lines show skill relationships
        </div>
        
        {/* Selected Skill Details */}
        {selectedSkill && skillsData[selectedSkill] && (
          <div className="mt-6 bg-white/10 backdrop-blur rounded-lg p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-2">{skillsData[selectedSkill].title}</h3>
            <p className="text-slate-300 mb-4">{skillsData[selectedSkill].description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skillsData[selectedSkill].sections.map(section => (
                <div key={section.title} className="bg-slate-700/50 rounded-lg p-3">
                  <div className="font-semibold text-white mb-2">{section.title}</div>
                  <div className="text-xs text-slate-300">
                    {section.topics.length} topics • {section.priority}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.location.href = `/skills/${encodeURIComponent(selectedSkill)}`}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              View Detailed Roadmap →
            </button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}