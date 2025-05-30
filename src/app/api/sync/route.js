import { db } from "@/app/lib/db";

export async function GET() {
  try {
    const response = await fetch("https://mindicador.cl/api");
    const data = await response.json();

    await db.query("DELETE FROM indicadores");
    // Usamos fecha general del objeto
    const fecha = new Date(data.fecha);

    for (const key in data) {
      const indicador = data[key];

      if (indicador?.nombre && indicador?.valor) {
        const nombre = indicador.nombre;
        const valor = indicador.valor;

        await db.query(
          `INSERT INTO indicadores (nombre, valor, fecha)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE valor = ?, fecha = ?`,
          [nombre, valor.toString(), fecha, valor.toString(), fecha]
        );
      }
    }

    return new Response(
      JSON.stringify({ message: "Indicadores sincronizados correctamente." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sincronizando indicadores:", error);
    return new Response(
      JSON.stringify({ error: "Error al sincronizar los datos" }),
      { status: 500 }
    );
  }
}
