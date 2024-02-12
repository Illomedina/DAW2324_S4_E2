<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BenefitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'month' => 'January',
                'income' => 5000,
                'expense' => 2000,
                'profit' => 3000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'month' => 'February',
                'income' => 6000,
                'expense' => 2500,
                'profit' => 3500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'month' => 'March',
                'income' => 3999,
                'expense' => 2500,
                'profit' => 3500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'month' => 'April',
                'income' => 23132,
                'expense' => 2500,
                'profit' => 3500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('benefits')->insert($data);
    }
}
