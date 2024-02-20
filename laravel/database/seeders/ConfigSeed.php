<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ConfigSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('settings')->insert([
            [
                'config' => 'google_analytics',
                'value' => '{jzcjlz<jz<jxocjzopopop s<djoxjzo sdjfoj}',
            ],
            [
                'config' => 'api Dall-e',
                'value' => 'jzcjlz<jz<jxocjzopopops<djoxjzo sdjfoj',
            ],
            [
                'config' => 'api picannova',
                'value' => 'jzcjlz<jz<jxocjzopopop s<djoxjzo sdjfoj',
            ],
        ]);
    }
}
