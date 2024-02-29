<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\Benefits;

class BenefitsController extends Controller
{
    //metodo que realiza una query que devuelve todos los beneficios en un json
    public function index()
    {   //Equivale a Select * from benefits
        $benefits = Benefits::all();
        //Retornamos Json
        return response()->json($benefits);
    }

    //funcion que se encarga de eliminar recibiendo id como parametro
    public function delete($id)
    {
         //Realizamos query que equivale a Select * from benefits where id = $id
        $benefit = Benefits::findOrFail($id);
        //Eliminamos beneficio
        $benefit->delete();
        //retornamos mensaje para avisar que la operacion ha tenido exito
        return response()->json(['message' => 'Resource deleted successfully'], 200);
    }

    //funcion que se encarga de crear 
    public function create(Request $request){

        $request->validate([
            'idBenefit' => 'required',
            'month' => 'required',
            'income' => 'required|numeric',
            'expense' => 'required|numeric',
            'profit' => 'required|numeric',
        ]);

        $benefit = Benefits::create([
            'month' => $request->month,
            'income' => $request->income,
            'expense' => $request->expense,
            'profit' => $request->profit,
        ]);
    
        return response()->json(['message' => 'Benefit created successfully', 'benefit' => $benefit], 201);
    }

    public function getOne($id){
        $id->validate([
           'id'=>'integer', 
        ]);

        $benefit = Benefits::findOrFail($id);
        $benefit->get();
        return response()->json($benefit);
    }

    public function update(Request $request){

        $request->validate([
            'idBenefit' => 'required',
            'month' => 'required',
            'income' => 'required|numeric',
            'expense' => 'required|numeric',
            'profit' => 'required|numeric',
        ]);
        

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
