import styles from "../page.module.css";

interface InputTempoProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function InputTempo({
  value,
  onChange,
  inputRef,
}: InputTempoProps) {
  return (
    <div className={styles.containerInput}>
      <label className={styles.label}>Tempo (HH:MM:SS)</label>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={onChange}
        placeholder="00:50:00"
        className={styles.input}
        ref={inputRef}
      />
    </div>
  );
}
