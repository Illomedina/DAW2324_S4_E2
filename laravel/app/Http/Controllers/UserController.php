<?php

namespace App\Http\Controllers;
//Request proporciona métodos para examinar la solicitud HTTP
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class UserController extends Controller
{

    //métodos para controlar rutas
    public function index(){
        try{
            
            $users = User::all();
            return $users;
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
       
        
        
    }


    public function update(Request $request, $id){
        try {
            $user = User::find($id);
            $user->idRole=1;
            $user->name -> $request->name;
            $user->surname -> $request->surname;
            $user->username-> $request->user;
            $user->email -> $request->email;
            $user->password -> $request->password;
            $user->save();
            return $user;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Configuración no encontrada.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar la configuración.'], 500);
        }
    }

    public function destroy($id)
    {
    
        $user = User::destroy($id);
        return $user;
    }
    

    
}
