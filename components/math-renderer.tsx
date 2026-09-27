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
      return `<div class="my-3.5 text-center overflow-x-auto py-2.5 px-4 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-900 font-serif tracking-wide shadow-2xs">${renderMath(tex, true)}</div>`
    })

    // Step 2: Replace inline math: $ ... $ (ensuring not matched with dollar currencies like $10)
    processed = processed.replace(/(?<!\\)\$([^\$\n]+?)\$/g, (_, tex) => {
      return `<span class="inline-flex items-center mx-1 px-1.5 py-0.5 bg-slate-100 border border-slate-200/90 rounded-md text-slate-900 font-serif font-medium">${renderMath(tex, false)}</span>`
    })

    // Step 3: Handle markdown headings
    processed = processed.replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-slate-900 mt-4 mb-2 flex items-center gap-2 border-b border-slate-200 pb-1">$1</h3>')
    processed = processed.replace(/^## (.*$)/gim, '<h2 class="text-base font-extrabold text-slate-900 mt-5 mb-2">$1</h2>')
    processed = processed.replace(/^# (.*$)/gim, '<h1 class="text-lg font-black text-slate-900 mt-6 mb-3">$1</h1>')

    // Step 4: Horizontal rules
    processed = processed.replace(/^---$/gim, '<hr class="border-slate-200 my-4" />')

    // Step 5: Bold and Italics
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 tracking-tight">$1</strong>')
    processed = processed.replace(/\*(.*?)\*/g, '<em class="text-slate-800 italic">$1</em>')

    // Step 6: Lists
    processed = processed.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-1 leading-relaxed">$1</li>')
    processed = processed.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-1 leading-relaxed">$1</li>')
    processed = processed.replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 my-1 leading-relaxed"><span class="font-semibold text-slate-900">$2</span></li>')

    // Step 7: Linebreaks
    processed = processed.replace(/\n\n/g, '<div class="h-2"></div>')

    return processed
  }, [content])

  const sizeClass = textSize === 'large' 
    ? 'sight-large' 
    : textSize === 'comfortable' 
    ? 'sight-comfortable' 
    : 'sight-normal'

  return (
    <div 
      className={`leading-relaxed text-slate-800 select-text ${sizeClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  )
}
