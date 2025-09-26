"use client";

import styles from "./page.module.css";
import InputDistancia from "./components/InputDistancia";
import InputTempo from "./components/InputTempo";
import InputPace from "./components/InputPace";
import { usePaceCalculator } from "./hooks/usePaceCalculator";
import Resultado from "./components/Resultado";

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
    handlePaceInputKeyDown,
    paceInputRef,
    calcularPace,
    calcularTempo,
    alternarModo,
    paceResultado,
    velocidadeResultado,
    tempoResultado,
    mensagemErro,
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
            onKeyDown={handlePaceInputKeyDown}
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

        {paceResultado && velocidadeResultado && (
          <Resultado
            titulo="Pace"
            valor={paceResultado}
            velocidade={velocidadeResultado}
          />
        )}

        {tempoResultado && velocidadeResultado && (
          <Resultado
            titulo="Tempo"
            valor={tempoResultado}
            velocidade={velocidadeResultado}
          />
        )}

        {mensagemErro && (
          <div className={styles.mensagemErro}>{mensagemErro}</div>
        )}
      </div>
    </main>
  );
}
