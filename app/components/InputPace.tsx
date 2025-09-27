import styles from "../page.module.css";

interface InputPaceProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function InputPace({
  value,
  onChange,
  inputRef,
}: InputPaceProps) {
  return (
    <div className={styles.containerInput}>
      <label className={styles.label}>Pace (MM:SS min/km)</label>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={onChange}
        placeholder="05:00"
        className={styles.input}
        ref={inputRef}
      />
    </div>
  );
}
