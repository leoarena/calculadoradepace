import { useEffect, useRef, useState } from "react";
import {
  formatarSegundosParaPace,
  formatarSegundosParaTempo,
  limitarMinutoSegundo,
  paceParaSegundos,
  tempoParaSegundos,
} from "../utils/formatters";

export const usePaceCalculator = () => {
  const [calculo, setCalculo] = useState<"pace" | "tempo">("pace");
  const [distanciaInput, setDistanciaInput] = useState("");
  const [tempoInput, setTempoInput] = useState("");
  const [paceInput, setPaceInput] = useState("");
  const [paceResultado, setPaceResultado] = useState("");
  const [tempoResultado, setTempoResultado] = useState("");
  const [velocidadeResultado, setVelocidadeResultado] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [linkEscondido, setLinkEscondido] = useState(false);

  const distanciaInputRef = useRef<HTMLInputElement>(null);
  const tempoInputRef = useRef<HTMLInputElement>(null);
  const paceInputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const verificarSobreposicao = () => {
      if (cardRef.current && linkRef.current) {
        const rect1 = cardRef.current.getBoundingClientRect();
        const rect2 = linkRef.current.getBoundingClientRect();

        const estaSobreposto = !(
          rect1.right < rect2.left ||
          rect1.left > rect2.right ||
          rect1.bottom < rect2.top ||
          rect1.top > rect2.bottom
        );

        setLinkEscondido(estaSobreposto);
      }
    };

    verificarSobreposicao();
    window.addEventListener("resize", verificarSobreposicao);

    return () => window.removeEventListener("resize", verificarSobreposicao);
  }, [paceResultado, tempoResultado, velocidadeResultado]);

  const formatarTempoInput = (valor: string): string => {
    const valorSanitizado = valor.replace(/\D/g, "").slice(-6).padStart(6, "0");
    const horas = valorSanitizado.slice(0, 2);
    const minutos = limitarMinutoSegundo(valorSanitizado.slice(2, 4));
    const segundos = limitarMinutoSegundo(valorSanitizado.slice(4));
    return `${horas}:${minutos}:${segundos}`;
  };

  const formatarPaceInput = (valor: string): string => {
    const valorSanitizado = valor.replace(/\D/g, "").slice(-4).padStart(4, "0");
    const minutos = limitarMinutoSegundo(valorSanitizado.slice(0, 2));
    const segundos = limitarMinutoSegundo(valorSanitizado.slice(2));
    return `${minutos}:${segundos}`;
  };

  const limparResultados = () => {
    setPaceResultado("");
    setTempoResultado("");
    setVelocidadeResultado("");
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
    limparResultados();
    setMensagemErro("");
    ajustarFoco();
  };

  const alternarModo = () => {
    setCalculo(calculo === "pace" ? "tempo" : "pace");
    limparCampos();
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

  const handleDistanciaInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDistanciaInput(e.target.value);
    limparResultados();
    setMensagemErro("");
  };

  const handleTempoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarTempoInput(e.target.value);
    setTempoInput(valorFormatado);
    limparResultados();
    setMensagemErro("");
  };

  const handlePaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarPaceInput(e.target.value);
    setPaceInput(valorFormatado);
    limparResultados();
    setMensagemErro("");
  };

  const calcularPace = () => {
    const km = parseFloat(distanciaInput);
    const totalSegundos = tempoParaSegundos(tempoInput);

    if (!km) {
      setMensagemErro("Preencha a distância");
      return;
    }

    if (tempoInput.length !== 8 || isNaN(totalSegundos) || !totalSegundos) {
      setMensagemErro("Preencha o tempo");
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

    if (!km) {
      setMensagemErro("Preencha a distância");
      return;
    }

    if (paceInput.length !== 5 || isNaN(paceEmSegundos) || !paceEmSegundos) {
      setMensagemErro("Preencha o pace");
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
    handleGlobalKeyDown,
    handleTempoInputChange,
    handleDistanciaInputChange,
    handlePaceInputChange,
    cardRef,
    linkRef,
    linkEscondido,
  };
};
