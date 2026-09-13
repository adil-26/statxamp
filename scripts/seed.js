const { Client } = require('pg');

const PAST_PAPERS = [
  {
    title: 'CBSE Class 12 Physics Official Board Paper',
    year: 2024,
    exam_type: 'Board',
    board: 'CBSE',
    class_level: 'Class 12',
    subject: 'Physics',
    size: '3.4 MB',
    file_url: 'https://ujytnwdtgypalvnpeawe.supabase.co/storage/v1/object/public/question-papers/cbse-12-phys-2024.pdf',
    total_marks: 70,
    high_yield_topics: JSON.stringify([
      { topic: 'Ray & Wave Optics', marks: 14 },
      { topic: 'Electrostatics & Gauss Law', marks: 9 },
      { topic: 'Semiconductor Devices', marks: 7 },
      { topic: 'Current & Kirchhoff Laws', marks: 7 }
    ]),
    summary: 'Contains Section A (16 MCQs including 4 Assertion-Reason), Section B (5 Very Short), Section C (7 Short Answers), Section D (2 Case Studies), and Section E (3 Long Answers).'
  },
  {
    title: 'CBSE Class 12 Mathematics Board Paper',
    year: 2024,
    exam_type: 'Board',
    board: 'CBSE',
    class_level: 'Class 12',
    subject: 'Mathematics',
    size: '2.8 MB',
    file_url: 'https://ujytnwdtgypalvnpeawe.supabase.co/storage/v1/object/public/question-papers/cbse-12-math-2024.pdf',
    total_marks: 80,
    high_yield_topics: JSON.stringify([
      { topic: 'Definite Integrals & Areas', marks: 18 },
      { topic: 'Vectors & 3D Geometry', marks: 14 },
      { topic: 'Matrices & Determinants', marks: 10 },
      { topic: 'Probability Bayes Theorem', marks: 8 }
    ]),
    summary: 'Rigorous paper focusing heavily on Differential Equations applications, vector equations of skew lines, and Bayes theorem conditional probability.'
  },
  {
    title: 'JEE Main Phase 1 Consolidated All Shifts',
    year: 2024,
    exam_type: 'Competitive',
    board: 'NTA',
    class_level: 'Competitive',
    subject: 'PCM (Physics, Chem, Math)',
    size: '6.5 MB',
    file_url: 'https://ujytnwdtgypalvnpeawe.supabase.co/storage/v1/object/public/question-papers/jee-main-phase1-2024.pdf',
    total_marks: 300,
    high_yield_topics: JSON.stringify([
      { topic: 'Calculus & Vectors', marks: 44 },
      { topic: 'Modern Physics & Optics', marks: 36 },
      { topic: 'Coordination Chemistry', marks: 28 },
      { topic: 'Thermodynamics', marks: 24 }
    ]),
    summary: 'Full NTA memory-based and official answer key verified compilation of January 2024 all 10 shifts.'
  },
  {
    title: 'CBSE Class 10 Science Official Board Paper',
    year: 2024,
    exam_type: 'Board',
    board: 'CBSE',
    class_level: 'Class 10',
    subject: 'Science',
    size: '2.5 MB',
    file_url: 'https://ujytnwdtgypalvnpeawe.supabase.co/storage/v1/object/public/question-papers/cbse-10-science-2024.pdf',
    total_marks: 80,
    high_yield_topics: JSON.stringify([
      { topic: 'Light Reflection & Refraction', marks: 10 },
      { topic: 'Electricity & Circuits', marks: 8 },
      { topic: 'Life Processes (Nutrition/Excretion)', marks: 9 },
      { topic: 'Carbon & Its Compounds', marks: 8 }
    ]),
    summary: 'Official 2024 Class 10 science paper with balanced distribution across Physics, Chemistry, and Biology.'
  }
];

async function seedData() {
  const client = new Client({
    connectionString: 'postgresql://postgres.ujytnwdtgypalvnpeawe:Pilkhana%2328@aws-0-ap-south-1.pooler.supabase.com:5432/postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Seeding initial 10-year question papers into Supabase...');

    for (const paper of PAST_PAPERS) {
      const query = `
        INSERT INTO public.papers (title, year, exam_type, board, class_level, subject, size, file_url, total_marks, high_yield_topics, summary)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT DO NOTHING;
      `;
      await client.query(query, [
        paper.title,
        paper.year,
        paper.exam_type,
        paper.board,
        paper.class_level,
        paper.subject,
        paper.size,
        paper.file_url,
        paper.total_marks,
        paper.high_yield_topics,
        paper.summary
      ]);
    }

    const countRes = await client.query('SELECT count(*) FROM public.papers;');
    console.log(`SEED_SUCCESS: Papers table now has ${countRes.rows[0].count} records in Supabase!`);

    await client.end();
  } catch (err) {
    console.error('SEED_ERROR:', err.message);
  }
}

seedData();
