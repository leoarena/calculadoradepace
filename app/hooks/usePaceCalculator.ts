import { useRef, useState } from "react";
import {
  formatarSegundosParaPace,
  formatarSegundosParaTempo,
  limitarMinutoSegundo,
  paceParaSegundos,
  tempoInputParaSegundos,
} from "../utils/formatters";

export const usePaceCalculator = () => {
  const [calculo, setCalculo] = useState<"pace" | "tempo">("pace");
  const [distanciaInput, setDistanciaInput] = useState("");
  const [tempoInput, setTempoInput] = useState("");
  const [deletandoTempoInput, setDeletandoTempoInput] = useState(false);
  const [paceInput, setPaceInput] = useState("");
  const [deletandoPaceInput, setDeletandoPaceInput] = useState(false);
  const [paceResultado, setPaceResultado] = useState("");
  const [tempoResultado, setTempoResultado] = useState("");
  const [velocidadeResultado, setVelocidadeResultado] = useState("");

  const distanciaInputRef = useRef<HTMLInputElement>(null);
  const tempoInputRef = useRef<HTMLInputElement>(null);
  const paceInputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);

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

  const formatarPaceInput = (valor: string): string => {
    const valorSanitizado = valor.replace(/\D/g, "").slice(0, 4);

    if (paceInput.length === 3 && deletandoPaceInput) {
      return paceInput.slice(0, -2);
    } else if (valorSanitizado.length < 2) {
      return valorSanitizado;
    } else {
      const minutos = limitarMinutoSegundo(valorSanitizado.slice(0, 2));
      const segundos = limitarMinutoSegundo(valorSanitizado.slice(2));
      return `${minutos}:${segundos}`;
    }
  };

  const ajustarFoco = () => {
    distanciaInputRef.current?.blur();
    tempoInputRef.current?.blur();
    paceInputRef.current?.blur();
    mainRef.current?.focus();
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

  const alternarModo = () => {
    setCalculo(calculo === "pace" ? "tempo" : "pace");
    limparCampos();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") setDeletandoTempoInput(true);
    else setDeletandoTempoInput(false);
  };

  const handlePaceInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") setDeletandoPaceInput(true);
    else setDeletandoPaceInput(false);
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

  const handlePaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarPaceInput(e.target.value);
    setPaceInput(valorFormatado);
    setTempoResultado("");
    setVelocidadeResultado("");
    setTimeout(() => setDeletandoPaceInput(false), 10);
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

  return {
    calculo,
    distanciaInput,
    tempoInput,
    deletandoTempoInput,
    paceInput,
    paceResultado,
    tempoResultado,
    velocidadeResultado,
    distanciaInputRef,
    tempoInputRef,
    paceInputRef,
    mainRef,
    calcularPace,
    calcularTempo,
    limparCampos,
    alternarModo,
    handleKeyDown,
    handlePaceInputKeyDown,
    handleGlobalKeyDown,
    handleTempoInputChange,
    handleDistanciaInputChange,
    handlePaceInputChange,
  };
};
