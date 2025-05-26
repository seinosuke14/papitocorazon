
import { db } from "@/app/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      `SELECT nombre, valor, fecha
       FROM indicadores
       WHERE nombre = "Unidad de fomento (UF)"
       ORDER BY fecha DESC
       LIMIT 50`
    );

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener indicadores:", error);
    return new Response(
      JSON.stringify({ error: "No se pudieron obtener los datos" }),
      { status: 500 }
    );
  }
}
