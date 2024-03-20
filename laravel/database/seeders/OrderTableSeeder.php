<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class OrderTableSeeder extends Seeder
{
    public function run()
    {
       Order::factory()->count(50)->create();
    }
}
