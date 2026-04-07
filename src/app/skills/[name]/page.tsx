import { notFound } from 'next/navigation';
import { skillsData } from '@/data/skillData';
import SkillRoadmap from '@/components/SkillRoadmap';

export default function SkillPage({ params }: { params: { name: string } }) {
  const skillName = decodeURIComponent(params.name);
  const skill = skillsData[skillName];
  if (!skill) return notFound();
  return <SkillRoadmap skill={skill} />;
}