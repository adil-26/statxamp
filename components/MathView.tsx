'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathView: React.FC<MathViewProps> = ({ content, className = '', block = false }) => {
  const html = useMemo(() => {
    if (!content) return '';
    
    // If content has $ or $$, parse them
    try {
      // Replace $$...$$ with display math
      let rendered = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
        try {
          return `<div class="my-2 overflow-x-auto text-center">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`;
        } catch {
          return math;
        }
      });

      // Replace $...$ with inline math
      rendered = rendered.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
        try {
          return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
        } catch {
          return math;
        }
      });

      // If no $ delimiters were found and block is true, render directly
      if (!content.includes('$')) {
        try {
          rendered = katex.renderToString(content.trim(), { displayMode: block, throwOnError: false });
        } catch {
          rendered = content;
        }
      }

      return rendered;
    } catch {
      return content;
    }
  }, [content, block]);

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
