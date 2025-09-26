const limitarMinutoSegundo = (valor: string): string => {
  if (parseInt(valor) > 59) return "59";
  else return valor;
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

const formatarSegundosParaTempo = (totalSegundos: number): string => {
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = Math.round(totalSegundos % 60);
  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
};

const paceParaSegundos = (pace: string): number => {
  const [minutos, segundos] = pace.split(":").map(Number);
  const totalSegundos = minutos * 60 + segundos;
  return totalSegundos;
};

export {
  limitarMinutoSegundo,
  tempoParaSegundos,
  formatarSegundosParaPace,
  formatarSegundosParaTempo,
  paceParaSegundos,
};
