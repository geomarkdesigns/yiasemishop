"use client";
export function Stepper({ value, onChange, min = 1, max = 10, small, label }: { value: number; onChange: (n: number) => void; min?: number; max?: number; small?: boolean; label: string }) {
  return (
    <div className={`stepper${small ? " sm" : ""}`} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="−1">−</button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="+1">+</button>
    </div>
  );
}
