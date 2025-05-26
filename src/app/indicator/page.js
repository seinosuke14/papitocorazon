  'use client';

import { parse } from 'path';
  import { useEffect, useState } from 'react';

  export default function IndicadoresPage() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uf, setUf] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [inputValueUF, setInputValueUF] = useState('');
    const [resultado2, setResultado2] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [utmRes, ufRes] = await Promise.all([
          fetch('/api/indicadores'),
          fetch('/api/UF'),
        ]);

        const utmData = await utmRes.json();
        const ufData = await ufRes.json();

        setDatos(utmData);
        setUf(ufData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar indicadores:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const valorIngresado = e.target.value;
    setInputValue(valorIngresado);

    const valorUTMActual = datos.length > 0 ? parseFloat(datos[0].valor) : 0;
    const resultadoCalculado = parseFloat(valorIngresado) * valorUTMActual;

    if(!isNaN(resultadoCalculado)) {
      setResultado(resultadoCalculado.toFixed(2));
    }else {
      setResultado(null);
    }
  };

  const handleChangeUF = (e) => {
    const valorIngresado2 = e.target.value;
    setInputValueUF(valorIngresado2);
    const valorUFActual = uf.length > 0 ? parseFloat(uf[0].valor) : 0;
    const resultadoCalculado2 = parseFloat(valorIngresado2) * valorUFActual;

      if(!isNaN(resultadoCalculado2)) {
      setResultado2(resultadoCalculado2.toFixed(2));
    }else {
      setResultado2(null);
    }
  }

    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">📊 Valores UTM</h1>

        {loading ? (
          <p className="text-gray-500">Cargando datos...</p>
        ) : datos.length === 0 ? (
          <p className="text-red-500">No hay datos disponibles.</p>
        ) : (
          <ul className="space-y-4">
            {datos.map((datos, i) => (
              <li key={i} className="border p-4 rounded shadow">
                <p><strong>Valor:</strong> {datos.valor}</p>
                <p><strong>Fecha:</strong> {new Date(datos.fecha).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}

        <input
        type='number'
        value={inputValue}
        placeholder='ingrese el valor a multiplicar con utm'
        onChange={handleChange}
        />

        {resultado !== null && (
          <p className="mt-4 text-green-600">
            Resultado: {resultado} CLP
          </p>
        )}

        <h2 className="text-xl font-semibold mt-8">📊 VALORES UF</h2>

        {
          loading ? (
            <p className="text-gray-500">Cargando datos...</p>
          ) : datos.length === 0 ? (
            <p className="text-red-500">No hay datos disponibles.</p>
          ) : (
            <ul className="space-y-4">
              {uf.map((uf, i) => (
                <li key={i} className="border p-4 rounded shadow">
                  <p><strong>Valor:</strong> {uf.valor}</p>
                  <p><strong>Fecha:</strong> {new Date(uf.fecha).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )
        }
        <input
        type='number'
        value={inputValueUF}
        placeholder='ingrese el valor a multiplicar con uf'
        onChange={handleChangeUF}
        className="mt-4 p-2 border rounded w-full"
        />

        {resultado2 !== null && (
          <p className="mt-4 text-green-600">
            Resultado: {resultado2} CLP
          </p>
        )}        
     
      </main>
    );
  }
  
