const { Client } = require('pg');
const fs = require('fs');

async function runMigration() {
  const client = new Client({
    connectionString: 'postgresql://postgres.ujytnwdtgypalvnpeawe:Pilkhana%2328@aws-0-ap-south-1.pooler.supabase.com:5432/postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase PostgreSQL at aws-0-ap-south-1.pooler.supabase.com:5432...');
    await client.connect();
    console.log('Connected to Supabase successfully!');

    const sql = fs.readFileSync('supabase/schema.sql', 'utf8');
    console.log('Applying schema.sql migration...');
    await client.query(sql);
    console.log('MIGRATION_SUCCESS: All tables, RLS policies, and storage bucket created successfully in Supabase!');

    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';");
    console.log('Public Tables in Supabase:', res.rows.map(r => r.table_name));

    await client.end();
  } catch (err) {
    console.error('MIGRATION_ERROR:', err.message);
    process.exit(1);
  }
}

runMigration();
