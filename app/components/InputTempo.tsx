import styles from "../page.module.css";

interface InputTempoProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function InputTempo({
  value,
  onChange,
  onKeyDown,
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
        onKeyDown={onKeyDown}
        placeholder="00:50:00"
        className={styles.input}
        maxLength={8}
        ref={inputRef}
      />
    </div>
  );
}
