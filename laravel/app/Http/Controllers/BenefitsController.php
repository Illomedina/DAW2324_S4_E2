<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Benefits;

class BenefitsController extends Controller
{
    public function index(){
   
        try {
            Benefits::connection()->getPDO();
            dump('Database connected: ' . Benefits::connection()->getDatabaseName());
        }catch (\Exception $e) {
    dump('Database connected: ' . 'None');
}

        // $benefits = Benefits::all();
        // return response()->json($benefits);
    }
}
