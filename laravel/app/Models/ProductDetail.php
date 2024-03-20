<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * The ProductDetail model represents a specific detail or attribute of a product
 * in the application. It utilizes Laravel's Eloquent ORM for database interactions.
 * 
 * Attributes:
 * @property int $id The primary key of the product detail.
 * @property string $name The name or type of the detail.
 * @property string $value The value or description of the product detail.
 * @property int $idProduct The foreign key linking to the product.
 * 
 * Relationships:
 * @property-read Product $product The product this detail belongs to.
 * 
 * Database:
 * Table name: product_details
 */

class ProductDetail extends Model
{
    use HasFactory;

    /**
     * Defines the inverse one-to-many relationship between ProductDetail and Product.
     * 
     * This function declares that each ProductDetail belongs to a single Product,
     * using 'idProduct' as the foreign key in the database.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'idProduct');
    }
}
