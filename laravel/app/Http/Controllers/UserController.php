<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Exceptions\Exception;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //métodos para controlar rutas
    public function index(){
        try{   
            $users = User::all();
            return response()->json([
                'success' => true,
                'message' => 'Users successfully recovered',
                'data' => $users,
            ], 200);
        } catch(\Exception $e){
            return response()->json(['error'=> 'error getting the configuration'], 500);
        }
        }

    public function create(){
        //muestra el formulario para crear usuarios
        return view('users.create');
    }

    public function show($id){
        //Encuentra el id del usuario
        try{
            $user = User::find($id);
            return $user;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Configuration not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'error getting the configuration'], 500);
        }
    }


    public function store(Request $request){
            $user = User::create([
                'idRole' =>1,
                'name' => $request->name,
                'surname' => $request->surname,
                'user' => $request->user,
                'email' => $request->email,
                'password' => $request->password,
            ]);

        $user->save();  
        
        return response()->json(['message' => 'User successfully created.'], 201);

    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            // Data Validate
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:50',
                'surname' => 'required|string|max:50',
                'user' => 'required|string|max:50',
                'email' => 'required|string|email|max:255',
                'password' => 'nullable|string|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 422);
            }

            // Update User Data
            $user->name = $request->name;
            $user->surname = $request->surname;
            $user->user = $request->user;
            $user->email = $request->email;

            // If the user change the password, it is updated
            if ($request->has('password')) {
                $user->password = bcrypt($request->password);
            }

            // If the role change, it is updated
            if ($request->has('idRole')) {
                $user->idRole = $request->idRole;
            }


            $user->save();

            // Devolver el usuario actualizado
            return response()->json(['success' => true, 'user' => $user], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el usuario.'], 500);
        }
    }
    

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            
            return response()->json(['message' => 'User successfully deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete user'], 500);
        }
    }
    

    
}
