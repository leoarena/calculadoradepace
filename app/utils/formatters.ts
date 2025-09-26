const limitarMinutoSegundo = (valor: string): string => {
  if (parseInt(valor) > 59) return "59";
  else return valor;
};

const tempoParaSegundos = (tempo: string): number => {
  const [horas, minutos, segundos] = tempo.split(":").map(Number);
  const totalSegundos = horas * 3600 + minutos * 60 + segundos;
  return totalSegundos;
};

const paceParaSegundos = (pace: string): number => {
  const [minutos, segundos] = pace.split(":").map(Number);
  const totalSegundos = minutos * 60 + segundos;
  return totalSegundos;
};

const formatarSegundosParaPace = (paceEmSegundos: number): string => {
  const minutos = Math.floor(paceEmSegundos / 60);
  const segundos = Math.round(paceEmSegundos % 60)
    .toString()
    .padStart(2, "0");
  return `${minutos}:${segundos} min/km`;
};

const formatarSegundosParaTempo = (totalSegundos: number): string => {
  const horas = Math.floor(totalSegundos / 3600)
    .toString()
    .padStart(2, "0");
  const minutos = Math.floor((totalSegundos % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const segundos = Math.round(totalSegundos % 60)
    .toString()
    .padStart(2, "0");
  return `${horas}:${minutos}:${segundos}`;
};

export {
  limitarMinutoSegundo,
  tempoParaSegundos,
  paceParaSegundos,
  formatarSegundosParaPace,
  formatarSegundosParaTempo,
};
