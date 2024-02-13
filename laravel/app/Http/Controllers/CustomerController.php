<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();
        return response()->json($customers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'firstName' => 'required|max:255',
            'lastName' => 'required|max:255',
            'username' => 'required|max:255|unique:customers,username',
            'email' => 'required|email|max:255|unique:customers,mail',
            'phone' => 'nullable|max:255',
            'address' => 'nullable|max:255',
            'postalCode' => 'nullable|max:255',
            'idCountry' => 'nullable|integer|exists:countries,id',
            'validated' => 'sometimes|boolean',
            'status' => 'required|in:Active,Inactive,Banned,Deleted',
        ]);

        $validatedData['membershipDate'] = now(); 

        $customer = Customer::create([
            'name' => $validatedData['firstName'],
            'surname' => $validatedData['lastName'],
            'username' => $validatedData['username'],
            'password' => bcrypt('password'),
            'mail' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'postcode' => $validatedData['postalCode'],
            'idCountry' => 1,
            'is_validated' => $validatedData['validated'] ?? false,
            'membershipDate' => $validatedData['membershipDate'],
            'customerStatus' => $validatedData['status'],
        
        ]);

        // Devolver una respuesta
        return response()->json(['message' => 'Customer created successfully', 'data' => $customer], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
