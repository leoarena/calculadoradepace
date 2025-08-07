"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [tempo, setTempo] = useState(""); // formato HH:MM:SS
  const [distancia, setDistancia] = useState("");
  const [pace, setPace] = useState("");
  const [velocidade, setVelocidade] = useState("");

  function tempoParaSegundos(tempo: string): number {
    const [h, m, s] = tempo.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  }

  function formatarSegundosParaPace(segundosPace: number): string {
    const minutos = Math.floor(segundosPace / 60);
    const segundos = Math.round(segundosPace % 60);
    return `${minutos}:${segundos.toString().padStart(2, "0")} min/km`;
  }

  function calcular() {
    const totalSegundos = tempoParaSegundos(tempo);
    const km = parseFloat(distancia);
    if (!km || km === 0 || isNaN(totalSegundos) || totalSegundos === 0) {
      setPace("");
      setVelocidade("");
      return;
    }

    const paceEmSegundos = totalSegundos / km;
    const velocidadeEmKmh = (km / (totalSegundos / 3600)).toFixed(2);

    setPace(formatarSegundosParaPace(paceEmSegundos));
    setVelocidade(`${velocidadeEmKmh} km/h`);
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>Calculadora de Pace</h1>

        <div className={styles.containerInput}>
          <label className={styles.label}>Tempo (HH:MM:SS)</label>
          <input
            type="text"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            placeholder="00:50:00"
            className={styles.input}
          />
        </div>

        <div className={styles.containerInput}>
          <label className={styles.label}>Distância (km)</label>
          <input
            type="number"
            step="0.01"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
            placeholder="10"
            className={styles.input}
          />
        </div>

        <button
          onClick={calcular}
          className={styles.botao}
        >
          Calcular
        </button>

        {pace && velocidade && (
          <div className={styles.resultado}>
            <div className={styles.itemResultado}>
              <span className={styles.labelResultado}>Pace:</span>
              <span className={styles.valorResultado}>{pace || "—"}</span>
            </div>
            <div
              className={styles.itemResultado}
              style={{ borderBottom: "none" }}
            >
              <span className={styles.labelResultado}>Velocidade:</span>
              <span className={styles.valorResultado}>{velocidade || "—"}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
