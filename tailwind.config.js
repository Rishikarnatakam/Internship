module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pageBg: '#0B0B0B',
        panelBg: '#FFFFFF',
        panelBorder: '#E9E9E9',
        pillBg: '#F5F5F5',
        accent: '#111111'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        subtle: '0 4px 20px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        lg: '12px'
      }
    }
  },
  plugins: []
}


