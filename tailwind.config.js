import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				// Primary Neon Colors
				neon: {
					green: '#06D001',
					'dark-green': '#059212',
					lime: '#9BEC00',
					'yellow': '#F3FF90',
				},
				// Dark theme colors
				dark: {
					50: '#1a1a1a',
					100: '#171717',
					200: '#0f0f0f',
					300: '#0a0a0a',
					900: '#000000',
				},
				// Light theme colors
				light: {
					50: '#ffffff',
					100: '#f9fafb',
					200: '#f3f4f6',
					300: '#e5e7eb',
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				'neon-green': '0 0 20px rgba(6, 208, 1, 0.5)',
				'neon-lime': '0 0 20px rgba(155, 236, 0, 0.5)',
				'neon-yellow': '0 0 20px rgba(243, 255, 144, 0.5)',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				glow: {
					'0%': { boxShadow: '0 0 5px rgba(6, 208, 1, 0.5)' },
					'100%': { boxShadow: '0 0 20px rgba(6, 208, 1, 0.8)' },
				}
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			}
		},
	},
	darkMode: "class",
	plugins: [heroui()],
};
