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
}
