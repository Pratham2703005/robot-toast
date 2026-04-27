import CopyButton from "./components/CopyButton";

export default function Home() {
  const code1 = `import { toast } from 'robot-toast';

// Show a simple toast
toast('Hello world! 🤖');`;

  const code2 = `import { wave } from 'robot-toast/robots';

toast({
  message: 'Success! Your file was saved.',
  type: 'success',
  robotVariant: wave
});`;

  const code3 = `// Customize everything
toast({
  message: 'Update available',
  type: 'info',
  position: 'top-right',
  autoClose: 4000
});`;

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="mb-10 sm:mb-16">
        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🤖</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Robot Toast
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-2xl">
          A delightful, interactive toast notification library with adorable robot characters.
          Perfect for adding personality to your notifications while maintaining a professional look.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="/installation"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all text-center"
          >
            Get Started →
          </a>
          <a
            href="/playground"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-center"
          >
            Try Playground
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-16">
        <FeatureCard
          icon="🤖"
          title="15+ Robot Characters"
          description="Unique animated robots including wave, angry, shock, loading, and more."
        />
        <FeatureCard
          icon="🎨"
          title="Fully Customizable"
          description="Control position, theme, type, animations, and all visual aspects."
        />
        <FeatureCard
          icon="📦"
          title="TypeScript Support"
          description="Full type definitions for complete IDE support and type safety."
        />
        <FeatureCard
          icon="🌙"
          title="Light & Dark Mode"
          description="Beautiful themes with seamless light/dark mode support."
        />
        <FeatureCard
          icon="⚡"
          title="Zero Dependencies"
          description="Lightweight and standalone library with no external dependencies."
        />
        <FeatureCard
          icon="📱"
          title="Mobile Responsive"
          description="Touch-friendly interactions and optimized for all device sizes."
        />
        <FeatureCard
          icon="🎯"
          title="8 Toast Positions"
          description="Display toasts anywhere - top/bottom, left/right, or center."
        />
        <FeatureCard
          icon="🔄"
          title="Queue Management"
          description="Smart queuing with adjustable limits to prevent notification overflow."
        />
        <FeatureCard
          icon="✋"
          title="Interactive Features"
          description="Pause on hover, keyboard support, and draggable notifications."
        />
        <FeatureCard
          icon="🚀"
          title="Type Animations"
          description="Text can animate character-by-character for engaging messages."
        />
      </div>

      {/* Features Showcase Link */}
      <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-5 sm:p-8 mb-10 sm:mb-16 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Explore All Features
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Check out interactive demos of all 40+ features including robots, positions, themes, animations, and more.
        </p>
        <a
          href="/features"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all"
        >
          View Features Showcase →
        </a>
      </div>

      {/* Quick Example */}
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 rounded-lg p-4 sm:p-6 overflow-x-auto mb-10 sm:mb-16">
        <h3 className="text-lg font-bold mb-4">Quick Start Example</h3>
        <pre className="font-mono text-sm px-2 py-1 flex justify-between items-center rounded hover:bg-gray-800">
          {code1}
          <CopyButton text={code1} styling="bg-gray-900 text-xs py-0.5 px-1 rounded" />
        </pre>
        <pre className="font-mono text-sm px-2 py-2 my-1 flex justify-between items-start rounded hover:bg-gray-800">
          {code2}
          <CopyButton text={code2} styling="bg-gray-900 text-xs py-0.5 px-1 rounded" />
        </pre>
        <pre className="font-mono text-sm px-2 py-2 flex justify-between items-start rounded hover:bg-gray-800">
          {code3}
          <CopyButton text={code3} styling="bg-gray-900 text-xs py-0.5 px-1 rounded" />
        </pre>
      </div>

      {/* Call to Action */}
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Ready to add adorable robots to your notifications?
        </p>
        <a
          href="/installation"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all"
        >
          Install Now
        </a>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{icon}</div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
