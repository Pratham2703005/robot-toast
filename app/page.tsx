export default function Home() {
  return (
    <div className="px-8 py-12 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="text-6xl mb-4">🤖</div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Robot Toast
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
          A delightful, interactive toast notification library with adorable robot characters. 
          Perfect for adding personality to your notifications while maintaining a professional look.
        </p>
        <div className="flex gap-4">
          <a
            href="/installation"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all"
          >
            Get Started →
          </a>
          <a
            href="/playground"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Try Playground
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <FeatureCard
          icon="✨"
          title="Animated Characters"
          description="15+ unique robot characters with smooth animations and personality."
        />
        <FeatureCard
          icon="🎨"
          title="Fully Customizable"
          description="Control position, theme, type, animations, and behavior to match your design."
        />
        <FeatureCard
          icon="📦"
          title="TypeScript Support"
          description="Full type definitions for complete IDE support and autocomplete."
        />
        <FeatureCard
          icon="🌙"
          title="Light & Dark Mode"
          description="Beautiful themes with automatic light/dark mode detection."
        />
        <FeatureCard
          icon="⚡"
          title="Zero Dependencies"
          description="Lightweight and standalone - no external dependencies required."
        />
        <FeatureCard
          icon="📱"
          title="Responsive Design"
          description="Perfect on all devices with touch-friendly interactions."
        />
      </div>

      {/* Features List */}
      <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Key Features
        </h2>
        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          <li className="flex gap-4">
            <span className="text-2xl">🤖</span>
            <div>
              <strong>16 Robot Variants</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Choose from angry, happy, loading, success, and many more characters
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl">🎨</span>
            <div>
              <strong>6 Position Options</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                top-right, top-left, top-center, bottom-right, bottom-left, bottom-center
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl">🌈</span>
            <div>
              <strong>3 Themes & 5 Types</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Light, dark, and colored themes with info, success, warning, error, and default types
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl">✅</span>
            <div>
              <strong>Progress Tracking</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Optional progress bar for long-running operations
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl">🎯</span>
            <div>
              <strong>Rich Interactions</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Draggable, dismissible, pause on hover, and focus loss support
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl">⌨️</span>
            <div>
              <strong>Typing Animation</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Messages can be typed out character by character for effect
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Quick Example */}
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 rounded-lg p-6 overflow-x-auto mb-16">
        <h3 className="text-lg font-bold mb-4">Quick Start Example</h3>
        <pre className="font-mono text-sm">
{`import { toast } from 'robot-toast';

// Show a basic toast
toast({
  message: 'Welcome back!',
  position: 'top-right',
  robotVariant: 'wave.svg',
  duration: 3000
});

// Show with options
toast({
  message: 'Operation complete!',
  type: 'success',
  theme: 'light',
  position: 'bottom-right',
  draggable: true
});`}
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
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
