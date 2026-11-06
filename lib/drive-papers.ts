import catalogJson from './drive-catalog.json'

export type DriveLayout = 'subject-folders' | 'mixed-files'

export interface DrivePaper {
  id: string
  title: string
  board: string
  classLevel: 'Class 10' | 'Class 12'
  subject: string
  year: string
  url: string
  kind: 'file' | 'folder'
  mixedFolder: boolean
}

export interface DriveCollection {
  id: string
  board: string
  classLevel: 'Class 10' | 'Class 12'
  layout: DriveLayout
  folderUrl: string
  papers: DrivePaper[]
  subjects: string[]
}

interface RawEntry {
  title: string
  url: string
  kind: 'file' | 'folder'
}

interface RawCollection {
  id: string
  board: string
  classLevel: 'Class 10' | 'Class 12'
  layout: DriveLayout
  folderUrl: string
  entries: RawEntry[]
}

const SUBJECT_RULES: Array<[RegExp, string]> = [
  [/physical\s*science/, 'Physical Science'],
  [/life\s*science|live\s*science/, 'Life Science'],
  [/b*biology/, 'Biology'],
  [/boo?tany/, 'Botany'],
  [/zoology/, 'Zoology'],
  [/business[\s-]*math/, 'Business Mathematics'],
  [/buisness|business|\bb\.?\s*st\b/, 'Business Studies'],
  [/informatic/, 'Informatics Practices'],
  [/computer|\bit\b/, 'Computer Science'],
  [/physical\s*education|\bphysical\b/, 'Physical Education'],
  [/home\s*science|\bhome\b/, 'Home Science'],
  [/applied/, 'Applied Mathematics'],
  [/commercial\s*studies/, 'Commercial Studies'],
  [/econom|\beco\b/, 'Economics'],
  [/politic|\bpol\b/, 'Political Science'],
  [/social|s\.?\s*st/, 'Social Science'],
  [/geograph|\bgeo\b/, 'Geography'],
  [/histor|\bhis\b/, 'History'],
  [/civic/, 'Civics'],
  [/sociolog/, 'Sociology'],
  [/p(?:s?y|y?s)ch|physcolog/, 'Psychology'],
  [/philosoph/, 'Philosophy'],
  [/educat/, 'Education'],
  [/agricultur/, 'Agriculture'],
  [/environment/, 'Environmental Studies'],
  [/commerc/, 'Commerce'],
  [/literature/, 'Literature'],
  [/\blanguage\b/, 'Language'],
  [/math|\bm\b/, 'Mathematics'],
  [/physiy|physic|\bp\b/, 'Physics'],
  [/chem|\bch\b/, 'Chemistry'],
  [/acc?ount|accont|accountant|\ba\b/, 'Accountancy'],
  [/english/, 'English'],
  [/hind[ij]/, 'Hindi'],
  [/telugu/, 'Telugu'],
  [/tamil/, 'Tamil'],
  [/bangla|bengali/, 'Bengali'],
  [/punjabi/, 'Punjabi'],
  [/maly?alam/, 'Malayalam'],
  [/assamese/, 'Assamese'],
  [/odia|oriya/, 'Odia'],
  [/guj[ae]rati/, 'Gujarati'],
  [/kannada|kanada/, 'Kannada'],
  [/marathi/, 'Marathi'],
  [/sanskr|sansakrit/, 'Sanskrit'],
  [/urdu/, 'Urdu'],
  [/nepali/, 'Nepali'],
  [/arabic/, 'Arabic'],
  [/science/, 'Science'],
]

export function subjectFromName(name: string): string {
  const text = name.toLowerCase().replace(/[_-]+/g, ' ')
  for (const [pattern, subject] of SUBJECT_RULES) {
    if (pattern.test(text)) return subject
  }
  const cleaned = name
    .replace(/\.(pdf|docx?)$/i, '')
    .replace(/\b(19|20)\d{2}\b/g, '')
    .replace(/\b(xii|x|class|paper|part)\b/gi, '')
    .replace(/[()[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned || 'General'
}

function yearFromName(name: string): string {
  const match = name.match(/\b(19|20)\d{2}\b/)
  return match ? match[0] : 'All years'
}

function prettyTitle(entry: RawEntry): string {
  return entry.title.replace(/\s+/g, ' ').trim()
}

const raw = catalogJson as RawCollection[]

export const DRIVE_COLLECTIONS: DriveCollection[] = raw.map((collection) => {
  const papers: DrivePaper[] = collection.entries.map((entry, index) => ({
    id: `${collection.id}-${index}`,
    title: prettyTitle(entry),
    board: collection.board,
    classLevel: collection.classLevel,
    subject: subjectFromName(entry.title),
    year: yearFromName(entry.title),
    url: entry.url,
    kind: entry.kind,
    mixedFolder: collection.layout === 'mixed-files',
  }))

  const subjects = Array.from(new Set(papers.map((paper) => paper.subject))).sort((a, b) =>
    a.localeCompare(b)
  )

  return {
    id: collection.id,
    board: collection.board,
    classLevel: collection.classLevel,
    layout: collection.layout,
    folderUrl: collection.folderUrl,
    papers,
    subjects,
  }
}).sort((a, b) => a.board.localeCompare(b.board) || a.classLevel.localeCompare(b.classLevel))

export const DRIVE_PAPER_COUNT = DRIVE_COLLECTIONS.reduce(
  (sum, collection) => sum + collection.papers.length,
  0
)
