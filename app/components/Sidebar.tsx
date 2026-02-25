'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Introduction', href: '/' },
  { label: 'Installation', href: '/installation' },
  { label: 'Playground', href: '/playground' },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop – mobile only */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72 border-r border-gray-200 bg-gray-50 pt-6
          dark:border-gray-800 dark:bg-gray-950
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:w-64
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close button – mobile only */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors lg:hidden"
          aria-label="Close sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
          </svg>
        </button>

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
                onClick={onClose}
                className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
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
    </>
  );
}
