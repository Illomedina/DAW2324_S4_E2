<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $appends = ['thumb'];

    public function productImages()
    {
        return $this->hasMany(ProductImage::class, 'idProduct');
    }

    public function getThumbAttribute()
    {
        return $this->productImages->first()->thumb ?? null;
    }

    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class, 'idProduct');
    }
}
