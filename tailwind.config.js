/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0B0F19",
          card: "#111827",
          cardHover: "#1F2937",
          border: "#1E293B",
          teal: "#00f2fe",
          cyan: "#06b6d4",
          blue: "#3b82f6",
          amber: "#f59e0b",
          red: "#ef4444",
          emerald: "#10b981",
          purple: "#8b5cf6"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(0, 242, 254, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.3)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'glow-red': '0 0 25px -5px rgba(239, 68, 68, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'cyber-grid': "radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.05) 0%, transparent 60%), linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
