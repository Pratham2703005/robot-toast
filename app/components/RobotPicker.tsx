'use client';

import { useState } from 'react';
import { ROBOT_OPTIONS } from '@/constants';
import { Field } from './Field';

interface RobotPickerProps {
  value:    string;
  onChange: (v: string) => void;
}

export function RobotPicker({ value, onChange }: RobotPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selected = ROBOT_OPTIONS.find(o => o.value === value) || ROBOT_OPTIONS[0];

  return (
    <div className="space-y-2">
      <Field label="Robot Variant">
        <div className="relative">
          {/* Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 flex items-center justify-between hover:border-zinc-400 dark:hover:border-zinc-600"
          >
            <span className="flex-1 text-left">
              {selected.name}
              {selected.path && <span className="text-zinc-500 dark:text-zinc-400 ml-2">{selected.path}</span>}
            </span>
            <svg
              className={`w-4 h-4 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-50 max-h-56 overflow-y-auto">
              {ROBOT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-sm text-left flex items-center justify-between transition-colors ${
                    opt.value === value
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span>
                    {opt.name}
                    {opt.path && <span className={`ml-2 ${opt.value === value ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>{opt.path}</span>}
                  </span>
                  {opt.value === value && (
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </Field>
    </div>
  );
}