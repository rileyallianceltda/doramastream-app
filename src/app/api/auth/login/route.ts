import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Lógica Fake Temporária (Fallback de segurança)
    if (email === "admin" && password === "admin") {
      return NextResponse.json({ success: true, user: { role: 'admin', email: 'admin' } });
    }
    if (email === "lead" && password === "lead") {
      return NextResponse.json({ success: true, user: { role: 'lead', email: 'lead' } });
    }

    // Lógica Real - Conectando no Banco da Hostinger
    // Se falhar a conexão, ele vai pro catch e usa apenas o fake
    if (process.env.DATABASE_URL) {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      
      const [rows]: any = await connection.execute(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
      
      await connection.end();

      if (rows.length > 0) {
        const user = rows[0];
        return NextResponse.json({ 
          success: true, 
          user: { role: user.role, email: user.email } 
        });
      }
    }

    return NextResponse.json({ success: false, message: "Usuário ou senha incorretos." }, { status: 401 });
  } catch (error) {
    console.error("Erro no login (Possível Timeout do BD):", error);
    // Se o banco não conectou (Hostinger bloqueando), avisamos que usaremos o fake
    return NextResponse.json({ success: false, message: "Banco indisponível. Use admin/admin ou lead/lead." }, { status: 500 });
  }
}
