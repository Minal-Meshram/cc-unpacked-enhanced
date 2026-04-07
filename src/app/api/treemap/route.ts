// app/api/treemap/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Count files in a directory (skip node_modules, .git, etc.)
async function countFiles(dirPath: string): Promise<number> {
  let total = 0;
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next') continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      total += await countFiles(fullPath);
    } else {
      total++;
    }
  }
  return total;
}

// Build treemap hierarchy (only one level deep for simplicity, but you can make it recursive)
async function buildTreemapData(rootDir: string) {
  const rootName = path.basename(rootDir);
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const children = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === '.next') continue;
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      const fileCount = await countFiles(fullPath);
      children.push({ name: entry.name, value: fileCount });
    }
  }

  children.sort((a, b) => b.value - a.value); // largest first
  return { name: rootName, children };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let targetDir = searchParams.get('path') || path.join(process.cwd(), 'src');
  targetDir = path.resolve(targetDir);

  try {
    const data = await buildTreemapData(targetDir);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to scan directory' }, { status: 500 });
  }
}