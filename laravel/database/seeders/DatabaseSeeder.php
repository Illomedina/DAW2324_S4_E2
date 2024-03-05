<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {       
        // DB::table('users')->insert([
        //     'name' => 'Admin',
        //     'surname' => '-',
        //     'user' => 'Admin', 
        //     'email' => 'admin@example.com',
        //     'password' =>Hash::make(config('configuration.ADMIN_PASSWORD')),
        // ]);
      DB::table('users')->insert([
            'name' => 'gabriel',
            'surname' => '-',
            'user' => 'Admin', 
            'email' => 'admin@example.com',
            'password' =>Hash::make('password'),
        ]);

        $this->call([
            BenefitsTableSeeder::class,
        ]);
        
    }
}