'use client'

import React, { useMemo } from 'react'
import katex from 'katex'

interface MathRendererProps {
  content: string
  className?: string
}

export function MathRenderer({ content, className = '' }: MathRendererProps) {
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
        return `<span class="text-yellow-400 font-mono text-xs">${tex}</span>`
      }
    }

    // Step 1: Replace display math blocks: $$ ... $$
    let processed = content.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) => {
      return `<div class="my-3 text-center overflow-x-auto py-1 text-cyan-300 font-serif">${renderMath(tex, true)}</div>`
    })

    // Step 2: Replace inline math: $ ... $ (ensuring not matched with dollar currencies like $10)
    processed = processed.replace(/(?<!\\)\$([^\$\n]+?)\$/g, (_, tex) => {
      return `<span class="inline-block px-1 text-cyan-200 font-serif">${renderMath(tex, false)}</span>`
    })

    // Step 3: Handle markdown headings
    processed = processed.replace(/^### (.*$)/gim, '<h3 class="text-base font-extrabold text-white mt-4 mb-2 flex items-center gap-2 border-b border-white/5 pb-1">$1</h3>')
    processed = processed.replace(/^## (.*$)/gim, '<h2 class="text-lg font-black text-cyan-400 mt-5 mb-2">$1</h2>')
    processed = processed.replace(/^# (.*$)/gim, '<h1 class="text-xl font-black gradient-text mt-6 mb-3">$1</h1>')

    // Step 4: Horizontal rules
    processed = processed.replace(/^---$/gim, '<hr class="border-white/10 my-4" />')

    // Step 5: Bold and Italics
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    processed = processed.replace(/\*(.*?)\*/g, '<em class="text-cyan-200 italic">$1</em>')

    // Step 6: Lists
    processed = processed.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-gray-300 my-0.5">$1</li>')
    processed = processed.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-gray-300 my-0.5">$1</li>')
    processed = processed.replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 list-decimal text-gray-300 my-0.5"><span class="font-semibold text-white">$2</span></li>')

    // Step 7: Linebreaks
    processed = processed.replace(/\n\n/g, '<div class="h-2"></div>')

    return processed
  }, [content])

  return (
    <div 
      className={`text-sm leading-relaxed text-gray-300 select-text ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  )
}
