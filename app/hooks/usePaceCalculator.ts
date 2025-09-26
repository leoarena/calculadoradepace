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
  const [mensagemErro, setMensagemErro] = useState("");

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
    setMensagemErro("");
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
    setMensagemErro("");
    setTimeout(() => setDeletandoTempoInput(false), 10);
  };

  const handleDistanciaInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDistanciaInput(e.target.value);
    setPaceResultado("");
    setVelocidadeResultado("");
    setMensagemErro("");
  };

  const handlePaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarPaceInput(e.target.value);
    setPaceInput(valorFormatado);
    setTempoResultado("");
    setVelocidadeResultado("");
    setMensagemErro("");
    setTimeout(() => setDeletandoPaceInput(false), 10);
  };

  const calcularPace = () => {
    const km = parseFloat(distanciaInput);
    const totalSegundos = tempoInputParaSegundos(tempoInput);

    if (!km) {
      setMensagemErro("Preencha a distância");
      return;
    }

    if (tempoInput.length !== 8 || isNaN(totalSegundos) || !totalSegundos) {
      setMensagemErro("Preencha o tempo completo (HH:MM:SS)");
      return;
    }

    const paceEmSegundos = totalSegundos / km;
    const pace = formatarSegundosParaPace(paceEmSegundos);
    const totalHoras = totalSegundos / 3600;
    const velocidadeEmKmh = (km / totalHoras).toFixed(2);
    setPaceResultado(pace);
    setVelocidadeResultado(`${velocidadeEmKmh} km/h`);
    setMensagemErro("");
    ajustarFoco();
  };

  const calcularTempo = () => {
    const km = parseFloat(distanciaInput);
    const paceEmSegundos = paceParaSegundos(paceInput);

    if (!distanciaInput || !km) {
      setMensagemErro("Preencha a distância");
      return;
    }

    if (paceInput.length !== 5 || isNaN(paceEmSegundos) || !paceEmSegundos) {
      setMensagemErro("Preencha o pace completo (MM:SS)");
      return;
    }

    const totalSegundos = paceEmSegundos * km;
    const tempo = formatarSegundosParaTempo(totalSegundos);
    const totalHoras = totalSegundos / 3600;
    const velocidadeEmKmh = (km / totalHoras).toFixed(2);
    setTempoResultado(tempo);
    setVelocidadeResultado(`${velocidadeEmKmh} km/h`);
    setMensagemErro("");
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
    mensagemErro,
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
