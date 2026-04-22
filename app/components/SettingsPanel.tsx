'use client';

import { Accordion, AccordionItem } from './Accordion';
import { Field, TextInput, NumberInput, Select, Toggle } from './Field';
import { RobotPicker } from './RobotPicker';
import { useDocsVersion } from './VersionContext';
import { POSITIONS, TYPES, THEMES, TRANSITIONS } from '@/constants';
import type { PlaygroundState, ToastPosition, ToastType, ToastTheme, RobotVariant } from '@/types';

interface Props {
  state:  PlaygroundState;
  set:    <K extends keyof PlaygroundState>(key: K, value: PlaygroundState[K]) => void;
}

export function SettingsPanel({ state, set }: Props) {
  const { version } = useDocsVersion();
  return (
    <Accordion>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <AccordionItem label="Content" defaultOpen>
        <Field label="Message">
          <TextInput
            value={state.message}
            onChange={e => set('message', e.target.value)}
            placeholder="Enter your message…"
          />
        </Field>
      </AccordionItem>

      {/* ── Appearance ───────────────────────────────────────────────────── */}
      <AccordionItem label="Appearance" defaultOpen>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Type">
            <Select
              value={state.type}
              options={TYPES}
              onChange={e => set('type', e.target.value as ToastType)}
            />
          </Field>
          <Field label="Theme">
            <Select
              value={state.theme}
              options={THEMES}
              onChange={e => set('theme', e.target.value as ToastTheme)}
            />
          </Field>
        </div>

        <RobotPicker
          value={state.robotVariant}
          onChange={v => set('robotVariant', v as RobotVariant)}
        />

        <Field label="Transition">
          <Select
            value={state.transition}
            options={TRANSITIONS}
            onChange={e => set('transition', e.target.value)}
          />
        </Field>

        <Field label="Custom Inline Style" hint="e.g. color: red; background: blue;">
          <textarea
            value={state.customStyle ?? ''}
            onChange={e => set('customStyle', e.target.value)}
            placeholder="color: red; background: gray; font-weight: bold;"
            className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            rows={3}
          />
        </Field>
      </AccordionItem>

      {/* ── Buttons ──────────────────────────────────────────────────────── */}
      {/*
        `buttons` is an ordered array, not separate primary/secondary slots.
        The caller controls visual hierarchy: arrange them however they want
        and optionally pass a `className` on any button to override the
        neutral default style (e.g. mark one as the filled CTA).
      */}
      <AccordionItem label="Buttons">
        {version === 'v1' && (
          <p className="mb-3 text-[12px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md px-3 py-2">
            Inline buttons are a <b>v2 feature</b>. The runtime here uses v2 so
            you can preview them, but the generated v1 snippet will omit them.
          </p>
        )}

        <div className="space-y-3">
          {state.buttons.length === 0 && (
            <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
              No buttons. Add one below — they&apos;ll render inside the toast in array order.
            </p>
          )}

          {state.buttons.map((btn, i) => (
            <div
              key={i}
              className="rounded-md border border-zinc-200 dark:border-zinc-800 p-3 space-y-2 bg-zinc-50/40 dark:bg-zinc-900/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  buttons[{i}]
                </span>
                <button
                  type="button"
                  onClick={() => set('buttons', state.buttons.filter((_, j) => j !== i))}
                  className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  aria-label={`Remove button ${i + 1}`}
                >
                  Remove
                </button>
              </div>
              <Field label="Label" hint="Text shown on the button (e.g. Undo, Send, Cancel)">
                <TextInput
                  value={btn.label}
                  onChange={e => set('buttons',
                    state.buttons.map((b, j) => j === i ? { ...b, label: e.target.value } : b),
                  )}
                  placeholder="Undo"
                />
              </Field>
              <Field label="className (optional)" hint="Extra class to customize this button's style">
                <TextInput
                  value={btn.className}
                  onChange={e => set('buttons',
                    state.buttons.map((b, j) => j === i ? { ...b, className: e.target.value } : b),
                  )}
                  placeholder="my-primary"
                />
              </Field>
            </div>
          ))}

          <button
            type="button"
            onClick={() => set('buttons', [...state.buttons, { label: '', className: '' }])}
            className="w-full rounded-md border border-dashed border-zinc-300 dark:border-zinc-700 py-2 text-[12px] font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            + Add button
          </button>

          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1">
            Clicking any button fires its <code className="font-mono">onClick</code> and closes the toast.
            In the playground, each fires a follow-up toast so you can see the click register.
          </p>
        </div>
      </AccordionItem>

      {/* ── Position ─────────────────────────────────────────────────────── */}
      <AccordionItem label="Position">
        <Field label="Screen Position">
          <Select
            value={state.position}
            options={POSITIONS}
            onChange={e => set('position', e.target.value as ToastPosition)}
          />
        </Field>
      </AccordionItem>

      {/* ── Timing ───────────────────────────────────────────────────────── */}
      <AccordionItem label="Timing">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Auto Close (ms)" hint="0 = stays open">
            <NumberInput
              value={state.autoClose}
              onChange={e => set('autoClose', e.target.value)}
              min="0" max="60000" step="500"
            />
          </Field>
          <Field label="Typing Speed (ms)" hint="0 = instant">
            <NumberInput
              value={state.typeSpeed}
              onChange={e => set('typeSpeed', e.target.value)}
              min="0" max="1000" step="10"
            />
          </Field>
        </div>
        <Field label="Toast Limit" hint="0 = unlimited">
          <NumberInput
            value={state.limit}
            onChange={e => set('limit', e.target.value)}
            min="0" max="10" step="1"
          />
        </Field>
      </AccordionItem>

      {/* ── Progress ─────────────────────────────────────────────────────── */}
      <AccordionItem label="Progress Bar">
        <Toggle
          checked={state.hideProgressBar}
          onChange={v => set('hideProgressBar', v)}
          label="Hide progress bar"
        />
      </AccordionItem>

      {/* ── Behaviour ────────────────────────────────────────────────────── */}
      <AccordionItem label="Behaviour">
        <div className="space-y-3">
          <Toggle
            checked={state.draggable}
            onChange={v => set('draggable', v)}
            label="Draggable"
          />
          <Toggle
            checked={state.nearScreen}
            onChange={v => set('nearScreen', v)}
            label="Robot near edge (on) vs away from edge (off)"
          />
          <Toggle
            checked={state.pauseOnHover}
            onChange={v => set('pauseOnHover', v)}
            label="Pause on hover"
          />
          <Toggle
            checked={state.pauseOnFocusLoss}
            onChange={v => set('pauseOnFocusLoss', v)}
            label="Pause when window loses focus"
          />
          <Toggle
            checked={state.rtl}
            onChange={v => set('rtl', v)}
            label="Right-to-left layout"
          />
          <Toggle
            checked={state.newestOnTop}
            onChange={v => set('newestOnTop', v)}
            label="Stack newest toasts on top"
          />
        </div>
      </AccordionItem>

    </Accordion>
  );
}