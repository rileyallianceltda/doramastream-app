const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env' });

async function initDB() {
  try {
    console.log("Conectando ao banco Hostinger...");
    // A string do Hostinger geralmente vem sem o schema se usarmos createConnection,
    // mas createConnection suporta uri.
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    console.log("Conectado! Criando tabela de usuários...");
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'lead',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log("Tabela 'users' criada ou já existente com sucesso!");
    
    // Inserir os usuários padrão admin e lead
    const users = [
      { id: 'admin_id', email: 'admin', password: 'admin', role: 'admin' },
      { id: 'lead_id', email: 'lead', password: 'lead', role: 'lead' }
    ];

    for (const u of users) {
      await connection.execute(
        `INSERT IGNORE INTO users (id, email, password, role) VALUES (?, ?, ?, ?)`,
        [u.id, u.email, u.password, u.role]
      );
    }
    console.log("Usuários padrão inseridos com sucesso!");
    
    await connection.end();
  } catch (error) {
    console.error("Erro ao conectar ou criar tabela:", error.message);
  }
}

initDB();
