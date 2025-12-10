import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Eğer src klasörü kullanıyorsan burayı da eklemeliyiz ki stiller kopmasın:
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        /* --- 1. SENİN MEVCUT PROFESYONEL YAPIN (Aynen Koruyoruz) --- */
        primary: {
          blue: "#003767",      // New Holland Orijinal Mavisi
          "blue-light": "#004d8c",
          "blue-dark": "#002a4d",
          "blue-darker": "#001a33",
        },
        secondary: {
          gray: "#6c757d",      
          "gray-light": "#adb5bd",
          "gray-dark": "#495057",
          "gray-darker": "#343a40",
          "gray-lighter": "#f8f9fa", 
        },
        accent: {
          yellow: "#ffd300",    // New Holland Orijinal Sarısı
          "yellow-light": "#ffe033",
          "yellow-dark": "#ccaa00",
          "yellow-darker": "#998000",
        },

        /* --- 2. UYUMLULUK MODU (Benim verdiğim kodlar için gerekli) --- */
        /* Bu kısmı eklemezsek Header ve Hero'daki renkler gelmez */
        nh: {
            blue: "#003767",   // primary.blue ile eşledim
            yellow: "#ffd300", // accent.yellow ile eşledim
            dark: "#1A1A1A",   // Siyah metinler için
        },

        /* Diğer Renkler */
        success: "#198754",
        danger: "#dc3545",
        info: "#0dcaf0",
      },
    },
  },
  plugins: [],
};
export default config;