<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('productImages')->get();

        return response()->json($products);
    }

    public function show($id)
    {
        // Asumiendo que la relación se llama 'productDetails'
        $product = Product::with(['productImages', 'productDetails'])->find($id);

        if ($product) {
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }
}
