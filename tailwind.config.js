const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');
const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',  // Make sure this includes all your component files
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contexts/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		extend: 'dark',
		  keyframes: {
			wiggle: {
			  '0%, 100%': { transform: 'rotate(-60deg)  scale(0.9)' },
			  '50%': { transform: 'rotate(80deg)  scale(1.1)' },
			},
			'slow-spin': {
			  'from': { transform: 'rotate(0deg)' },
			  'to': { transform: 'rotate(360deg)' },
			},
			'orbit': {
			  '0%': { transform: 'rotate(0deg) translateX(40px) rotate(0deg)' },
			  '100%': { transform: 'rotate(360deg) translateX(40px) rotate(-360deg)' }
			},
			'spin-slow': {
			  '0%': { transform: 'rotate(0deg)' },
			  '100%': { transform: 'rotate(-360deg)' }
			}
		  },
		  animation: {
			wiggle: 'wiggle 1s ease-in-out infinite',
			'slow-spin': 'slow-spin 20s linear infinite',
			'orbit': 'orbit 20s linear infinite',
			'spin-slow': 'spin-slow 30s linear infinite',
		  },
  		fontSize: {
  			base: [
  				'18px',
  				'24px'
  			]
  		},
  		fontFamily: {
  			orbitron: [
  				'Orbitron',
  				'sans-serif'
  			],
  			'sans': [
  				'sans',
                    ...fontFamily.sans
                ]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: '#000000',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  darkMode: ["class", 'class'],
  plugins: [nextui(), require("tailwindcss-animate")],
};
