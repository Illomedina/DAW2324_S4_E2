<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idOrder')->constrained('orders')->onDelete('cascade');
            $table->foreignId('idProduct')->constrained('products');
            //$table->foreignId('idGeneratesImage')->constrained();
            //$table->foreignId('idVariant')->constrained();
            $table->integer('quantity');
            $table->decimal('priceEach', 6, 2);
            $table->decimal('shippingPrice', 6, 2)->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
