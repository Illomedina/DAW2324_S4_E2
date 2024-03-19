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
        //Obtiene datos de request y los valida
        $request->validate([
            'idBenefit' => 'required',
            'month' => 'required',
            'income' => 'required|numeric',
            'expense' => 'required|numeric',
            'profit' => 'required|numeric',
        ]);

        //Crea un beneficio
        $benefit = Benefits::create([
            'month' => $request->month,
            'income' => $request->income,
            'expense' => $request->expense,
            'profit' => $request->profit,
        ]);
        
        //Retorna un mensaje con el beneficio creado
        return response()->json(['message' => 'Benefit created successfully', 'benefit' => $benefit], 201);
    }

    //Obtiene un beneficio y lo retorna
public function getOne($id){
    $benefit = Benefits::findOrFail($id);
    return response()->json($benefit);
}
    //Metodo que obtiene datos por request
    public function update(Request $request){
        //valida los datos
        $request->validate([
            'idBenefit' => 'required',
            'month' => 'required',
            'income' => 'required|numeric',
            'expense' => 'required|numeric',
            'profit' => 'required|numeric',
        ]);
        
        //Hace query que equivale a Select * from benefits where id = $id
        $benefit = Benefits::findOrFail($request->input('idBenefit'));

        //Actualiza y retorna el beneficio modificado
        $benefit->update([
            'month' => $request->input('month'),
            'income' => $request->input('income'),
            'expense' => $request->input('expense'),
            'profit' => $request->input('profit'),
        ]);

        return response()->json(['message' => 'Benefit updated successfully', 'data' => $benefit]);
    }
}
