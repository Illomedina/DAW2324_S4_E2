<?php

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    public function run()
    {
        \App\Models\OrderDetails::factory()->count(50)->create();
    }
}
