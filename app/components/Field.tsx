import React from 'react';

// ── Shared input classes ───────────────────────────────────────────────────────
const BASE =
  'w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 ' +
  'px-3 py-2 text-[13px] text-zinc-900 dark:text-zinc-100 outline-none ' +
  'focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors duration-150 ' +
  'placeholder:text-zinc-400';

// ── Field wrapper ─────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, hint, children, className = '' }: FieldProps) {
  return (
    <div className={className}>
      <label className="block text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">{hint}</p>
      )}
    </div>
  );
}

// ── Text input ────────────────────────────────────────────────────────────────
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({ className = '', ...props }: TextInputProps) {
  return <input className={`${BASE} ${className}`} {...props} />;
}

// ── Number input ──────────────────────────────────────────────────────────────
export function NumberInput({ className = '', ...props }: TextInputProps) {
  return <input type="number" className={`${BASE} ${className}`} {...props} />;
}

// ── Select ────────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
}

export function Select({ options, className = '', ...props }: SelectProps) {
  return (
    <select className={`${BASE} ${className}`} {...props}>
      {options.map(o => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

// ── Toggle (checkbox row) ─────────────────────────────────────────────────────
interface ToggleProps {
  checked:  boolean;
  onChange: (v: boolean) => void;
  label:    string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none group">
      {/* Custom pill toggle */}
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-200 dark:bg-zinc-700'
        }`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`inline-block h-4 w-4 translate-y-0.5 rounded-full bg-white dark:bg-zinc-900 shadow transition-transform duration-200 ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </span>
      <span className="text-[13px] text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
        {label}
      </span>
    </label>
  );
}

// ── Segmented control ─────────────────────────────────────────────────────────
interface SegmentedProps<T extends string> {
  value:    T;
  options:  readonly T[];
  onChange: (v: T) => void;
}

export function Segmented<T extends string>({ value, options, onChange }: SegmentedProps<T>) {
  return (
    <div className="flex gap-1 p-1 rounded-md bg-zinc-100 dark:bg-zinc-800">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 rounded py-1.5 text-[12px] font-medium transition-all duration-150 ${
            value === opt
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}