export default function Installation() {
  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
        Installation
      </h1>

      {/* NPM Installation */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          NPM Installation
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
          Install robot-toast using npm:
        </p>
        <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 rounded-lg p-4 sm:p-6 overflow-x-auto">
          <pre className="font-mono text-xs sm:text-sm">npm install robot-toast</pre>
        </div>
      </div>

      {/* Basic Usage */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
          Import and use robot-toast in your application:
        </p>
        <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 rounded-lg p-4 sm:p-6 overflow-x-auto">
          <pre className="font-mono text-xs sm:text-sm">
{`import { toast } from 'robot-toast';

// Show a simple toast
toast({
  message: 'Hello, World!',
  position: 'bottom-right',
  robotVariant: 'wave.svg'
});`}
          </pre>
        </div>
      </div>

      {/* Position Options */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Position Options
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
          Available positions for your toasts:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            'top-right',
            'top-left',
            'top-center',
            'bottom-right',
            'bottom-left',
            'bottom-center',
          ].map((pos) => (
            <div
              key={pos}
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900"
            >
              position: `${pos}`
            </div>
          ))}
        </div>
      </div>

      {/* Robot Variants */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Available Robot Variants
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
          Choose from 16 adorable robot characters:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {[
            'angry.svg',
            'angry2.svg',
            'base.svg',
            'base2.svg',
            'error.svg',
            'head-palm.svg',
            'loading.svg',
            'search.svg',
            'shock.svg',
            'sleep.svg',
            'success.svg',
            'think.svg',
            'type.svg',
            'validation.svg',
            'validation2.svg',
            'wave.svg',
          ].map((variant) => (
            <div
              key={variant}
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 flex items-center gap-2"
            >
              <span className="text-lg">🤖</span>
              {variant}
            </div>
          ))}
        </div>
      </div>

      {/* Toast Types */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Toast Types
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
          Different toast types for different messages:
        </p>
        <div className="space-y-3">
          {[
            { type: 'info', emoji: 'ℹ️', description: 'Informational messages' },
            { type: 'success', emoji: '✅', description: 'Success confirmations' },
            { type: 'warning', emoji: '⚠️', description: 'Warning messages' },
            { type: 'error', emoji: '❌', description: 'Error messages' },
            { type: 'default', emoji: '💬', description: 'Default messages' },
          ].map(({ type, emoji, description }) => (
            <div
              key={type}
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 flex items-start gap-3"
            >
              <span className="text-2xl">{emoji}</span>
              <div>
                <div className="font-mono font-semibold text-gray-900 dark:text-white">
                  {type}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Themes */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Themes
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
          Three beautiful themes to match your design:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <ThemeCard
            name="Light"
            description="Clean white background with subtle shadows"
            className="bg-white border-gray-200 text-gray-900"
          />
          <ThemeCard
            name="Dark"
            description="Dark background perfect for night mode"
            className="bg-gray-900 border-gray-800 text-white"
          />
          <ThemeCard
            name="Colored"
            description="Vibrant gradient background with personality"
            className="bg-linear-to-r from-purple-600 to-pink-600 border-0 text-white"
          />
        </div>
      </div>

      {/* Config Options */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Configuration Options
        </h2>
        <div className="space-y-3">
          {[
            { key: 'message', value: 'string', default: 'required', desc: 'The notification message' },
            { key: 'position', value: 'string', default: 'bottom-right', desc: 'Toast position' },
            { key: 'type', value: 'string', default: 'default', desc: 'Toast type (info, success, warning, error)' },
            { key: 'theme', value: 'string', default: 'light', desc: 'Theme (light, dark, colored)' },
            { key: 'autoClose', value: 'boolean|number', default: '5000', desc: 'Auto-close duration in ms, or false to disable' },
            { key: 'draggable', value: 'boolean', default: 'true', desc: 'Allow dragging' },
            { key: 'pauseOnHover', value: 'boolean', default: 'true', desc: 'Pause on hover' },
            { key: 'hideProgressBar', value: 'boolean', default: 'false', desc: 'Hide progress bar' },
            { key: 'transition', value: 'string', default: 'bounce', desc: 'Animation (bounce, slide, zoom, flip)' },
          ].map(({ key, value, default: defaultValue, desc }) => (
            <div
              key={key}
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <div className="font-mono font-semibold text-gray-900 dark:text-white">
                    {key}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {desc}
                  </div>
                </div>
                <div className="text-left sm:text-right text-sm">
                  <div className="text-gray-600 dark:text-gray-400">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    default: {defaultValue}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Example */}
      <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-5 sm:p-8 mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Complete Example
        </h2>
        <div className="bg-gray-900 dark:bg-gray-950 text-gray-50 rounded-lg p-4 sm:p-6 overflow-x-auto mt-3 sm:mt-4">
          <pre className="font-mono text-xs sm:text-sm">
{`import { toast } from 'robot-toast';

// Success notification with all options
toast({
  message: 'Profile updated successfully!',
  position: 'bottom-right',
  type: 'success',
  theme: 'light',
  robotVariant: 'success.svg',
  autoClose: 4000,
  draggable: true,
  pauseOnHover: true,
  hideProgressBar: false,
  transition: 'slide'
});`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function ThemeCard({
  name,
  description,
  className,
}: {
  name: string;
  description: string;
  className: string;
}) {
  return (
    <div
      className={`rounded-lg border p-6 ${className}`}
    >
      <h4 className="font-semibold mb-2">{name}</h4>
      <p className="text-sm opacity-8">{description}</p>
    </div>
  );
}
