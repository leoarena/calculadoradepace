import styles from "../page.module.css";

interface InputDistanciaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function InputDistancia({
  value,
  onChange,
  inputRef,
}: InputDistanciaProps) {
  return (
    <div className={styles.containerInput}>
      <label className={styles.label}>Distância (km)</label>
      <input
        type="number"
        inputMode="decimal"
        step="0.01"
        value={value}
        onChange={onChange}
        placeholder="10"
        className={styles.input}
        ref={inputRef}
      />
    </div>
  );
}
