"use client";

import { useState, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [calculo, setCalculo] = useState<"pace" | "tempo">("pace");
  const [distanciaInput, setDistanciaInput] = useState("");
  const [tempoInput, setTempoInput] = useState("");
  const [deletandoTempoInput, setDeletandoTempoInput] = useState(false);
  const [paceInput, setPaceInput] = useState("");
  const [paceResultado, setPaceResultado] = useState("");
  const [tempoResultado, setTempoResultado] = useState("");
  const [velocidadeResultado, setVelocidadeResultado] = useState("");

  const distanciaInputRef = useRef<HTMLInputElement>(null);
  const tempoInputRef = useRef<HTMLInputElement>(null);
  const paceInputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") setDeletandoTempoInput(true);
    else setDeletandoTempoInput(false);
  };

  const handleGlobalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      switch (calculo) {
        case "pace":
          calcular();
          break;
        case "tempo":
          calcularAPartirDoPace();
          break;
        default:
          calcular();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      limparCampos();
    }
  };

  const limparCampos = () => {
    setTempoInput("");
    setDistanciaInput("");
    setPaceResultado("");
    setVelocidadeResultado("");
    setPaceInput("");
    setTempoResultado("");
    ajustarFoco();
  };

  const limitarMinutoSegundo = (valor: string): string => {
    if (parseInt(valor) > 59) return "59";
    else return valor;
  };

  const formatarTempo = (valor: string): string => {
    const valorSanitizado = valor.replace(/\D/g, "").slice(0, 6);

    if ([3, 6].includes(tempoInput.length) && deletandoTempoInput) {
      return tempoInput.slice(0, -2);
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
    setTempoInput(valorFormatado);
    setPaceResultado("");
    setVelocidadeResultado("");
    setTimeout(() => setDeletandoTempoInput(false), 10);
  };

  const handleDistanciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistanciaInput(e.target.value);
    setPaceResultado("");
    setVelocidadeResultado("");
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

  const ajustarFoco = () => {
    distanciaInputRef.current?.blur();
    tempoInputRef.current?.blur();
    paceInputRef.current?.blur();
    mainRef.current?.focus();
  };

  const alternarModo = () => {
    setCalculo(calculo === "pace" ? "tempo" : "pace");
    limparCampos();
  };

  const handlePaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaceInput(e.target.value);
    setTempoResultado("");
    setVelocidadeResultado("");
  };

  const formatarSegundosParaTempo = (totalSegundos: number): string => {
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = Math.round(totalSegundos % 60);
    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  };

  const paceParaSegundos = (pace: string): number => {
    const match = pace.match(/(\d+):(\d+)/);
    if (!match) return 0;
    const minutos = parseInt(match[1]);
    const segundos = parseInt(match[2]);
    return minutos * 60 + segundos;
  };

  const calcularAPartirDoPace = () => {
    const km = parseFloat(distanciaInput);
    const paceSegundos = paceParaSegundos(paceInput);
    if (!km || km === 0 || !paceSegundos || paceSegundos === 0) {
      setTempoResultado("");
      setVelocidadeResultado("");
      return;
    }
    const totalSegundos = paceSegundos * km;
    const velocidadeEmKmh = (km / (totalSegundos / 3600)).toFixed(2);
    setTempoResultado(formatarSegundosParaTempo(totalSegundos));
    setVelocidadeResultado(`${velocidadeEmKmh} km/h`);
    ajustarFoco();
  };

  function calcular() {
    const totalSegundos = tempoParaSegundos(tempoInput);
    const km = parseFloat(distanciaInput);
    if (!km || km === 0 || isNaN(totalSegundos) || totalSegundos === 0) {
      setPaceResultado("");
      setVelocidadeResultado("");
      return;
    }
    const paceEmSegundos = totalSegundos / km;
    const velocidadeEmKmh = (km / (totalSegundos / 3600)).toFixed(2);
    setPaceResultado(formatarSegundosParaPace(paceEmSegundos));
    setVelocidadeResultado(`${velocidadeEmKmh} km/h`);
    ajustarFoco();
  }

  return (
    <main
      className={styles.container}
      onKeyDown={handleGlobalKeyDown}
      tabIndex={0}
      ref={mainRef}
    >
      <div className={styles.card}>
        <h1 className={styles.titulo}>Calculadora de Pace</h1>

        <div className={styles.containerInput}>
          <label className={styles.label}>Distância (km)</label>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            value={distanciaInput}
            onChange={handleDistanciaChange}
            placeholder="10"
            className={styles.input}
            ref={distanciaInputRef}
          />
        </div>

        {calculo === "pace" ? (
          <div className={styles.containerInput}>
            <label className={styles.label}>Tempo (HH:MM:SS)</label>
            <input
              type="text"
              inputMode="numeric"
              value={tempoInput}
              onKeyDown={handleKeyDown}
              onChange={handleTempoChange}
              placeholder="00:50:00"
              className={styles.input}
              maxLength={8}
              ref={tempoInputRef}
            />
          </div>
        ) : (
          <div className={styles.containerInput}>
            <label className={styles.label}>Pace (MM:SS min/km)</label>
            <input
              type="text"
              inputMode="numeric"
              value={paceInput}
              onChange={handlePaceInputChange}
              placeholder="5:00"
              className={styles.input}
              maxLength={5}
              ref={paceInputRef}
            />
          </div>
        )}

        <button
          onClick={calculo === "pace" ? calcular : calcularAPartirDoPace}
          className={styles.botao}
        >
          Calcular
        </button>

        <button onClick={alternarModo} className={styles.linkAlternar}>
          {calculo === "pace"
            ? "Calcular a partir do pace"
            : "Calcular a partir do tempo"}
        </button>

        {calculo === "pace" && tempoInput.length === 8 && paceResultado && velocidadeResultado && (
          <div className={styles.resultado}>
            <div className={styles.itemResultado}>
              <span className={styles.labelResultado}>Pace:</span>
              <span className={styles.valorResultado}>{paceResultado || "—"}</span>
            </div>
            <div
              className={styles.itemResultado}
              style={{ borderBottom: "none" }}
            >
              <span className={styles.labelResultado}>Velocidade:</span>
              <span className={styles.valorResultado}>{velocidadeResultado || "—"}</span>
            </div>
          </div>
        )}

        {calculo === "tempo" && tempoResultado && velocidadeResultado && (
          <div className={styles.resultado}>
            <div className={styles.itemResultado}>
              <span className={styles.labelResultado}>Tempo:</span>
              <span className={styles.valorResultado}>
                {tempoResultado || "—"}
              </span>
            </div>
            <div
              className={styles.itemResultado}
              style={{ borderBottom: "none" }}
            >
              <span className={styles.labelResultado}>Velocidade:</span>
              <span className={styles.valorResultado}>{velocidadeResultado || "—"}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
