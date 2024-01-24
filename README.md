
# Before start
```
cd /laravel
composer install
cp .env.example .env
php artisan key:generate
```

# Paquetes:
```
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @headlessui/react @heroicons/react
```

# Archivos a modificar:
laravel/.env
```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=customAIze
DB_USERNAME=root
DB_PASSWORD=rootpwd
```

fastapi/app .env
```
SECRET_KEY=mysecretkey
ALGORITHM=HS256
API_USER=alumne
API_PASSWORD=2b8af5289aa93fc62eae989b4dcc9725
DB_USER=root
DB_PASSWORD=rootpwd
DB_HOST=mysql
DB_NAME=customAIze
DB_PORT=3306
```

tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        black: '#191624',
      },
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
    },
  }
}
```
index.css
```
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

# Estructura directorios
```
src
├───assets
├───components (Cosas reutilizables (botones, inputs, etc))
│   ├───Sidebar
├───pages
│   ├───auth
│   ├───dashboard
├───router
└───views
    ├───auth
    ├───dashboard
```
