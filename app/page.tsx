"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [tempo, setTempo] = useState("");
  const [deletandoTempo, setDeletandoTempo] = useState(false);
  const [distancia, setDistancia] = useState("");
  const [pace, setPace] = useState("");
  const [velocidade, setVelocidade] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") setDeletandoTempo(true);
    else setDeletandoTempo(false);
  };

  const limitarMinutoSegundo = (valor: string): string => {
    if (parseInt(valor) > 59) return "59";
    else return valor;
  };

  const formatarTempo = (valor: string): string => {
    const valorSanitizado = valor.replace(/\D/g, "").slice(0, 6);

    if ([3, 6].includes(tempo.length) && deletandoTempo) {
      return tempo.slice(0, -2);
    } else if (valorSanitizado.length < 2) {
      return valorSanitizado;
    } else if (valorSanitizado.length < 4) {
      const horas = valorSanitizado.slice(0, 2);
      const minutos = limitarMinutoSegundo(valorSanitizado.slice(2));
      return `${horas}:${minutos}`;
    } else {
      const horas = valorSanitizado.slice(0, 2);
      const minutos = limitarMinutoSegundo(valorSanitizado.slice(2, 4));
      const segundos = limitarMinutoSegundo(valorSanitizado.slice(4));
      return `${horas}:${minutos}:${segundos}`;
    }
  };

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarTempo(e.target.value);
    setTempo(valorFormatado);
    setPace("");
    setVelocidade("");
    setTimeout(() => setDeletandoTempo(false), 10);
  };

  const handleDistanciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistancia(e.target.value);
    setPace("");
    setVelocidade("");
  };

  const tempoParaSegundos = (tempo: string): number => {
    const [horas, minutos, segundos] = tempo.split(":").map(Number);
    const totalSegundos = horas * 3600 + minutos * 60 + segundos;
    return totalSegundos;
  };

  const formatarSegundosParaPace = (segundosPace: number): string => {
    const minutos = Math.floor(segundosPace / 60);
    const segundos = Math.round(segundosPace % 60);
    return `${minutos}:${segundos.toString().padStart(2, "0")} min/km`;
  };

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
          <label className={styles.label}>Distância (km)</label>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            value={distancia}
            onChange={handleDistanciaChange}
            placeholder="10"
            className={styles.input}
          />
        </div>

        <div className={styles.containerInput}>
          <label className={styles.label}>Tempo (HH:MM:SS)</label>
          <input
            type="text"
            inputMode="numeric"
            value={tempo}
            onKeyDown={handleKeyDown}
            onChange={handleTempoChange}
            placeholder="00:50:00"
            className={styles.input}
            maxLength={8}
          />
        </div>

        <button onClick={calcular} className={styles.botao}>
          Calcular
        </button>

        {tempo.length === 8 && pace && velocidade && (
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
