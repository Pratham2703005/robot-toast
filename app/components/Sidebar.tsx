'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Introduction', href: '/' },
  { label: 'Installation', href: '/installation' },
  { label: 'Playground', href: '/playground' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-gray-50 pt-6 dark:border-gray-800 dark:bg-gray-950">
      <div className="px-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          🤖 Robot Toast
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          A delightful toast notification library
        </p>
      </div>

      <nav className="mt-8 space-y-1 px-3">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-linear-to-r from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          GitHub
        </a>
      </div>
    </aside>
  );
}
