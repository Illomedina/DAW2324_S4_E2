<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\Benefits;

class BenefitsController extends Controller
{
    public function index()
    {
        $benefits = Benefits::all();
        return response()->json($benefits);
    }


    public function delete($id)
    {
        $benefit = Benefits::findOrFail($id);
        $benefit->delete();
        
        return response()->json(['message' => 'Resource deleted successfully'], 200);
    }

    public function create(Request $request){
        $benefit = Benefits::create([
            'month' => $request->month,
            'income' => $request->income,
            'expense' => $request->expense,
            'profit' => $request->profit,
        ]);
    
        return response()->json(['message' => 'Benefit created successfully', 'benefit' => $benefit], 201);
    }
}
