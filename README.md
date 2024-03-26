# Before start
```
cd /laravel
composer install
composer update
cp .env.example .env
php artisan key:generate
```

# Make the following changes in the `LARAVEL` .env:
```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=customAIze
DB_USERNAME=root
DB_PASSWORD=rootpwd

APP_URL=http://localhost
SANCTUM_STATEFUL_DOMAINS=http://localhost:8080,http://127.0.0.1:8080,http://localhost:3000,http://127.0.0.1:3000
```

# Create a new .env in the `React` folder:
Should contain the following:
```
VITE_API_URL="http://lar3.alumnat.iesmontsia.org/api"
```

# Starting the services:
```
docker-compose up --build
```

# Seed the database:
In the laravel shell:
```
php artisan migrate:fresh --seed
```
