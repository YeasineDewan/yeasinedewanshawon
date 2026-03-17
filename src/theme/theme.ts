/**
 * Centralized Theme System
 * Provides consistent color palette and theme utilities across the application
 */

// Neon Color Palette
export const neonColors = {
  darkGreen: '#059212',
  neonGreen: '#06D001',
  lightYellow: '#F3FF90',
  lime: '#9BEC00',
} as const;

// Dark Theme Colors
export const darkColors = {
  50: '#1a1a1a',
  100: '#171717',
  200: '#0f0f0f',
  300: '#0a0a0a',
  900: '#000000',
} as const;

// Light Theme Colors
export const lightColors = {
  50: '#ffffff',
  100: '#f9fafb',
  200: '#f3f4f6',
  300: '#e5e7eb',
} as const;

// Theme Type
export type ThemeMode = 'light' | 'dark';

// Theme Colors Interface
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
}

// Get theme colors based on mode
export const getThemeColors = (mode: ThemeMode): ThemeColors => ({
  primary: neonColors.neonGreen,
  secondary: neonColors.lime,
  accent: neonColors.lightYellow,
  background: mode === 'dark' ? darkColors[900] : lightColors[50],
  surface: mode === 'dark' ? darkColors[50] : lightColors[100],
  text: mode === 'dark' ? '#ffffff' : '#000000',
  textSecondary: mode === 'dark' ? '#9ca3af' : '#6b7280',
  border: mode === 'dark' ? '#374151' : '#e5e7eb',
});

// CSS Variables for dynamic theming
export const getCSSVariables = (mode: ThemeMode) => ({
  '--theme-primary': neonColors.neonGreen,
  '--theme-secondary': neonColors.lime,
  '--theme-accent': neonColors.lightYellow,
  '--theme-background': mode === 'dark' ? darkColors[900] : lightColors[50],
  '--theme-surface': mode === 'dark' ? darkColors[50] : lightColors[100],
  '--theme-text': mode === 'dark' ? '#ffffff' : '#000000',
  '--theme-text-secondary': mode === 'dark' ? '#9ca3af' : '#6b7280',
  '--theme-border': mode === 'dark' ? '#374151' : '#e5e7eb',
});

// Utility functions for theme-aware styles
export const getHoverStyle = (baseColor: string, opacity = 0.2) => ({
  backgroundColor: `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
});

export const getGlowStyle = (color: string, intensity = 0.5) => ({
  boxShadow: `0 0 20px ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`,
});

export const getGradientStyle = (colors: string[]) => ({
  background: `linear-gradient(135deg, ${colors.join(', ')})`,
});

// Animation configurations
export const animationConfig = {
  float: {
    duration: 6,
    ease: 'easeInOut',
    repeat: Infinity,
  },
  pulse: {
    duration: 4,
    ease: 'cubic-bezier(0.4, 0, 0.6, 1)',
    repeat: Infinity,
  },
  glow: {
    duration: 2,
    ease: 'easeInOut',
    repeat: Infinity,
    direction: 'alternate' as const,
  },
};

// Focus ring styles for accessibility
export const focusRingStyle = {
  outline: 'none',
  ring: 2,
  ringColor: neonColors.neonGreen,
  ringOffset: 2,
  ringOffsetColor: 'transparent',
};

// Export default theme object
export const theme = {
  colors: {
    neon: neonColors,
    dark: darkColors,
    light: lightColors,
  },
  animation: animationConfig,
  focus: focusRingStyle,
};

export default theme;
