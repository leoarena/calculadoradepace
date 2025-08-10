import styles from "../page.module.css";

interface ResultadoCalculoProps {
  titulo: string;
  valor: string;
  velocidade: string;
}

export default function Resultado({
  titulo,
  valor,
  velocidade,
}: ResultadoCalculoProps) {
  return (
    <div className={styles.resultado}>
      <div className={styles.itemResultado}>
        <span className={styles.labelResultado}>{titulo}:</span>
        <span className={styles.valorResultado}>{valor || "—"}</span>
      </div>
      <div className={styles.itemResultado} style={{ borderBottom: "none" }}>
        <span className={styles.labelResultado}>Velocidade:</span>
        <span className={styles.valorResultado}>{velocidade || "—"}</span>
      </div>
    </div>
  );
}
