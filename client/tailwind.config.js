module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false,
	theme: {
		extend: {
			fontFamily: {
				sans: ["Helvetica", "Arial", "sans-serif"],
				serif: ["Georgia", "serif"],
				mono: ["Menlo", "monospace"],
				doHyeon: ["Do Hyeon", "sans-serif"],
				"gothic-a1": ["Gothic A1", "sans-serif"],
				Rubik: ["Rubik", "sans-serif"],
				"Nanum-Gothic": ["Nanum Gothic", "sans-serif"],
				"font-awesome": ["FontAwesome", "sans-serif"],
			},
			screens: {
				xsm: "400px",
				mobile: "480px",
				tablet: "768px",
				desktop: "1024px",
				large: "1280px",
				xl: "1440px",
				"2xl": "1920px",
				"3xl": "2560px",
				"4k": "3840px",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
