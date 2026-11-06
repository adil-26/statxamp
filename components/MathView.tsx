'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  content: string;
  className?: string;
  block?: boolean;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderInline(text: string) {
  const math = (source: string, display: boolean) => {
    if (/[^\x00-\x7F]/.test(source)) return escapeHtml(source);
    return katex.renderToString(source.trim(), { displayMode: display, throwOnError: false, strict: 'ignore' });
  };
  let rendered = escapeHtml(text).replace(/\$\$([\s\S]+?)\$\$/g, (_, source) => math(source, true));
  rendered = rendered.replace(/\$([^$\n]+?)\$/g, (_, source) => math(source, false));
  return rendered.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
}

function renderAnswer(content: string) {
  const marked = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => `\n@@MATH@@${encodeURIComponent(math.trim())}@@\n`);
  const lines = marked.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  let paragraph: string[] = [];

  const closeList = () => {
    if (!list) return;
    html.push(list === 'ul' ? '</ul>' : '</ol>');
    list = null;
  };
  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p class="mb-3 leading-7">${renderInline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('@@MATH@@') && trimmed.endsWith('@@')) {
      flushParagraph();
      closeList();
      const source = decodeURIComponent(trimmed.slice(8, -2));
      const tex = /[^\x00-\x7F]/.test(source)
        ? escapeHtml(source)
        : katex.renderToString(source, { displayMode: true, throwOnError: false, strict: 'ignore' });
      html.push(`<div class="my-3 overflow-x-auto text-center">${tex}</div>`);
      return;
    }
    if (!trimmed) {
      flushParagraph();
      closeList();
      return;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      closeList();
      html.push(`<h3 class="mb-1.5 mt-4 text-sm font-extrabold text-neutral-950 dark:text-white">${renderInline(heading[2])}</h3>`);
      return;
    }

    const numbered = /^\d+[.)]\s+(.*)$/.exec(trimmed);
    if (numbered) {
      flushParagraph();
      if (list !== 'ol') {
        closeList();
        html.push('<ol class="mb-3 list-decimal space-y-1.5 pl-5 leading-7">');
        list = 'ol';
      }
      html.push(`<li>${renderInline(numbered[1])}</li>`);
      return;
    }

    const bullet = /^[-*]\s+(.*)$/.exec(trimmed);
    if (bullet) {
      flushParagraph();
      if (list !== 'ul') {
        closeList();
        html.push('<ul class="mb-3 list-disc space-y-1.5 pl-5 leading-7">');
        list = 'ul';
      }
      html.push(`<li>${renderInline(bullet[1])}</li>`);
      return;
    }

    closeList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  closeList();
  return html.join('');
}

export const MathView: React.FC<MathViewProps> = ({ content, className = '' }) => {
  const html = useMemo(() => (content ? renderAnswer(content) : ''), [content]);

  return (
    <div
      className={`block text-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
