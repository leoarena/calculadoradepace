"use client";

import { useState, useRef } from "react";
import styles from "./page.module.css";
import {
  formatarSegundosParaPace,
  formatarSegundosParaTempo,
  limitarMinutoSegundo,
  paceParaSegundos,
  tempoInputParaSegundos,
} from "./utils/formatters";
import InputDistancia from "./components/InputDistancia";
import InputTempo from "./components/InputTempo";

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
          calcularPace();
          break;
        case "tempo":
          calcularTempo();
          break;
        default:
          calcularPace();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      limparCampos();
    }
  };

  const limparCampos = () => {
    setDistanciaInput("");
    setTempoInput("");
    setPaceInput("");
    setPaceResultado("");
    setTempoResultado("");
    setVelocidadeResultado("");
    ajustarFoco();
  };

  const formatarTempoInput = (valor: string): string => {
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

  const handleTempoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarTempoInput(e.target.value);
    setTempoInput(valorFormatado);
    setPaceResultado("");
    setVelocidadeResultado("");
    setTimeout(() => setDeletandoTempoInput(false), 10);
  };

  const handleDistanciaInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDistanciaInput(e.target.value);
    setPaceResultado("");
    setVelocidadeResultado("");
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

  const calcularTempo = () => {
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

  const calcularPace = () => {
    const km = parseFloat(distanciaInput);
    const totalSegundos = tempoInputParaSegundos(tempoInput);
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
  };

  return (
    <main
      className={styles.container}
      onKeyDown={handleGlobalKeyDown}
      tabIndex={0}
      ref={mainRef}
    >
      <div className={styles.card}>
        <h1 className={styles.titulo}>Calculadora de Pace</h1>

        <InputDistancia
          value={distanciaInput}
          onChange={handleDistanciaInputChange}
          inputRef={distanciaInputRef}
        />

        {calculo === "pace" ? (
          <InputTempo
            value={tempoInput}
            onChange={handleTempoInputChange}
            onKeyDown={handleKeyDown}
            inputRef={tempoInputRef}
          />
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
          onClick={calculo === "pace" ? calcularPace : calcularTempo}
          className={styles.botao}
        >
          Calcular
        </button>

        <button onClick={alternarModo} className={styles.linkAlternar}>
          {calculo === "pace"
            ? "Calcular a partir do pace"
            : "Calcular a partir do tempo"}
        </button>

        {calculo === "pace" &&
          tempoInput.length === 8 &&
          paceResultado &&
          velocidadeResultado && (
            <div className={styles.resultado}>
              <div className={styles.itemResultado}>
                <span className={styles.labelResultado}>Pace:</span>
                <span className={styles.valorResultado}>
                  {paceResultado || "—"}
                </span>
              </div>
              <div
                className={styles.itemResultado}
                style={{ borderBottom: "none" }}
              >
                <span className={styles.labelResultado}>Velocidade:</span>
                <span className={styles.valorResultado}>
                  {velocidadeResultado || "—"}
                </span>
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
              <span className={styles.valorResultado}>
                {velocidadeResultado || "—"}
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
