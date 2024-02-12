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

    public function getOne($id){
        $benefit = Benefits::findOrFail($id);
        $benefit->get();
        return response()->json($benefit);
    }

    public function update(Request $request){
        $benefit = Benefits::findOrFail($request->input('idBenefit'));

        $benefit->update([
            'month' => $request->input('month'),
            'income' => $request->input('income'),
            'expense' => $request->input('expense'),
            'profit' => $request->input('profit'),
        ]);

        return response()->json(['message' => 'Benefit updated successfully', 'data' => $benefit]);
    }
}
