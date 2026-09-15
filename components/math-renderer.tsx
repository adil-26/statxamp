'use client'

import React, { useMemo } from 'react'
import katex from 'katex'

interface MathRendererProps {
  content: string
  className?: string
  textSize?: 'normal' | 'comfortable' | 'large'
}

export function MathRenderer({ content, className = '', textSize = 'normal' }: MathRendererProps) {
  // Parse content into formatted blocks containing rendered KaTeX math and markdown elements
  const renderedHtml = useMemo(() => {
    if (!content) return ''

    // Helper to render KaTeX safely
    const renderMath = (tex: string, displayMode: boolean): string => {
      try {
        return katex.renderToString(tex.trim(), {
          displayMode,
          throwOnError: false,
          strict: false
        })
      } catch (err) {
        return `<span class="text-amber-300 font-mono text-xs px-1 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">${tex}</span>`
      }
    }

    // Step 1: Replace display math blocks: $$ ... $$
    let processed = content.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) => {
      return `<div class="my-3.5 text-center overflow-x-auto py-2 px-3 bg-midnight-950/70 border border-cyan-400/25 rounded-2xl shadow-inner text-cyan-200 font-serif tracking-wide">${renderMath(tex, true)}</div>`
    })

    // Step 2: Replace inline math: $ ... $ (ensuring not matched with dollar currencies like $10)
    processed = processed.replace(/(?<!\\)\$([^\$\n]+?)\$/g, (_, tex) => {
      return `<span class="inline-flex items-center mx-1 px-1.5 py-0.5 bg-cyan-400/10 border border-cyan-400/20 rounded-lg text-cyan-200 font-serif font-semibold shadow-xs">${renderMath(tex, false)}</span>`
    })

    // Step 3: Handle markdown headings
    processed = processed.replace(/^### (.*$)/gim, '<h3 class="text-base font-extrabold text-white mt-4 mb-2 flex items-center gap-2 border-b border-white/10 pb-1.5">$1</h3>')
    processed = processed.replace(/^## (.*$)/gim, '<h2 class="text-lg font-black text-cyan-300 mt-5 mb-2">$1</h2>')
    processed = processed.replace(/^# (.*$)/gim, '<h1 class="text-xl font-black gradient-text mt-6 mb-3">$1</h1>')

    // Step 4: Horizontal rules
    processed = processed.replace(/^---$/gim, '<hr class="border-white/10 my-4" />')

    // Step 5: Bold and Italics
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white tracking-tight">$1</strong>')
    processed = processed.replace(/\*(.*?)\*/g, '<em class="text-cyan-200 italic">$1</em>')

    // Step 6: Lists
    processed = processed.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-slate-300 my-1 leading-relaxed">$1</li>')
    processed = processed.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-slate-300 my-1 leading-relaxed">$1</li>')
    processed = processed.replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-300 my-1 leading-relaxed"><span class="font-semibold text-white">$2</span></li>')

    // Step 7: Linebreaks
    processed = processed.replace(/\n\n/g, '<div class="h-2.5"></div>')

    return processed
  }, [content])

  const sizeClass = textSize === 'large' 
    ? 'sight-large' 
    : textSize === 'comfortable' 
    ? 'sight-comfortable' 
    : 'sight-normal'

  return (
    <div 
      className={`leading-relaxed text-slate-200 select-text ${sizeClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  )
}
