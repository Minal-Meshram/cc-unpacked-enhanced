'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SkillData, type Topic } from '@/data/skillData';

const difficultyColor = (difficulty: Topic['difficulty']) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-orange-100 text-orange-800';
    case 'Pro': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const priorityColor = (priority: string) => {
  if (priority.includes('🔥')) return 'bg-red-100 text-red-800';
  if (priority.includes('⭐')) return 'bg-blue-100 text-blue-800';
  if (priority.includes('📘')) return 'bg-purple-100 text-purple-800';
  if (priority.includes('🚀')) return 'bg-indigo-100 text-indigo-800';
  return 'bg-gray-100 text-gray-800';
};

export default function SkillRoadmap({ skill }: { skill: SkillData }) {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(`progress_${skill.title}`);
    if (stored) setCompletedTopics(new Set(JSON.parse(stored)));
    setExpandedSections(new Set(skill.sections.map(s => s.title)));
  }, [skill]);

  useEffect(() => {
    localStorage.setItem(`progress_${skill.title}`, JSON.stringify(Array.from(completedTopics)));
  }, [completedTopics, skill.title]);

  const toggleTopic = (name: string) => {
    setCompletedTopics(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const totalTopics = skill.sections.reduce((sum, s) => sum + s.topics.length, 0);
  const completedCount = completedTopics.size;
  const progressPercent = totalTopics === 0 ? 0 : (completedCount / totalTopics) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          ← Back to Skill Map
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{skill.title}</h1>
        <p className="text-gray-600 mb-6">{skill.description}</p>

        {/* Progress bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Overall Progress</span>
            <span>{completedCount} / {totalTopics} topics</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {skill.sections.map(section => {
            const sectionCompleted = section.topics.filter(t => completedTopics.has(t.name)).length;
            const sectionTotal = section.topics.length;
            const isExpanded = expandedSections.has(section.title);
            return (
              <div key={section.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button onClick={() => toggleSection(section.title)} className="w-full flex justify-between items-center p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{isExpanded ? '▼' : '▶'}</span>
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColor(section.priority)}`}>{section.priority}</span>
                  </div>
                  <span className="text-sm text-gray-500">{sectionCompleted}/{sectionTotal}</span>
                </button>
                {isExpanded && (
                  <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {section.topics.map(topic => (
                      <div key={topic.name} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" checked={completedTopics.has(topic.name)} onChange={() => toggleTopic(topic.name)} className="mt-1 h-4 w-4 text-blue-600 rounded" />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="font-medium text-gray-900">{topic.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor(topic.difficulty)}`}>{topic.difficulty}</span>
                            </div>
                            {topic.resources.length > 0 && (
                              <div className="flex flex-wrap gap-3 text-sm">
                                {topic.resources.map((res, idx) => (
                                  <a key={idx} href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                    {res.type === 'docs' ? '📄' : '🎥'} {res.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => { if (confirm('Reset all progress?')) setCompletedTopics(new Set()); }} className="text-sm text-gray-500 hover:text-gray-700 underline">
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}