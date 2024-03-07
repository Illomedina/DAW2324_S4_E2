<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\Benefits;

class BenefitsController extends Controller
{
    /**
     * Returns all Benefit resources
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $benefits = Benefits::all();
        return response()->json($benefits);
    }

    /**
     * Deletes a Benefit resource
     * 
     * @param int $id The resource's id
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $benefit = Benefits::findOrFail($id);
        $benefit->delete();
        return response()->json(['message' => 'Resource deleted successfully'], 200);
    }


    /**
     * Creates a new Benefit resource
     *
     * @param Request $request The request object with the new resource's data
     *
     * @return \Illuminate\Http\JsonResponse The created resource
     */
    public function create(Request $request)
    {
        // Validate the request's data
        $request->validate([
            'idBenefit' => 'required',
            'month' => 'required',
            'income' => 'required|numeric',
            'expense' => 'required|numeric',
            'profit' => 'required|numeric',
        ]);

        // Create a new Benefit resource with the validated data
        $benefit = Benefits::create([
            'month' => $request->month,
            'income' => $request->income,
            'expense' => $request->expense,
            'profit' => $request->profit,
        ]);

        // Return a success response with the created resource
        return response()->json(['message' => 'Benefit created successfully', 'benefit' => $benefit], 201);
    }

    /**
     * Retrieves a single Benefit resource by id
     *
     * @param int $id The resource's id
     *
     * @return \Illuminate\Http\JsonResponse The retrieved resource
     */
    public function getOne($id)
    {
        $benefit = Benefits::findOrFail($id);
        return response()->json($benefit);
    }
    /**
     * Updates an existing Benefit resource
     * 
     * @param Request $request The request object with the updated resource's data
     *
     * @return \Illuminate\Http\JsonResponse The updated resource
     */
    public function update(Request $request)
    {
        // Validate the request's data
        $request->validate([
            'idBenefit' => 'required',
            'month' => 'required',
            'income' => 'required|numeric',
            'expense' => 'required|numeric',
            'profit' => 'required|numeric',
        ]);

        // Find the Benefit resource to update
        $benefit = Benefits::findOrFail($request->input('idBenefit'));

        // Update the Benefit resource with the validated data
        $benefit->update([
            'month' => $request->input('month'),
            'income' => $request->input('income'),
            'expense' => $request->input('expense'),
            'profit' => $request->input('profit'),
        ]);

        // Return a success response with the updated resource
        return response()->json(['message' => 'Benefit updated successfully', 'data' => $benefit]);
    }
}
