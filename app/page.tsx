import CopyButton from "./components/CopyButton";
import TryToastButton from "./components/TryToastButton";
import { wave as base } from "./assets/wave";
import { success } from "./assets/success";

const PACKAGE = "robot-toast";
const FALLBACK = { version: "2.1.9", size: "10 KB", downloads: "—" };

function formatBytes(bytes: number): string {
  if (!bytes || !Number.isFinite(bytes)) return FALLBACK.size;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatNumber(n: number): string {
  if (!n || !Number.isFinite(n)) return FALLBACK.downloads;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(3)}m`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(3)}k`;
  return String(n);
}

async function getNpmStats() {
  // Revalidate every 6h — npm stats don't move that fast and we don't want
  // to hammer bundlephobia from the SSR path.
  const opts = { next: { revalidate: 21600 } } as const;

  const today = new Date();
  const past = new Date(today);
  past.setMonth(past.getMonth() - 18);
  const range = `${past.toISOString().slice(0, 10)}:${today.toISOString().slice(0, 10)}`;

  const [pkgRes, sizeRes, dlRes] = await Promise.allSettled([
    fetch(`https://registry.npmjs.org/${PACKAGE}/latest`, opts).then((r) =>
      r.ok ? r.json() : Promise.reject(r.statusText)
    ),
    fetch(`https://bundlephobia.com/api/size?package=${PACKAGE}`, opts).then((r) =>
      r.ok ? r.json() : Promise.reject(r.statusText)
    ),
    fetch(`https://api.npmjs.org/downloads/range/${range}/${PACKAGE}`, opts).then((r) =>
      r.ok ? r.json() : Promise.reject(r.statusText)
    ),
  ]);

  const version =
    pkgRes.status === "fulfilled" && typeof pkgRes.value.version === "string"
      ? pkgRes.value.version
      : FALLBACK.version;

  const size =
    sizeRes.status === "fulfilled" && typeof sizeRes.value.gzip === "number"
      ? formatBytes(sizeRes.value.gzip)
      : FALLBACK.size;

  let downloads = FALLBACK.downloads;
  if (dlRes.status === "fulfilled" && Array.isArray(dlRes.value.downloads)) {
    const total = dlRes.value.downloads.reduce(
      (sum: number, d: { downloads: number }) => sum + (d?.downloads ?? 0),
      0
    );
    downloads = formatNumber(total);
  }

  return { version, size, downloads };
}

export default async function Home() {
  const npm = await getNpmStats();

  const features = [
    {
      num: "01",
      title: "Tree-shakeable robots",
      desc: "Import only the variants you use. Each robot is a data URL, so unused characters never reach the bundle.",
    },
    {
      num: "02",
      title: "React hook included",
      desc: "useRobotToast() and useToastOnMount() ship in a dedicated subpath. React stays an optional peer dependency.",
    },
    {
      num: "03",
      title: "Promise lifecycle",
      desc: "toast.promise() handles loading, success, and error states in a single call — including dynamic messages from the resolved value.",
    },
    {
      num: "04",
      title: "Accessible by default",
      desc: 'role="alert" for errors and warnings, role="status" otherwise. Keyboard pause, focus restore, ARIA-correct out of the box.',
    },
    {
      num: "05",
      title: "Fully themeable",
      desc: "Light, dark, and colored presets — or pass your own style object and own the look entirely.",
    },
  ];

  const stats = [
    { value: npm.size, label: "core, gzipped" },
    { value: "16", label: "built-in robots" },
    { value: "06", label: "positions" },
    { value: npm.downloads, label: "total downloads" },
  ];

  const steps = [
    {
      title: "Install",
      tagline: "Tree-shakeable, mobile-tuned, with character.",
      code: "npm install robot-toast",
    },
    {
      title: "Import a toast",
      tagline: "Add toast in your app",
      code: "import { toast } from 'robot-toast'",
    },
    {
      title: "Toast it",
      tagline: "Call from anywhere",
      code: "toast({ message: 'Saved!' })",
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 lg:py-20 max-w-5xl mx-auto">
      {/* Hero */}
      <header className="relative -mt-10 sm:-mt-16 lg:-mt-20 mb-12 sm:mb-20 lg:mb-24 min-h-svh flex items-center gap-6 overflow-hidden lg:mr-[calc((100%+16rem-100dvw)/2)]">
        {/* Text */}
        <div className="min-w-0 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-3 mb-5 sm:mb-8 text-[11px] font-mono uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            <span className="h-px w-6 bg-gray-300 dark:bg-gray-700" />
            v{npm.version} · MIT
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] sm:leading-[1.02] text-gray-900 dark:text-white mb-5 sm:mb-6">
            Notifications,
            <br className="hidden sm:block" /> with character.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-xl mb-8 sm:mb-10 leading-relaxed">
            A toast library that pairs functional notifications with
            characterful robots. Tree-shakeable, mobile-tuned.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <TryToastButton />
            <a
              href="/playground"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-medium hover:border-gray-900 dark:hover:border-gray-300 transition-colors"
            >
              Try in playground
            </a>
          </div>
        </div>

        {/* Decorative robot */}
        <div className="hidden lg:flex justify-end items-center grow shrink-0">
          <img
            src={base}
            alt=""
            aria-hidden
            className="pointer-events-none select-none w-[90vh] h-auto max-w-none opacity-70 translate-x-12 lg:-translate-x-20"
          />
        </div>
      </header>

            {/* Quick start — 3 steps */}
      <section className="mb-12 sm:mb-20 lg:mb-24">
        <div className="mb-8 sm:mb-10 flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Three steps are all it takes.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Install, import, toast.
            </p>
          </div>
          <a
            href="/installation"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            Full guide →
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="min-w-0">
              <div className="w-full flex items-center justify-center">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold mb-4">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 text-center">
                {s.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 text-center">
                {s.tagline}
              </p>
              <div className="flex items-center justify-between gap-2 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2.5 overflow-hidden">
                <code className="font-mono text-xs sm:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap overflow-x-auto min-w-0 flex-1 text-center">
                  {s.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12 sm:mb-20 lg:mb-24 grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-y-8 gap-x-4 sm:gap-x-6 border-y border-gray-200 dark:border-gray-800 py-6 sm:py-10">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              {s.value}
            </div>
            <div className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
              {s.label}
            </div>
          </div>
        ))}
      </section>
 <div className="flex justify-end">
          <img
            src={success}
            alt=""
            aria-hidden
            className="pointer-events-none select-none w-40 sm:w-56 md:w-64 lg:w-72 h-auto opacity-70"
          />
        </div>
      {/* Features */}
      <section className="mb-12 sm:mb-20 lg:mb-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6 sm:mb-10">
          Built for production.
        </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
          {features.map((f) => (
            <li
              key={f.num}
              className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-12 py-5 sm:py-8"
            >
              <span className="font-mono text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                {f.num}
              </span>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                  {f.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
