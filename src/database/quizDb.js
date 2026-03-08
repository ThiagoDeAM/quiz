import { dadosIniciais } from '../data/perguntas';

export async function initDatabase(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS perguntas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pergunta TEXT NOT NULL,
      resposta1 TEXT NOT NULL,
      resposta2 TEXT NOT NULL,
      correta INTEGER NOT NULL
    );
  `);

  const resultado = await db.getFirstAsync(
    'SELECT COUNT(*) as total FROM perguntas'
  );

  const total = resultado?.total ?? 0;

  if (total === 0) {
    for (const item of dadosIniciais) {
      await db.runAsync(
        'INSERT INTO perguntas (pergunta, resposta1, resposta2, correta) VALUES (?, ?, ?, ?)',
        item[0],
        item[1],
        item[2],
        item[3]
      );
    }
  }
}

export async function buscarTodasPerguntas(db) {
  const perguntas = await db.getAllAsync(
    'SELECT id, pergunta, resposta1, resposta2, correta FROM perguntas'
  );

  return perguntas;
}