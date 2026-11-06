'use client'

import React, { useMemo, useState } from 'react'
import { ChevronRight, FileText, FolderOpen, X } from 'lucide-react'
import { DRIVE_COLLECTIONS, DriveCollection, DrivePaper } from '@/lib/drive-papers'

function inAppUrl(paper: DrivePaper): string {
  const file = paper.url.match(/\/file\/d\/([^/?]+)/)
  if (file) return `https://drive.google.com/file/d/${file[1]}/preview`
  const folder = paper.url.match(/\/folders\/([^/?]+)/)
  if (folder) return `https://drive.google.com/embeddedfolderview?id=${folder[1]}`
  return paper.url
}

function paperCount(count: number): string {
  return `${count} ${count === 1 ? 'paper' : 'papers'}`
}

function sortYears(years: string[]): string[] {
  return [...years].sort((a, b) => {
    const na = Number(a)
    const nb = Number(b)
    const aNum = Number.isFinite(na)
    const bNum = Number.isFinite(nb)
    if (aNum && bNum) return nb - na
    if (aNum) return -1
    if (bNum) return 1
    return a.localeCompare(b)
  })
}

export function BoardArchive() {
  const [collectionId, setCollectionId] = useState<string | null>(null)
  const [year, setYear] = useState<string | null>(null)
  const [subject, setSubject] = useState<string | null>(null)
  const [openPaper, setOpenPaper] = useState<DrivePaper | null>(null)

  const active: DriveCollection | undefined = DRIVE_COLLECTIONS.find((item) => item.id === collectionId)

  const boards = useMemo(() => {
    const grouped = new Map<string, DriveCollection[]>()
    for (const collection of DRIVE_COLLECTIONS) {
      const list = grouped.get(collection.board) ?? []
      list.push(collection)
      grouped.set(collection.board, list)
    }
    return Array.from(grouped.entries())
  }, [])

  const years = useMemo(() => {
    if (!active) return []
    return sortYears(Array.from(new Set(active.papers.map((paper) => paper.year))))
  }, [active])

  const subjects = useMemo(() => {
    if (!active || !year) return []
    return Array.from(
      new Set(active.papers.filter((paper) => paper.year === year).map((paper) => paper.subject))
    ).sort((a, b) => a.localeCompare(b))
  }, [active, year])

  const papers = useMemo(() => {
    if (!active || !year || !subject) return []
    return active.papers.filter((paper) => paper.year === year && paper.subject === subject)
  }, [active, year, subject])

  const step: 'board' | 'year' | 'subject' | 'papers' = !active
    ? 'board'
    : !year
      ? 'year'
      : !subject
        ? 'subject'
        : 'papers'

  const chooseCollection = (id: string) => {
    setCollectionId(id)
    setYear(null)
    setSubject(null)
  }

  const chooseYear = (value: string) => {
    setYear(value)
    setSubject(null)
  }

  const goTo = (target: 'board' | 'year' | 'subject') => {
    if (target === 'board') {
      setCollectionId(null)
      setYear(null)
      setSubject(null)
      return
    }
    if (target === 'year') {
      setYear(null)
      setSubject(null)
      return
    }
    setSubject(null)
  }

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-base font-extrabold text-neutral-900 dark:text-cream-50 lg:text-2xl">Question bank</h3>
        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">Board, then year, then subject.</p>
      </div>

      <div className="flex items-center gap-2 text-xs font-bold">
        <StepChip label="1  Board" active={step === 'board'} done={!!active} onClick={() => goTo('board')} />
        <span className="text-neutral-300">→</span>
        <StepChip label="2  Year" active={step === 'year'} done={!!year} disabled={!active} onClick={() => active && goTo('year')} />
        <span className="text-neutral-300">→</span>
        <StepChip label="3  Subject" active={step === 'subject' || step === 'papers'} done={!!subject} disabled={!year} onClick={() => year && goTo('subject')} />
      </div>

      {step === 'board' && (
        <div className="space-y-3">
          {boards.map(([board, collections]) => (
            <div key={board} className="overflow-hidden rounded-3xl border border-cream-200 bg-white dark:border-surface-darkCard dark:bg-surface-dark">
              <div className="px-4 pt-3 text-sm font-extrabold text-neutral-900 dark:text-cream-50">{board.replace(' Board', '')}</div>
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => chooseCollection(collection.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-neutral-800 dark:text-cream-100">{collection.classLevel}</div>
                    <div className="text-[11px] font-semibold text-neutral-400">{paperCount(collection.papers.length)}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-neutral-300" />
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {step === 'year' && active && (
        <ChoiceList
          title={`${active.board.replace(' Board', '')} · ${active.classLevel}`}
          hint="Choose the year"
          items={years.map((value) => ({
            id: value,
            label: value === 'All years' ? 'Year not on the file' : value,
            meta: paperCount(active.papers.filter((paper) => paper.year === value).length),
          }))}
          onPick={chooseYear}
        />
      )}

      {step === 'subject' && active && year && (
        <ChoiceList
          title={`${year === 'All years' ? 'Papers' : year}`}
          hint="Choose the subject"
          items={subjects.map((value) => ({
            id: value,
            label: value,
            meta: paperCount(active.papers.filter((paper) => paper.year === year && paper.subject === value).length),
          }))}
          onPick={setSubject}
        />
      )}

      {step === 'papers' && (
        <div className="overflow-hidden rounded-3xl border border-cream-200 bg-white dark:border-surface-darkCard dark:bg-surface-dark">
          {papers.map((paper) => (
            <button
              key={paper.id}
              type="button"
              onClick={() => setOpenPaper(paper)}
              className="flex w-full items-center gap-3 border-b border-cream-100 px-3.5 py-3 text-left last:border-b-0 active:bg-cream-50 dark:border-neutral-800"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-coral-500/10 text-coral-600">
                {paper.kind === 'folder' ? <FolderOpen className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-neutral-900 dark:text-cream-50">{paper.title}</div>
                <div className="text-[11px] font-semibold text-neutral-400">{paper.subject}</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-neutral-300" />
            </button>
          ))}
        </div>
      )}

      {openPaper && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-neutral-950">
          <div className="flex items-center gap-3 bg-neutral-950 px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white">
            <button
              type="button"
              onClick={() => setOpenPaper(null)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10"
              aria-label="Close paper"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold">{openPaper.title}</div>
              <div className="text-[11px] font-semibold text-white/60">
                {openPaper.board} · {openPaper.classLevel} · {openPaper.subject}
              </div>
            </div>
          </div>
          <iframe title={openPaper.title} src={inAppUrl(openPaper)} className="w-full flex-1 border-0 bg-white" />
        </div>
      )}
    </section>
  )
}

function StepChip({
  label,
  active,
  done,
  disabled,
  onClick,
}: {
  label: string
  active: boolean
  done: boolean
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 ${
        active
          ? 'bg-coral-500 text-white'
          : done
            ? 'bg-neutral-900 text-white'
            : 'bg-cream-100 text-neutral-400'
      } disabled:opacity-50`}
    >
      {label}
    </button>
  )
}

function ChoiceList({
  title,
  hint,
  items,
  onPick,
}: {
  title: string
  hint: string
  items: Array<{ id: string; label: string; meta: string }>
  onPick: (id: string) => void
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className="text-sm font-extrabold text-neutral-900 dark:text-cream-50">{title}</div>
        <div className="text-[11px] font-semibold text-neutral-400">{hint}</div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item.id)}
            className="flex items-center gap-3 rounded-2xl border border-cream-200 bg-white px-3.5 py-3 text-left dark:border-surface-darkCard dark:bg-surface-dark"
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-neutral-900 dark:text-cream-50">{item.label}</div>
              <div className="text-[11px] font-semibold text-neutral-400">{item.meta}</div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-neutral-300" />
          </button>
        ))}
      </div>
    </div>
  )
}
