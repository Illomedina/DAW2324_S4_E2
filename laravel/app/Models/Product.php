<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Product
 *
 * The Product model represents a product in the application.
 * It leverages Eloquent to interact with the corresponding database table.
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProductImage[] $productImages The collection of associated product images.
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProductDetail[] $productDetails The collection of associated product details.
 * @property-read string|null $thumb The thumbnail URL for the first product image, if available.
 * 
 * Database:
 * Table name: products
 */

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @var array<string>
     */
    protected $appends = ['thumb'];

    /**
     * Relationship: Product images
     *
     * Defines a one-to-many relationship between Product and ProductImage models.
     * Each product can have many product images.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany The relationship query builder.
     */
    public function productImages()
    {
        return $this->hasMany(ProductImage::class, 'idProduct');
    }

    /**
     * Accessor: Get thumbnail attribute
     *
     * Retrieves the thumbnail URL of the first product image if available, otherwise returns null.
     *
     * @return string|null The URL of the thumbnail or null if no images are available.
     */
    public function getThumbAttribute()
    {
        return $this->productImages->first()->thumb ?? null;
    }

    /**
     * Relationship: Product details
     *
     * Defines a one-to-many relationship between Product and ProductDetail models.
     * Each product can have many product details.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany The relationship query builder.
     */
    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class, 'idProduct');
    }
}
