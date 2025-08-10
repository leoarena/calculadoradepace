"use client";

import styles from "./page.module.css";
import InputDistancia from "./components/InputDistancia";
import InputTempo from "./components/InputTempo";
import InputPace from "./components/InputPace";
import { usePaceCalculator } from "./hooks/usePaceCalculator";

export default function Home() {
  const {
    handleGlobalKeyDown,
    mainRef,
    distanciaInput,
    handleDistanciaInputChange,
    distanciaInputRef,
    calculo,
    tempoInput,
    handleTempoInputChange,
    handleKeyDown,
    tempoInputRef,
    paceInput,
    handlePaceInputChange,
    paceInputRef,
    calcularPace,
    calcularTempo,
    alternarModo,
    paceResultado,
    velocidadeResultado,
    tempoResultado,
  } = usePaceCalculator();

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
          <InputPace
            value={paceInput}
            onChange={handlePaceInputChange}
            inputRef={paceInputRef}
          />
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
