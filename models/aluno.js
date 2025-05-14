const db = require('../config/db');

module.exports = {
  // Cria um novo aluno
  async create(data) {
    const query = 'INSERT INTO aluno (nome, email, curso_id) VALUES ($1, $2, $3)';
    const values = [data.nome, data.email, data.curso_id || null];
    return db.query(query, values);
  },

  // Lista todos os alunos
  async findAll() {
    const result = await db.query('SELECT * FROM aluno ORDER BY id ASC');
    return result.rows;
  },

  // Atualiza um aluno existente
  async update(id, data) {
    const query = 'UPDATE aluno SET nome = $1, email = $2, curso_id = $3 WHERE id = $4';
    const values = [data.nome, data.email, data.curso_id || null, id];
    return db.query(query, values);
  },

  // Deleta um aluno
  async delete(id) {
    const query = 'DELETE FROM aluno WHERE id = $1';
    return db.query(query, [id]);
  },

  // Lista todos os alunos com nome do curso (se houver)
  async findAllComCurso() {
    const query = `
      SELECT aluno.id, aluno.nome, aluno.email, curso.nome AS curso
      FROM aluno
      LEFT JOIN curso ON aluno.curso_id = curso.id
      ORDER BY aluno.id ASC
    `;
    const result = await db.query(query);
    return result.rows;
  },

  // Lista alunos filtrando por curso
  async findByCurso(curso_id) {
    const query = `
      SELECT aluno.id, aluno.nome, aluno.email
      FROM aluno
      WHERE curso_id = $1
      ORDER BY nome ASC
    `;
    const result = await db.query(query, [curso_id]);
    return result.rows;
  },
};
