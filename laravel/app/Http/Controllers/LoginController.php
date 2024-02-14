<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
   
    public function register(Request $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();
        
        Auth::login($user);
        // return redirect()->route('');
    }
    
    public function login(Request $request){
        $credentias =[
            "username"=> $request->username,
            "password"=> $request->password
        ];
        
        //En caso de que se quiera añadir el check de remeber
        // $remember = $request->has('remember') ? true : false;

        if(Auth::attempt($credentias)){
            return response()->json(['message' => 'Login successful'], 200);
        }else{
            return response()->json(['message'=>'Login failed'], 401);
        }
    }

    // public function login(Request $request){
    //     $credentias =[
    //         "username"=> $request->username,
    //         "password"=> $request->password
    //     ];
        
    //     //En caso de que se quiera añadir el check de remeber
    //     // $remember = $request->has('remember') ? true : false;

    //     if(Auth::attempt($credentias)){
    //         $request->session()->regenerate();
    //         return response()->json(['message' => 'Login successful'], 200);
    //     }else{
    //         return response()->json(['message'=>'Login failed'], 401);
    //     }
    // }

    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message'=>'Logged out'], 201);

    }
}
