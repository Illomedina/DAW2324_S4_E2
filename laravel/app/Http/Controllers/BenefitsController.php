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


    public function delete(Request $request)
    {
        try {
            Benefits::whereIn('id', $request->id)->delete(); // $request->id MUST be an array
            return response()->json('benefits deleted');
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
