'use client';

import { ResponsiveTreeMap } from '@nivo/treemap';
import { useEffect, useState } from 'react';

interface TreemapDatum {
  name: string;
  value?: number;
  children?: TreemapDatum[];
}

export default function DynamicTreemap() {
  const [data, setData] = useState<TreemapDatum | null>(null);

  useEffect(() => {
    fetch('/api/treemap?path=./src')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading treemap...</div>;

  return (
    <div style={{ height: 600 }}>
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value="value"
        labelSkipSize={12}
        tooltip={({ node }: any) => (   // 👈 Using `any` to bypass TypeScript strictness
          <strong>
            {node.id}: {node.value} files
          </strong>
        )}
      />
    </div>
  );
}