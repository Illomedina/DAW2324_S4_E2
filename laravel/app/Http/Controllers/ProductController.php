<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['productImages' => function ($query) {
            $query->select('idProduct', 'thumb');
        }])->get();

        return response()->json($products);
    }
}
