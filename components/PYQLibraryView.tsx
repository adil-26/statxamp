'use client';

import React from 'react';
import { PYQPaper } from '@/types';
import { BoardArchive } from '@/components/BoardArchive';

interface PYQLibraryViewProps {
  papers: PYQPaper[];
  bookmarks: string[];
  onToggleBookmark: (paperId: string) => void;
  onSolvePaper: (paperId: string) => void;
}

export const PYQLibraryView: React.FC<PYQLibraryViewProps> = () => {
  return (
    <div className="pb-6">
      <BoardArchive />
    </div>
  );
};
