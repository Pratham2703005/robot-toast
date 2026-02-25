'use client';

import { Accordion, AccordionItem } from './Accordion';
import { Field, TextInput, NumberInput, Select, Toggle } from './Field';
import { RobotPicker } from './RobotPicker';
import { POSITIONS, TYPES, THEMES, TRANSITIONS } from '@/constants';
import type { PlaygroundState, ToastPosition, ToastType, ToastTheme, RobotVariant } from '@/types';

interface Props {
  state:  PlaygroundState;
  set:    <K extends keyof PlaygroundState>(key: K, value: PlaygroundState[K]) => void;
}

export function SettingsPanel({ state, set }: Props) {
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