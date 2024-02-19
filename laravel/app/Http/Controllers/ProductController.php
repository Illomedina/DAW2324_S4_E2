<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('productImages', 'productDetails')->get();

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

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->is_active = $request->is_active;
        $product->save();

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }
}
