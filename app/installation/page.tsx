'use client';

import CopyButton from "../components/CopyButton";
import { useDocsVersion } from "../components/VersionContext";

export default function Installation() {
  const { version } = useDocsVersion();
  return version === 'v2' ? <InstallationV2 /> : <InstallationV1 />;
}

/* ══════════════════════════════════════════════════════════════════════════
   v2
   ══════════════════════════════════════════════════════════════════════════ */
function InstallationV2() {
  const npmCommand = 'npm install robot-toast';
  const basicSnippet = `import { toast } from 'robot-toast';

// Minimal — shows text only, no robot (v2 default is opt-in)
toast({
  message: 'Hello, World!',
  position: 'bottom-right',
});`;

  const withRobotSnippet = `import { toast } from 'robot-toast';
import { wave } from 'robot-toast/robots';  // tree-shakeable

toast({
  message: 'Hello, World!',
  position: 'bottom-right',
  robotVariant: wave,
});`;

  const promiseSnippet = `toast.promise(fetch('/api/save'), {
  loading: 'Saving…',
  success: 'Saved!',
  error:   'Save failed',
});`;

  const reactSnippet = `import { useRobotToast } from 'robot-toast/react';

function SaveButton() {
  const toast = useRobotToast();
  return <button onClick={() => toast.success('Saved!')}>Save</button>;
}`;

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Installation</h1>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wide">v2</span>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base">
        v2 is tree-shakeable by design, ships a React hook, and adds{' '}
        <code className="font-mono text-xs">toast.promise()</code>, swipe-to-dismiss,
        and ARIA roles. See the <a className="underline" href="https://github.com/Pratham2703005/robot-toast-package/blob/main/MIGRATION.md">migration guide</a> if you're coming from v1.
      </p>

      {/* Install */}
      <Section title="Install">
        <Code text={npmCommand} />
      </Section>

      {/* Minimal */}
      <Section
        title="Minimal"
        subtitle="By default, v2 shows no robot unless you explicitly ask for one. This keeps bundles small."
      >
        <CodeBlock text={basicSnippet} />
      </Section>

      {/* With a robot */}
      <Section
        title="With a built-in robot"
        subtitle="Import the robot you want as a data URL — only the ones you import end up in your bundle."
      >
        <CodeBlock text={withRobotSnippet} />
      </Section>

      {/* Promise helper */}
      <Section
        title="toast.promise()"
        subtitle="Attach a loading/success/error lifecycle to a promise."
      >
        <CodeBlock text={promiseSnippet} />
      </Section>

      {/* React */}
      <Section
        title="React hook (optional)"
        subtitle="A thin wrapper exposing toast as a stable-ref hook. React is an optional peer dep."
      >
        <CodeBlock text={reactSnippet} />
      </Section>

      {/* Variants */}
      <Section
        title="All 16 built-in variants"
        subtitle="Import the ones you need from `robot-toast/robots`."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs font-mono">
          {[
            'wave', 'base', 'base2', 'success', 'error',
            'angry', 'angry2', 'shock', 'think', 'search',
            'loading', 'sleep', 'headPalm', 'typing',
            'validation', 'validation2',
          ].map(n => (
            <div
              key={n}
              className="rounded border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2 py-1.5 text-gray-700 dark:text-gray-300"
            >
              {n}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
          Two were renamed from v1: <code>head-palm</code> → <code>headPalm</code>,{' '}
          <code>type</code> → <code>typing</code>.
        </p>
      </Section>

      {/* What changed vs v1 */}
      <Section
        title="What's new vs v1"
      >
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• <b>Bundle dropped 36%.</b> Core: 61 KB → 39 KB. Robots are lazy-imported.</li>
          <li>• <b>Opt-in robots.</b> Omitting <code>robotVariant</code> shows no robot now. Use <code>&quot;default&quot;</code> or import from <code>robot-toast/robots</code>.</li>
          <li>• <b>Mobile drag fixed.</b> <code>touch-action: none</code>, cached rects, swipe-to-dismiss.</li>
          <li>• <b>ARIA roles.</b> <code>role=&quot;alert&quot;</code> for errors/warnings; <code>role=&quot;status&quot;</code> otherwise.</li>
          <li>• <b>React subpath.</b> <code>useRobotToast()</code> + <code>useToastOnMount()</code>.</li>
          <li>• <b><code>toast.promise()</code></b> with callbacks for dynamic messages.</li>
        </ul>
      </Section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   v1 — kept for users still on the old API
   ══════════════════════════════════════════════════════════════════════════ */
function InstallationV1() {
  const npmCommand = 'npm install robot-toast@1';
  const importStatement = `import { toast } from 'robot-toast';`;
  const toastSnippet = `// Show a simple toast
toast({
  message: 'Hello, World!',
  position: 'bottom-right',
  robotVariant: 'wave'
});`;
  const completeToastSnippet = `// Success notification with all options
toast({
  message: 'Profile updated successfully!',
  position: 'bottom-right',
  type: 'success',
  theme: 'light',
  robotVariant: 'success',
  autoClose: 4000,
  draggable: true,
  pauseOnHover: true,
  hideProgressBar: false,
  transition: 'slide'
});`;

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Installation</h1>
        <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold uppercase tracking-wide">v1 (legacy)</span>
      </div>

      <div className="mb-8 rounded-md border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
        You&apos;re viewing the <b>v1.x</b> docs. New projects should pick v2 — smaller
        bundle, better mobile support, React hook. Switch versions in the header.
      </div>

      {/* NPM Installation */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">NPM Installation</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
          Install robot-toast v1 using npm:
        </p>
        <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 rounded-lg p-3 sm:p-5 overflow-x-auto">
          <pre className="font-mono text-xs sm:text-sm px-2 py-1 flex justify-between hover:bg-gray-800 rounded">
            {npmCommand}
            <CopyButton text={npmCommand} styling="bg-gray-900 text-xs py-0.5 px-1 rounded" />
          </pre>
        </div>
      </div>

      {/* Basic Usage */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Basic Usage</h2>
        <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 flex flex-col gap-3 rounded-lg p-4 sm:p-6 overflow-x-auto">
          <pre className="font-mono text-xs sm:text-sm px-2 py-1 flex justify-between items-center rounded hover:bg-gray-800">
            {importStatement}
            <CopyButton text={importStatement} styling="bg-gray-900 text-xs py-0.5 px-1 rounded" />
          </pre>
          <pre className="font-mono text-xs sm:text-sm px-2 py-1 flex justify-between items-start rounded hover:bg-gray-800 whitespace-pre">
            {toastSnippet}
            <CopyButton text={toastSnippet} styling="bg-gray-900 text-xs py-0.5 px-1 rounded" />
          </pre>
        </div>
      </div>

      {/* Robot Variants (v1 string names) */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Available Robot Variants</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
          Pass any of these as <code className="font-mono text-xs">robotVariant</code>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {[
            "'wave'", "'base'", "'base2'", "'success'", "'error'",
            "'angry'", "'angry2'", "'shock'", "'think'", "'search'",
            "'loading'", "'sleep'", "'head-palm'", "'type'",
            "'validation'", "'validation2'",
          ].map(v => (
            <div
              key={v}
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 flex items-center gap-2"
            >
              {v}
            </div>
          ))}
        </div>
      </div>

      {/* Complete Example */}
      <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 rounded-lg p-5 sm:p-8 mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Complete Example</h2>
        <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 flex flex-col gap-3 rounded-lg p-4 sm:p-6 overflow-x-auto mt-3 sm:mt-4">
          <pre className="font-mono text-xs sm:text-sm px-2 py-1 flex justify-between items-center rounded hover:bg-gray-800">
            {importStatement}
            <CopyButton text={importStatement} styling="bg-gray-900 text-xs py-0.5 px-1 rounded" />
          </pre>
          <pre className="font-mono text-xs sm:text-sm px-2 py-1 flex justify-between items-start rounded hover:bg-gray-800 whitespace-pre">
            {completeToastSnippet}
            <CopyButton text={completeToastSnippet} styling="bg-gray-900 text-xs py-0.5 px-1 rounded" />
          </pre>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Small helpers used by v2 only
   ══════════════════════════════════════════════════════════════════════════ */
function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm sm:text-base">{subtitle}</p>}
      {children}
    </section>
  );
}

function Code({ text }: { text: string }) {
  return (
    <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 rounded-lg p-3 sm:p-5 overflow-x-auto">
      <pre className="font-mono text-xs sm:text-sm px-2 py-1 flex justify-between items-center hover:bg-gray-800 rounded">
        {text}
        <CopyButton text={text} styling="bg-gray-900 text-xs py-0.5 px-1 rounded" />
      </pre>
    </div>
  );
}

function CodeBlock({ text }: { text: string }) {
  return (
    <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 rounded-lg p-4 sm:p-6 overflow-x-auto">
      <pre className="font-mono text-xs sm:text-sm px-2 py-1 flex justify-between items-start rounded hover:bg-gray-800 whitespace-pre">
        {text}
        <CopyButton text={text} styling="bg-gray-900 text-xs py-0.5 px-1 rounded shrink-0 ml-2" />
      </pre>
    </div>
  );
}
