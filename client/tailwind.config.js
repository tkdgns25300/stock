module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ["Helvetica", "Arial", "sans-serif"],
				serif: ["Georgia", "serif"],
				mono: ["Menlo", "monospace"],
				doHyeon: ["Do Hyeon", "sans-serif"],
				gothic_a1: ["Gothic A1", "sans-serif"],
				"font-awesome": ["FontAwesome", "sans-serif"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
