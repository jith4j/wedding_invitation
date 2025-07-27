/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
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
  				DEFAULT: 'hsl(var(--primary))',
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
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'slide-right': {
  				'0%': {
  					transform: 'translateX(-100%) scaleX(0)',
  					transformOrigin: 'right'
  				},
  				'50%': {
  					transform: 'translateX(0) scaleX(1)',
  					transformOrigin: 'right'
  				},
  				'100%': {
  					transform: 'translateX(0) scaleX(1)',
  					transformOrigin: 'right'
  				}
  			},
  			'slide-left': {
  				'0%': {
  					transform: 'translateX(100%) scaleX(0)',
  					transformOrigin: 'left'
  				},
  				'50%': {
  					transform: 'translateX(0) scaleX(1)',
  					transformOrigin: 'left'
  				},
  				'100%': {
  					transform: 'translateX(0) scaleX(1)',
  					transformOrigin: 'left'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'parallax-slow': {
  				'0%': { transform: 'translateY(0px)' },
  				'100%': { transform: 'translateY(-50px)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'slide-right': 'slide-right 1.5s ease-out',
  			'slide-left': 'slide-left 1.5s ease-out',
  			'fade-in-up': 'fade-in-up 1s ease-out 1s both',
  			'fade-in-up-delay': 'fade-in-up 1s ease-out 1.3s both',
  			'parallax-slow': 'parallax-slow 20s linear infinite alternate'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};