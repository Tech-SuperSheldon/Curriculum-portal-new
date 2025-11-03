/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom colors if you have specific hex values not in Tailwind's palette
      colors: {
        'dark-navy': '#0f172a',
        'midnight-blue': '#1e293b',
        'deep-dark': '#020617',
        'subtle-gray': '#94a3b8',
        'light-gray': '#cbd5e1',
        'active-purple': '#8b5cf6',
        'active-cyan': '#22d3ee',
        'text-accent': '#a5b4fc', // From profile info
        'settings-heading': '#a78bfa', // From settings card
      },
      // Custom background images (gradients)
      backgroundImage: {
        'gradient-base': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)',
        'gradient-header': 'linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.85) 50%, rgba(15, 23, 42, 0.9) 100%)',
        'gradient-login-radial': 'radial-gradient(circle at top left, #1e293b 0%, #0f172a 40%, #020617 100%)',
        'gradient-dashboard-radial': 'radial-gradient(circle at top left, #111827 0%, #0f172a 40%, #020617 100%)',
        'gradient-conic-aura': 'conic-gradient(from 180deg, rgba(34, 211, 238, 0.15), rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.15), rgba(34, 211, 238, 0.15))',
        'gradient-sidebar-active': 'linear-gradient(90deg, #22d3ee33, #8b5cf633)',
        'gradient-btn-danger': 'linear-gradient(90deg, #ef4444, #dc2626)',
      },
      // Custom keyframes for animations
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(10px) scale(0.99)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'scale(0.95) translateY(-5px)' },
          'to': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        spinAura: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Custom animation utilities
      animation: {
        fadeInUp: 'fadeInUp 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        spinAura: 'spinAura 30s linear infinite',
        floatUp: 'floatUp 0.9s ease-out forwards',
      },
      // Custom boxShadow utilities
      boxShadow: {
        'header-glow': '0 2px 25px rgba(0, 0, 0, 0.5)',
        'dropdown-glow': '0 8px 30px rgba(0, 0, 0, 0.6)',
        'login-card-glow': '0 0 30px rgba(139, 92, 246, 0.15)',
        'sidebar-active-glow': '0 0 12px rgba(139, 92, 246, 0.4)',
        'subject-card-glow': '0 0 25px rgba(0, 0, 0, 0.3)',
        'subject-card-hover-glow': '0 10px 35px rgba(139, 92, 246, 0.35)',
        'profile-card-glow': '0 0 25px rgba(139, 92, 246, 0.1)',
        'avatar-glow': '0 0 15px rgba(139, 92, 246, 0.25)',
        'danger-btn-glow': '0 0 15px rgba(239, 68, 68, 0.3)',
        'danger-btn-hover-glow': '0 0 25px rgba(239, 68, 68, 0.5)',
      },
      // Custom `transitionProperty` for specific transitions
      transitionProperty: {
        'all': 'all',
        'colors': 'background-color, border-color, color, fill, stroke',
        'transform': 'transform',
      },
      // Custom transition duration
      transitionDuration: {
        '350': '350ms',
      },
      // Custom font sizes if they don't map directly
      fontSize: {
        base: "0.9rem", // instead of default 1rem
      sm: "0.8rem",
      lg: "1rem",
      },
      // Custom spacing if needed
      spacing: {
        '0.75rem': '0.75rem',
        '0.8rem': '0.8rem',
        '1.2rem': '1.2rem',
        '1.8rem': '1.8rem',
        '2.5rem': '2.5rem',
        '2.8rem': '2.8rem',
        '3rem': '3rem',
      },
      // Custom min/max width for elements
      maxWidth: {
        '420px': '420px',
        '700px': '700px',
        '900px': '900px',
        '1500px': '1500px',
      },
      // Custom heights
      height: {
        '70px': '70px',
        '160px': '160px',
        '200px': '200px',
      },
    },
  },
  plugins: [],
};
