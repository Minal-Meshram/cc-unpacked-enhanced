'use client';

import { useEffect, useState } from 'react';

interface SectionNumberProps {
  number: string;
  sectionId: string;
  className?: string;
}

export default function SectionNumber({ number, sectionId, className = '' }: SectionNumberProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.3 } // Section is considered active when 30% visible
    );

    const section = document.getElementById(sectionId);
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [sectionId]);

  return (
    <div className={`flex items-center gap-4 text-sm font-mono transition-all duration-300 ${className}`}>
      <span 
        className={`text-sm font-mono transition-all duration-300 ${
          isActive 
            ? 'text-primary text-base font-bold' 
            : 'text-primary/40'
        }`}
      >
        {number}
      </span>
      <span className={`hidden md:block h-px flex-1 transition-all duration-300 ${
        isActive ? 'bg-primary/60' : 'bg-primary/20'
      }`} />
    </div>
  );
}