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
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'username' => 'required|max:255|unique:customers,username',
            'mail' => 'required|email|max:255|unique:customers,mail',
            'phone' => 'nullable|max:255',
            'address' => 'nullable|max:255',
            'city' => 'nullable|max:255',
            'postcode' => 'nullable|max:255',
            'idCountry' => 'nullable|integer|exists:countries,id',
            'is_validated' => 'sometimes|boolean',
            'status' => 'required|in:Active,Inactive,Banned,Deleted',
        ]);

        $validatedData['membershipDate'] = now();

        $customer = Customer::create([
            'name' => $validatedData['name'],
            'surname' => $validatedData['surname'],
            'username' => $validatedData['username'],
            'password' => bcrypt('password'),
            'mail' => $validatedData['mail'],
            'city' => $validatedData['city'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'postcode' => $validatedData['postcode'],
            'idCountry' => 1,
            'is_validated' => $validatedData['is_validated'] ?? false,
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
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255,',
            'username' => 'required|max:255|unique:customers,username,' . $id,
            'mail' => 'required|email|max:255|unique:customers,mail,' . $id,
            'phone' => 'nullable|max:255',
            'address' => 'nullable|max:255',
            'city' => 'nullable|max:255',
            'postcode' => 'nullable|max:255',
            'idCountry' => 'nullable|integer|exists:countries,id',
            'is_validated' => 'sometimes|boolean',
            'status' => 'required|in:Active,Inactive,Banned,Deleted',
        ]);

        $customer = Customer::find($id);

        $customer->name = $validatedData['name'];
        $customer->surname = $validatedData['surname'];
        $customer->username = $validatedData['username'];
        $customer->mail = $validatedData['mail'];
        $customer->city = $validatedData['city'];
        $customer->phone = $validatedData['phone'];
        $customer->address = $validatedData['address'];
        $customer->postcode = $validatedData['postcode'];
        $customer->idCountry = $validatedData['idCountry'] ?? 1;
        $customer->is_validated = $validatedData['is_validated'] ?? false;
        $customer->customerStatus = $validatedData['status'];

        $customer->save();

        return response()->json(['message' => 'Customer updated successfully', 'data' => $customer, 'id' => $id]);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $customer = Customer::find($id);
        if ($customer) {
            $customer->delete();
            return response()->json(['message' => 'Customer deleted successfully']);
        } else {
            return response()->json(['message' => 'Customer not found'], 404);
        }
    }

}
