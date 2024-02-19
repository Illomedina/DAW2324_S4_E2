<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'idOrderPicanova' => $this->faker->unique()->uuid,
            'idCustomer' => rand(1, 50), // O puedes utilizar $this->faker->numberBetween(1, 50)
            'datetime' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'orderStatus' => $this->faker->randomElement(['Pending', 'Processing', 'Shipped']),
        ];
    }
}

